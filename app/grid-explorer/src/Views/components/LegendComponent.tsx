import React, { useEffect } from 'react';
import { loadModules } from 'esri-loader';

interface LegendComponentProps {
  view: __esri.MapView;
  layers: {
    countyIncomeLayer: __esri.Layer;
    tractIncomeLayer: __esri.Layer;
    countyAgeLayer: __esri.Layer;
    tractAgeLayer: __esri.Layer;
    feederLayer: __esri.Layer;
    lowCapacityFeederLayer: __esri.Layer;
    mapImageLayer: __esri.Layer;
    substationsLayer: __esri.Layer;
  };
}

const LegendComponent: React.FC<LegendComponentProps> = ({ view, layers }) => {
  useEffect(() => {
    const loadLegend = async () => {
      const [Legend] = await loadModules(['esri/widgets/Legend']);

      const legend = new Legend({
        view: view,
        layerInfos: []
      });

      view.ui.add(legend, {
        position: 'bottom-left'
      });
    };

    loadLegend();
  }, [view, layers]);

  return null;
};

export default LegendComponent;
