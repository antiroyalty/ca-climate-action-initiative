// src/views/layers/createLowCapacityFeederLayer.ts
import { loadModules } from 'esri-loader';

export const createLowCapacityFeederLayer = async () => {
  const [GeoJSONLayer, SimpleRenderer, SimpleLineSymbol, PopupTemplate] = await loadModules([
    'esri/layers/GeoJSONLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleLineSymbol',
    'esri/PopupTemplate'
  ]);

  const lineSymbol = new SimpleLineSymbol({
    color: [255, 0, 0], // Red
    width: 2
  });

  const renderer = new SimpleRenderer({
    symbol: lineSymbol
  });

  const popupTemplate = new PopupTemplate({
    title: 'Low Capacity Feeder',
    content: `
      <div class="popup-content">
        <div class="popup-row"><span class="popup-label">Feeder ID:</span><span class="popup-value">{FeederID}</span></div>
        <div class="popup-row"><span class="popup-label">Load Capacity (kW):</span><span class="popup-value">{LoadCapacity_kW}</span></div>
      </div>
    `
  });

  return new GeoJSONLayer({
    url: 'geojson/low_capacity_feeders.geojson',
    title: 'Feeders < 100 kW',
    renderer: renderer,
    popupTemplate: popupTemplate,
    visible: false  // Set to false to disable by default
  });
};
