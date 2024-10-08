import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import LayerListComponent, { Layers } from './components/LayerListComponent';
import LegendComponent from './components/LegendComponent';
// Layers
import { createFeederLayer } from './layers/createFeederLayer';
import { createLowCapacityFeederLayer } from './layers/createLowCapacityFeederLayer';
import { createMapImageLayer } from './layers/createMapImageLayer';
import { createSubstationsLayer } from './layers/createSubstationsLayer';
import { createACSMedianAgeLayer } from './layers/createMedianAgeLayer';
import { createACSMedianIncomeLayer } from './layers/createMedianIncomeLayer';
import { createElectrificationLayers } from './layers/createElectrificationLayers';

interface MapViewProps {
  zipcode: string;
}

const MapView: React.FC<MapViewProps> = ({ zipcode }) => {
  const [view, setView] = useState<__esri.MapView | null>(null);
  const [layers, setLayers] = useState<Layers | null>(null);

  useEffect(() => {
    const loadLayers = async () => {
      const [countyAgeLayer, tractAgeLayer] = await createACSMedianAgeLayer();
      const [countyIncomeLayer, tractIncomeLayer] = await createACSMedianIncomeLayer();
      const feederLayer = await createFeederLayer();
      const lowCapacityFeederLayer = await createLowCapacityFeederLayer();
      const mapImageLayer = await createMapImageLayer();
      const substationsLayer = await createSubstationsLayer();
      const { minElectrificationLayer, minElectrificationHalfCustLayer, midElectrificationLayer, maxElectrificationLayer } = await createElectrificationLayers();

      setLayers({
        countyAgeLayer,
        tractAgeLayer,
        countyIncomeLayer,
        tractIncomeLayer,
        feederLayer,
        lowCapacityFeederLayer,
        mapImageLayer,
        substationsLayer,
        minElectrificationLayer,
        minElectrificationHalfCustLayer,
        midElectrificationLayer,
        maxElectrificationLayer,
      });
    };

    loadLayers();
  }, [setLayers]);

  console.log("zipcode is ----")
  console.log(zipcode)

  console.log("re-rendering mapview", layers, view)

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <MapComponent view={view} setView={setView} layers={layers} zipcode={zipcode} />
      {view && layers && (
        <>
          <LayerListComponent view={view} layers={layers} onLayerChecked={(layerName: keyof Layers) => {
            layers[layerName].visible = !layers[layerName].visible
            setLayers({...layers})
          }} />
          <LegendComponent view={view} layers={layers} />
        </>
      )}
    </div>
  );
};

export default MapView;
