// src/views/layers/createMedianAgeLayer.ts
import { loadModules } from 'esri-loader';

export const createACSMedianAgeLayer = async () => {
  const [FeatureLayer, PopupTemplate, ClassBreaksRenderer, SimpleFillSymbol] = await loadModules([
    'esri/layers/FeatureLayer',
    'esri/PopupTemplate',
    'esri/renderers/ClassBreaksRenderer',
    'esri/symbols/SimpleFillSymbol'
  ]);

  const popupTemplate = new PopupTemplate({
    title: 'ACS Data - Median Age',
    content: `
      <div class="popup-content">
        <div class="popup-row"><span class="popup-label">Tract Name:</span><span class="popup-value">{NAME}</span></div>
        <div class="popup-row"><span class="popup-label">Median Age of Total Population:</span><span class="popup-value">{B01002e1}</span></div>
        <div class="popup-row"><span class="popup-label">Median Age of Male Population:</span><span class="popup-value">{B01002e2}</span></div>
        <div class="popup-row"><span class="popup-label">Median Age of Female Population:</span><span class="popup-value">{B01002e3}</span></div>
      </div>
    `
  });

  const colors = [
    [250, 204, 255, 0.5], // pink1
    [246, 158, 255, 0.5], // pink2
    [152, 49, 163, 0.5],  // pink3
    [121, 12, 133, 0.5]   // pink4
  ];

  const createSymbol = (color: number[]) => {
    return new SimpleFillSymbol({
      color: color,
      outline: {
        color: [67, 3, 74, 1],
        width: 1
      }
    });
  };

  const renderer = new ClassBreaksRenderer({
    field: 'B01002e1',
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 30,
        symbol: createSymbol(colors[0]),
        label: '0 - 30'
      },
      {
        minValue: 30,
        maxValue: 45,
        symbol: createSymbol(colors[1]),
        label: '30 - 45'
      },
      {
        minValue: 45,
        maxValue: 60,
        symbol: createSymbol(colors[2]),
        label: '45 - 60'
      },
      {
        minValue: 60,
        maxValue: 100,
        symbol: createSymbol(colors[3]),
        label: '60 - 100'
      }
    ]
  });

  const countyLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Feed_Median_Age/FeatureServer/1',
    title: 'County - Median Age',
    outFields: ['*'],
    popupTemplate: popupTemplate,
    renderer: renderer,
    visible: false,
  });

  const tractLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Feed_Median_Age/FeatureServer/2',
    title: 'Census Tract - Median Age',
    outFields: ['*'],
    popupTemplate: popupTemplate,
    renderer: renderer,
    visible: false,
  });

  return [countyLayer, tractLayer];
};
