// src/views/layers/createMapImageLayer.ts
import { loadModules } from 'esri-loader';

export const createMapImageLayer = async () => {
  const [MapImageLayer, PopupTemplate] = await loadModules([
    'esri/layers/MapImageLayer',
    'esri/PopupTemplate'
  ]);

  const popupTemplate = new PopupTemplate({
    title: 'Census Data',
    content: `
      <div class="popup-content">
        <div class="popup-row"><span class="popup-label">Name:</span><span class="popup-value">{NAME}</span></div>
        <div class="popup-row"><span class="popup-label">Population:</span><span class="popup-value">{POP2000}</span></div>
        <div class="popup-row"><span class="popup-label">Median Age:</span><span class="popup-value">{MED_AGE}</span></div>
        <div class="popup-row"><span class="popup-label">Households:</span><span class="popup-value">{HOUSEHOLDS}</span></div>
      </div>
    `
  });

  return new MapImageLayer({
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
    sublayers: [
      {
        id: 0,  // Adjust the sublayer id according to the layer of interest
        popupTemplate: popupTemplate
      }
    ]
  });
};
