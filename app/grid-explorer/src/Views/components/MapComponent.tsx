import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import '@arcgis/core/assets/esri/themes/light/main.css';
import { createFeederLayer } from '../layers/createFeederLayer';
import { createLowCapacityFeederLayer } from '../layers/createLowCapacityFeederLayer';
import { createMapImageLayer } from '../layers/createMapImageLayer';
import { createSubstationsLayer } from '../layers/createSubstationsLayer';
import { createACSMedianAgeLayer } from '../layers/createMedianAgeLayer';
import { createACSMedianIncomeLayer } from '../layers/createMedianIncomeLayer';

interface MapComponentProps {
  setView: React.Dispatch<React.SetStateAction<__esri.MapView | null>>;
}

const MapComponent: React.FC<MapComponentProps> = ({ setView }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);

      const map = new Map({
        basemap: 'topo-vector'
      });

      const view = new MapView({
        container: mapRef.current as HTMLDivElement,
        map: map,
        center: [-122.2, 37.7],
        zoom: 10
      });

      const mapImageLayer = await createMapImageLayer();
      const feederLayer = await createFeederLayer();
      const lowCapacityFeeder = await createLowCapacityFeederLayer();
      const substationsLayer = await createSubstationsLayer();
      const [countyAgeLayer, tractAgeLayer] = await createACSMedianAgeLayer();
      const [countyIncomeLayer, tractIncomeLayer] = await createACSMedianIncomeLayer();

      map.removeAll();
      map.addMany([tractAgeLayer, tractIncomeLayer, lowCapacityFeeder, substationsLayer, mapImageLayer]);

      view.popup.autoOpenEnabled = false;

      view.on('click', (event: __esri.ViewClickEvent) => {
        view.hitTest(event).then((response: __esri.HitTestResult) => {
          const results = response.results as __esri.GraphicHit[];
          const featureResult = results.find((result) =>
            result.graphic.layer === tractIncomeLayer ||
            result.graphic.layer === tractAgeLayer
          );

          if (featureResult) {
            const graphic = featureResult.graphic;
            view.popup.open({
              features: [graphic],
              location: event.mapPoint
            });
          }
        });
      });

      setView(view);
    };

    loadMap();
  }, [setView]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>;
};

export default MapComponent;
