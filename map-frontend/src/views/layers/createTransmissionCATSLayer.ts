import { loadModules } from 'esri-loader';

export const createTransmissionCATSLayer = async () => {
  const [FeatureLayer, SimpleRenderer, SimpleLineSymbol, PopupTemplate] = await loadModules([
    'esri/layers/FeatureLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleLineSymbol',
    'esri/PopupTemplate'
  ]);

  const lineSymbol = new SimpleLineSymbol({
    color: [255, 0, 255], // Magenta for transmission lines
    width: 3
  });

  const renderer = new SimpleRenderer({
    symbol: lineSymbol
  });

  const popupTemplate = new PopupTemplate({
    title: '<strong>Transmission Line - CATS Model</strong>',
    content: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
        <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #ff00ff;">
          <h4 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">Transmission Line Information</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div><strong>Line ID:</strong> {LineID}</div>
            <div><strong>Line Name:</strong> {LineName}</div>
            <div><strong>Voltage (kV):</strong> {Voltage_kV}</div>
            <div><strong>Length (miles):</strong> {Length_miles}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #28a745;">
          <h4 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">CATS Model Results</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div><strong>Current Capacity (MW):</strong> {CurrentCapacity_MW}</div>
            <div><strong>Future Capacity (MW):</strong> {FutureCapacity_MW}</div>
            <div><strong>Utilization (%):</strong> {Utilization_Percent}</div>
            <div><strong>Constraint Status:</strong> {ConstraintStatus}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #ffc107;">
          <h4 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">Electrification Impact</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div><strong>Additional Load (MW):</strong> {AdditionalLoad_MW}</div>
            <div><strong>Peak Load Increase (%):</strong> {PeakLoadIncrease_Percent}</div>
            <div><strong>Upgrade Required:</strong> {UpgradeRequired}</div>
            <div><strong>Upgrade Cost ($M):</strong> {UpgradeCost_Million}</div>
          </div>
        </div>
        
        <div style="margin-top: 10px; font-size: 12px; color: #666; text-align: center; font-style: italic;">
          CATS Model - Transmission System Analysis
        </div>
      </div>
    `
  });

  return new FeatureLayer({
    url: 'YOUR_ACTUAL_FEATURE_SERVICE_URL_HERE',
    title: 'Transmission CATS Model',
    renderer: renderer,
    popupTemplate: popupTemplate,
    visible: false,
    outFields: ['*']  // Load all fields for popup functionality
  });
};