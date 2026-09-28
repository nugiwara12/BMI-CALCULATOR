"use client";

import React, { useEffect, useState, useMemo } from "react";

const BODY_PARTS = {
  head: { name: "Head & Neck", icon: "🧠" },
  chest: { name: "Chest & Cardiovascular", icon: "🫀" },
  core: { name: "Abdomen & Visceral Core", icon: "🩺" },
  arms: { name: "Arms & Upper Extremities", icon: "💪" },
  legs: { name: "Legs & Lower Joints", icon: "🦵" },
};

const PHYSIOLOGY_DATA = {
  underweight: {
    head: {
      status: "Warning: Lipolytic & Microvascular Deficiency",
      color: "#2563EB",
      badge: "Low Density",
      description:
        "Loss of facial subcutaneous fat reserves, dry cutaneous tissue, hair thinning, and heightened susceptibility to temporal tension headaches and thermal dysregulation.",
      recommendation:
        "Incorporate essential fatty acids (Omega-3/6) and dense micronutrients to support neural microcirculation.",
    },
    chest: {
      status: "Warning: Decreased Cardiopulmonary Reserve",
      color: "#2563EB",
      badge: "Atrophy Risk",
      description:
        "Attenuated thoracic intercostal muscle mass. Lower overall stroke volume and reduced muscular endurance during prolonged cardiovascular exertion.",
      recommendation:
        "Engage in moderate-intensity cardiovascular conditioning alongside structured dietary caloric surplus.",
    },
    core: {
      status: "Critical: Depleted Visceral Fat Margin",
      color: "#2563EB",
      badge: "Organ Vulnerability",
      description:
        "Insufficient mesenteric fat padding surrounding intra-abdominal organs (kidneys, liver, intestines). Elevated risk of nephroptosis and gastrointestinal dysmotility.",
      recommendation:
        "Prioritize gradual lean tissue accumulation through complex carbohydrates and high-quality protein.",
    },
    arms: {
      status: "Warning: Reduced Lean Skeletal Muscle Mass",
      color: "#2563EB",
      badge: "Sarcopenia Risk",
      description:
        "Atrophied upper extremity lean tissue (deltoids, biceps, triceps) resulting in decreased isometric grip strength and reduced peripheral vascular flow.",
      recommendation:
        "Perform compound upper-body progressive resistance exercises 3 times weekly.",
    },
    legs: {
      status: "Warning: Decreased Bone Mineral Turnover",
      color: "#2563EB",
      badge: "Osteopenia Risk",
      description:
        "Inadequate mechanical weight-bearing loading on the femur and tibia leading to reduced osteoblast activity and early osteopenia markers.",
      recommendation:
        "Incorporate resistance training paired with Vitamin D3 and Calcium supplementation.",
    },
  },
  normal: {
    head: {
      status: "Optimal: Balanced Lipid & Cranial Homeostasis",
      color: "#059669",
      badge: "Healthy",
      description:
        "Optimal submental adipose distribution. Unobstructed upper airway pharyngeal lumen during sleep and normal cranial microvascular perfusion.",
      recommendation:
        "Sustain current metabolic equilibrium through consistent sleep hygiene and hydration.",
    },
    chest: {
      status: "Optimal: Cardiopulmonary Equilibrium",
      color: "#059669",
      badge: "Healthy",
      description:
        "Healthy pericardial fat margin. Balanced cardiac stroke output, standard systemic vascular resistance, and efficient pulmonary compliance.",
      recommendation:
        "Maintain 150 minutes of weekly aerobic physical activity across target heart rate zones.",
    },
    core: {
      status: "Optimal: Ideal Visceral Adipose Index",
      color: "#059669",
      badge: "Healthy",
      description:
        "Balanced ratio of subcutaneous to visceral abdominal fat. Minimal inflammatory cytokine expression surrounding vital hepatic and renal tissues.",
      recommendation:
        "Continue high-fiber diet (&gt;30g/day) to sustain gastrointestinal microbiome integrity.",
    },
    arms: {
      status: "Optimal: Balanced Musculoskeletal Composition",
      color: "#059669",
      badge: "Healthy",
      description:
        "Preserved lean muscular tissue volume throughout deltoid and brachial flexor groups with efficient capillary diffusion.",
      recommendation:
        "Sustain balanced upper body resistance and functional mobility routines.",
    },
    legs: {
      status: "Optimal: Balanced Mechanical Force Loading",
      color: "#059669",
      badge: "Healthy",
      description:
        "Standard biomechanical load distribution across articular knee cartilage, hip acetabulum, and plantar fascia.",
      recommendation:
        "Preserve dynamic leg strength through varied cross-training and agility exercises.",
    },
  },
  overweight: {
    head: {
      status: "Caution: Submental Adipose Deposition",
      color: "#D97706",
      badge: "Elevated Risk",
      description:
        "Initial adipose accumulation surrounding pharyngeal walls and submental neck region. Mild increase in upper airway airflow resistance during REM sleep.",
      recommendation:
        "Monitor nocturnal sleep architecture and maintain neck circumference tracking.",
    },
    chest: {
      status: "Caution: Increased Myocardial Workload",
      color: "#D97706",
      badge: "Mild Strain",
      description:
        "Slightly elevated baseline cardiac workload due to expanded vascular beds. Early epicardial adipose accumulation.",
      recommendation:
        "Implement Zone 2 aerobic workouts to optimize metabolic flexibility and vascular tone.",
    },
    core: {
      status: "Caution: Subcutaneous & Early Visceral Accumulation",
      color: "#D97706",
      badge: "Metabolic Shift",
      description:
        "Expansion of deep abdominal subcutaneous fat and early visceral storage surrounding portal circulation, promoting mild insulin resistance.",
      recommendation:
        "Reduce simple glycemic carbs and increase soluble fiber intake.",
    },
    arms: {
      status: "Caution: Subcutaneous Adipose Storage",
      color: "#D97706",
      badge: "Adipose Storage",
      description:
        "Increased subcutaneous fat storage in the posterior brachial region (triceps). Mild reduction in relative strength-to-weight ratio.",
      recommendation:
        "Incorporate metabolic resistance circuits targeting upper body muscular endurance.",
    },
    legs: {
      status: "Caution: Increased Articular Cartilage Load",
      color: "#D97706",
      badge: "Joint Load",
      description:
        "Elevated ground reaction forces exerted on knee articular cartilage during gait cycles. Early patellofemoral pressure accumulation.",
      recommendation:
        "Utilize low-impact aerobic modalities (swimming, cycling) to reduce joint impact forces.",
    },
  },
  obese1: {
    head: {
      status: "High Risk: Airway Resistance & Sleep Disruption",
      color: "#DC2626",
      badge: "High Risk",
      description:
        "Marked pharyngeal fat deposition narrowing upper airway passageways. Significantly heightened incidence of Obstructive Sleep Apnea (OSA) and fatigue.",
      recommendation:
        "Consider clinical sleep study assessment and upper airway patency review.",
    },
    chest: {
      status: "High Risk: Elevated Pericardial & Cardiac Strain",
      color: "#DC2626",
      badge: "Cardiac Load",
      description:
        "Accumulation of epicardial and pericardial fat pads interfering with ventricular compliance. Elevated left ventricular myocardial mass index.",
      recommendation:
        "Consult cardiology for baseline resting ECG and routine blood pressure monitoring.",
    },
    core: {
      status: "High Risk: Elevated Visceral Adiposity",
      color: "#DC2626",
      badge: "Metabolic Strain",
      description:
        "Substantial visceral fat surrounding internal organs. Chronic low-grade systemic inflammation (TNF-alpha, IL-6), non-alcoholic hepatic steatosis risk.",
      recommendation:
        "Target a controlled 500 kcal daily deficit with daily fasting windows under medical guidance.",
    },
    arms: {
      status: "High Risk: Heavy Adipose Weight Bearing",
      color: "#DC2626",
      badge: "Mobility Impaired",
      description:
        "Prominent subcutaneous fat accumulation restricting full brachial range of motion. Increased cutaneous fold moisture and friction.",
      recommendation:
        "Focus on upper body joint mobility exercises and gentle resistance work.",
    },
    legs: {
      status: "High Risk: Knee Cartilage Compression",
      color: "#DC2626",
      badge: "Articular Wear",
      description:
        "Significantly heightened mechanical forces on tibiofemoral and patellofemoral joint cartilage (4x load multiplier per excess unit weight).",
      recommendation:
        "Prioritize non-weight-bearing physical therapy exercises to protect knee structures.",
    },
  },
  obese2: {
    head: {
      status: "Severe Risk: Critical Airway Narrowing & Hypoxia",
      color: "#B91C1C",
      badge: "Severe OSA",
      description:
        "Severe structural compression of upper respiratory pathways causing nocturnal desaturation episodes, systemic arterial hypertension, and morning cephalalgia.",
      recommendation:
        "Immediate consultation with a sleep specialist for CPAP or airway therapeutic intervention.",
    },
    chest: {
      status: "Severe Risk: Left Ventricular & Thoracic Compression",
      color: "#B91C1C",
      badge: "Cardiomegaly Risk",
      description:
        "Restricted thoracic wall compliance limiting total lung capacity. Substantial workload required for systemic perfusion, raising diastolic dysfunction risk.",
      recommendation:
        "Comprehensive cardiopulmonary examination and guided therapeutic weight reduction program.",
    },
    core: {
      status: "Severe Risk: Advanced Visceral Steatosis",
      color: "#B91C1C",
      badge: "Visceral Steatosis",
      description:
        "Massive visceral adiposity elevating intra-abdominal pressure and displacing diaphragm upward. High risk for NASH, Type 2 Diabetes, and metabolic syndrome.",
      recommendation:
        "Multidisciplinary medical management involving endocrinology and dietary intervention.",
    },
    arms: {
      status: "Severe Risk: Lymphatic & Peripheral Microvascular Stasis",
      color: "#B91C1C",
      badge: "Microcirculation Risk",
      description:
        "Adipose volume compressing subcutaneous lymphatic pathways, predisposing to localized fluid retention and restricted glenohumeral joint abduction.",
      recommendation:
        "Perform manual lymphatic drainage exercises and supervised arm mobility routines.",
    },
    legs: {
      status: "Severe Risk: Accelerated Joint Degeneration",
      color: "#B91C1C",
      badge: "Osteoarthritis",
      description:
        "Severe structural overload on knee and hip joints causing rapid loss of cartilage height, subchondral sclerosis, varus alignment shift, and venous stasis.",
      recommendation:
        "Orthopedic evaluation for joint preservation strategies and structured hydrotherapy.",
    },
  },
};

export default function App() {
  // Biometric Inputs State
  const [gender, setGender] = useState("male");
  const [unitSystem, setUnitSystem] = useState("metric");
  const [patientName, setPatientName] = useState("Alex Morgan");
  const [patientId, setPatientId] = useState("");
  const [age, setAge] = useState(32);
  const [waistCm, setWaistCm] = useState(86);
  const [neckCm, setNeckCm] = useState(38);
  const [hipCm, setHipCm] = useState(98);
  const [activityLevel, setActivityLevel] = useState(1.375);

  // Metric State
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(74);

  // Imperial State
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weightLbs, setWeightLbs] = useState(163.1);

  // UI Active State
  const [viewAngle, setViewAngle] = useState("front");
  const [selectedPart, setSelectedPart] = useState("core");
  const [hoveredPart, setHoveredPart] = useState(null);
  const [activeTab, setActiveTab] = useState("visualizer");
  const [darkMode, setDarkMode] = useState(false);

  const handleMetricHeightChange = (val) => {
    setHeightCm(val);
    const totalInches = val / 2.54;
    setHeightFeet(Math.floor(totalInches / 12));
    setHeightInches(Math.round(totalInches % 12));
  };

  const handleMetricWeightChange = (val) => {
    setWeightKg(val);
    setWeightLbs(parseFloat((val * 2.20462).toFixed(1)));
  };

  const handleImperialHeightChange = (ft, inch) => {
    setHeightFeet(ft);
    setHeightInches(inch);
    const totalInches = ft * 12 + inch;
    setHeightCm(Math.round(totalInches * 2.54));
  };

  const handleImperialWeightChange = (lbs) => {
    setWeightLbs(lbs);
    setWeightKg(parseFloat((lbs / 2.20462).toFixed(1)));
  };

  const calculations = useMemo(() => {
    const heightM = heightCm / 100;
    const bmiVal = heightM > 0 ? weightKg / (heightM * heightM) : 0;
    const bmi = parseFloat(bmiVal.toFixed(1));

    let tierKey = "normal";
    let category = "Normal Weight";
    let categoryColor = "#059669";
    let badgeClass = darkMode
      ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50"
      : "bg-emerald-100 text-emerald-900 border-emerald-400 font-bold";

    if (bmi < 18.5) {
      tierKey = "underweight";
      category = "Underweight";
      categoryColor = "#2563EB";
      badgeClass = darkMode
        ? "bg-blue-950/80 text-blue-300 border-blue-500/50"
        : "bg-blue-100 text-blue-900 border-blue-400 font-bold";
    } else if (bmi <= 24.9) {
      tierKey = "normal";
      category = "Normal Weight";
      categoryColor = "#059669";
      badgeClass = darkMode
        ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50"
        : "bg-emerald-100 text-emerald-900 border-emerald-400 font-bold";
    } else if (bmi <= 29.9) {
      tierKey = "overweight";
      category = "Overweight";
      categoryColor = "#D97706";
      badgeClass = darkMode
        ? "bg-amber-950/80 text-amber-300 border-amber-500/50"
        : "bg-amber-100 text-amber-900 border-amber-400 font-bold";
    } else if (bmi <= 34.9) {
      tierKey = "obese1";
      category = "Obese Class I";
      categoryColor = "#DC2626";
      badgeClass = darkMode
        ? "bg-rose-950/80 text-rose-300 border-rose-500/50"
        : "bg-rose-100 text-rose-900 border-rose-400 font-bold";
    } else {
      tierKey = "obese2";
      category = "Obese Class II+";
      categoryColor = "#B91C1C";
      badgeClass = darkMode
        ? "bg-red-950/80 text-red-300 border-red-500/50"
        : "bg-red-100 text-red-900 border-red-400 font-bold";
    }

    const minHealthyKg = (18.5 * heightM * heightM).toFixed(1);
    const maxHealthyKg = (24.9 * heightM * heightM).toFixed(1);
    const minHealthyLbs = (minHealthyKg * 2.20462).toFixed(1);
    const maxHealthyLbs = (maxHealthyKg * 2.20462).toFixed(1);

    // Mifflin-St Jeor BMR Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
    bmr = Math.round(bmr);
    const tdee = Math.round(bmr * activityLevel);

    // US Navy Body Fat % Formula
    let bodyFatPercent = 0;
    try {
      if (gender === "male") {
        bodyFatPercent =
          495 /
            (1.0324 -
              0.19077 * Math.log10(waistCm - neckCm) +
              0.15456 * Math.log10(heightCm)) -
          450;
      } else {
        bodyFatPercent =
          495 /
            (1.29579 -
              0.35004 * Math.log10(waistCm + hipCm - neckCm) +
              0.221 * Math.log10(heightCm)) -
          450;
      }
      if (isNaN(bodyFatPercent) || bodyFatPercent < 3) bodyFatPercent = 14.5;
      if (bodyFatPercent > 60) bodyFatPercent = 48.0;
    } catch {
      bodyFatPercent = 18.0;
    }

    return {
      bmi,
      tierKey,
      category,
      categoryColor,
      badgeClass,
      minHealthyKg,
      maxHealthyKg,
      minHealthyLbs,
      maxHealthyLbs,
      bmr,
      tdee,
      bodyFatPercent: parseFloat(bodyFatPercent.toFixed(1)),
    };
  }, [
    heightCm,
    weightKg,
    age,
    gender,
    waistCm,
    neckCm,
    hipCm,
    activityLevel,
    darkMode,
  ]);

  const activePartKey = hoveredPart || selectedPart;
  const currentPartInfo = PHYSIOLOGY_DATA[calculations.tierKey][activePartKey];

  const bodyMorphScale = useMemo(() => {
    const bmi = calculations.bmi;
    let widthMultiplier = 1;
    let chestWidth = 1;
    let bellyWidth = 1;
    let legWidth = 1;

    if (bmi < 18.5) {
      widthMultiplier = 0.84;
      chestWidth = 0.86;
      bellyWidth = 0.8;
      legWidth = 0.84;
    } else if (bmi <= 24.9) {
      widthMultiplier = 1.0;
      chestWidth = 1.0;
      bellyWidth = 1.0;
      legWidth = 1.0;
    } else if (bmi <= 29.9) {
      widthMultiplier = 1.16;
      chestWidth = 1.14;
      bellyWidth = 1.24;
      legWidth = 1.12;
    } else if (bmi <= 34.9) {
      widthMultiplier = 1.34;
      chestWidth = 1.28;
      bellyWidth = 1.48;
      legWidth = 1.26;
    } else {
      widthMultiplier = 1.54;
      chestWidth = 1.4;
      bellyWidth = 1.76;
      legWidth = 1.42;
    }

    return { widthMultiplier, chestWidth, bellyWidth, legWidth };
  }, [calculations.bmi]);

  const themeClasses = {
    bg: darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900",
    headerBg: darkMode
      ? "bg-slate-900/90 border-slate-800"
      : "bg-white/95 border-slate-200 shadow-sm",
    cardBg: darkMode
      ? "bg-slate-900 border-slate-800 text-slate-100"
      : "bg-white border-slate-200 text-slate-900 shadow-sm",
    subCardBg: darkMode
      ? "bg-slate-800/60 border-slate-700/60"
      : "bg-slate-100/80 border-slate-200",
    textPrimary: darkMode ? "text-slate-100" : "text-slate-900",
    textSecondary: darkMode ? "text-slate-300" : "text-slate-800",
    textMuted: darkMode ? "text-slate-400" : "text-slate-600",
    label: darkMode
      ? "text-slate-300 font-bold"
      : "text-slate-900 font-extrabold",
    inputBg: darkMode
      ? "bg-slate-800 border-slate-700 text-slate-100"
      : "bg-white border-slate-300 text-slate-900 font-bold",
    accentBorder: darkMode ? "border-slate-800" : "border-slate-200",
  };

  useEffect(() => {
    const generatePatientId = () => {
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      return `PX-${randomNumber}`;
    };

    setPatientId(generatePatientId());
  }, []);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${themeClasses.bg}`}>
      {/* 
        PRINT STYLES - Hides all interactive UI and renders ONLY the Medical Report Sheet
      */}
      <style>{`
        @media print {
          /* Hide non-printable UI elements */
          .no-print, header, nav, button, input, select, .screen-only-section {
            display: none !important;
          }

          /* Reset background and page margin for printing */
          body, html, #root, div {
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            border-color: #cbd5e1 !important;
          }

          @page {
            size: A4 portrait;
            margin: 12mm;
          }

          /* Force printable sheet to occupy full printable area */
          .printable-report-sheet {
            display: block !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            font-size: 12pt !important;
          }

          .print-card {
            border: 1px solid #94a3b8 !important;
            background: #ffffff !important;
            page-break-inside: avoid;
          }
        }

        /* Screen mode default for printable sheet */
        .printable-report-sheet {
          display: none;
        }
      `}</style>

      {/* HEADER NAVBAR (NO-PRINT) */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors no-print ${themeClasses.headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
              🧬
            </div>
            <div>
              <h1
                className={`font-black text-lg leading-tight tracking-tight ${themeClasses.textPrimary}`}>
                ANATOMI-BMI
              </h1>
              <p className={`text-xs font-bold ${themeClasses.textMuted}`}>
                Anatomical Body Analysis & Clinical Risk Mapper
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            className={`hidden md:flex items-center gap-1 p-1 rounded-xl border ${darkMode ? "bg-slate-800/80 border-slate-700" : "bg-slate-200/70 border-slate-300"}`}>
            <button
              onClick={() => setActiveTab("visualizer")}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                activeTab === "visualizer"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
              }`}>
              📐 3D/SVG Body Visualizer
            </button>
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                activeTab === "recommendations"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
              }`}>
              🩺 Medical Guidance
            </button>
            <button
              onClick={() => setActiveTab("ticket")}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                activeTab === "ticket"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`
              }`}>
              📄 Printable Medical Sheet
            </button>
          </div>

          {/* Print Trigger & Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5 hidden">
              🖨️ Print / Save PDF
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border text-xs font-black transition-all ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm"
              }`}
              title="Toggle Theme">
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div
          className={`md:hidden flex border-t justify-around text-xs font-bold py-2 ${darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
          <button
            onClick={() => setActiveTab("visualizer")}
            className={`px-3 py-1 rounded-md ${activeTab === "visualizer" ? "bg-indigo-600 text-white font-bold" : themeClasses.textSecondary}`}>
            Visualizer
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`px-3 py-1 rounded-md ${activeTab === "recommendations" ? "bg-indigo-600 text-white font-bold" : themeClasses.textSecondary}`}>
            Guidance
          </button>
          <button
            onClick={() => setActiveTab("ticket")}
            className={`px-3 py-1 rounded-md ${activeTab === "ticket" ? "bg-indigo-600 text-white font-bold" : themeClasses.textSecondary}`}>
            Report Sheet
          </button>
        </div>
      </header>

      {/* MAIN SCREEN INTERACTIVE DASHBOARD (NO-PRINT) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 screen-only-section">
        {/* ========================================== */}
        {/* TAB 1: VISUALIZER DASHBOARD               */}
        {/* ========================================== */}
        {activeTab === "visualizer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT INPUTS PANEL */}
            <div
              className={`lg:col-span-4 p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-5 ${themeClasses.cardBg}`}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className={`font-black text-xs uppercase tracking-wider flex items-center gap-2 ${themeClasses.textMuted}`}>
                    <span>🎛️</span> Biometric Inputs
                  </h2>

                  {/* Unit System Switch */}
                  <div
                    className={`flex p-1 rounded-lg border text-xs ${darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"}`}>
                    <button
                      onClick={() => setUnitSystem("metric")}
                      className={`px-3 py-1 rounded-md font-extrabold transition-all ${
                        unitSystem === "metric"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : themeClasses.textMuted
                      }`}>
                      Metric
                    </button>
                    <button
                      onClick={() => setUnitSystem("imperial")}
                      className={`px-3 py-1 rounded-md font-extrabold transition-all ${
                        unitSystem === "imperial"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : themeClasses.textMuted
                      }`}>
                      Imperial
                    </button>
                  </div>
                </div>

                {/* Patient Name & ID Inputs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label
                      className={`text-[11px] uppercase block mb-1 ${themeClasses.label}`}>
                      Patient Name
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.inputBg}`}
                    />
                  </div>
                  <div>
                    <label
                      className={`text-[11px] uppercase block mb-1 ${themeClasses.label}`}>
                      Record ID
                    </label>
                    <input
                      type="text"
                      value={patientId}
                      disabled
                      onChange={(e) => setPatientId(e.target.value)}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-xs border cursor-not-allowed ${themeClasses.inputBg}`}
                    />
                  </div>
                </div>

                {/* Gender Selector */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setGender("male")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-black text-xs transition-all ${
                      gender === "male"
                        ? darkMode
                          ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-sm"
                          : "bg-cyan-100 border-cyan-600 text-cyan-950 font-black shadow-sm"
                        : `${themeClasses.subCardBg} ${themeClasses.textSecondary}`
                    }`}>
                    <span className="text-base">👨</span> Male Model
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-black text-xs transition-all ${
                      gender === "female"
                        ? darkMode
                          ? "bg-pink-950/80 border-pink-500 text-pink-300 shadow-sm"
                          : "bg-pink-100 border-pink-600 text-pink-950 font-black shadow-sm"
                        : `${themeClasses.subCardBg} ${themeClasses.textSecondary}`
                    }`}>
                    <span className="text-base">👩</span> Female Model
                  </button>
                </div>

                {/* Age & Activity Level */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label
                      className={`text-[11px] uppercase mb-1 block ${themeClasses.label}`}>
                      Age (Years)
                    </label>
                    <input
                      type="number"
                      min="12"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.inputBg}`}
                    />
                  </div>
                  <div>
                    <label
                      className={`text-[11px] uppercase mb-1 block ${themeClasses.label}`}>
                      Activity Factor
                    </label>
                    <select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(Number(e.target.value))}
                      className={`w-full px-2 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.inputBg}`}>
                      <option value={1.2}>Sedentary (1.2x)</option>
                      <option value={1.375}>Lightly Active (1.375x)</option>
                      <option value={1.55}>Moderately Active (1.55x)</option>
                      <option value={1.725}>Very Active (1.725x)</option>
                    </select>
                  </div>
                </div>

                {/* Height Controls */}
                <div
                  className={`space-y-3 mb-4 p-3.5 rounded-xl border ${themeClasses.subCardBg}`}>
                  {unitSystem === "metric" ? (
                    <div>
                      <div className="flex justify-between items-center text-xs font-black mb-1">
                        <span className={themeClasses.textSecondary}>
                          Height
                        </span>
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm font-black">
                          {heightCm} cm
                        </span>
                      </div>
                      <input
                        type="range"
                        min="130"
                        max="220"
                        value={heightCm}
                        onChange={(e) =>
                          handleMetricHeightChange(Number(e.target.value))
                        }
                        className="w-full accent-indigo-600 cursor-pointer h-2 rounded-lg bg-slate-300 dark:bg-slate-700"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center text-xs font-black mb-1">
                        <span className={themeClasses.textSecondary}>
                          Height
                        </span>
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm font-black">
                          {heightFeet} ft {heightInches} in ({heightCm} cm)
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <input
                          type="number"
                          min="3"
                          max="7"
                          value={heightFeet}
                          onChange={(e) =>
                            handleImperialHeightChange(
                              Number(e.target.value),
                              heightInches,
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs border ${themeClasses.inputBg}`}
                          placeholder="Feet"
                        />
                        <input
                          type="number"
                          min="0"
                          max="11"
                          value={heightInches}
                          onChange={(e) =>
                            handleImperialHeightChange(
                              heightFeet,
                              Number(e.target.value),
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs border ${themeClasses.inputBg}`}
                          placeholder="Inches"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Weight Controls */}
                <div
                  className={`space-y-3 mb-4 p-3.5 rounded-xl border ${themeClasses.subCardBg}`}>
                  {unitSystem === "metric" ? (
                    <div>
                      <div className="flex justify-between items-center text-xs font-black mb-1">
                        <span className={themeClasses.textSecondary}>
                          Weight
                        </span>
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm font-black">
                          {weightKg} kg
                        </span>
                      </div>
                      <input
                        type="range"
                        min="35"
                        max="180"
                        value={weightKg}
                        onChange={(e) =>
                          handleMetricWeightChange(Number(e.target.value))
                        }
                        className="w-full accent-indigo-600 cursor-pointer h-2 rounded-lg bg-slate-300 dark:bg-slate-700"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center text-xs font-black mb-1">
                        <span className={themeClasses.textSecondary}>
                          Weight
                        </span>
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm font-black">
                          {weightLbs} lbs ({weightKg} kg)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="400"
                        value={weightLbs}
                        onChange={(e) =>
                          handleImperialWeightChange(Number(e.target.value))
                        }
                        className="w-full accent-indigo-600 cursor-pointer h-2 rounded-lg bg-slate-300 dark:bg-slate-700"
                      />
                    </div>
                  )}
                </div>

                {/* Circumference Girth Inputs */}
                <div
                  className={`p-3.5 rounded-xl border space-y-2.5 ${themeClasses.subCardBg}`}>
                  <span
                    className={`text-xs font-black uppercase tracking-wider block ${themeClasses.textPrimary}`}>
                    Girth Measurements (cm)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        className={`text-[11px] block mb-1 ${themeClasses.label}`}>
                        Waist Girth
                      </label>
                      <input
                        type="number"
                        value={waistCm}
                        onChange={(e) => setWaistCm(Number(e.target.value))}
                        className={`w-full px-2.5 py-1.5 text-xs rounded-lg border ${themeClasses.inputBg}`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-[11px] block mb-1 ${themeClasses.label}`}>
                        Neck Girth
                      </label>
                      <input
                        type="number"
                        value={neckCm}
                        onChange={(e) => setNeckCm(Number(e.target.value))}
                        className={`w-full px-2.5 py-1.5 text-xs rounded-lg border ${themeClasses.inputBg}`}
                      />
                    </div>
                  </div>
                  {gender === "female" && (
                    <div>
                      <label
                        className={`text-[11px] block mb-1 ${themeClasses.label}`}>
                        Hip Girth (Female)
                      </label>
                      <input
                        type="number"
                        value={hipCm}
                        onChange={(e) => setHipCm(Number(e.target.value))}
                        className={`w-full px-2.5 py-1.5 text-xs rounded-lg border ${themeClasses.inputBg}`}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setGender("male");
                  setUnitSystem("metric");
                  setHeightCm(175);
                  setWeightKg(74);
                  setHeightFeet(5);
                  setHeightInches(9);
                  setWeightLbs(163.1);
                  setAge(32);
                  setWaistCm(86);
                  setNeckCm(38);
                  setHipCm(98);
                }}
                className={`w-full py-2.5 font-black text-xs rounded-xl border transition-all flex items-center justify-center gap-2 mt-4 ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-300 shadow-sm"
                }`}>
                🔄 Reset Baseline Biometrics
              </button>
            </div>

            {/* MIDDLE SVG ANATOMICAL MODEL CANVAS */}
            <div
              className={`lg:col-span-5 p-5 rounded-2xl border shadow-sm flex flex-col justify-between items-center relative overflow-hidden ${themeClasses.cardBg}`}>
              {/* Angle Switcher Controls */}
              <div className="w-full flex justify-between items-center mb-2 z-10">
                <div
                  className={`flex p-1 rounded-xl border text-xs ${darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"}`}>
                  <button
                    onClick={() => setViewAngle("front")}
                    className={`px-3 py-1 rounded-lg font-black transition-all ${
                      viewAngle === "front"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : themeClasses.textMuted
                    }`}>
                    Anterior (Front)
                  </button>
                  <button
                    onClick={() => setViewAngle("back")}
                    className={`px-3 py-1 rounded-lg font-black transition-all ${
                      viewAngle === "back"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : themeClasses.textMuted
                    }`}>
                    Posterior (Back)
                  </button>
                </div>

                <span
                  className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-slate-300"
                      : "bg-slate-100 border-slate-300 text-slate-900"
                  }`}>
                  {gender === "male" ? "Male Anatomy" : "Female Anatomy"}
                </span>
              </div>

              {/* SVG Dynamic Morph Body Rendering */}
              <div className="relative w-full h-[460px] flex items-center justify-center py-2">
                <svg
                  viewBox="0 0 200 400"
                  className="h-full w-auto drop-shadow-md transition-all duration-500">
                  <defs>
                    <filter
                      id="glow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite
                        in="SourceGraphic"
                        in2="blur"
                        operator="over"
                      />
                    </filter>
                    <linearGradient
                      id="bodyGradientLight"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%">
                      <stop offset="0%" stopColor="#64748B" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient
                      id="bodyGradientDark"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1E293B" />
                    </linearGradient>
                  </defs>

                  <g className="transition-all duration-500">
                    {/* 1. HEAD & NECK REGION */}
                    <g
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPart("head")}
                      onMouseEnter={() => setHoveredPart("head")}
                      onMouseLeave={() => setHoveredPart(null)}>
                      <ellipse
                        cx="100"
                        cy="30"
                        rx="16"
                        ry="20"
                        fill={
                          selectedPart === "head" || hoveredPart === "head"
                            ? calculations.categoryColor
                            : darkMode
                              ? "url(#bodyGradientDark)"
                              : "url(#bodyGradientLight)"
                        }
                        stroke={
                          selectedPart === "head"
                            ? "#3B82F6"
                            : calculations.categoryColor
                        }
                        strokeWidth={selectedPart === "head" ? "3" : "1.5"}
                        filter={selectedPart === "head" ? "url(#glow)" : "none"}
                      />
                      <rect
                        x="93"
                        y="48"
                        width="14"
                        height="14"
                        rx="3"
                        fill={
                          selectedPart === "head" || hoveredPart === "head"
                            ? calculations.categoryColor
                            : darkMode
                              ? "#475569"
                              : "#475569"
                        }
                      />
                    </g>

                    {/* 2. CHEST & THORAX REGION */}
                    <g
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPart("chest")}
                      onMouseEnter={() => setHoveredPart("chest")}
                      onMouseLeave={() => setHoveredPart(null)}>
                      <path
                        d={`M ${100 - 32 * bodyMorphScale.chestWidth} 62 
                           Q 100 58 ${100 + 32 * bodyMorphScale.chestWidth} 62 
                           L ${100 + 28 * bodyMorphScale.chestWidth} 110 
                           L ${100 - 28 * bodyMorphScale.chestWidth} 110 Z`}
                        fill={
                          selectedPart === "chest" || hoveredPart === "chest"
                            ? calculations.categoryColor
                            : darkMode
                              ? "url(#bodyGradientDark)"
                              : "url(#bodyGradientLight)"
                        }
                        stroke={
                          selectedPart === "chest"
                            ? "#3B82F6"
                            : calculations.categoryColor
                        }
                        strokeWidth={selectedPart === "chest" ? "3" : "1.5"}
                        filter={
                          selectedPart === "chest" ? "url(#glow)" : "none"
                        }
                      />
                    </g>

                    {/* 3. ARMS REGION */}
                    <g
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPart("arms")}
                      onMouseEnter={() => setHoveredPart("arms")}
                      onMouseLeave={() => setHoveredPart(null)}>
                      <rect
                        x={100 - 45 * bodyMorphScale.chestWidth}
                        y="65"
                        width={11 * bodyMorphScale.widthMultiplier}
                        height="95"
                        rx="5"
                        fill={
                          selectedPart === "arms" || hoveredPart === "arms"
                            ? calculations.categoryColor
                            : darkMode
                              ? "url(#bodyGradientDark)"
                              : "url(#bodyGradientLight)"
                        }
                        stroke={
                          selectedPart === "arms"
                            ? "#3B82F6"
                            : calculations.categoryColor
                        }
                        strokeWidth={selectedPart === "arms" ? "3" : "1.5"}
                      />
                      <rect
                        x={100 + 34 * bodyMorphScale.chestWidth}
                        y="65"
                        width={11 * bodyMorphScale.widthMultiplier}
                        height="95"
                        rx="5"
                        fill={
                          selectedPart === "arms" || hoveredPart === "arms"
                            ? calculations.categoryColor
                            : darkMode
                              ? "url(#bodyGradientDark)"
                              : "url(#bodyGradientLight)"
                        }
                        stroke={
                          selectedPart === "arms"
                            ? "#3B82F6"
                            : calculations.categoryColor
                        }
                        strokeWidth={selectedPart === "arms" ? "3" : "1.5"}
                      />
                    </g>

                    {/* 4. VISCERAL CORE REGION */}
                    <g
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPart("core")}
                      onMouseEnter={() => setHoveredPart("core")}
                      onMouseLeave={() => setHoveredPart(null)}>
                      <path
                        d={`M ${100 - 28 * bodyMorphScale.chestWidth} 110 
                           Q ${100 - 36 * bodyMorphScale.bellyWidth} 145 ${100 - 24 * bodyMorphScale.chestWidth} 180 
                           L ${100 + 24 * bodyMorphScale.chestWidth} 180 
                           Q ${100 + 36 * bodyMorphScale.bellyWidth} 145 ${100 + 28 * bodyMorphScale.chestWidth} 110 Z`}
                        fill={
                          selectedPart === "core" || hoveredPart === "core"
                            ? calculations.categoryColor
                            : darkMode
                              ? "url(#bodyGradientDark)"
                              : "url(#bodyGradientLight)"
                        }
                        stroke={
                          selectedPart === "core"
                            ? "#3B82F6"
                            : calculations.categoryColor
                        }
                        strokeWidth={selectedPart === "core" ? "3" : "1.5"}
                        filter={selectedPart === "core" ? "url(#glow)" : "none"}
                      />
                    </g>

                    {/* 5. LEGS REGION */}
                    <g
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPart("legs")}
                      onMouseEnter={() => setHoveredPart("legs")}
                      onMouseLeave={() => setHoveredPart(null)}>
                      <path
                        d={`M ${100 - 22 * bodyMorphScale.chestWidth} 180 
                           L ${100 - 20 * bodyMorphScale.legWidth} 280 
                           L ${100 - 15 * bodyMorphScale.legWidth} 370 
                           L ${100 - 5} 370 
                           L ${100 - 4} 180 Z`}
                        fill={
                          selectedPart === "legs" || hoveredPart === "legs"
                            ? calculations.categoryColor
                            : darkMode
                              ? "url(#bodyGradientDark)"
                              : "url(#bodyGradientLight)"
                        }
                        stroke={
                          selectedPart === "legs"
                            ? "#3B82F6"
                            : calculations.categoryColor
                        }
                        strokeWidth={selectedPart === "legs" ? "3" : "1.5"}
                      />
                      <path
                        d={`M ${100 + 4} 180 
                           L ${100 + 5} 370 
                           L ${100 + 15 * bodyMorphScale.legWidth} 370 
                           L ${100 + 20 * bodyMorphScale.legWidth} 280 
                           L ${100 + 22 * bodyMorphScale.chestWidth} 180 Z`}
                        fill={
                          selectedPart === "legs" || hoveredPart === "legs"
                            ? calculations.categoryColor
                            : darkMode
                              ? "url(#bodyGradientDark)"
                              : "url(#bodyGradientLight)"
                        }
                        stroke={
                          selectedPart === "legs"
                            ? "#3B82F6"
                            : calculations.categoryColor
                        }
                        strokeWidth={selectedPart === "legs" ? "3" : "1.5"}
                      />
                    </g>
                  </g>
                </svg>
              </div>

              {/* Quick Select Region Chips */}
              <div
                className={`w-full flex flex-wrap justify-center gap-1.5 pt-3 border-t ${darkMode ? "border-slate-800" : "border-slate-200"}`}>
                {Object.entries(BODY_PARTS).map(([key, part]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPart(key)}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 border ${
                      selectedPart === key
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                        : `${themeClasses.subCardBg} ${themeClasses.textPrimary}`
                    }`}>
                    <span>{part.icon}</span> {part.name}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT CLINICAL STATS & DYNAMIC ANATOMY PANEL */}
            <div className="lg:col-span-3 space-y-6">
              {/* Calculated Index Card */}
              <div
                className={`p-5 rounded-2xl border shadow-sm ${themeClasses.cardBg}`}>
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`text-xs font-black uppercase tracking-wider ${themeClasses.textMuted}`}>
                    Calculated Index
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] border ${calculations.badgeClass}`}>
                    {calculations.category}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className="text-4xl font-black tracking-tight"
                    style={{ color: calculations.categoryColor }}>
                    {calculations.bmi}
                  </span>
                  <span
                    className={`text-xs font-black ${themeClasses.textMuted}`}>
                    kg/m²
                  </span>
                </div>

                {/* Color Spectrum Gauge Bar */}
                <div className="space-y-1.5">
                  <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex relative border border-slate-300 dark:border-slate-700">
                    <div className="w-[18.5%] bg-blue-500 h-full"></div>
                    <div className="w-[25%] bg-emerald-500 h-full"></div>
                    <div className="w-[20%] bg-amber-500 h-full"></div>
                    <div className="w-[36.5%] bg-rose-600 h-full"></div>

                    <div
                      className="absolute top-0 bottom-0 w-2 bg-slate-900 dark:bg-white shadow-md border border-white dark:border-slate-900 transition-all duration-500"
                      style={{
                        left: `${Math.min(Math.max((calculations.bmi / 40) * 100, 2), 98)}%`,
                      }}></div>
                  </div>
                  <div
                    className={`flex justify-between text-[10px] font-black ${themeClasses.textMuted}`}>
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40+</span>
                  </div>
                </div>

                {/* Vital Metrics Grid */}
                <div
                  className={`grid grid-cols-2 gap-2 mt-4 pt-4 border-t text-xs ${themeClasses.accentBorder}`}>
                  <div
                    className={`p-2.5 rounded-xl border ${themeClasses.subCardBg}`}>
                    <span
                      className={`text-[10px] uppercase font-black block ${themeClasses.textMuted}`}>
                      Est. Body Fat
                    </span>
                    <span
                      className={`font-black text-sm ${themeClasses.textPrimary}`}>
                      {calculations.bodyFatPercent}%
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl border ${themeClasses.subCardBg}`}>
                    <span
                      className={`text-[10px] uppercase font-black block ${themeClasses.textMuted}`}>
                      BMR Metabolic
                    </span>
                    <span
                      className={`font-black text-sm ${themeClasses.textPrimary}`}>
                      {calculations.bmr}{" "}
                      <span className="text-[10px] font-bold">kcal</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Anatomical Region Card */}
              <div
                className={`p-5 rounded-2xl border shadow-sm transition-all ${themeClasses.cardBg}`}>
                <div
                  className={`flex items-center gap-2 mb-3 pb-3 border-b ${themeClasses.accentBorder}`}>
                  <span className="text-2xl">
                    {BODY_PARTS[activePartKey].icon}
                  </span>
                  <div>
                    <h3
                      className={`font-black text-sm leading-tight ${themeClasses.textPrimary}`}>
                      {BODY_PARTS[activePartKey].name}
                    </h3>
                    <span
                      className="text-[11px] font-black uppercase tracking-wider"
                      style={{ color: currentPartInfo.color }}>
                      {currentPartInfo.badge}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider block mb-1 ${themeClasses.textMuted}`}>
                      Anatomical Status
                    </span>
                    <p
                      className={`text-xs font-black ${themeClasses.textPrimary}`}>
                      {currentPartInfo.status}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider block mb-1 ${themeClasses.textMuted}`}>
                      Physiological Mechanism
                    </span>
                    <p
                      className={`text-xs leading-relaxed font-bold ${themeClasses.textSecondary}`}>
                      {currentPartInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Target Weight Range Card */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                  darkMode
                    ? "bg-indigo-950/40 border-indigo-800/60 text-indigo-200"
                    : "bg-indigo-50 border-indigo-300 text-indigo-950 font-bold"
                }`}>
                <span className="font-black text-indigo-700 dark:text-indigo-400 block text-xs">
                  🎯 Target Healthy Weight Range
                </span>
                <p className="text-slate-800 dark:text-indigo-200">
                  For height{" "}
                  <strong className="underline">{heightCm} cm</strong> (BMI 18.5
                  - 24.9):
                </p>
                <div className="font-mono text-sm font-black text-indigo-800 dark:text-indigo-300 pt-1">
                  {unitSystem === "metric"
                    ? `${calculations.minHealthyKg} kg - ${calculations.maxHealthyKg} kg`
                    : `${calculations.minHealthyLbs} lbs - ${calculations.maxHealthyLbs} lbs`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: MEDICAL RECOMMENDATIONS            */}
        {/* ========================================== */}
        {activeTab === "recommendations" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div
              className={`p-6 rounded-2xl border shadow-sm ${themeClasses.cardBg}`}>
              <h2
                className={`text-lg font-black mb-1 flex items-center gap-2 ${themeClasses.textPrimary}`}>
                <span>🩺</span> Targeted Clinical Guidance Protocols
              </h2>
              <p className={`text-xs font-bold mb-6 ${themeClasses.textMuted}`}>
                Specific to current calculated BMI tier (
                <span
                  className="font-black"
                  style={{ color: calculations.categoryColor }}>
                  {calculations.category}
                </span>
                ) and physiological risk indicators.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dietary Interventions */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${themeClasses.subCardBg}`}>
                  <div className="flex items-center gap-2 font-black text-sm text-cyan-700 dark:text-cyan-400">
                    <span>🥗</span> Nutritional & Lipid Strategy
                  </div>
                  <ul
                    className={`text-xs font-bold space-y-1.5 list-disc list-inside ${themeClasses.textSecondary}`}>
                    {calculations.bmi < 18.5 && (
                      <>
                        <li>
                          Increase nutrient-dense caloric density by 300–500
                          kcal/day.
                        </li>
                        <li>
                          Prioritize lean proteins, polyunsaturated fats, and
                          complex carbs.
                        </li>
                        <li>
                          Schedule frequent smaller meals to reduce
                          gastrointestinal fatigue.
                        </li>
                      </>
                    )}
                    {calculations.bmi >= 18.5 && calculations.bmi <= 24.9 && (
                      <>
                        <li>
                          Sustain macronutrient ratio (~45% Carb / 30% Protein /
                          25% Fat).
                        </li>
                        <li>
                          Ensure daily fiber intake &gt;30g for optimal gut
                          microbiome health.
                        </li>
                        <li>
                          Maintain proper fluid hydration (~35ml per kg body
                          weight).
                        </li>
                      </>
                    )}
                    {calculations.bmi > 24.9 && (
                      <>
                        <li>
                          Structure a sustainable daily caloric deficit of
                          300–500 kcal.
                        </li>
                        <li>
                          Minimize ultra-processed foods and simple glycemic
                          sugars.
                        </li>
                        <li>
                          Emphasize high-volume cruciferous vegetables and lean
                          proteins.
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Musculoskeletal & Joint Exercise */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${themeClasses.subCardBg}`}>
                  <div className="flex items-center gap-2 font-black text-sm text-indigo-700 dark:text-indigo-400">
                    <span>🏋️</span> Physical Exercise & Joint Preservation
                  </div>
                  <ul
                    className={`text-xs font-bold space-y-1.5 list-disc list-inside ${themeClasses.textSecondary}`}>
                    {calculations.bmi < 18.5 && (
                      <>
                        <li>
                          Engage in progressive resistance training 3x/week for
                          muscle hypertrophy.
                        </li>
                        <li>
                          Limit high-volume long-distance aerobic endurance
                          sessions.
                        </li>
                      </>
                    )}
                    {calculations.bmi >= 18.5 && calculations.bmi <= 24.9 && (
                      <>
                        <li>
                          Combine 150 min/week moderate aerobic activity with 2x
                          resistance sessions.
                        </li>
                        <li>
                          Incorporate core stability routines to support spinal
                          posture.
                        </li>
                      </>
                    )}
                    {calculations.bmi > 24.9 && (
                      <>
                        <li>
                          Utilize low-impact cardio (swimming, cycling, rowing)
                          to protect joints.
                        </li>
                        <li>
                          Incorporate strength training to preserve lean mass
                          during fat loss.
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Cardiopulmonary Health */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${themeClasses.subCardBg}`}>
                  <div className="flex items-center gap-2 font-black text-sm text-emerald-700 dark:text-emerald-400">
                    <span>🫀</span> Cardiopulmonary & Vascular Screening
                  </div>
                  <ul
                    className={`text-xs font-bold space-y-1.5 list-disc list-inside ${themeClasses.textSecondary}`}>
                    {calculations.bmi >= 30 && (
                      <>
                        <li>
                          Monitor resting blood pressure and fasting HbA1c
                          quarterly.
                        </li>
                        <li>
                          Conduct clinical sleep architecture review for
                          obstructive sleep apnea.
                        </li>
                      </>
                    )}
                    {calculations.bmi < 30 && (
                      <>
                        <li>
                          Perform routine annual serum lipid panel and baseline
                          metabolic checks.
                        </li>
                        <li>
                          Maintain Zone 2 aerobic workouts for cardiovascular
                          conditioning.
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Energy Budget Calculator */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${themeClasses.subCardBg}`}>
                  <div className="flex items-center gap-2 font-black text-sm text-amber-700 dark:text-amber-400">
                    <span>🔥</span> Daily Energy Metabolism
                  </div>
                  <div
                    className={`text-xs font-bold space-y-1 ${themeClasses.textSecondary}`}>
                    <p>
                      <strong>Basal Metabolic Rate (BMR):</strong>{" "}
                      {calculations.bmr} kcal/day
                    </p>
                    <p>
                      <strong>Total Daily Energy Expenditure (TDEE):</strong>{" "}
                      {calculations.tdee} kcal/day
                    </p>
                    <p className={`text-[11px] pt-1 ${themeClasses.textMuted}`}>
                      To maintain current mass, consume ~{calculations.tdee}{" "}
                      kcal/day. Adjust by ±400 kcal/day for weight transitions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: SCREEN PREVIEW OF PRINTABLE SHEET   */}
        {/* ========================================== */}
        {activeTab === "ticket" && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex justify-between items-center bg-indigo-50 dark:bg-slate-800 p-4 rounded-2xl border border-indigo-200 dark:border-slate-700">
              <div>
                <h3 className="font-black text-sm text-slate-900 dark:text-slate-100">
                  Official Clinical Report Sheet Preview
                </h3>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Click below or use browser Print to export PDF.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2">
                🖨️ Print / Save PDF Report
              </button>
            </div>

            {/* Screen Preview Copy */}
            <div
              className={`p-8 rounded-2xl border shadow-lg relative bg-white text-slate-900 ${themeClasses.cardBg}`}>
              <div className="border-b pb-4 mb-6 border-slate-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      CLINICAL BODY COMPOSITION & RISK SHEET
                    </h2>
                    <p className="text-xs font-bold text-slate-600">
                      ANATOMI-BMI DIAGNOSTIC MEDICAL SYSTEM
                    </p>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-slate-500">
                    <p>DATE: {new Date().toLocaleDateString()}</p>
                    <p>RECORD ID: {patientId}</p>
                  </div>
                </div>
              </div>

              {/* Patient Meta */}
              <div className="grid grid-cols-4 gap-3 p-3 rounded-xl border border-slate-300 bg-slate-50 mb-6 text-xs">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Patient Name
                  </span>
                  <span className="font-black text-slate-900">
                    {patientName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Age / Gender
                  </span>
                  <span className="font-black text-slate-900">
                    {age} yrs / {gender}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Height
                  </span>
                  <span className="font-black text-slate-900">
                    {heightCm} cm ({heightFeet}'{heightInches}")
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Weight
                  </span>
                  <span className="font-black text-slate-900">
                    {weightKg} kg ({weightLbs} lbs)
                  </span>
                </div>
              </div>

              {/* Core Index Indicators */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl border border-slate-300 bg-white">
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    BMI Index
                  </span>
                  <span
                    className="text-2xl font-black"
                    style={{ color: calculations.categoryColor }}>
                    {calculations.bmi}
                  </span>
                  <span className="text-[10px] font-bold block text-slate-600">
                    {calculations.category}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-300 bg-white">
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Est. Body Fat
                  </span>
                  <span className="text-2xl font-black text-slate-900">
                    {calculations.bodyFatPercent}%
                  </span>
                  <span className="text-[10px] font-bold block text-slate-600">
                    US Navy Method
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-300 bg-white">
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Target Weight
                  </span>
                  <span className="text-sm font-black text-slate-900 pt-1 block">
                    {calculations.minHealthyKg} - {calculations.maxHealthyKg} kg
                  </span>
                  <span className="text-[10px] font-bold block text-slate-600">
                    BMI 18.5 - 24.9
                  </span>
                </div>
              </div>

              {/* Body Regions Analysis */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Anatomical Zone Risk Analysis
                </h4>
                <div className="space-y-2 text-xs">
                  {Object.entries(BODY_PARTS).map(([key, part]) => {
                    const info = PHYSIOLOGY_DATA[calculations.tierKey][key];
                    return (
                      <div
                        key={key}
                        className="p-2.5 rounded-lg border border-slate-300 bg-slate-50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-black text-slate-900 flex items-center gap-1">
                            <span>{part.icon}</span> {part.name}
                          </span>
                          <span
                            className="font-black text-[11px]"
                            style={{ color: info.color }}>
                            {info.badge}
                          </span>
                        </div>
                        <p className="text-slate-700 text-[11px] font-bold">
                          {info.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Medical Signature Block */}
              <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs">
                <div>
                  <p className="font-black text-slate-700 mb-8">
                    Attending Clinician / Reviewer:
                  </p>
                  <div className="border-b border-slate-400 w-48"></div>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">
                    Signature & Stamp
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-700 mb-8">
                    Patient Signature:
                  </p>
                  <div className="border-b border-slate-400 w-48 ml-auto"></div>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">
                    Date
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 
        ========================================================================
        ONLY PRINTABLE MEDICAL REPORT SHEET (Targeted exclusively by @media print)
        ========================================================================
      */}
      <div className="printable-report-sheet p-8 font-sans bg-white text-slate-900">
        {/* Printable Sheet Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              CLINICAL BODY COMPOSITION & MEDICAL REPORT
            </h1>
            <p className="text-xs font-bold text-slate-700">
              ANATOMI-BMI DIAGNOSTIC SYSTEM • OFFICIALLY FORMATTED SHEET
            </p>
          </div>
          <div className="text-right font-mono text-xs font-bold text-slate-800">
            <p>ISSUE DATE: {new Date().toLocaleDateString()}</p>
            <p>RECORD ID: {patientId}</p>
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="grid grid-cols-4 gap-3 p-3 border border-slate-400 rounded-lg bg-slate-50 mb-6 text-xs font-bold">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-600 block">
              Patient Name
            </span>
            <span className="text-slate-900 font-black">{patientName}</span>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-600 block">
              Age / Gender
            </span>
            <span className="text-slate-900">
              {age} yrs / {gender}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-600 block">
              Height
            </span>
            <span className="text-slate-900">
              {heightCm} cm ({heightFeet}'{heightInches}")
            </span>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-600 block">
              Weight
            </span>
            <span className="text-slate-900">
              {weightKg} kg ({weightLbs} lbs)
            </span>
          </div>
        </div>

        {/* Core Calculated Biometrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 border border-slate-400 rounded-lg print-card">
            <span className="text-[10px] font-black uppercase text-slate-600 block">
              Body Mass Index (BMI)
            </span>
            <div
              className="text-3xl font-black my-1"
              style={{ color: calculations.categoryColor }}>
              {calculations.bmi} kg/m²
            </div>
            <span className="text-xs font-bold text-slate-900">
              {calculations.category}
            </span>
          </div>
          <div className="p-4 border border-slate-400 rounded-lg print-card">
            <span className="text-[10px] font-black uppercase text-slate-600 block">
              Est. Body Fat Ratio
            </span>
            <div className="text-3xl font-black my-1 text-slate-900">
              {calculations.bodyFatPercent}%
            </div>
            <span className="text-xs font-bold text-slate-700">
              US Navy Method
            </span>
          </div>
          <div className="p-4 border border-slate-400 rounded-lg print-card">
            <span className="text-[10px] font-black uppercase text-slate-600 block">
              Target Weight Interval
            </span>
            <div className="text-lg font-black my-1 text-slate-900">
              {calculations.minHealthyKg} - {calculations.maxHealthyKg} kg
            </div>
            <span className="text-xs font-bold text-slate-700">
              BMI 18.5 - 24.9 Interval
            </span>
          </div>
        </div>

        {/* Energy Metabolism */}
        <div className="p-3 border border-slate-400 rounded-lg mb-6 bg-slate-50 text-xs font-bold">
          <span className="text-[10px] font-black uppercase text-slate-600 block mb-1">
            Metabolic Rates
          </span>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Basal Metabolic Rate (BMR):</strong> {calculations.bmr}{" "}
              kcal/day
            </p>
            <p>
              <strong>Total Daily Energy Expenditure (TDEE):</strong>{" "}
              {calculations.tdee} kcal/day
            </p>
          </div>
        </div>

        {/* Anatomical Regions Risk Assessment Table */}
        <div className="mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
            Anatomical Regional Risk & Guidance Breakdown
          </h3>
          <div className="space-y-2.5">
            {Object.entries(BODY_PARTS).map(([key, part]) => {
              const info = PHYSIOLOGY_DATA[calculations.tierKey][key];
              return (
                <div
                  key={key}
                  className="p-3 border border-slate-400 rounded-lg print-card text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-slate-900 text-sm">
                      {part.icon} {part.name}
                    </span>
                    <span
                      className="font-black text-xs"
                      style={{ color: info.color }}>
                      {info.badge}
                    </span>
                  </div>
                  <p className="text-slate-900 font-bold mb-1">
                    <strong>Status:</strong> {info.status}
                  </p>
                  <p className="text-slate-800 text-[11px] mb-1">
                    {info.description}
                  </p>
                  <p className="text-indigo-900 font-extrabold text-[11px]">
                    <strong>Recommendation:</strong> {info.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formal Signature & Verification Block */}
        <div className="pt-10 border-t-2 border-slate-900 grid grid-cols-2 gap-12 text-xs font-bold">
          <div>
            <p className="text-slate-900 mb-12">
              Physician / Clinical Reviewer Signature:
            </p>
            <div className="border-b border-slate-600 w-56"></div>
            <p className="text-[10px] text-slate-600 mt-1">
              MD / Medical Examiner License #
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-900 mb-12">
              Patient Acknowledgement Signature:
            </p>
            <div className="border-b border-slate-600 w-56 ml-auto"></div>
            <p className="text-[10px] text-slate-600 mt-1">Date</p>
          </div>
        </div>
      </div>
    </div>
  );
}
