import React from 'react';
import { Box, Checkbox, Stack, Text, Divider } from '@chakra-ui/react';

export interface Layer {
    visible: boolean;
    title: string;
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
    minElectrificationLayer: __esri.Layer;
    midElectrificationLayer: __esri.Layer;
    maxElectrificationLayer: __esri.Layer;
}

interface LayerListComponentProps {
    view: __esri.MapView;
    layers: Layers;
    onLayerChecked: (layerName: keyof Layers) => void;
}

const categorizeLayers = (layers: Layers) => {
    return {
        Utility: [
            { key: 'substationsLayer', layer: layers.substationsLayer },
            // { key: 'feederLayer', layer: layers.feederLayer },
            { key: 'lowCapacityFeederLayer', layer: layers.lowCapacityFeederLayer },
            { key: 'minElectrificationLayer', layer: layers.minElectrificationLayer },
            { key: 'midElectrificationLayer', layer: layers.midElectrificationLayer },
            { key: 'maxElectrificationLayer', layer: layers.maxElectrificationLayer },

        ],
        Population: [
            // { key: 'countyIncomeLayer', layer: layers.countyIncomeLayer },
            { key: 'tractIncomeLayer', layer: layers.tractIncomeLayer },
            // { key: 'countyAgeLayer', layer: layers.countyAgeLayer },
            { key: 'tractAgeLayer', layer: layers.tractAgeLayer },
        ],
        Climate: [
            { key: 'mapImageLayer', layer: layers.mapImageLayer }, // Assuming mapImageLayer is related to climate. Adjust accordingly.
        ],
    };
};

const LayerListComponent: React.FC<LayerListComponentProps> = ({ view, layers, onLayerChecked }) => {
    const categorizedLayers = categorizeLayers(layers);

    return (
        <Box position="absolute" top="10px" right="10px" p={6} bg="white" boxShadow="lg" borderRadius="lg" width="300px">
            {Object.entries(categorizedLayers).map(([category, categoryLayers]) => (
                <Box key={category} mb={4}>
                    <Text fontWeight="bold" fontSize="xl" mb={3}>{category}</Text>
                    <Stack spacing={3}>
                        {categoryLayers.map(({ key, layer }) => (
                            <Box key={key} p={2} _hover={{ bg: 'gray.100' }} borderRadius="md">
                                <Checkbox
                                    size="lg"
                                    isChecked={layer.visible}
                                    onChange={() => onLayerChecked(key as keyof Layers)}
                                >
                                    <Text fontSize="lg">{layer.title}</Text>
                                </Checkbox>
                            </Box>
                        ))}
                    </Stack>
                    <Divider mt={4} />
                </Box>
            ))}
        </Box>
    );
};

export default LayerListComponent;
