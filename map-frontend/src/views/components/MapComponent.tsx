import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import '@arcgis/core/assets/esri/themes/light/main.css';
import { createMapImageLayer } from '../layers/createMapImageLayer';
import { Layers } from './LayerListComponent';

interface MapComponentProps {
  view: __esri.MapView | null;
  setView: React.Dispatch<React.SetStateAction<__esri.MapView | null>>;
  layers: Layers | null;
  zipcode: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ view, setView, layers, zipcode }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getGeocode = async (zipcode: string) => {
      const apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
      console.log('ArcGIS API Key present:', !!apiKey);
      console.log('Environment:', process.env.NODE_ENV);
      
      const endpoint = 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
      const params = new URLSearchParams({
        SingleLine: zipcode,
        outFields: 'Match_addr,Addr_type',
        f: 'json',
      });
      
      if (apiKey) {
        params.append('token', apiKey);
      } else {
        console.warn('No ArcGIS API key found. Geocoding may fail.');
      }

      const url = `${endpoint}?${params.toString()}`;

      try {
        const response = await fetch(url);
        console.log('Geocode response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Geocode API error:', errorText);
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Geocode response:', data);
        
        if (data.candidates && data.candidates.length > 0) {
          const { location } = data.candidates[0];
          console.log("Location found:", location);
          return { latitude: location.y, longitude: location.x };
        } else {
          throw new Error('No candidates found for zipcode: ' + zipcode);
        }
      } catch (error) {
        console.error('Error fetching geocode:', error);
        throw error;
      }
    };

    const loadMap = async (latitude: number, longitude: number) => {
      try {
        console.log('Loading map with coordinates:', { latitude, longitude });
        console.log('Layers available:', !!layers);
        
        const mapImageLayer = await createMapImageLayer();
        if (!layers) {
          console.error('No layers available for map loading');
          return;
        }

        if (view == null) {
          console.log('Creating new map view with layers:', Object.keys(layers));
          const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);

        const map = new Map({
          basemap: 'topo-vector'
        });

        const mapView = new MapView({
          container: mapRef.current as HTMLDivElement,
          map: map,
          center: [longitude, latitude],
          zoom: 13
        });

        map.removeAll();
        map.addMany(Object.values(layers));
        mapView.popup.autoOpenEnabled = false;

        mapView.on('click', (event: __esri.ViewClickEvent) => {
          mapView.hitTest(event).then((response: __esri.HitTestResult) => {
            const results = response.results as __esri.GraphicHit[];
            const featureResult = results.find(
              (result) =>
                result.graphic.layer === layers.tractIncomeLayer ||
                result.graphic.layer === layers.tractAgeLayer ||
                result.graphic.layer === layers.substationsLayer
            );

            if (featureResult) {
              const graphic = featureResult.graphic;
              mapView.popup.open({
                features: [graphic],
                location: event.mapPoint
              });
            }
          });
        });

          setView(mapView);
        } else {
          console.log('Map view already exists:', { map: view.map });
        }
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    const initializeMap = async () => {
      console.log('Initializing map with zipcode:', zipcode);
      if (zipcode) {
        try {
          const location = await getGeocode(zipcode);
          console.log('Geocoding successful, loading map...');
          await loadMap(location.latitude, location.longitude);
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      } else {
        console.log('No zipcode provided for map initialization');
      }
    };

    initializeMap();
  }, [zipcode, view, setView, layers]);

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
  );
};

export default MapComponent;
