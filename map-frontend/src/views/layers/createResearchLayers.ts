import { loadModules } from 'esri-loader';

// Scenario options exposed in the UI
export const RESEARCH_SCENARIOS = [
  { key: 'baseline',           label: 'Solar + Gas (Baseline)' },
  { key: 'heat_pump_induction',label: 'Heat Pump + Induction + Solar' },
  { key: 'full_electric',      label: 'Full Electrification + Solar' },
  { key: 'full_electric_ev',   label: 'Full Electrification + EV + Solar' },
] as const;

export const RESEARCH_INCENTIVES = [
  { key: 'full', label: 'Full Incentives (IRA + State)' },
  { key: 'half', label: 'Half Incentives' },
  { key: 'none', label: 'No Incentives' },
] as const;

export type ResearchScenarioKey = typeof RESEARCH_SCENARIOS[number]['key'];
export type ResearchIncentiveKey = typeof RESEARCH_INCENTIVES[number]['key'];

// ── Color helpers ──────────────────────────────────────────────────────────────

const FILL_OPACITY = 0.75;

function rgba(r: number, g: number, b: number): number[] {
  return [r, g, b, FILL_OPACITY];
}

// Green → Yellow → Red (5 stops)
const BILL_COLORS = [
  rgba(26, 150, 65),   // dark green  — lowest bills
  rgba(145, 207, 96),  // light green
  rgba(255, 230, 41),  // yellow
  rgba(252, 141, 89),  // orange
  rgba(215, 48, 39),   // dark red    — highest bills
];

// Same palette for EAC
const EAC_COLORS = BILL_COLORS;

// Green → Yellow → Red (6 stops for wider payback range)
const PAYBACK_COLORS = [
  rgba(26, 150, 65),
  rgba(145, 207, 96),
  rgba(255, 230, 41),
  rgba(252, 141, 89),
  rgba(215, 48, 39),
  rgba(128, 0, 38),    // deep red — >25 years
];

// White → Blue (5 stops for solar size; 0 kW gets gray)
const SOLAR_COLORS = [
  rgba(189, 189, 189), // gray   — 0 kW (no solar optimal)
  rgba(198, 219, 239), // pale blue
  rgba(107, 174, 214), // medium blue
  rgba(33, 113, 181),  // dark blue
  rgba(8, 48, 107),    // navy   — largest systems
];

// ── Renderer builders ──────────────────────────────────────────────────────────

async function buildClassBreaksRenderer(
  field: string,
  breakInfos: { min: number; max: number; label: string; color: number[] }[],
  outlineColor: number[] = [80, 80, 80, 0.4]
) {
  const [ClassBreaksRenderer, SimpleFillSymbol] = await loadModules([
    'esri/renderers/ClassBreaksRenderer',
    'esri/symbols/SimpleFillSymbol',
  ]);

  return new ClassBreaksRenderer({
    field,
    classBreakInfos: breakInfos.map(({ min, max, label, color }) => ({
      minValue: min,
      maxValue: max,
      label,
      symbol: new SimpleFillSymbol({
        color,
        outline: { color: outlineColor, width: 0.5 },
      }),
    })),
  });
}

function billBreaks(field: string) {
  return [
    { min: 0,     max: 1200, label: '< $1,200',           color: BILL_COLORS[0] },
    { min: 1200,  max: 2000, label: '$1,200 – $2,000',    color: BILL_COLORS[1] },
    { min: 2000,  max: 3000, label: '$2,000 – $3,000',    color: BILL_COLORS[2] },
    { min: 3000,  max: 5000, label: '$3,000 – $5,000',    color: BILL_COLORS[3] },
    { min: 5000,  max: 15000,label: '> $5,000',            color: BILL_COLORS[4] },
  ].map(b => ({ ...b, field }));
}

function paybackBreaks(field: string) {
  return [
    { min: 0,  max: 5,  label: '< 5 years',      color: PAYBACK_COLORS[0] },
    { min: 5,  max: 8,  label: '5 – 8 years',    color: PAYBACK_COLORS[1] },
    { min: 8,  max: 12, label: '8 – 12 years',   color: PAYBACK_COLORS[2] },
    { min: 12, max: 18, label: '12 – 18 years',  color: PAYBACK_COLORS[3] },
    { min: 18, max: 25, label: '18 – 25 years',  color: PAYBACK_COLORS[4] },
    { min: 25, max: 100,label: '> 25 years',      color: PAYBACK_COLORS[5] },
  ].map(b => ({ ...b, field }));
}

function eacBreaks(field: string) {
  return [
    { min: 0,     max: 2000, label: '< $2,000',           color: EAC_COLORS[0] },
    { min: 2000,  max: 3500, label: '$2,000 – $3,500',    color: EAC_COLORS[1] },
    { min: 3500,  max: 5000, label: '$3,500 – $5,000',    color: EAC_COLORS[2] },
    { min: 5000,  max: 8000, label: '$5,000 – $8,000',    color: EAC_COLORS[3] },
    { min: 8000,  max: 20000,label: '> $8,000',            color: EAC_COLORS[4] },
  ].map(b => ({ ...b, field }));
}

function solarBreaks() {
  return [
    { min: 0,    max: 0.01, label: '0 kW (no solar)',    color: SOLAR_COLORS[0] },
    { min: 0.01, max: 1,    label: '< 1 kW',             color: SOLAR_COLORS[1] },
    { min: 1,    max: 2,    label: '1 – 2 kW',           color: SOLAR_COLORS[2] },
    { min: 2,    max: 3,    label: '2 – 3 kW',           color: SOLAR_COLORS[3] },
    { min: 3,    max: 10,   label: '> 3 kW',             color: SOLAR_COLORS[4] },
  ];
}

// ── Popup builders ─────────────────────────────────────────────────────────────

function billPopup() {
  return {
    title: '{NAME} County — Annual Energy Bill',
    content: `
      <div style="font-size:13px;line-height:1.7">
        <b>Annual bill with solar (full incentives)</b><br>
        <table style="width:100%;border-collapse:collapse">
          <tr><td>Solar + Gas (baseline)</td><td align="right"><b>\${bill_baseline}</b></td></tr>
          <tr><td>Heat Pump + Induction + Solar</td><td align="right"><b>\${bill_heat_pump_induction}</b></td></tr>
          <tr><td>Full Electrification + Solar</td><td align="right"><b>\${bill_full_electric}</b></td></tr>
          <tr><td>Full Electrification + EV + Solar</td><td align="right"><b>\${bill_full_electric_ev}</b></td></tr>
        </table>
        <hr style="margin:6px 0">
        <small>Baseline annual cost without solar: <b>\${bill_baseline_no_solar}</b></small>
      </div>`,
  };
}

function paybackPopup() {
  return {
    title: '{NAME} County — Payback Period',
    content: `
      <div style="font-size:13px;line-height:1.7">
        <b>Years to break even on solar + electrification capex</b><br>
        <table style="width:100%;border-collapse:collapse">
          <tr style="font-weight:bold"><td></td><td align="right">Full</td><td align="right">Half</td><td align="right">None</td></tr>
          <tr><td>Baseline (solar only)</td>
              <td align="right">{payback_baseline_full}</td>
              <td align="right">{payback_baseline_half}</td>
              <td align="right">{payback_baseline_none}</td></tr>
          <tr><td>Heat Pump + Induction</td>
              <td align="right">{payback_heat_pump_induction_full}</td>
              <td align="right">{payback_heat_pump_induction_half}</td>
              <td align="right">{payback_heat_pump_induction_none}</td></tr>
          <tr><td>Full Electrification</td>
              <td align="right">{payback_full_electric_full}</td>
              <td align="right">{payback_full_electric_half}</td>
              <td align="right">{payback_full_electric_none}</td></tr>
          <tr><td>Full Electric + EV</td>
              <td align="right">{payback_full_electric_ev_full}</td>
              <td align="right">{payback_full_electric_ev_half}</td>
              <td align="right">{payback_full_electric_ev_none}</td></tr>
        </table>
        <small>Incentive columns: Full (IRA + State) / Half / None</small>
      </div>`,
  };
}

function eacPopup() {
  return {
    title: '{NAME} County — Equivalent Annual Cost',
    content: `
      <div style="font-size:13px;line-height:1.7">
        <b>Total lifecycle cost per year (bill + amortized capex over 25 yrs)</b><br>
        <table style="width:100%;border-collapse:collapse">
          <tr><td>Solar + Gas (baseline)</td><td align="right"><b>\${eac_baseline}</b></td></tr>
          <tr><td>Heat Pump + Induction + Solar</td><td align="right"><b>\${eac_heat_pump_induction}</b></td></tr>
          <tr><td>Full Electrification + Solar</td><td align="right"><b>\${eac_full_electric}</b></td></tr>
          <tr><td>Full Electrification + EV + Solar</td><td align="right"><b>\${eac_full_electric_ev}</b></td></tr>
        </table>
        <small>Full incentives scenario. Capex amortized over 25-year asset life.</small>
      </div>`,
  };
}

function solarSizePopup() {
  return {
    title: '{NAME} County — Optimal Solar Size (NEM 3.0)',
    content: `
      <div style="font-size:13px;line-height:1.7">
        <b>Optimal rooftop solar system size under NEM 3.0: {solar_size_kw} kW</b><br>
        <small>Counties showing 0 kW: adding solar does not reduce total cost under NEM 3.0
        export rate rules for this county's climate zone.</small>
      </div>`,
  };
}

// ── Public API ─────────────────────────────────────────────────────────────────

export const createResearchLayers = async () => {
  const [GeoJSONLayer, PopupTemplate] = await loadModules([
    'esri/layers/GeoJSONLayer',
    'esri/PopupTemplate',
  ]);

  const billRenderer = await buildClassBreaksRenderer('bill_baseline', billBreaks('bill_baseline'));
  const paybackRenderer = await buildClassBreaksRenderer('payback_baseline_full', paybackBreaks('payback_baseline_full'));
  const eacRenderer = await buildClassBreaksRenderer('eac_baseline', eacBreaks('eac_baseline'));
  const solarRenderer = await buildClassBreaksRenderer('solar_size_kw', solarBreaks());

  const billLayer = new GeoJSONLayer({
    url: 'geojson/research_annual_bill.geojson',
    title: 'Annual Energy Bill',
    outFields: ['*'],
    renderer: billRenderer,
    popupTemplate: new PopupTemplate(billPopup()),
    visible: false,
  });

  const paybackLayer = new GeoJSONLayer({
    url: 'geojson/research_payback.geojson',
    title: 'Payback Period',
    outFields: ['*'],
    renderer: paybackRenderer,
    popupTemplate: new PopupTemplate(paybackPopup()),
    visible: false,
  });

  const eacLayer = new GeoJSONLayer({
    url: 'geojson/research_eac.geojson',
    title: 'Equivalent Annual Cost (EAC)',
    outFields: ['*'],
    renderer: eacRenderer,
    popupTemplate: new PopupTemplate(eacPopup()),
    visible: false,
  });

  const solarSizeLayer = new GeoJSONLayer({
    url: 'geojson/research_solar_size.geojson',
    title: 'Optimal Solar Size (NEM 3.0)',
    outFields: ['*'],
    renderer: solarRenderer,
    popupTemplate: new PopupTemplate(solarSizePopup()),
    visible: false,
  });

  return { billLayer, paybackLayer, eacLayer, solarSizeLayer };
};

// Update bill and EAC renderers when scenario changes
export const updateBillRenderer = async (
  layer: __esri.GeoJSONLayer,
  scenario: ResearchScenarioKey
) => {
  const field = `bill_${scenario}`;
  layer.renderer = await buildClassBreaksRenderer(field, billBreaks(field));
};

export const updatePaybackRenderer = async (
  layer: __esri.GeoJSONLayer,
  scenario: ResearchScenarioKey,
  incentive: ResearchIncentiveKey
) => {
  const field = `payback_${scenario}_${incentive}`;
  layer.renderer = await buildClassBreaksRenderer(field, paybackBreaks(field));
};

export const updateEACRenderer = async (
  layer: __esri.GeoJSONLayer,
  scenario: ResearchScenarioKey
) => {
  const field = `eac_${scenario}`;
  layer.renderer = await buildClassBreaksRenderer(field, eacBreaks(field));
};
