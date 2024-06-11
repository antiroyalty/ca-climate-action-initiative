import { loadModules } from 'esri-loader';

export const createElectrificationLayers = async () => {
  const [GeoJSONLayer, SimpleRenderer, SimpleLineSymbol, PopupTemplate] = await loadModules([
    'esri/layers/GeoJSONLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleLineSymbol',
    'esri/PopupTemplate'
  ]);

  const createLayer = (url: string, title: string, color: number[]) => {
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

    return new GeoJSONLayer({
      url: url,
      title: title,
      renderer: renderer,
      popupTemplate: popupTemplate,
      visible: false  // Set to false to disable by default
    });
  };

  const minElectrificationLayer = createLayer('geojson/min_electrification.geojson', 'Min Electrification Capacity', [0, 255, 0]); // Green
  const midElectrificationLayer = createLayer('geojson/mid_electrification.geojson', 'Mid Electrification Capacity', [255, 165, 0]); // Orange
  const maxElectrificationLayer = createLayer('geojson/max_electrification.geojson', 'Max Electrification Capacity', [0, 0, 255]); // Blue

  return {
    minElectrificationLayer,
    midElectrificationLayer,
    maxElectrificationLayer
  };
};
