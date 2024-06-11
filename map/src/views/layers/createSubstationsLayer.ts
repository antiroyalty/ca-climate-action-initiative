// src/views/layers/createSubstationsLayer.ts
import { loadModules } from 'esri-loader';

export const createSubstationsLayer = async () => {
  const [GeoJSONLayer, SimpleRenderer, SimpleMarkerSymbol, PopupTemplate] = await loadModules([
    'esri/layers/GeoJSONLayer',
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
    title: '{SUBNAME} Substation',
    content: `
      <div class="popup-content">
        <div class="popup-row"><span class="popup-label">Substation ID:</span><span class="popup-value">{SUBSTATIONID}</span></div>
        <div class="popup-row"><span class="popup-label">Minimum KV:</span><span class="popup-value">{MIN_KV}</span></div>
        <div class="popup-row"><span class="popup-label">Number of Banks:</span><span class="popup-value">{NUMBANKS}</span></div>
        <div class="popup-row"><span class="popup-label">Redacted:</span><span class="popup-value">{REDACTED}</span></div>
        <div class="popup-row"><span class="popup-label">Ungrounded Banks:</span><span class="popup-value">{UNGROUNDEDBANKS}</span></div>
      </div>
    `
  });

  return new GeoJSONLayer({
    url: 'geojson/substations.geojson',
    title: 'Substations',
    renderer: renderer,
    popupTemplate: popupTemplate
  });
};
