// src/views/MapView.tsx
import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import '@arcgis/core/assets/esri/themes/light/main.css';
import './MapView.css'; // Custom CSS for styling the popup
import { createFeederLayer } from './layers/createFeederLayer';
import { createLowCapacityFeederLayer } from './layers/createLowCapacityFeederLayer';
import { createMapImageLayer } from './layers/createMapImageLayer';
import { createSubstationsLayer } from './layers/createSubstationsLayer';

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const layerListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = async () => {
    const [
      Map,
      MapView,
      LayerList
    ] = await loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/LayerList'
    ]);

    const map = new Map({
      basemap: 'topo-vector'
    });

    const view = new MapView({
      container: mapRef.current as HTMLDivElement,
      map: map,
      center: [-122.2, 37.5],
      zoom: 9
    });

    const mapImageLayer = await createMapImageLayer();
    const feederLayer = await createFeederLayer();
    const substationsLayer = await createSubstationsLayer();
    const lowCapacityFeederLayer = await createLowCapacityFeederLayer();

    map.removeAll();
    map.addMany([mapImageLayer, feederLayer, substationsLayer, lowCapacityFeederLayer]);

    view.popup.autoOpenEnabled = false;

    view.on('click', (event: __esri.ViewClickEvent) => {
      view.hitTest(event).then((response: __esri.HitTestResult) => {
        const results = response.results as __esri.GraphicHit[];
        const substationResult = results.find((result) => result.graphic.layer === substationsLayer);

        if (substationResult) {
          const graphic = substationResult.graphic;
          view.popup.open({
            features: [graphic],
            location: event.mapPoint
          });
        }
      });
    });

    const layerList = new LayerList({
      view: view,
    });

    view.ui.add(layerList, {
      position: "top-right"
    });
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
      <div ref={layerListRef} className="layer-list"></div>
    </div>
  );
};

export default MapView;