// src/views/layers/createMapImageLayer.ts
import { loadModules } from 'esri-loader';
import '../MapView.css'

export const createMapImageLayer = async () => {
  const [MapImageLayer, SimpleRenderer, SimpleFillSymbol, PopupTemplate] = await loadModules([
    'esri/layers/MapImageLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleFillSymbol',
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

  const citySymbol = new SimpleFillSymbol({
    color: null,
    outline: {
      color: [100, 16, 192, 1], // RGBA
      width: 1
    }
  });

  const countySymbol = new SimpleFillSymbol({
    color: null,
    outline: {
      color: [26, 11, 187, 0.7], // RGBA
      width: 2
    }
  });

  const cityRenderer = new SimpleRenderer({
    symbol: citySymbol
  });

  const countyRenderer = new SimpleRenderer({
    symbol: countySymbol
  });

  return new MapImageLayer({
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
    title: 'County Boundaries',
    sublayers: [
      {
        title: 'Counties',
        id: 2,  // Adjust the sublayer id according to https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer
        visible: true,
        renderer: countyRenderer,
        popupTemplate: popupTemplate
      },
      {
        title: 'Census Block Groups',
        id: 1,
        renderer: cityRenderer,
        visible: false,
      }
    ]
  });

  // TODO: Ana, consider displaying this as a FeatureLayer if you don't mind the performance hit 
  // and want to actually show the county stats data in a popup
  // return new FeatureLayer({
  //   url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2',
  //   title: 'Census Counties',
  //   outFields: ['*'],
  //   popupTemplate: popupTemplate,
  //   renderer: countyRenderer,
  //   visible: true,
  // })
};
