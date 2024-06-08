import { loadModules } from 'esri-loader';

export const createACSMedianIncomeLayer = async () => {
  const [FeatureLayer, PopupTemplate, ClassBreaksRenderer, SimpleFillSymbol] = await loadModules([
    'esri/layers/FeatureLayer',
    'esri/PopupTemplate',
    'esri/renderers/ClassBreaksRenderer',
    'esri/symbols/SimpleFillSymbol'
  ]);

  const popupTemplate = new PopupTemplate({
    title: 'ACS Data - Median Income',
    content: `
      <div class="popup-content">
        <div class="popup-row"><span class="popup-label">Tract Name:</span><span class="popup-value">{NAME}</span></div>
        <div class="popup-row"><span class="popup-label">Median Household Income:</span><span class="popup-value">{B19049_001E}</span></div>
        <div class="popup-row"><span class="popup-label">County:</span><span class="popup-value">{County}</span></div>
      </div>
    `
  });

  const colors = [
    [179, 0, 0, 0.55],    // very dark red (lowest income)
    [159, 43, 0, 0.55],   // very dark orange
    [204, 102, 0, 0.55],  // dark orange
    [255, 153, 51, 0.55], // orange
    [255, 204, 153, 0.55],// light orange
    [255, 255, 204, 0.55] // lightest yellow (highest income)
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
    field: 'B19049_001E',
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 45000,
        symbol: createSymbol(colors[0]),
        label: '< $45,000'
      },
      {
        minValue: 45000,
        maxValue: 90000,
        symbol: createSymbol(colors[1]),
        label: '$45,000 - $90,000'
      },
      {
        minValue: 90000,
        maxValue: 140000,
        symbol: createSymbol(colors[2]),
        label: '$90,000 - $140,000'
      },
      {
        minValue: 140000,
        maxValue: 190000,
        symbol: createSymbol(colors[3]),
        label: '$140,000 - $190,000'
      },
      {
        minValue: 190000,
        maxValue: 220000,
        symbol: createSymbol(colors[4]),
        label: '$190,000 - $220,000'
      },
      {
        minValue: 220000,
        maxValue: 3000000,
        symbol: createSymbol(colors[5]),
        label: '> $220,000'
      }
    ]
  });

  const countyLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/1',
    title: 'County Median Income',
    outFields: ['*'],
    popupTemplate: popupTemplate,
    renderer: renderer,
    visible: false,
  });

  const tractLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/2',
    title: 'Census Tract - Median Income',
    outFields: ['*'],
    popupTemplate: popupTemplate,
    renderer: renderer,
    visible: false,
  });

  // Log layers to verify correct creation
  console.log('County Median Income Layer:', countyLayer);
  console.log('Tract Median Income Layer:', tractLayer);

  // Add feature count logging to debug data availability
  countyLayer.queryFeatureCount().then((count: number) => {
    console.log('Number of features in County Median Income Layer:', count);
  });

  tractLayer.queryFeatureCount().then((count: number) => {
    console.log('Number of features in Census Tract Median Income Layer:', count);
  });

  return [countyLayer, tractLayer];
};
