import React from 'react';
import { Box, Checkbox, Stack, Text, Divider, Select, RadioGroup, Radio } from '@chakra-ui/react';
import {
    RESEARCH_SCENARIOS,
    RESEARCH_INCENTIVES,
    ResearchScenarioKey,
    ResearchIncentiveKey,
} from '../layers/createResearchLayers';

export interface Layer {
    visible: boolean;
    title: string;
}

export interface Layers {
    countyIncomeLayer: __esri.FeatureLayer;
    tractIncomeLayer: __esri.FeatureLayer;
    countyAgeLayer: __esri.FeatureLayer;
    tractAgeLayer: __esri.FeatureLayer;
    feederLayer: __esri.GeoJSONLayer;
    lowCapacityFeederLayer: __esri.GeoJSONLayer;
    mapImageLayer: __esri.MapImageLayer;
    substationsLayer: __esri.FeatureLayer;
    minElectrificationLayer: __esri.FeatureLayer;
    minElectrificationHalfCustLayer: __esri.FeatureLayer;
    midElectrificationLayer: __esri.FeatureLayer;
    maxElectrificationLayer: __esri.FeatureLayer;
    transmissionCATSLayer: __esri.GeoJSONLayer;
    researchBillLayer: __esri.GeoJSONLayer;
    researchPaybackLayer: __esri.GeoJSONLayer;
    researchEACLayer: __esri.GeoJSONLayer;
    researchSolarSizeLayer: __esri.GeoJSONLayer;
}

interface LayerListComponentProps {
    view: __esri.MapView;
    layers: Layers;
    onLayerChecked: (layerName: keyof Layers) => void;
    researchScenario: ResearchScenarioKey;
    researchIncentive: ResearchIncentiveKey;
    onResearchScenarioChange: (s: ResearchScenarioKey) => void;
    onResearchIncentiveChange: (i: ResearchIncentiveKey) => void;
}

const categorizeLayers = (layers: Layers) => {
    return {
        Utility: [
            { key: 'substationsLayer', layer: layers.substationsLayer },
            { key: 'transmissionCATSLayer', layer: layers.transmissionCATSLayer },
        ],
        Population: [
            { key: 'mapImageLayer', layer: layers.mapImageLayer },
            { key: 'tractIncomeLayer', layer: layers.tractIncomeLayer },
            { key: 'tractAgeLayer', layer: layers.tractAgeLayer },
        ],
        'Research Findings': [
            { key: 'researchBillLayer', layer: layers.researchBillLayer },
            { key: 'researchPaybackLayer', layer: layers.researchPaybackLayer },
            { key: 'researchEACLayer', layer: layers.researchEACLayer },
            { key: 'researchSolarSizeLayer', layer: layers.researchSolarSizeLayer },
        ],
    };
};

const LayerListComponent: React.FC<LayerListComponentProps> = ({
    view,
    layers,
    onLayerChecked,
    researchScenario,
    researchIncentive,
    onResearchScenarioChange,
    onResearchIncentiveChange,
}) => {
    const categorizedLayers = categorizeLayers(layers);
    const paybackVisible = layers.researchPaybackLayer?.visible;

    return (
        <Box
            position="absolute"
            top="10px"
            right="10px"
            p={4}
            bg="white"
            boxShadow="lg"
            borderRadius="lg"
            width="300px"
            maxHeight="90vh"
            overflowY="auto"
        >
            {Object.entries(categorizedLayers).map(([category, categoryLayers]) => (
                <Box key={category} mb={4}>
                    <Text fontWeight="bold" fontSize="md" mb={2}>{category}</Text>

                    {category === 'Research Findings' && (
                        <Box mb={3} p={2} bg="gray.50" borderRadius="md">
                            <Text fontSize="xs" fontWeight="semibold" color="gray.600" mb={1}>Scenario</Text>
                            <Select
                                size="sm"
                                value={researchScenario}
                                onChange={e => onResearchScenarioChange(e.target.value as ResearchScenarioKey)}
                            >
                                {RESEARCH_SCENARIOS.map(s => (
                                    <option key={s.key} value={s.key}>{s.label}</option>
                                ))}
                            </Select>

                            {paybackVisible && (
                                <Box mt={2}>
                                    <Text fontSize="xs" fontWeight="semibold" color="gray.600" mb={1}>
                                        Payback: Incentive Level
                                    </Text>
                                    <RadioGroup
                                        value={researchIncentive}
                                        onChange={v => onResearchIncentiveChange(v as ResearchIncentiveKey)}
                                    >
                                        <Stack direction="column" spacing={0}>
                                            {RESEARCH_INCENTIVES.map(inc => (
                                                <Radio key={inc.key} value={inc.key} size="sm">
                                                    <Text fontSize="xs">{inc.label}</Text>
                                                </Radio>
                                            ))}
                                        </Stack>
                                    </RadioGroup>
                                </Box>
                            )}
                        </Box>
                    )}

                    <Stack spacing={2}>
                        {categoryLayers.map(({ key, layer }) => (
                            <Box key={key} px={2} py={1} _hover={{ bg: 'gray.100' }} borderRadius="md">
                                <Checkbox
                                    size="md"
                                    isChecked={layer.visible}
                                    onChange={() => onLayerChecked(key as keyof Layers)}
                                >
                                    <Text fontSize="sm">{layer.title}</Text>
                                </Checkbox>
                            </Box>
                        ))}
                    </Stack>
                    <Divider mt={3} />
                </Box>
            ))}
        </Box>
    );
};

export default LayerListComponent;
