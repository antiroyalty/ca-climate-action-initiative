import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import LayerListComponent, { Layers } from './components/LayerListComponent';
import LegendComponent from './components/LegendComponent';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SearchBar from './components/SearchBar';
// Layers
import { createFeederLayer } from './layers/createFeederLayer';
import { createLowCapacityFeederLayer } from './layers/createLowCapacityFeederLayer';
import { createMapImageLayer } from './layers/createMapImageLayer';
import { createSubstationsLayer } from './layers/createSubstationsLayer';
import { createACSMedianAgeLayer } from './layers/createMedianAgeLayer';
import { createACSMedianIncomeLayer } from './layers/createMedianIncomeLayer';
import { createElectrificationLayers } from './layers/createElectrificationLayers';
<<<<<<< Updated upstream
=======
import { createTransmissionCATSLayer } from './layers/createTransmissionCATSLayer';
import {
  createResearchLayers,
  updateBillRenderer,
  updatePaybackRenderer,
  updateEACRenderer,
  ResearchScenarioKey,
  ResearchIncentiveKey,
} from './layers/createResearchLayers';
>>>>>>> Stashed changes

interface MapViewProps {
  zipcode: string;
}

const MapView: React.FC<MapViewProps> = ({ zipcode }) => {
  const [view, setView] = useState<__esri.MapView | null>(null);
  const [layers, setLayers] = useState<Layers | null>(null);
  const [researchScenario, setResearchScenario] = useState<ResearchScenarioKey>('baseline');
  const [researchIncentive, setResearchIncentive] = useState<ResearchIncentiveKey>('full');

  useEffect(() => {
    const loadLayers = async () => {
      const [countyAgeLayer, tractAgeLayer] = await createACSMedianAgeLayer();
      const [countyIncomeLayer, tractIncomeLayer] = await createACSMedianIncomeLayer();
      const feederLayer = await createFeederLayer();
      const lowCapacityFeederLayer = await createLowCapacityFeederLayer();
      const mapImageLayer = await createMapImageLayer();
      const substationsLayer = await createSubstationsLayer();
      const { minElectrificationLayer, minElectrificationHalfCustLayer, midElectrificationLayer, maxElectrificationLayer } = await createElectrificationLayers();
<<<<<<< Updated upstream
=======
      const transmissionCATSLayer = await createTransmissionCATSLayer();
      const { billLayer, paybackLayer, eacLayer, solarSizeLayer } = await createResearchLayers();
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
        transmissionCATSLayer,
        researchBillLayer: billLayer,
        researchPaybackLayer: paybackLayer,
        researchEACLayer: eacLayer,
        researchSolarSizeLayer: solarSizeLayer,
>>>>>>> Stashed changes
      });
    };

    loadLayers();
  }, []);

  // Update research layer renderers when scenario or incentive level changes
  useEffect(() => {
    if (!layers) return;
    updateBillRenderer(layers.researchBillLayer, researchScenario);
    updatePaybackRenderer(layers.researchPaybackLayer, researchScenario, researchIncentive);
    updateEACRenderer(layers.researchEACLayer, researchScenario);
  }, [researchScenario, researchIncentive, layers]);

  const handleLocationSelect = (location: { latitude: number; longitude: number }, address: string) => {
    if (view) {
      view.goTo({ center: [location.longitude, location.latitude], zoom: 15 });
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <MapComponent view={view} setView={setView} layers={layers} zipcode={zipcode} />

      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1002 }}>
        <SearchBar onLocationSelect={handleLocationSelect} />
      </div>

      {view && layers && (
        <>
          <LayerListComponent
            view={view}
            layers={layers}
            onLayerChecked={(layerName: keyof Layers) => {
              layers[layerName].visible = !layers[layerName].visible;
              setLayers({ ...layers });
            }}
            researchScenario={researchScenario}
            researchIncentive={researchIncentive}
            onResearchScenarioChange={setResearchScenario}
            onResearchIncentiveChange={setResearchIncentive}
          />
          <LegendComponent view={view} layers={layers} />
          <AnalyticsDashboard view={view} layers={layers} zipcode={zipcode} />
        </>
      )}
    </div>
  );
};

export default MapView;
