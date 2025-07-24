import { loadModules } from 'esri-loader';

export const createElectrificationLayers = async () => {
  const [FeatureLayer, GeoJSONLayer, SimpleRenderer, SimpleLineSymbol, PopupTemplate] = await loadModules([
    'esri/layers/FeatureLayer',
    'esri/layers/GeoJSONLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleLineSymbol',
    'esri/PopupTemplate'
  ]);

  const createLayer = (url: string, title: string, color: number[], type: string) => {
    const lineSymbol = new SimpleLineSymbol({
      color: color,
      width: 2
    });

    const renderer = new SimpleRenderer({
      symbol: lineSymbol
    });

    const popupTemplate = new PopupTemplate({
      title: title,
      content: `
        <div class="popup-content">
          <div class="popup-row"><span class="popup-label">Feeder Name:</span><span class="popup-value">{Feeder_Name}</span></div>
          <div class="popup-row"><span class="popup-label">Feeder ID:</span><span class="popup-value">{FeederID}</span></div>
          <div class="popup-row"><span class="popup-label">Load Capacity (kW):</span><span class="popup-value">{LoadCapacity_kW}</span></div>
          <div class="popup-row"><span class="popup-label">Residential Customers:</span><span class="popup-value">{ResCust}</span></div>
          <div class="popup-row"><span class="popup-label">Commercial Customers:</span><span class="popup-value">{ComCust}</span></div>
          <div class="popup-row"><span class="popup-label">Industrial Customers:</span><span class="popup-value">{IndCust}</span></div>
        </div>
      `
    });

    if (type === 'geojson') {
      return new GeoJSONLayer({
        url: url,
        title: title,
        renderer: renderer,
        popupTemplate: popupTemplate,
        visible: false  // Set to false to disable by default
      });

    } else {
      return new FeatureLayer({
        url: url,
        title: title,
        outFields: ['*'],
        popupTemplate: popupTemplate,
        renderer: renderer,
        visible: false,
      });

    }
  };

  // const minElectrificationLayer = createLayer('geojson/min_electrification.geojson', 'Min Electrification Capacity', [0, 255, 0], 'geojson'); // Green
  const minElectrificationLayer = createLayer('https://services2.arcgis.com/iq8zYa0SRsvIFFKz/arcgis/rest/services/min_electrification/FeatureServer/0', 'Min Electrification Capacity', [255, 130, 0],  'feature_url'); // Orange
  const minElectrificationHalfCustLayer = createLayer('https://services2.arcgis.com/iq8zYa0SRsvIFFKz/arcgis/rest/services/min_electrification_halfcust/FeatureServer/0', 'Min Electrification Capacity HalfCust', [168, 111, 50],  'feature_url'); // Orange
  // const midElectrificationLayer = createLayer('geojson/mid_electrification.geojson', 'Mid Electrification Capacity', [255, 165, 0], 'geojson'); // Orange
  const midElectrificationLayer = createLayer('https://services2.arcgis.com/iq8zYa0SRsvIFFKz/arcgis/rest/services/mid_electrification/FeatureServer/0', 'Mid Electrification Capacity', [255, 200, 0], 'feature_url'); // Yellow
  // const maxElectrificationLayer = createLayer('geojson/max_electrification.geojson', 'Max Electrification Capacity', [0, 0, 255], 'geojson'); // Blue
  const maxElectrificationLayer = createLayer('https://services2.arcgis.com/iq8zYa0SRsvIFFKz/arcgis/rest/services/max_electrification/FeatureServer/0', 'Max Electrification Capacity', [0, 255, 0], 'feature_url'); // Green

  return {
    minElectrificationLayer,
    minElectrificationHalfCustLayer,
    midElectrificationLayer,
    maxElectrificationLayer,
  };
};
