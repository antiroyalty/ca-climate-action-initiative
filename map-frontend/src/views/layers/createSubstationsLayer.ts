// src/views/layers/createSubstationsLayer.ts
import { loadModules } from 'esri-loader';

export const createSubstationsLayer = async () => {
  const [FeatureLayer, SimpleRenderer, SimpleMarkerSymbol, PopupTemplate] = await loadModules([
    'esri/layers/FeatureLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/PopupTemplate'
  ]);

  const markerSymbol = new SimpleMarkerSymbol({
    color: [226, 119, 255], // Purple
    size: 6
  });

  const renderer = new SimpleRenderer({
    symbol: markerSymbol
  });

  const popupTemplate = new PopupTemplate({
    title: '<strong>{SUBNAME} Substation</strong>',
    content: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
        <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #e226bf;">
          <h4 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">Basic Information</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div><strong>Substation ID:</strong> {SUBSTATIONID}</div>
            <div><strong>Object ID:</strong> {OBJECTID}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #28a745;">
          <h4 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">Technical Specifications</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div><strong>Minimum KV:</strong> {MIN_KV} kV</div>
            <div><strong>Number of Banks:</strong> {NUMBANKS}</div>
            <div><strong>Ungrounded Banks:</strong> {UNGROUNDEDBANKS}</div>
            <div><strong>Data Status:</strong> 
              <span style="padding: 2px 6px; border-radius: 3px; font-size: 12px; {expression/redacted-style}">
                {REDACTED}
              </span>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 10px; font-size: 12px; color: #666; text-align: center; font-style: italic;">
          Click to view detailed substation information
        </div>
      </div>
    `,
    expressionInfos: [{
      name: "redacted-style",
      title: "Redacted Status Style",
      expression: `
        var redacted = $feature.REDACTED;
        if (redacted == "Yes") {
          return "background-color: #dc3545; color: white;";
        } else {
          return "background-color: #28a745; color: white;";
        }
      `
    }]
  });

  return new FeatureLayer({
    url: 'https://services2.arcgis.com/iq8zYa0SRsvIFFKz/arcgis/rest/services/pge_substations/FeatureServer/0',
    title: 'Substations',
    renderer: renderer,
    popupTemplate: popupTemplate,
    visible: true,
    outFields: ['*']  // Load all fields to ensure attributes are available
  });
};
