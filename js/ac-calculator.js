/* ==========================================================
   AC LOAD CALCULATOR — cooling load estimation engine + UI
   Method: simplified ASHRAE-style sensible/latent heat balance
   (conduction through walls/roof/glass, solar gain through
   glass, internal gains, infiltration/ventilation). Intended
   for quick sizing estimates, not a substitute for a full
   Manual J / CLTD-CLF design calculation.
   ========================================================== */

(function () {
  "use strict";

  // ---------- Reference data ----------

  const WALL_TYPES = {
    light: { label: "Light / uninsulated (single brick, U ≈ 2.2)", u: 2.2 },
    medium: { label: "Medium / insulated block (U ≈ 1.0)", u: 1.0 },
    heavy: { label: "Heavy / well-insulated (U ≈ 0.5)", u: 0.5 }
  };

  const ROOF_TYPES = {
    light: { label: "Uninsulated concrete/metal roof (U ≈ 3.0)", u: 3.0 },
    medium: { label: "Insulated roof (U ≈ 1.0)", u: 1.0 },
    heavy: { label: "Well-insulated roof/ceiling (U ≈ 0.4)", u: 0.4 }
  };

  const WINDOW_TYPES = {
    singleClear: { label: "Single glazed, clear (U 5.8, SHGC 0.86)", u: 5.8, shgc: 0.86 },
    singleTinted: { label: "Single glazed, tinted/reflective (U 5.8, SHGC 0.55)", u: 5.8, shgc: 0.55 },
    doubleClear: { label: "Double glazed, clear (U 2.8, SHGC 0.76)", u: 2.8, shgc: 0.76 },
    doubleLowE: { label: "Double glazed, low-E (U 1.8, SHGC 0.40)", u: 1.8, shgc: 0.40 }
  };

  const ORIENTATIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  // Approximate peak solar heat gain factors (W/m²) through unshaded glass.
  const SOLAR_GAIN_FACTOR = { N: 100, NE: 400, E: 600, SE: 480, S: 250, SW: 480, W: 600, NW: 400 };

  const OCCUPANT_ACTIVITY = {
    seated: { label: "Seated, quiet (office, cinema)", sensible: 70, latent: 45 },
    light: { label: "Light work (retail, classroom)", sensible: 75, latent: 55 },
    moderate: { label: "Moderate work (kitchen, light labour)", sensible: 80, latent: 140 },
    active: { label: "Active (gym, dance floor)", sensible: 90, latent: 250 }
  };

  const LIGHTING_TYPES = {
    led: { label: "LED (ballast factor 1.0)", factor: 1.0 },
    cfl: { label: "CFL (ballast factor 1.2)", factor: 1.2 },
    fluorescent: { label: "Fluorescent tube (ballast factor 1.25)", factor: 1.25 },
    incandescent: { label: "Incandescent (ballast factor 1.0)", factor: 1.0 }
  };

  // Room-type presets: auto-fill occupants / lighting / equipment from floor area.
  const ROOM_PRESETS = {
    custom: { label: "Custom (no preset)" },
    bedroom: { label: "Bedroom", occPerM2: 0.03, occMin: 1, lightWm2: 5, equipWm2: 3, activity: "seated", ach: 0.5 },
    living: { label: "Living / lounge room", occPerM2: 0.05, occMin: 2, lightWm2: 6, equipWm2: 8, activity: "seated", ach: 0.7 },
    office: { label: "Office / workstation area", occPerM2: 0.1, occMin: 1, lightWm2: 12, equipWm2: 15, activity: "seated", ach: 1.0 },
    conference: { label: "Conference / meeting room", occPerM2: 0.4, occMin: 2, lightWm2: 12, equipWm2: 8, activity: "seated", ach: 1.5 },
    retail: { label: "Retail / shop floor", occPerM2: 0.2, occMin: 1, lightWm2: 18, equipWm2: 10, activity: "light", ach: 1.5 },
    classroom: { label: "Classroom / training room", occPerM2: 0.5, occMin: 2, lightWm2: 12, equipWm2: 5, activity: "light", ach: 2.0 },
    restaurant: { label: "Restaurant / dining hall", occPerM2: 0.7, occMin: 4, lightWm2: 12, equipWm2: 8, activity: "light", ach: 2.0 },
    kitchen: { label: "Kitchen (commercial)", occPerM2: 0.15, occMin: 1, lightWm2: 10, equipWm2: 40, activity: "moderate", ach: 4.0 },
    server: { label: "Server / equipment room", occPerM2: 0.02, occMin: 1, lightWm2: 8, equipWm2: 150, activity: "seated", ach: 3.0 },
    gym: { label: "Gym / fitness studio", occPerM2: 0.2, occMin: 2, lightWm2: 10, equipWm2: 5, activity: "active", ach: 3.0 }
  };

  const STANDARD_UNITS_TR = [0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 7.5, 10.0];

  // ---------- Psychrometrics ----------

  // Saturation vapour pressure (hPa) via Magnus-Tetens; T in °C.
  function satVaporPressure(t) {
    return 6.1094 * Math.exp((17.625 * t) / (t + 243.04));
  }

  // Humidity ratio (kg water / kg dry air) at sea-level pressure.
  function humidityRatio(t, rhPct) {
    const es = satVaporPressure(t);
    const e = (rhPct / 100) * es;
    const p = 1013.25;
    return (0.622 * e) / (p - e);
  }

  // ---------- Core load calculation ----------

  // room: { length, width, height, wallAreas{N..NW}, wallType,
  //         roofExposed, roofType, windowAreas{N..NW}, windowType,
  //         occupants, activity, lightingW, lightingType, equipmentW, ach }
  // building: { outdoorTemp, indoorTemp, outdoorRH, indoorRH, safetyPct }
  function calcRoomLoad(room, building) {
    const area = Math.max(0, room.length * room.width);
    const volume = area * Math.max(0, room.height);
    const dT = building.outdoorTemp - building.indoorTemp;

    const wallU = WALL_TYPES[room.wallType].u;
    const wallAreaTotal = ORIENTATIONS.reduce((s, o) => s + (room.wallAreas[o] || 0), 0);
    const qWall = wallU * wallAreaTotal * dT;

    const roofU = ROOF_TYPES[room.roofType].u;
    const roofArea = room.roofExposed ? area : 0;
    const qRoof = roofU * roofArea * dT;

    const win = WINDOW_TYPES[room.windowType];
    const windowAreaTotal = ORIENTATIONS.reduce((s, o) => s + (room.windowAreas[o] || 0), 0);
    const qWinCond = win.u * windowAreaTotal * dT;
    const qWinSolar = ORIENTATIONS.reduce(
      (s, o) => s + (room.windowAreas[o] || 0) * win.shgc * SOLAR_GAIN_FACTOR[o],
      0
    );

    const activity = OCCUPANT_ACTIVITY[room.activity];
    const qOccSens = room.occupants * activity.sensible;
    const qOccLat = room.occupants * activity.latent;

    const qLight = room.lightingW * LIGHTING_TYPES[room.lightingType].factor;
    const qEquip = room.equipmentW;

    const flowLs = ((room.ach * volume) / 3600) * 1000; // L/s
    const qInfSens = 1.23 * flowLs * dT;
    const wOut = humidityRatio(building.outdoorTemp, building.outdoorRH);
    const wIn = humidityRatio(building.indoorTemp, building.indoorRH);
    const qInfLat = 3010 * flowLs * Math.max(0, wOut - wIn);

    const sensible = qWall + qRoof + qWinCond + qWinSolar + qOccSens + qLight + qEquip + qInfSens;
    const latent = qOccLat + qInfLat;
    const subtotal = sensible + latent;
    const safetyFactor = 1 + (building.safetyPct || 0) / 100;
    const totalW = Math.max(0, subtotal * safetyFactor);

    return {
      area, volume,
      breakdown: {
        wall: qWall, roof: qRoof, windowConduction: qWinCond, windowSolar: qWinSolar,
        occupantsSensible: qOccSens, occupantsLatent: qOccLat,
        lighting: qLight, equipment: qEquip,
        infiltrationSensible: qInfSens, infiltrationLatent: qInfLat
      },
      sensibleW: sensible,
      latentW: latent,
      totalW,
      totalBtuh: totalW * 3.412,
      totalKw: totalW / 1000,
      totalTons: (totalW * 3.412) / 12000
    };
  }

  function recommendUnit(tons) {
    const fit = STANDARD_UNITS_TR.find(t => t >= tons);
    return fit || STANDARD_UNITS_TR[STANDARD_UNITS_TR.length - 1];
  }

  window.ACCalc = {
    WALL_TYPES, ROOF_TYPES, WINDOW_TYPES, ORIENTATIONS, OCCUPANT_ACTIVITY,
    LIGHTING_TYPES, ROOM_PRESETS, STANDARD_UNITS_TR,
    calcRoomLoad, recommendUnit, humidityRatio
  };
})();
