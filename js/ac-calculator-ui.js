/* ==========================================================
   AC LOAD CALCULATOR — UI wiring (DOM rendering, state, events)
   ========================================================== */

(function () {
  "use strict";
  const C = window.ACCalc;

  const blankAreas = () => Object.fromEntries(C.ORIENTATIONS.map(o => [o, 0]));

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function parseNonNegative(value) {
    return Math.max(0, parseFloat(value) || 0);
  }

  let roomSeq = 0;
  function newRoom(name) {
    roomSeq += 1;
    return {
      id: "r" + roomSeq,
      name: name || "Room " + roomSeq,
      preset: "custom",
      length: 4, width: 3, height: 2.7,
      wallAreas: blankAreas(),
      wallType: "medium",
      roofExposed: false,
      roofType: "medium",
      windowAreas: blankAreas(),
      windowType: "doubleClear",
      occupants: 2,
      activity: "seated",
      lightingW: 60,
      lightingType: "led",
      equipmentW: 100,
      ach: 1.0
    };
  }

  const state = {
    building: { outdoorTemp: 34, indoorTemp: 24, outdoorRH: 70, indoorRH: 50, safetyPct: 10 },
    rooms: [newRoom("Living Room")]
  };

  const roomsEl = document.getElementById("rooms");
  const summaryEl = document.getElementById("summary");
  const buildingForm = document.getElementById("building-form");

  function optionList(map, selected) {
    return Object.entries(map)
      .map(([key, v]) => `<option value="${key}"${key === selected ? " selected" : ""}>${v.label}</option>`)
      .join("");
  }

  function orientationGrid(kind, roomId, values) {
    return `
      <div class="calc-orient-grid">
        ${C.ORIENTATIONS.map(o => `
          <label class="calc-orient-cell">
            <span>${o}</span>
            <input type="number" min="0" step="0.1" data-room="${roomId}" data-kind="${kind}" data-orient="${o}" value="${values[o]}">
          </label>`).join("")}
      </div>`;
  }

  function roomCardHTML(room, idx) {
    return `
    <div class="calc-room" data-room="${room.id}">
      <div class="calc-room-head">
        <input class="calc-room-name" type="text" data-field="name" data-room="${room.id}" value="${escapeHTML(room.name)}">
        <div class="calc-room-head-actions">
          <span class="tag mono">Room ${String(idx + 1).padStart(2, "0")}</span>
          <button type="button" class="btn btn-ghost calc-remove" data-room="${room.id}" ${state.rooms.length <= 1 ? "disabled" : ""}>Remove</button>
        </div>
      </div>

      <div class="calc-field-row">
        <label>Room type preset
          <select data-field="preset" data-room="${room.id}">${optionList(C.ROOM_PRESETS, room.preset)}</select>
        </label>
        <label>Length (m)
          <input type="number" min="0" step="0.1" data-field="length" data-room="${room.id}" value="${room.length}">
        </label>
        <label>Width (m)
          <input type="number" min="0" step="0.1" data-field="width" data-room="${room.id}" value="${room.width}">
        </label>
        <label>Ceiling height (m)
          <input type="number" min="0" step="0.1" data-field="height" data-room="${room.id}" value="${room.height}">
        </label>
      </div>

      <details class="calc-details" open>
        <summary>Walls &amp; roof</summary>
        <div class="calc-field-row">
          <label>Wall construction
            <select data-field="wallType" data-room="${room.id}">${optionList(C.WALL_TYPES, room.wallType)}</select>
          </label>
          <label class="calc-check">
            <input type="checkbox" data-field="roofExposed" data-room="${room.id}" ${room.roofExposed ? "checked" : ""}>
            Roof/ceiling exposed to outdoor (top floor)
          </label>
          <label>Roof construction
            <select data-field="roofType" data-room="${room.id}">${optionList(C.ROOF_TYPES, room.roofType)}</select>
          </label>
        </div>
        <p class="calc-hint">External wall area (m²) facing each direction</p>
        ${orientationGrid("wallAreas", room.id, room.wallAreas)}
      </details>

      <details class="calc-details">
        <summary>Windows / glazing</summary>
        <div class="calc-field-row">
          <label>Glazing type
            <select data-field="windowType" data-room="${room.id}">${optionList(C.WINDOW_TYPES, room.windowType)}</select>
          </label>
        </div>
        <p class="calc-hint">Window area (m²) facing each direction</p>
        ${orientationGrid("windowAreas", room.id, room.windowAreas)}
      </details>

      <details class="calc-details">
        <summary>Occupants, lighting &amp; equipment</summary>
        <div class="calc-field-row">
          <label>Occupants
            <input type="number" min="0" step="1" data-field="occupants" data-room="${room.id}" value="${room.occupants}">
          </label>
          <label>Activity level
            <select data-field="activity" data-room="${room.id}">${optionList(C.OCCUPANT_ACTIVITY, room.activity)}</select>
          </label>
          <label>Lighting load (W)
            <input type="number" min="0" step="10" data-field="lightingW" data-room="${room.id}" value="${room.lightingW}">
          </label>
          <label>Lighting type
            <select data-field="lightingType" data-room="${room.id}">${optionList(C.LIGHTING_TYPES, room.lightingType)}</select>
          </label>
          <label>Equipment / appliance load (W)
            <input type="number" min="0" step="10" data-field="equipmentW" data-room="${room.id}" value="${room.equipmentW}">
          </label>
          <label>Infiltration + ventilation (ACH)
            <input type="number" min="0" step="0.1" data-field="ach" data-room="${room.id}" value="${room.ach}">
          </label>
        </div>
      </details>

      <div class="calc-room-result" data-room-result="${room.id}"></div>
    </div>`;
  }

  function roomResultHTML(result) {
    return `
      <div class="calc-result-kpis">
        <div><span class="v">${result.totalKw.toFixed(2)}</span><span class="l">kW</span></div>
        <div><span class="v">${Math.round(result.totalBtuh).toLocaleString()}</span><span class="l">BTU/hr</span></div>
        <div><span class="v">${result.totalTons.toFixed(2)}</span><span class="l">Tons</span></div>
        <div><span class="v">${C.recommendUnit(result.totalTons)}</span><span class="l">TR unit rec.</span></div>
      </div>`;
  }

  function fmtW(w) {
    return Math.round(w).toLocaleString() + " W";
  }

  function buildingFormHTML() {
    const b = state.building;
    return `
      <div class="calc-field-row">
        <label>Outdoor design temp (°C)
          <input type="number" step="0.5" id="b-outdoorTemp" value="${b.outdoorTemp}">
        </label>
        <label>Indoor design temp (°C)
          <input type="number" step="0.5" id="b-indoorTemp" value="${b.indoorTemp}">
        </label>
        <label>Outdoor RH (%)
          <input type="number" min="0" max="100" step="1" id="b-outdoorRH" value="${b.outdoorRH}">
        </label>
        <label>Indoor RH (%)
          <input type="number" min="0" max="100" step="1" id="b-indoorRH" value="${b.indoorRH}">
        </label>
        <label>Safety margin (%)
          <input type="number" min="0" max="50" step="1" id="b-safetyPct" value="${b.safetyPct}">
        </label>
      </div>`;
  }

  function applyPreset(room) {
    const preset = C.ROOM_PRESETS[room.preset];
    if (!preset || room.preset === "custom") return;
    const area = Math.max(0, room.length * room.width);
    room.occupants = Math.max(preset.occMin, Math.round(area * preset.occPerM2));
    room.lightingW = Math.round(area * preset.lightWm2);
    room.equipmentW = Math.round(area * preset.equipWm2);
    room.activity = preset.activity;
    room.ach = preset.ach;
  }

  function render() {
    roomsEl.innerHTML = state.rooms.map(roomCardHTML).join("");
    renderResults();
  }

  function renderResults() {
    let totalW = 0, totalSensible = 0, totalLatent = 0;
    const rows = state.rooms.map(room => {
      const result = C.calcRoomLoad(room, state.building);
      totalW += result.totalW;
      totalSensible += result.sensibleW;
      totalLatent += result.latentW;
      const cardResult = roomsEl.querySelector(`[data-room-result="${room.id}"]`);
      if (cardResult) cardResult.innerHTML = roomResultHTML(result);
      return { room, result };
    });

    const totalTons = (totalW * 3.412) / 12000;
    const totalBtuh = totalW * 3.412;

    summaryEl.innerHTML = `
      <div class="calc-summary-kpis">
        <div><span class="v">${(totalW / 1000).toFixed(2)}</span><span class="l">kW total</span></div>
        <div><span class="v">${Math.round(totalBtuh).toLocaleString()}</span><span class="l">BTU/hr total</span></div>
        <div><span class="v">${totalTons.toFixed(2)}</span><span class="l">Tons total</span></div>
        <div><span class="v">${C.recommendUnit(totalTons)}</span><span class="l">TR recommended</span></div>
      </div>
      <table class="calc-summary-table">
        <thead><tr><th>Room</th><th>Area (m²)</th><th>Sensible</th><th>Latent</th><th>Total (kW)</th><th>Tons</th><th>Rec. unit</th></tr></thead>
        <tbody>
          ${rows.map(({ room, result }) => `
            <tr>
              <td>${escapeHTML(room.name)}</td>
              <td>${result.area.toFixed(1)}</td>
              <td>${fmtW(result.sensibleW)}</td>
              <td>${fmtW(result.latentW)}</td>
              <td>${result.totalKw.toFixed(2)}</td>
              <td>${result.totalTons.toFixed(2)}</td>
              <td>${C.recommendUnit(result.totalTons)} TR</td>
            </tr>`).join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">Building total (sensible ${fmtW(totalSensible)} · latent ${fmtW(totalLatent)})</td>
            <td>${(totalW / 1000).toFixed(2)}</td>
            <td>${totalTons.toFixed(2)}</td>
            <td>${C.recommendUnit(totalTons)} TR</td>
          </tr>
        </tfoot>
      </table>`;
  }

  function getRoom(id) {
    return state.rooms.find(r => r.id === id);
  }

  // ---------- Events ----------

  buildingForm.innerHTML = buildingFormHTML();
  buildingForm.addEventListener("input", e => {
    const t = e.target;
    if (!t.id || !t.id.startsWith("b-")) return;
    const key = t.id.slice(2);
    if (key === "outdoorRH" || key === "indoorRH") {
      state.building[key] = Math.min(100, parseNonNegative(t.value));
    } else if (key === "safetyPct") {
      state.building[key] = parseNonNegative(t.value);
    } else {
      state.building[key] = parseFloat(t.value) || 0;
    }
    renderResults();
  });

  roomsEl.addEventListener("input", e => {
    const t = e.target;
    const roomId = t.dataset.room;
    if (!roomId) return;
    const room = getRoom(roomId);
    if (!room) return;

    if (t.dataset.kind) {
      // orientation grid input (wallAreas / windowAreas)
      room[t.dataset.kind][t.dataset.orient] = parseNonNegative(t.value);
      renderResults();
      return;
    }

    const field = t.dataset.field;
    if (!field) return;

    if (t.type === "checkbox") {
      room[field] = t.checked;
    } else if (["length", "width", "height", "occupants", "lightingW", "equipmentW", "ach"].includes(field)) {
      room[field] = parseNonNegative(t.value);
    } else {
      room[field] = t.value;
    }

    if (field === "preset") {
      applyPreset(room);
      render();
      return;
    }
    if (["length", "width"].includes(field) && room.preset !== "custom") {
      applyPreset(room);
      render();
      return;
    }

    renderResults();
  });

  roomsEl.addEventListener("click", e => {
    const btn = e.target.closest(".calc-remove");
    if (!btn) return;
    if (state.rooms.length <= 1) return;
    state.rooms = state.rooms.filter(r => r.id !== btn.dataset.room);
    render();
  });

  document.getElementById("add-room").addEventListener("click", () => {
    state.rooms.push(newRoom());
    render();
  });

  document.getElementById("print-report").addEventListener("click", () => window.print());

  render();
})();
