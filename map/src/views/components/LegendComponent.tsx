import React, { useEffect, useState } from 'react';
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
    const [legend, setLegend] = useState<__esri.Legend | null>(null)

  useEffect(() => {
    const loadLegend = async () => {
      const [Legend] = await loadModules(['esri/widgets/Legend']);

      if (!legend) {
        const legend = new Legend({
            view: view,
            layerInfos: []
        });

        view.ui.add(legend, {
            position: 'bottom-left'
        });

        setLegend(legend);
      }   
    };

    loadLegend();
  }, [view, layers, legend, setLegend]);

  return null;
};

export default LegendComponent;
