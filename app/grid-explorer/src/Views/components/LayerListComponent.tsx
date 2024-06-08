// import React, { useEffect } from 'react';
// import { loadModules } from 'esri-loader';

// interface LayerListComponentProps {
//   view: __esri.MapView;
//   layers: {
//     countyIncomeLayer: __esri.Layer;
//     tractIncomeLayer: __esri.Layer;
//     countyAgeLayer: __esri.Layer;
//     tractAgeLayer: __esri.Layer;
//     feederLayer: __esri.Layer;
//     lowCapacityFeederLayer: __esri.Layer;
//     mapImageLayer: __esri.Layer;
//     substationsLayer: __esri.Layer;
//   };
// }

// const LayerListComponent: React.FC<LayerListComponentProps> = ({ view, layers }) => {
//   useEffect(() => {
//     const loadLayerList = async () => {
//       const [LayerList] = await loadModules(['esri/widgets/LayerList']);

//       const layerList = new LayerList({
//         view: view,
//         listItemCreatedFunction: function (event: any) {
//           const item = event.item;
//         }
//       });

//       view.ui.add(layerList, {
//         position: 'top-right'
//       });
//     };

//     loadLayerList();
//   }, [view, layers]);

//   return null;
// };

// export default LayerListComponent;

import React from 'react';
import { Box, Checkbox, Stack, Text } from '@chakra-ui/react';


export interface Layer {
    visible: boolean
}

export interface Layers {
    countyIncomeLayer: __esri.Layer;
    tractIncomeLayer: __esri.Layer;
    countyAgeLayer: __esri.Layer;
    tractAgeLayer: __esri.Layer;
    feederLayer: __esri.Layer;
    lowCapacityFeederLayer: __esri.Layer;
    mapImageLayer: __esri.Layer;
    substationsLayer: __esri.Layer;
  }

  
interface LayerListComponentProps {
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
  onLayerChecked: (layerName: keyof Layers) => void;
}

const LayerListComponent: React.FC<LayerListComponentProps> = ({ view, layers, onLayerChecked }) => {
  return (
    <Box position="absolute" top="10px" right="10px" p={4} bg="white" boxShadow="md" borderRadius="md">
      <Stack spacing={3}>
        {Object.keys(layers).map((key) => {
          const layer = layers[key as keyof typeof layers];
          return (
            <Box key={key}>
              <Checkbox
                isChecked={layer.visible}
                onChange={(e) => (onLayerChecked(key as keyof Layers))}
              >
                <Text>{key}</Text>
              </Checkbox>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};


export default LayerListComponent;
