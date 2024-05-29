// src/views/MapView.tsx
import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';
import { Button } from '@chakra-ui/react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import './MapView.css';

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapView, setMapView] = useState<__esri.MapView | null>(null);
  const [feederLayer, setFeederLayer] = useState<__esri.GeoJSONLayer | null>(null);

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = async () => {
    const [
      Map, 
      MapView, 
      GeoJSONLayer, 
      MapImageLayer, 
      SimpleRenderer, 
      SimpleLineSymbol, 
      SimpleMarkerSymbol,
      PopupTemplate
    ] = await loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/GeoJSONLayer',
      'esri/layers/MapImageLayer',
      'esri/renderers/SimpleRenderer',
      'esri/symbols/SimpleLineSymbol',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/PopupTemplate'
    ]);

    const map = new Map({
      basemap: 'topo-vector'
    });

    const view = new MapView({
      container: mapRef.current as HTMLDivElement,
      map: map,
      center: [-122.2, 37.5], // Longitude, latitude
      zoom: 9
    });

    const mapImageLayer = createMapImageLayer(MapImageLayer);
    const feederLayer = createFeederLayer(GeoJSONLayer, SimpleRenderer, SimpleLineSymbol);
    const substationsLayer = createSubstationsLayer(GeoJSONLayer, SimpleRenderer, SimpleMarkerSymbol, PopupTemplate);

    map.add(mapImageLayer);
    // map.add(feederLayer);
    map.add(substationsLayer);

    view.popup.autoOpenEnabled = false; // Disable the default popup behavior

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

    setMapView(view);
    // setFeederLayer(feederLayer);
  };

  const createMapImageLayer = (MapImageLayer: typeof __esri.MapImageLayer) => {
    return new MapImageLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer'
    });
  };

  const createFeederLayer = (
    GeoJSONLayer: typeof __esri.GeoJSONLayer, 
    SimpleRenderer: typeof __esri.SimpleRenderer, 
    SimpleLineSymbol: typeof __esri.SimpleLineSymbol
  ) => {
    const lineSymbol = new SimpleLineSymbol({
      color: [226, 119, 40], // Orange
      width: 1
    });

    const renderer = new SimpleRenderer({
      symbol: lineSymbol
    });

    return new GeoJSONLayer({
      url: 'geojson/feeder.geojson',
      title: 'Feeder Detail',
      renderer: renderer
    });
  };

  const createSubstationsLayer = (
    GeoJSONLayer: typeof __esri.GeoJSONLayer, 
    SimpleRenderer: typeof __esri.SimpleRenderer, 
    SimpleMarkerSymbol: typeof __esri.SimpleMarkerSymbol,
    PopupTemplate: typeof __esri.PopupTemplate
  ) => {
    const markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 255], // Purple
      size: 6
    });

    const renderer = new SimpleRenderer({
      symbol: markerSymbol
    });

    const popupTemplate = new PopupTemplate({
        title: "{SUBNAME} Substation",
        content: `
        <div class="popup-content">
          <div class="popup-row"><span class="popup-label">Substation ID:</span><span class="popup-value">{SUBSTATIONID}</span></div>
          <div class="popup-row"><span class="popup-label">Minimum KV:</span><span class="popup-value">{MIN_KV}</span></div>
          <div class="popup-row"><span class="popup-label">Number of Banks:</span><span class="popup-value">{NUMBANKS}</span></div>
        </div>
      `
    //   <div class="popup-row"><span class="popup-label">Ungrounded Banks:</span><span class="popup-value">{UNGROUNDEDBANKS}</span></div>
    //   <div class="popup-row"><span class="popup-label">Redacted:</span><span class="popup-value">{REDACTED}</span></div>
      });

    return new GeoJSONLayer({
      url: 'geojson/substations.geojson',
      title: 'Substations',
      renderer: renderer,
      popupTemplate: popupTemplate
    });
  };

  const toggleFeatureLayer = () => {
    if (feederLayer) {
      feederLayer.visible = !feederLayer.visible;
    }
  };

  return (
    <div>
      <Button onClick={toggleFeatureLayer}>Toggle Feeder Layer</Button>
      <div style={{ height: '100vh' }} ref={mapRef}></div>
    </div>
  );
};

export default MapView;
