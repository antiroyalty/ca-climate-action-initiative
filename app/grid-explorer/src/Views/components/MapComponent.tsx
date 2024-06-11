import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import '@arcgis/core/assets/esri/themes/light/main.css';
import { createFeederLayer } from '../layers/createFeederLayer';
import { createLowCapacityFeederLayer } from '../layers/createLowCapacityFeederLayer';
import { createMapImageLayer } from '../layers/createMapImageLayer';
import { createSubstationsLayer } from '../layers/createSubstationsLayer';
import { createACSMedianAgeLayer } from '../layers/createMedianAgeLayer';
import { createACSMedianIncomeLayer } from '../layers/createMedianIncomeLayer';
import { Layers } from './LayerListComponent';

interface MapComponentProps {
  view : __esri.MapView | null;  
  setView: React.Dispatch<React.SetStateAction<__esri.MapView | null>>;
  layers: Layers | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ view, setView, layers }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
    const mapImageLayer = await createMapImageLayer();
      if (!layers) {
        return
      }

      if (view == null) {
        console.log("loadMap", {layers})
        const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);

        const map = new Map({
            basemap: 'topo-vector'
        });

        const view = new MapView({
            container: mapRef.current as HTMLDivElement,
            map: map,
            center: [-122.2, 37.7],
            zoom: 13
        });

        map.removeAll();

        map.addMany(Object.values(layers));

        view.popup.autoOpenEnabled = false;

        view.on('click', (event: __esri.ViewClickEvent) => {
            view.hitTest(event).then((response: __esri.HitTestResult) => {
            const results = response.results as __esri.GraphicHit[];
            const featureResult = results.find((result) =>
                result.graphic.layer === layers.tractIncomeLayer ||
                result.graphic.layer === layers.tractAgeLayer
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
    } else {
            // Setting visibility elsewhere already updates the MapView, so we don't need to do anything here.
            console.log({map: view.map})
    }
    
      
    };

    loadMap();
  }, [view, setView, layers]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>;
};

export default MapComponent;
