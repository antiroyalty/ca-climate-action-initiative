// src/views/layers/createFeederLayer.ts
import { loadModules } from 'esri-loader';

export const createFeederLayer = async () => {
  const [GeoJSONLayer, SimpleRenderer, SimpleLineSymbol] = await loadModules([
    'esri/layers/GeoJSONLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleLineSymbol'
  ]);

  const lineSymbol = new SimpleLineSymbol({
    color: [226, 119, 40], // Orange
    width: 1
  });

  const renderer = new SimpleRenderer({
    symbol: lineSymbol
  });

  return new GeoJSONLayer({
    url: 'geojson/feeder.geojson',
    title: 'Feeders',
    renderer: renderer,
    visible: false  // Set to false to disable by default
  });
};
