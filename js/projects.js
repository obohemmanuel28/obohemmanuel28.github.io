/* ==========================================================
   PROJECT DATA — the single source of truth for every project.
   Edit a project here and both the home page card and its
   case-study page update automatically.

   Fields left as null/[] show a dashed "to be added" box on
   the case-study page, so it's easy to see what's missing.

   Screenshots go in: assets/projects/<slug>/
   ========================================================== */

const PROJECTS = [
  {
    slug: "ap-aging",
    title: "Accounts Payable Aging Analytics",
    domain: "Finance",
    summary: "Aging analysis of supplier invoices to surface overdue liabilities, vendor exposure and payment-timing risk for cash-flow planning.",
    tools: ["Power BI", "Power Query", "DAX", "Excel"],
    thumb: "assets/projects/ap-aging/02-overdue.png",
    problem: "A mid-sized oil and gas servicing company buys equipment, logistics and technical services from several vendors. Unpaid invoices were piling up, vendors were complaining about late payments, and cash flow was under growing pressure. The CFO wanted to see, at a glance, how much the company owed, how much was overdue, which vendors carried the most risk, and how much cash would be needed in the next 7, 14 and 30 days.",
    data: {
      source: "DAMP Mentorship case study",
      size: "220 invoices · 8 vendors",
      period: "Jan – Apr 2026",
      notes: "The raw data had invoice ID, vendor, project, invoice date, amount and payment status (paid or unpaid). I derived the due date (invoice date + 30 days), days overdue, aging buckets (Not Due, 1–30, 31–60, 61–90 days) and cash-flow buckets (Overdue, Next 7, 14 and 30 days). The figures below are measured as of 2 May 2026."
    },
    approach: [
      "<strong>Clean and transform (Power Query):</strong> fixed data types, removed paid invoices from the payable balance, and added due-date, days-overdue, aging-bucket and cash-flow-bucket columns.",
      "<strong>Model and measure (DAX):</strong> wrote measures for Total AP, Overdue AP, Overdue %, vendor count and invoice count, plus bucket totals that respond to every filter.",
      "<strong>Design for the CFO:</strong> built a 5-page report (Home, Overdue, Vendor, Invoice, Cashflow). Each page answers one question, from \"Are we financially safe right now?\" to \"Can we survive upcoming obligations?\"",
      "<strong>Consistent colours:</strong> red means overdue and green means not due, used the same way on every page so the CFO can read risk in seconds. Vendor, aging-bucket and cash-flow-bucket filters work across all pages.",
      "<strong>Tell the story:</strong> turned the findings into an 11-page executive report with a phased payment plan."
    ],
    insights: [
      { value: "₦412.35M", text: "of the ₦635.57M payable balance is already overdue. That's <strong>64.88%</strong> of everything the company owes." },
      { value: "₦196.2M", text: "is 31–90 days overdue. The ₦177.4M in the 31–60 day bucket is close to rolling into the critical 60+ day range." },
      { value: "44%", text: "of total AP sits with just three vendors: Vertex Oilfield (₦101.4M), Alpha Supplies (₦90.6M) and Titan Procurement (₦87.4M)." },
      { value: "₦190.4M", text: "falls due within the next 14 days, on top of the overdue balance. That's a sharp short-term cash squeeze." },
      { value: "147 of 220", text: "invoices are still unpaid, and every one of the 8 vendors has an overdue balance. The problem is systemic, not limited to one vendor." }
    ],
    recommendations: [
      "<strong>Pay the oldest invoices first:</strong> clear the 61–90 day bucket (₦18.8M, owed to CrestTech Nigeria and Alpha Supplies) within 7 days to show goodwill and ease vendor pressure.",
      "<strong>Renegotiate and tier vendors:</strong> agree new payment terms with the highest-overdue vendors (Alpha Supplies, Titan Procurement, Vertex Oilfield). Rank all vendors by how critical they are, and keep paying sole-source suppliers on time even under pressure.",
      "<strong>Plan cash ahead instead of reacting:</strong> schedule payments against the 7, 14 and 30-day cash-flow buckets and against confirmed receivables, rather than deciding invoice by invoice.",
      "<strong>Fix the root cause:</strong> find out whether rising payables come from slow customer collections, a deliberate decision to hold cash, or a real shortfall, and set up a rolling cash-flow forecast so this doesn't happen again."
    ],
    gallery: [
      { src: "assets/projects/ap-aging/01-home.png", caption: "Home: \"Are we financially safe right now?\" Executive KPIs." },
      { src: "assets/projects/ap-aging/02-overdue.png", caption: "Overdue: \"Where is the risk concentrated?\" Aging buckets by vendor." },
      { src: "assets/projects/ap-aging/03-vendor.png", caption: "Vendor: \"Who are our biggest risks?\" Exposure and overdue AP by vendor." },
      { src: "assets/projects/ap-aging/04-invoice.png", caption: "Invoice: \"What exactly is causing the problem?\" Detail for each transaction." },
      { src: "assets/projects/ap-aging/05-cashflow.png", caption: "Cashflow: \"Can we survive upcoming obligations?\" 7, 14 and 30-day cash requirement." }
    ],
    links: {}
  },
  {
    slug: "hr-attrition",
    title: "HR Staff Attrition Analytics",
    domain: "HR",
    summary: "Workforce analysis identifying who is leaving, when and why, and which departments and roles carry the highest attrition risk.",
    tools: ["Excel", "PivotTables", "Pivot Charts", "Slicers"],
    thumb: "assets/projects/hr-attrition/01-hr-attrition-dashboard.png",
    problem: "A company with 780 staff was losing almost one employee in three. HR leadership knew attrition was high but not <em>where</em> or <em>why</em>. They needed a dashboard that breaks attrition down by demographics (age and gender), organisation (department and job role), tenure, performance, satisfaction and pay, so that retention budgets go where they will make the biggest difference.",
    data: {
      source: "HR employee dataset (Beginners Certificate Course)",
      size: "780 employees · 16 fields",
      period: "Single snapshot",
      notes: "Each record has employee ID, age, gender, department, job role, years of service, performance rating (5–9), satisfaction score, salary and attrition (Yes/No). I added banded fields for age range, tenure level (Entry 2–5 yrs, Mid 6–10, Senior 11–16), performance and satisfaction ranges, salary range (Very Low $41–50K up to Very High $71–78K), and a 0/1 attrition count to make the PivotTables easier to build."
    },
    approach: [
      "<strong>Prepare:</strong> converted the data into an Excel Table and added banding columns (age, tenure, performance, satisfaction and salary ranges) plus an attrition flag.",
      "<strong>Analyse:</strong> built one PivotTable sheet for each question (KPI, Age, Gender, Department, Job Role, Tenure, Performance, Satisfaction and Salary), comparing all staff with leavers.",
      "<strong>Design:</strong> a dark-themed one-page dashboard with KPI cards (total staff, attrition, active staff and attrition rate), grouped into <em>Demography</em>, <em>Ratings</em> and <em>Organisation</em> sections.",
      "<strong>Interact:</strong> connected gender and job-role slicers so every chart on the dashboard filters together.",
      "<strong>Rates, not just counts:</strong> for the case study I converted each group's leaver count into an attrition <em>rate</em> (leavers ÷ headcount), because counts can hide which groups really are at risk."
    ],
    insights: [
      { value: "30%", text: "overall attrition: 234 of 780 employees left, leaving 546 active staff. That is roughly one employee in three." },
      { value: "56% vs 13%", text: "Performance is the clearest driver. Over half of employees rated <strong>Poor</strong> (5/9) left, compared with 13% of those rated Above Average. Some of this attrition is healthy turnover." },
      { value: "54%", text: "of the <strong>highest-paid</strong> staff ($71–78K) left, twice the rate of the middle salary bands (26–28%). Leavers earned more on average than stayers ($62.1K vs $60.4K). These are costly, hard-to-replace losses." },
      { value: "34% vs 27%", text: "More men left (123 vs 111), but <strong>women leave at a higher rate</strong> (34.2% vs 27.0%). Raw counts hide this gap, and rates reveal it." },
      { value: "41%", text: "of <strong>Specialists</strong> left (86 of 208), along with 36% of Analysts, compared with just 12% of Accountants. By department, Finance (39%) and HR (37%) lose staff at more than twice the rate of Engineering (17%)." }
    ],
    recommendations: [
      "<strong>Protect the expensive leavers first:</strong> run stay interviews and a pay-and-progression review for the Very High salary band and Senior-level staff (38% attrition), where each departure costs the most knowledge and money.",
      "<strong>Target the at-risk roles:</strong> build retention plans for Specialists and Analysts in Finance and HR, such as career paths, workload reviews and skills allowances, and learn from Engineering's 17% rate.",
      "<strong>Investigate the gender gap:</strong> look into why women leave at 34% (flexibility, progression, pay equity) and track the female attrition rate as a standing KPI.",
      "<strong>Manage performance-led exits deliberately:</strong> support Poor performers with improvement plans, and make sure the 13–17% attrition among top performers doesn't rise.",
      "<strong>Measure satisfaction better:</strong> satisfaction scores barely differ between leavers and stayers (3.77 vs 3.79), so the current survey doesn't predict exits. Add exit interviews and pulse surveys that capture the real reasons people leave."
    ],
    gallery: [
      { src: "assets/projects/hr-attrition/01-hr-attrition-dashboard.png", caption: "HR Attrition Dashboard: KPI cards, attrition by age range, performance, satisfaction, salary range, tenure, department and job role, with gender and job-role slicers." }
    ],
    links: {}
  },
  {
    slug: "oil-rig-performance",
    title: "Oil Rig Workforce Performance Analytics",
    domain: "Energy",
    summary: "Weekly productivity, cost and quality KPIs across four oil rig locations, tracked against targets to find where performance and cost are slipping.",
    tools: ["Power BI", "Power Query", "DAX", "Excel"],
    thumb: "assets/projects/oil-rig-performance/01-performance-dashboard.png",
    problem: "AXZ Oil and Gas Production Company runs four rig locations in the Niger Delta: Brass, Ekeremor, Nembe and Southern Ijaw. Management had set three performance targets: <strong>11 units per hour (UPH)</strong>, a <strong>cost per unit (CPU) of ₦750</strong>, and <strong>250 units per quality issue (UPI)</strong>. They needed to know which rigs were meeting the targets, where costs and quality were slipping, and whether training and working hours made a difference.",
    data: {
      source: "AXZ Oil & Gas weekly performance files (training dataset)",
      size: "452 records · 113 employees",
      period: "4 consecutive weeks",
      notes: "There were four weekly Excel files, one row per employee per week. Each row has employee ID, hours worked, units produced, quality issues, production cost (₦), training hours and rig location. I appended the four weeks into one table with a week number, then calculated UPH, CPU and UPI for each employee before averaging them."
    },
    approach: [
      "<strong>Combine (Power Query):</strong> appended the four weekly workbooks into one fact table, added a week index, and set data types.",
      "<strong>Measure (DAX):</strong> built the UPH, CPU and UPI KPIs with their targets, plus total units, total production cost, total quality issues, average employees per week, average training hours and average work hours.",
      "<strong>Segment:</strong> added work-hour bands (21–40, 41–60, 61–80, 81–100 hrs) and a training-hours slicer (0–3 hrs) so managers can compare like-for-like groups of workers.",
      "<strong>Test the training link:</strong> used a correlation measure and scatter plots with trend lines to test whether more training leads to higher output and fewer defects.",
      "<strong>Design:</strong> a one-page performance dashboard with KPI-versus-target cards and a rig-by-rig breakdown of every metric."
    ],
    insights: [
      { value: "₦898 vs ₦750", text: "Cost per unit is <strong>20% over target</strong>, even though productivity is on target (UPH 11.02 vs 11). The problem is cost and quality, not output speed." },
      { value: "₦1,235", text: "Ekeremor's cost per unit is 65% above target, and it has the lowest units per quality issue (171). Brass is the benchmark: CPU ₦717 (under target) and UPI 314." },
      { value: "2×", text: "Brass averages 1.55 training hours per worker, twice as much as Ekeremor (0.76) and Southern Ijaw (0.69). The two least-trained rigs are also the two most expensive." },
      { value: "+0.67 / −0.66", text: "Across all 452 records, more training hours go with more units produced (+0.67) and lower production cost (−0.66), and with fewer quality issues (−0.58)." },
      { value: "236 → 525", text: "Quality issues more than doubled over the four weeks, while UPH rose from 9.9 to 11.7. Output is going up at the expense of quality." }
    ],
    recommendations: [
      "<strong>Use Brass's training approach at every rig:</strong> raise Ekeremor and Southern Ijaw to at least 1.5 training hours per worker per week, and track whether their cost per unit moves toward target.",
      "<strong>Run a cost review at Ekeremor:</strong> break its ₦1,235 cost per unit down into labour, materials and downtime to find what's driving it 65% over target.",
      "<strong>Stop the quality slide now:</strong> add quality checkpoints and investigate why defects more than doubled while output rose, before rework costs cancel out the productivity gains.",
      "<strong>Review KPIs weekly by rig:</strong> keep UPH, CPU and UPI against target as a weekly management review, with red flags when any rig misses two weeks in a row."
    ],
    gallery: [
      { src: "assets/projects/oil-rig-performance/01-performance-dashboard.png", caption: "Performance dashboard: UPH, CPU and UPI against target, with a rig-by-rig breakdown of units, cost, quality issues, headcount, training and work hours (41–60 hr band selected)." }
    ],
    links: {}
  },
  {
    slug: "data-jobs-salary",
    title: "Data Jobs Salary Calculator",
    domain: "HR",
    summary: "An interactive Excel salary calculator built on 32,000+ real 2023 data-job postings from 111 countries. Pick a role, country and job type to get the median salary, job count and top hiring platform.",
    role: "The first guided project in the <em>Excel for Data Analytics</em> course by Luke Barousse and Kelly Adams. The course provided the job-postings dataset, and I built the salary-calculator dashboard. The insights and sample-size review below are my own analysis.",
    tools: ["Excel", "Dynamic Arrays", "MEDIAN(IF)", "FILTER / SORT / UNIQUE", "XLOOKUP", "Map Chart"],
    thumb: "assets/projects/data-jobs-salary/01-salary-calculator.png",
    problem: "Job seekers and hiring managers in data roles need a quick, fair answer to one question: <em>what does this role actually pay, here, for this type of contract?</em> Salary posts online are scattered and inconsistent. The goal was a single self-service tool that turns tens of thousands of job postings into a clear median salary for any combination of job title, country and schedule type.",
    data: {
      source: "Data job postings dataset, 2023 (course dataset)",
      size: "32,672 postings · 111 countries",
      period: "Jan – Dec 2023",
      notes: "Each posting has job title (grouped into 10 standard roles), country, platform, schedule type, remote flag, degree and health-insurance mentions, company, skills and salary. About 67% of postings include an annual salary. Postings without one are excluded from the medians but still counted as jobs."
    },
    approach: [
      "<strong>Structure:</strong> loaded the postings into an Excel Table (<code>jobs</code>) and created named input cells (<code>title</code>, <code>country</code>, <code>type</code>) driven by drop-down lists.",
      "<strong>Dynamic lists:</strong> used <code>UNIQUE</code>, <code>SORT</code> and <code>FILTER</code> to build self-updating drop-down lists. The schedule-type list filters out combined values such as \"Full-time and Part-time\".",
      "<strong>Conditional medians:</strong> <code>MEDIAN(IF(...))</code> array formulas with four conditions (title, country, schedule type and salary present) return the median salary for every role, country and job type.",
      "<strong>Lookups and counts:</strong> <code>XLOOKUP</code> returns the selected role's median and job count, and <code>COUNTIFS</code> with <code>SORT</code> ranks hiring platforms to find the top one.",
      "<strong>Visuals:</strong> ranked bar charts that highlight the selected role and job type, plus a filled world map of median salary by country, all updating instantly when an input changes."
    ],
    insights: [
      { value: "$130K", text: "median salary for a full-time Data Scientist in the US, based on 5,638 postings. Indeed is the most common platform for these roles, just ahead of Ladders and LinkedIn." },
      { value: "$90K → $155K", text: "is the US full-time pay ladder, from Data Analyst and Business Analyst ($90K) through Data Scientist ($130K) to Senior Data Scientist ($155K). Machine Learning and Senior Data Engineers earn $150K." },
      { value: "Up to −33%", text: "Contract type matters. Compared with $130K for full-time roles, US Data Scientist internships pay a $97K median (−25%) and temporary roles $87.5K (−33%)." },
      { value: "29 of 70", text: "countries have fewer than 5 salary data points. Russia shows the highest median on the map ($250K), but that comes from a <strong>single</strong> posting. The map needs a sample-size warning before anyone relies on it." },
      { value: "77%", text: "of postings are US-based (25,141), so global comparisons outside the US rest on thin data. Treat non-US medians as indicators, not benchmarks." }
    ],
    recommendations: [
      "<strong>Show sample size next to every median:</strong> add a \"based on n postings\" label, and grey out countries with fewer than 5 salaries so single outliers like Russia don't mislead users.",
      "<strong>Use it as a career tool:</strong> the calculator shows that moving from Data Analyst to Senior Data Analyst (+$20K) or into data engineering (+$35K) are the clearest pay steps in the US market.",
      "<strong>Add skills to the model:</strong> the dataset already lists skills for each posting, so a skills filter (SQL, Python, Power BI) would show which skills carry a salary premium for each role.",
      "<strong>Flag location quality:</strong> 2,680 postings are tagged \"Sudan\", which is probably a location-parsing error in the source data. Clean or exclude them before publishing country rankings."
    ],
    gallery: [
      { src: "assets/projects/data-jobs-salary/01-salary-calculator.png", caption: "Data Science Salary Calculator: choose a job title, country and schedule type to see the median salary, top job platform, job count, salary by role, salary by job type, and a world map of median salary by country." }
    ],
    links: {}
  },
  {
    slug: "sales-variance",
    draft: true,             // hidden until the Variance % fix + new screenshots
    title: "Sales Target vs Actual Variance Analysis",
    domain: "Sales",
    summary: "A monthly target-vs-actual variance analysis for four regional heads of sales, finding who beat target, when, and why the year was won in just a few months.",
    tools: ["Power BI", "DAX", "Excel"],
    thumb: "assets/projects/sales-variance/01-home.png",
    problem: "A Nigerian sales company set monthly targets for four regional heads of sales: Ade (Adamawa), Bola (Kwara), Chioma (Lagos) and Danladi (Ogun). At year end, management needed more than a pass/fail. They wanted to know who beat their target and by how much, which months drove or dragged performance, whether the targets were realistic, and what to change for next year.",
    data: {
      source: "Training case study dataset (coach: Anietie Etuk)",
      size: "48 records · 4 salespeople",
      period: "Jan – Dec 2024",
      notes: "Each record has the month, salesperson, target and actual sales in millions of naira. I calculated the variance (actual − target) and variance % for each salesperson and month, then totalled by rep, month and quarter."
    },
    approach: [
      "<strong>Model (Power BI):</strong> loaded the 12-month target and actual data, and added month and quarter fields and a salesperson-to-region lookup.",
      "<strong>Measure (DAX):</strong> Total Actual, Total Target, Variance and Variance %, with Variance % calculated as total variance ÷ total target so it stays correct at every level of the report.",
      "<strong>Design:</strong> a sales-vs-target header card, a <em>Team Performance</em> panel for each head of sales with a green or red variance flag, a monthly variance column chart with target markers, and a colour-coded summary table.",
      "<strong>Report:</strong> wrote a business report covering monthly variance, each rep's best month, variance %, the top performer, and consistency, with facts, insights, recommendations and expected outcomes for each."
    ],
    insights: [
      { value: "+₦46.6M", text: "Actual sales were ₦2.62bn against a ₦2.57bn target (+1.81%). But the team hit its combined target in only <strong>5 of 12 months</strong>." },
      { value: "−₦117M", text: "was lost in January and February alone (−25% and −31%). March (+37%) and December (+41%) recovered it, and Q4 contributed +₦92M. The year was won in a handful of months." },
      { value: "79%", text: "of the net over-achievement came from Chioma (Lagos): +₦36.8M, or +5.47%, despite carrying the largest target (₦672M)." },
      { value: "−0.51%", text: "Danladi (Ogun) was the only head of sales below target (−₦3.35M), on the second-largest target. Bola only just cleared target (+0.24%)." },
      { value: "Same pattern", text: "All four reps missed in January, February and April, and all four beat target in March, June and December. The swings follow market seasonality, not individual effort, so flat monthly targets are the real problem." }
    ],
    recommendations: [
      "<strong>Set seasonal targets:</strong> plan monthly targets around last year's pattern, lower in January–February and higher in March and December, so every month's variance means something and motivates the team.",
      "<strong>Share what works in Lagos:</strong> document Chioma's customer base, approach and tactics, and set up Chioma-led quarterly performance clinics for the other regions.",
      "<strong>Find the cause in Ogun:</strong> check whether Danladi's shortfall comes from skills, logistics or the market, then offer targeted coaching or adjust the territory.",
      "<strong>Fix the slow start to the year:</strong> run early-year promotions and customer reactivation campaigns in January and February, and build stock and campaigns ahead of March and December.",
      "<strong>Monitor monthly:</strong> use the variance dashboard as a monthly early-warning system, flagging any rep who misses target two months in a row."
    ],
    gallery: [
      { src: "assets/projects/sales-variance/01-home.png", caption: "Home: sales vs target, a Team Performance card for each head of sales with a variance flag, and monthly performance against target." },
      { src: "assets/projects/sales-variance/02-data-view.png", caption: "Data View: variance and variance % by salesperson and by month, with data bars and status icons." }
    ],
    links: {}
  },
  {
    slug: "bank-churn",
    title: "Bank Customer Churn Analysis",
    domain: "Finance",
    summary: "Churn analysis of 10,000 bank customers across three branches, finding who leaves, how much money leaves with them, and where retention effort pays back most.",
    tools: ["Excel", "PivotTables", "Map Chart", "Conditional Formatting"],
    thumb: "assets/projects/bank-churn/01-churn-dashboard.png",
    problem: "Prime Star Bank was losing about one customer in five, and management wanted to know why before spending on retention. They needed answers to several questions. Which branches, age groups and genders churn most? Do credit score, tenure or account balance predict who leaves? And how much of the deposit base walks out of the door with churned customers?",
    data: {
      source: "Data analytics course dataset (Prime Star Bank case study)",
      size: "10,000 customers · 3 branches",
      period: "Single snapshot",
      notes: "There are two tables: <em>Customer Record</em> (customer ID, credit score, branch, gender, age, tenure and balance) and <em>Churn Record</em> (customer ID and whether they exited). I linked them on customer ID, found no duplicate or missing IDs, and added banded fields for credit score, age, tenure and balance to compare churn rates across groups."
    },
    approach: [
      "<strong>Model:</strong> joined the customer and churn tables on CustomerId and checked that every one of the 10,000 customers matched exactly once.",
      "<strong>Segment:</strong> added bands for age (10-year), tenure (<1 to 10 years), credit score (100-point) and balance (₦50K bands), so churn could be compared as a <em>rate</em> within each group rather than as a raw count.",
      "<strong>Analyse:</strong> built PivotTables of total customers, churned customers and churn rate for each dimension, with red-to-green conditional formatting to highlight hot spots.",
      "<strong>Design:</strong> a dark-themed one-page churn report with KPI cards, a filled map of churn by branch, and churn-rate charts by age, gender, tenure, credit score and balance."
    ],
    insights: [
      { value: "20.4%", text: "overall churn: 2,037 of 10,000 customers left. Customers who left took <strong>₦185.6M</strong> in deposits with them, about <strong>24%</strong> of the bank's total balances." },
      { value: "32%", text: "churn at the <strong>Ebonyi</strong> branch, double Anambra (16%) and Enugu (17%). Ebonyi holds 25% of customers but accounts for 40% of all churn." },
      { value: "56%", text: "of customers aged <strong>51–60</strong> left, compared with 8% of those aged 21–30. Customers aged 41–60 make up 31% of the base but 61% of all churn. Among women aged 51–60, churn reaches <strong>65%</strong>." },
      { value: "25% vs 16%", text: "Women churn at a markedly higher rate than men, and the gap holds in every branch and every age group." },
      { value: "No signal", text: "Credit score and tenure barely change churn (18–23% across almost every band), so they aren't the drivers. Account balance is: customers with money in the bank leave at 24%, compared with 14% of zero-balance customers." }
    ],
    recommendations: [
      "<strong>Fix Ebonyi first:</strong> run a branch-level review (service quality, competition, staffing) and exit interviews there. Bringing its churn down to the other branches' 16–17% would retain about 400 customers.",
      "<strong>Build a 41–60 retention programme:</strong> offer relationship-manager coverage, retirement and investment products, and proactive check-ins for customers approaching or in their fifties. This is the bank's highest-value, highest-risk segment.",
      "<strong>Understand why women leave:</strong> research product fit, service experience and competitor offers for female customers, especially women over 40.",
      "<strong>Protect funded accounts:</strong> set up an early-warning trigger for customers with a balance who reduce activity. They carry the deposit base, and they are nearly twice as likely to leave as zero-balance customers.",
      "<strong>Don't over-read tiny segments:</strong> the 100% churn bars (19 customers with credit scores under 400, and 1 customer above ₦250K) rest on very few people. Label sample sizes on the dashboard."
    ],
    gallery: [
      { src: "assets/projects/bank-churn/01-churn-dashboard.png", caption: "Prime Star Bank Customer Churn Report: KPI cards, churn rate by branch (map and bars), age range, gender, tenure, credit score and balance range." }
    ],
    links: {}
  },
  {
    slug: "hospital-disease",
    title: "Hospital Infectious & Non-Infectious Disease Analytics",
    domain: "Healthcare",
    summary: "Patient-case analysis comparing infectious and non-infectious disease trends to support clinical planning and resource allocation.",
    tools: ["Power BI", "Power Query", "DAX"],
    thumb: "assets/projects/hospital-disease/01-dashboard-2024.png",
    problem: "WellLife General Hospital's admissions grew every year from 2021 to 2024, but management had no structured view of what was driving the growth. They didn't know which diseases were rising, which patient groups were most affected, or where to put beds, staff and medicines. Some units were overstretched while others sat underused. Leadership needed a dashboard that could show diagnosis, gender, age and seasonal patterns at a glance.",
    data: {
      source: "WellLife General Hospital patient records (training dataset)",
      size: "10,000 admissions · 7 diagnoses",
      period: "Jan 2021 – Dec 2024",
      notes: "Each record has patient ID, name, age, diagnosis, gender and admission date. Before analysis I fixed inconsistent diagnosis labels (<em>ASTHMA</em>, <em>Ulcers</em>, <em>Ulc</em>, <em>Typhoid</em> with a trailing space) and a gender typo (<em>Mala</em>), handled blank age and gender values, and grouped the 7 diagnoses into <strong>Chronic</strong> (asthma, diabetes, hypertension, stroke, ulcer) and <strong>Infectious</strong> (malaria, typhoid)."
    },
    approach: [
      "<strong>Clean (Power Query):</strong> standardised diagnosis and gender labels, trimmed stray spaces, set data types, and flagged blank values so they didn't distort averages.",
      "<strong>Enrich:</strong> added 10-year age bands (11–20 up to 71–80), a Chronic/Infectious diagnosis group, and a date table for year, quarter and month analysis.",
      "<strong>Measure (DAX):</strong> Total Patients, Average Age, Diagnosis Count and Days Count, all responding to year, diagnosis group and diagnosis filters.",
      "<strong>Design:</strong> a one-page hospital dashboard with KPI cards, a monthly trend split by diagnosis group, and breakdowns by diagnosis, gender and age range. Diagnosis and year buttons let leadership drill down in one click."
    ],
    insights: [
      { value: "2.3×", text: "growth in admissions: from 1,409 in 2021 to 3,266 in 2024. Demand more than doubled in four years." },
      { value: "51% → 12%", text: "The infectious-disease share of admissions fell sharply. Chronic cases rose from 683 to 2,877 a year, and in 2024 <strong>stroke</strong> became the top diagnosis." },
      { value: "39 → 48", text: "The average patient age rose from 39 to 48. Every patient over 40 was admitted for a chronic condition, while malaria and typhoid mainly affected people aged 18–40." },
      { value: "~2 : 1", text: "More men than women were admitted for stroke (951 vs 439), diabetes (922 vs 485) and ulcer (940 vs 499). Men make up 57% of all admissions." },
      { value: "Jul 2024", text: "is the last month with any malaria or typhoid admission recorded. Part of the \"decline\" in infectious disease may be a gap in record-keeping rather than a real drop, and that needs checking." }
    ],
    recommendations: [
      "<strong>Shift capacity toward chronic care:</strong> chronic admissions now run at about 700+ per quarter. Add specialist staff, beds and outpatient follow-up for stroke, diabetes and hypertension.",
      "<strong>Plan steady capacity for chronic care:</strong> chronic cases don't peak by season. They stay flat within each year and step up every year, so staff and stock should grow year on year rather than be planned around seasonal surges.",
      "<strong>Target screening at men over 40:</strong> run workplace and community check-ups for blood pressure, glucose and stroke risk, where the male burden is heaviest.",
      "<strong>Check the records before cutting malaria and typhoid capacity:</strong> confirm whether the missing infectious admissions after July 2024 are real, or whether a recording or coding change caused them.",
      "<strong>Age-based care pathways:</strong> focus on preventing infectious disease for under-40s, and on chronic-disease screening and long-term management for patients over 40."
    ],
    gallery: [
      { src: "assets/projects/hospital-disease/01-dashboard-2024.png", caption: "Main dashboard: KPIs, monthly trend by diagnosis group, and breakdowns by diagnosis, gender and age range (2024 selected)." },
      { src: "assets/projects/hospital-disease/02-overview-2021-2024.png", caption: "2021–2024 overview: admissions by year, diagnosis, gender, age range and diagnosis group." }
    ],
    links: {}
  },
  {
    slug: "laptop-sales",
    title: "Laptop Sales Analytics",
    domain: "Retail",
    summary: "Revenue analysis of laptop sales across three branches, eleven sales agents and five brands, showing where revenue really comes from and how it moves through the year.",
    tools: ["Power BI", "Excel"],
    thumb: "assets/projects/laptop-sales/01-revenue-dashboard.png",
    problem: "Stellar Electronics Ltd. sells laptops (Apple, Dell, HP, Lenovo and Compaq) through three branches in Port Harcourt: Woji, GRA and Town. Management had no consolidated view of revenue. They didn't know which branches, sales agents and brands were really driving it, how pricing affected revenue, or how sales moved across years, quarters and months. They needed a dashboard to set targets, allocate stock and manage the sales team.",
    data: {
      source: "Stellar Electronics sales records (training case study)",
      size: "43 transactions · 712 units",
      period: "Jan 2023 – Dec 2024",
      notes: "Each record has date, branch, sales agent, brand, unit price (USD) and units sold. I calculated revenue as price × units and built a date hierarchy for year, quarter and month analysis. With about two transactions a month, monthly figures are noisy, so the analysis focuses on quarters and years for trends."
    },
    approach: [
      "<strong>Prepare (Excel / Power Query):</strong> checked the labels for branch, agent and brand, set data types, and added a Revenue column (unit price × units).",
      "<strong>Measure:</strong> Total Revenue, Total Units, Average Unit Price and revenue share. I also compared the simple average unit price ($840) with the revenue-weighted price per unit sold ($850).",
      "<strong>Answer the seven business questions:</strong> revenue by branch, sales agent and brand, and trends by year, quarter and month.",
      "<strong>Design:</strong> a one-page revenue dashboard with KPI cards, ranked bar charts for branches, agents and brands, and a time-series trend with year, quarter and month drill-down.",
      "<strong>Second design:</strong> rebuilt the same analysis as a light-themed \"Computer Store\" dashboard with branch, year and sales-agent slicers, to show two different visual styles on the same data."
    ],
    insights: [
      { value: "$604.9K", text: "total revenue from 712 laptops, with an average unit price of $840. Revenue grew <strong>13%</strong> in 2024 even though units <em>fell</em> 6%, because the product mix moved toward higher-priced models." },
      { value: "49%", text: "of revenue comes from <strong>HP</strong> alone ($294.8K). Apple is the most expensive brand at $1,500 but sold only 35 units (8.7%), while Compaq moved 121 units yet earned just 10.4%." },
      { value: "57%", text: "of revenue comes from the <strong>Woji</strong> branch, but it has six agents. GRA's three agents earn more per head (≈$61.6K vs $57.1K), and Town trails at ≈$38.7K per agent." },
      { value: "45%", text: "of revenue comes from the top three agents (Emeka, Chioma and Tolu). Chioma earned $93.7K from just three deals, the largest average deal size, while the bottom two agents together brought in only 5%." },
      { value: "Q4", text: "was the strongest quarter in both years. The second half of the year delivered 56% of 2023 revenue and 60% of 2024 revenue, a clear year-end buying season." }
    ],
    recommendations: [
      "<strong>Protect the HP line, and reduce dependence on it:</strong> keep HP well stocked and supported by the supplier, and grow Dell and Lenovo so that half the business doesn't depend on one brand.",
      "<strong>Rethink the Apple and Compaq strategy:</strong> Apple needs targeted premium selling (corporate and professional buyers), and Compaq's high volume and low value suit bundles or entry-level promotions.",
      "<strong>Balance the sales team across branches:</strong> review Woji's six-agent structure against GRA's higher output per agent, and set agent-level targets with coaching for the two lowest performers.",
      "<strong>Plan for the second half:</strong> build stock and run campaigns ahead of Q3–Q4, and use Q1–Q2 for corporate deals and promotions to smooth revenue across the year."
    ],
    gallery: [
      { src: "assets/projects/laptop-sales/01-revenue-dashboard.png", caption: "Revenue Analysis Dashboard: total revenue, average unit price, units sold and agent count, with revenue by brand, branch, sales agent and a daily revenue trend (2023–2024)." },
      { src: "assets/projects/laptop-sales/02-computer-store-dashboard.png", caption: "Alternative design (\"The Computer Store\"): the same data in a light theme, with branch, year and sales-agent slicers and a quarterly revenue trend showing the Q4 peaks." }
    ],
    links: {}
  },
  {
    slug: "toyota-used-vehicles",
    title: "Used Toyota Vehicle Market Analysis",
    domain: "Automotive",
    summary: "Analysis of 6,738 used Toyota vehicles by model, price band, transmission, fuel type, year, mileage and fuel efficiency, to guide a dealer's stock mix and pricing.",
    tools: ["Power BI", "Excel", "PowerPoint"],
    thumb: "assets/projects/toyota-used-vehicles/01-dashboard.png",
    problem: "A used-car dealer (branded <em>Manny Autos</em> in the dashboard) wanted to know what the used-Toyota market really looks like before deciding what to stock. They needed to know which models dominate, which price bands move, whether buyers still prefer manual and petrol, how fast hybrids and automatics are growing, and how vehicle age, mileage and fuel efficiency shape the market.",
    data: {
      source: "Used Toyota vehicle listings (public dataset)",
      size: "6,738 vehicles · 18 models",
      period: "Vehicle years 1996 – 2020",
      notes: "Each record has model, year, price, transmission, mileage, fuel type, road tax, fuel economy (MPG) and engine size. I grouped the continuous fields into bands for analysis: price (four $10K bands, in USD), mileage (20,000-mile bands), MPG, road tax and 5-year vehicle-age groups."
    },
    approach: [
      "<strong>Segment:</strong> created price, mileage, MPG, tax and year-group bands so that 6,738 individual listings could be compared as market segments.",
      "<strong>Build the dashboard (Power BI):</strong> a main page with the vehicle count, the number of models, and breakdowns by price, transmission, fuel type and model. MPG-group, tax-group and year-group slicers let a buyer or manager filter the market in one click.",
      "<strong>Rank and flag:</strong> an analysis page with conditional-formatted tables (heatmaps and icon sets) ranking every model, price band, mileage band, engine size and tax group.",
      "<strong>Cross-tabulate (Excel):</strong> built fact tables of price band × transmission × fuel type for each MPG group, tax group and vehicle-year group to find how the segments overlap.",
      "<strong>Tell the story:</strong> turned the findings into a 24-slide insight report covering facts, strategic insights, recommendations and expected outcomes."
    ],
    insights: [
      { value: "61%", text: "of the market is just two models: <strong>Yaris</strong> (2,122) and <strong>Aygo</strong> (1,961). The other 16 models share the remaining 39%, and six of them have fewer than 20 vehicles each." },
      { value: "87%", text: "of vehicles are priced below $20K. Only 90 vehicles (1.3%) sit in the top $30–40K band, so this is a value-driven, price-sensitive market." },
      { value: "57 / 39", text: "Manual vs automatic share. Manual still leads (3,826 vs 2,657), and petrol dominates at 61%. Budget buyers want low running and maintenance costs." },
      { value: "30%", text: "of vehicles are hybrids (2,043), and 99% of those are from 2011 or later. Hybrids have grown from a niche into a major segment in just ten years." },
      { value: "81%", text: "of vehicles are from 2016–2020, and 85% have under 40,000 miles. Almost every vehicle priced above $20K (98%) is from the 2016–2020 group." }
    ],
    recommendations: [
      "<strong>Stock around the core:</strong> prioritise 2011–2020 Yaris, Aygo and Auris in the $10–30K bands, where volume and turnover are strongest. Treat low-volume models such as the IQ, Urban Cruiser and Verso-S as order-on-demand only.",
      "<strong>Sell three segments:</strong> <em>Value</em> (manual, petrol, affordable and durable), <em>Comfort</em> (automatic petrol for city drivers) and <em>Efficiency</em> (hybrids sold on fuel savings).",
      "<strong>Get ready for hybrids and automatics:</strong> invest in technician training, diagnostic tools and parts for hybrid and automatic systems before the segment grows further.",
      "<strong>Justify the higher price bands:</strong> use certification, warranties and refurbishment standards to support pricing above $20K, and avoid over-pricing in a market this price-sensitive."
    ],
    gallery: [
      { src: "assets/projects/toyota-used-vehicles/01-dashboard.png", caption: "Main dashboard: vehicle count, number of models, and breakdowns by price, transmission, fuel type and model, with MPG, tax and year-group slicers." },
      { src: "assets/projects/toyota-used-vehicles/02-market-overview.png", caption: "Market overview: vehicles by mileage, transmission, MPG, price, fuel type, year group and model." },
      { src: "assets/projects/toyota-used-vehicles/03-segment-tables.png", caption: "Segment tables: conditional-formatted rankings by mileage, price, tax group, model, transmission, MPG, fuel type, year group and engine size." }
    ],
    links: {}
  },
  {
    slug: "water-factory-business-case",
    title: "Business Case: Revamping a Water Production Factory",
    domain: "Operations",
    summary: "Three-year financial model and Power BI dashboard for reviving and expanding a packaged-water factory in Lagos: revenue, costs, EBITDA, margin and payback.",
    role: "Team project. Ebiere Mary Tobuyei (accountant and data analyst) wrote the business plan. I built the financial dataset and designed the Power BI dashboard that turns the plan into investor-ready numbers.",
    tools: ["Power BI", "DAX", "Excel"],
    thumb: "assets/projects/water-factory-business-case/01-business-analysis.png",
    problem: "A faith-based organisation in Lagos owned a packaged-water factory that was running well below its potential. Before committing capital to rehabilitate and expand it, the promoters and their strategic partner needed a clear, investor-ready view of the numbers. They wanted to know what the factory could earn over three years, what it would cost to run, how profitable it would be, and how quickly the investment would pay back.",
    data: {
      source: "Business revival and expansion proposal (September 2026)",
      size: "3-year model · sachet and bottled water",
      period: "Year 1 – Year 3 projections",
      notes: "I built the model from the proposal's planning assumptions: a blended unit price of ₦30, projected units sold per year, production cost, operating expenses, tax and amortisation. Capital investment totals ₦528M: ₦425M for distribution trucks, ₦70.8M for plant and water-treatment equipment, and ₦32.3M for set-up costs including ERP software."
    },
    approach: [
      "<strong>Structure the model (Excel):</strong> turned the proposal's assumptions into a clean year-by-year table of units sold, unit price, production cost, operating expense, tax and amortisation.",
      "<strong>Measure (DAX):</strong> gross revenue, gross profit, gross margin %, EBITDA, operating cash flow, and averages for operating expense and production cost.",
      "<strong>Design for investors:</strong> a two-page dashboard. The <em>Business Analysis</em> page shows revenue, profit and EBITDA, and the <em>Cost of Operations</em> page shows operating expense, cash flow, tax and amortisation. Year buttons let a reader move through the three-year plan.",
      "<strong>Check the story:</strong> compared the year-on-year trends (volume, unit cost and cash generation) to test whether the plan holds together as the factory scales."
    ],
    insights: [
      { value: "₦3.83bn", text: "projected gross revenue over three years, rising from ₦484M in Year 1 to ₦1.89bn in Year 3 as volume grows from 16.1M to 63.0M units (3.9×)." },
      { value: "82%", text: "gross margin: ₦3.12bn gross profit on ₦707M production cost. EBITDA reaches about ₦2.95bn after ₦166M of operating expenses." },
      { value: "₦7.87 → ₦4.61", text: "The production cost per unit falls 41% from Year 1 to Year 3. Production cost stays flat at ₦290M in Years 2 and 3 while output grows 30%." },
      { value: "~1.4 yrs", text: "payback on the ₦528M capital investment. Operating cash flow is about ₦220M in Year 1 and ₦774M in Year 2, so the investment is recovered during Year 2." },
      { value: "80%", text: "of the capital budget (₦425M) goes on ten distribution trucks, far more than on the factory itself. Logistics is the single biggest investment decision." }
    ],
    recommendations: [
      "<strong>Buy trucks in phases:</strong> start with the minimum fleet the Catholic institutional anchor market needs, and add trucks as route-level sales justify them. This cuts upfront capital and payback risk.",
      "<strong>Check the Year 3 cost assumption:</strong> 30% more output at the same production cost assumes spare capacity. Confirm it with the factory capacity audit before presenting the plan to investors.",
      "<strong>Stress-test price and volume:</strong> model the ₦30 unit price and the volume ramp at −10% and −20% to show investors the downside case, not just the plan.",
      "<strong>Track results against the plan monthly:</strong> once production restarts, monitor units, revenue by channel, unit cost and collection rate against the plan, so the dashboard becomes a working tool for managing the factory."
    ],
    gallery: [
      { src: "assets/projects/water-factory-business-case/01-business-analysis.png", caption: "Business Analysis: gross revenue, gross profit, production cost, gross margin and EBITDA by year." },
      { src: "assets/projects/water-factory-business-case/02-cost-of-operations.png", caption: "Cost of Operations: operating expense, operating cash flow, tax and amortisation by year." }
    ],
    links: {}
  },
  {
    slug: "automated-inventory",
    title: "Automated Inventory Management System",
    domain: "Operations",
    summary: "Design and set-up of an automated inventory tracker with stock-level alerts, reorder points and movement reporting.",
    tools: ["Excel", "Excel Tables", "VLOOKUP", "SUMIF", "FILTER", "PivotTables"],
    thumb: "assets/projects/automated-inventory/01-dashboard.png",
    problem: "A paint retail shop tracked its stock by hand. It had no single view of what was bought, what was sold, what was left, or what needed re-ordering. Stock-outs were noticed only when a customer asked for a product, and profit was a guess. The owner needed a simple system in a tool they already used, Excel, that updates itself as purchases and sales are entered.",
    data: {
      source: "Shop records set up as a working Excel system",
      size: "61 products · 10 customers · 17 vendor lines",
      period: "Test transactions, Sep 2026",
      notes: "The workbook has six linked Excel Tables: Products (the master list with cost and selling price), Customers, Vendors, Purchase, Sales and Inventory. Staff enter only a product code, customer ID and quantity. Everything else is looked up or calculated automatically. The figures below come from the test transactions used to prove the system works."
    },
    approach: [
      "<strong>Structured data model:</strong> built six Excel Tables linked by product code (P-Code) and customer ID, so formulas expand automatically as new rows are added.",
      "<strong>Automated data entry:</strong> in the Purchase and Sales sheets, <code>VLOOKUP</code> fills in product name, vendor, cost and selling price from the code alone. Drop-down lists (data validation) prevent typing errors.",
      "<strong>Live stock position:</strong> the Inventory sheet uses <code>SUMIF</code> to total units purchased and sold for each product, then calculates stock on hand and stock value at cost.",
      "<strong>Re-order alerts:</strong> any product with fewer than 10 units in stock gets a 📞 notification with the vendor's phone number. A dynamic <code>FILTER</code> formula brings all alerts together on the dashboard.",
      "<strong>Dashboard and navigation:</strong> KPI cards (customers, products, purchases, sales, stock value, profit/loss), PivotTable charts for the top 5 products and customers, and a clickable side menu that works like an app."
    ],
    insights: [
      { value: "₦17,000", text: "gross profit on ₦214,000 of test sales (7.9%). The system works it out automatically as sales + closing stock − purchases, with no manual count needed." },
      { value: "6.9–11%", text: "The markup on 20L emulsions is thin (₦1,000–₦1,500 per unit), and Brilliant White, the best seller, has the lowest markup. 4L lines earn 14%. Margin, not just volume, needs managing." },
      { value: "36%", text: "of sales came from one product (20L Brilliant White, ₦77,500), and 29% from one customer (Ewere Oduwa, ₦61,000). The dashboard makes this concentration visible straight away." },
      { value: "16 → 60", text: "low-stock products now get a re-order alert. Testing showed the original formula silently hid 44 products with no vendor record, because <code>IFERROR</code> wrapped the whole formula. I narrowed the error handling to just the vendor lookup, so every item is flagged and \"vendor not set\" appears where a supplier is missing." }
    ],
    recommendations: [
      "<strong>Complete the vendor records:</strong> the alert fix now shows which products have no supplier (\"vendor not set\"). Add vendor details for all 61 products so every alert includes a phone number to call.",
      "<strong>Set a re-order level for each product:</strong> replace the fixed \"under 10 units\" rule with a re-order point column based on each product's sales rate and supplier lead time.",
      "<strong>Chart stock units, not record counts:</strong> the Stock chart currently plots a count of entries (every bar = 1). Switch it to <em>Sum of Stock</em> so it shows real quantities.",
      "<strong>Protect the formulas and plan for growth:</strong> lock the calculated columns so staff can only type in input cells. As transaction volume grows, move the tables into Power Query and Power BI for trend reporting."
    ],
    gallery: [
      { src: "assets/projects/automated-inventory/01-dashboard.png", caption: "Dashboard: KPI cards, top 5 products and customers, stock value by product, and the full live list of re-order notifications." },
      { src: "assets/projects/automated-inventory/02-inventory.png", caption: "Inventory: units purchased and sold (SUMIF), stock on hand, stock value and the corrected re-order alerts, with \"vendor not set\" where a supplier is missing." },
      { src: "assets/projects/automated-inventory/03-purchase.png", caption: "Purchase: enter a product code and quantity, and product, vendor and cost are looked up automatically." },
      { src: "assets/projects/automated-inventory/04-sales.png", caption: "Sales: customer, product and selling price are pulled from the master tables, and the amount is calculated." },
      { src: "assets/projects/automated-inventory/05-products.png", caption: "Products: the master list of 61 paint and hardware lines with cost and selling price." }
    ],
    links: {}
  }
];

/* Projects marked draft: true stay hidden on the live site. */
const LIVE_PROJECTS = PROJECTS.filter(p => !p.draft);

/* Simple decorative chart thumbnails used until real screenshots are added.
   Each domain gets a slightly different chart shape. */
function projectThumbSVG(p, i) {
  const shapes = {
    Finance:    "bars",
    HR:         "line",
    Energy:     "area",
    Retail:     "bars",
    Healthcare: "line",
    Automotive: "scatter",
    Operations: "area"
  };
  const kind = shapes[p.domain] || "bars";
  const seed = (i + 3) * 7;
  const vals = Array.from({ length: 9 }, (_, k) => 30 + ((seed * (k + 5) * 13) % 55));
  let g = "";
  const grid = [40, 80, 120, 160].map(y => `<line x1="24" x2="376" y1="${y}" y2="${y}" stroke="#e3e8ef"/>`).join("");
  if (kind === "bars") {
    g = vals.map((v, k) => `<rect x="${34 + k * 38}" y="${190 - v * 2}" width="22" height="${v * 2}" rx="3" fill="${k === 5 ? "#c9a227" : "#1a3a6e"}" opacity="${k === 5 ? 1 : .85}"/>`).join("");
  } else if (kind === "line" || kind === "area") {
    const pts = vals.map((v, k) => `${34 + k * 42},${190 - v * 2}`).join(" ");
    if (kind === "area") g += `<polygon points="34,190 ${pts} ${34 + 8 * 42},190" fill="#c9a227" opacity=".14"/>`;
    g += `<polyline points="${pts}" fill="none" stroke="#c9a227" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    g += vals.map((v, k) => `<circle cx="${34 + k * 42}" cy="${190 - v * 2}" r="3.5" fill="#fff" stroke="#1a3a6e" stroke-width="2"/>`).join("");
  } else {
    g = Array.from({ length: 22 }, (_, k) => {
      const x = 40 + ((seed * (k + 2) * 17) % 320);
      const y = 40 + ((seed * (k + 7) * 11) % 140);
      return `<circle cx="${x}" cy="${y}" r="${4 + (k % 3) * 2}" fill="${k % 4 === 0 ? "#c9a227" : "#1a3a6e"}" opacity=".75"/>`;
    }).join("");
  }
  return `<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="225" fill="#f6f8fb"/>${grid}${g}</svg>`;
}
