import React from 'react';
import { SimpleGrid, Image, Box, Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, Text, Stat, StatLabel, StatNumber, useColorModeValue} from '@chakra-ui/react';

type MetricData = {
    title: string;
    quantity: string;
  };

const metrics: MetricData[] = [
    { title: '# of PG&E Substations', quantity: '740' },
    { title: '# of PG&E Feeders', quantity: '3,016' },
    { title: '# of PG&E Line Sections', quantity: '1,232,039' },
  ];

const MetricView: React.FC = () => {
    const bgColor = useColorModeValue('white', 'gray.700');  // Adapts color based on the theme

    return (
        <SimpleGrid columns={2} spacing={5}>
            {metrics.map((metric, index) => (
                <Box key={index} boxShadow="lg" p="2" rounded="lg" bg="white" width="100%" maxWidth="500px" overflow="hidden" cursor="pointer">
                        <Text fontSize="2xl">{metric.title}</Text>
                        <Text fontSize="8xl">{metric.quantity}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default MetricView;
