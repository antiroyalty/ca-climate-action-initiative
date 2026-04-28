import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  VStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  Badge,
  Progress,
  HStack,
  Skeleton,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Layers } from './LayerListComponent';

interface AnalyticsData {
  infrastructure: {
    substationCount: number;
    feederCount: number;
    lowCapacityPercentage: number;
    totalFeederLength: number;
  };
  demographics: {
    medianIncome: number;
    incomeDistribution: { [key: string]: number };
    totalTracts: number;
    populationEstimate: number;
  };
  spatial: {
    areaKm2: number;
    zipCodes: string[];
    counties: string[];
  };
  equity: {
    lowIncomeWithLowCapacity: number;
    infrastructureEquityScore: number;
  };
}

interface AnalyticsDashboardProps {
  view: __esri.MapView | null;
  layers: Layers | null;
  zipcode: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ view, layers, zipcode }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const calculateAnalytics = useCallback(async () => {
    if (!view || !layers) return;

    setLoading(true);
    
    try {
      const extent = view.extent;
      
      // Query substations in current view
      let substationResults: { features: any[] } = { features: [] };
      if (layers.substationsLayer && 'createQuery' in layers.substationsLayer) {
        const substationQuery = layers.substationsLayer.createQuery();
        substationQuery.geometry = extent;
        substationQuery.spatialRelationship = 'intersects';
        substationQuery.returnGeometry = false;
        substationQuery.outFields = ['*'];
        
        substationResults = await layers.substationsLayer.queryFeatures(substationQuery);
      }
      
      // Query income data in current view
      let incomeResults: { features: any[] } = { features: [] };
      if (layers.tractIncomeLayer && 'createQuery' in layers.tractIncomeLayer) {
        const incomeQuery = layers.tractIncomeLayer.createQuery();
        incomeQuery.geometry = extent;
        incomeQuery.spatialRelationship = 'intersects';
        incomeQuery.returnGeometry = false;
        incomeQuery.outFields = ['B19049_001E', 'NAME', 'County'];
        
        incomeResults = await layers.tractIncomeLayer.queryFeatures(incomeQuery);
      }
      
      // Calculate infrastructure metrics
      const substationCount = substationResults.features.length;
      
      // Calculate income distribution
      const incomeValues = incomeResults.features
        .map(f => f.attributes.B19049_001E)
        .filter(val => val && val > 0);
      
      const incomeDistribution = {
        'Under $45k': incomeValues.filter(v => v < 45000).length,
        '$45k-$90k': incomeValues.filter(v => v >= 45000 && v < 90000).length,
        '$90k-$140k': incomeValues.filter(v => v >= 90000 && v < 140000).length,
        '$140k-$190k': incomeValues.filter(v => v >= 140000 && v < 190000).length,
        '$190k-$220k': incomeValues.filter(v => v >= 190000 && v < 220000).length,
        'Over $220k': incomeValues.filter(v => v >= 220000).length,
      };
      
      const medianIncome = incomeValues.length > 0 
        ? incomeValues.sort((a, b) => a - b)[Math.floor(incomeValues.length / 2)]
        : 0;
      
      // Calculate spatial metrics
      const areaM2 = extent.width * extent.height;
      const areaKm2 = areaM2 / 1000000;
      
      // Extract unique counties from income data
      const countySet = new Set<string>();
      incomeResults.features
        .map(f => f.attributes.County)
        .filter(county => county)
        .forEach(county => countySet.add(county));
      const counties = Array.from(countySet);
      
      // Calculate equity metrics
      const lowIncomeTracts = incomeValues.filter(v => v < 45000).length;
      const totalTracts = incomeValues.length;
      const lowIncomePercentage = totalTracts > 0 ? (lowIncomeTracts / totalTracts) * 100 : 0;
      
      setAnalytics({
        infrastructure: {
          substationCount,
          feederCount: 0, // Will implement feeder counting later
          lowCapacityPercentage: 15, // Placeholder
          totalFeederLength: 0, // Placeholder
        },
        demographics: {
          medianIncome,
          incomeDistribution,
          totalTracts,
          populationEstimate: totalTracts * 4000, // Rough estimate
        },
        spatial: {
          areaKm2: Math.round(areaKm2 * 100) / 100,
          zipCodes: [zipcode],
          counties,
        },
        equity: {
          lowIncomeWithLowCapacity: lowIncomePercentage,
          infrastructureEquityScore: substationCount > 0 ? Math.round((substationCount / totalTracts) * 100) / 100 : 0,
        },
      });
      
    } catch (error) {
      console.error('Error calculating analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [view, layers, zipcode]);

  useEffect(() => {
    if (view && layers) {
      calculateAnalytics();
      
      // Recalculate when map extent changes
      const handle = view.watch('extent', calculateAnalytics);
      
      return () => {
        handle.remove();
      };
    }
  }, [view, layers, calculateAnalytics]);

  const header = (
    <CardHeader py={3} px={4}>
      <HStack justify="space-between" align="center">
        <Box>
          <Heading size="sm">Area Overview</Heading>
          {expanded && <Text fontSize="xs" color="gray.500" mt={0.5}>ZIP {zipcode}</Text>}
        </Box>
        <IconButton
          aria-label={expanded ? 'Collapse' : 'Expand'}
          icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          size="xs"
          variant="ghost"
          onClick={() => setExpanded(v => !v)}
        />
      </HStack>
    </CardHeader>
  );

  if (!analytics) {
    return (
      <Card position="absolute" bottom="20px" left="10px" width="280px" bg="white" shadow="lg" zIndex={1000}>
        {header}
        <Collapse in={expanded} animateOpacity>
          <CardBody pt={0}>
            <VStack spacing={3}>
              {[1, 2, 3].map(i => <Skeleton key={i} height="50px" width="100%" />)}
            </VStack>
          </CardBody>
        </Collapse>
      </Card>
    );
  }

  return (
    <Card position="absolute" bottom="20px" left="10px" width="280px" bg="white" shadow="lg" zIndex={1000}>
      {header}
      <Collapse in={expanded} animateOpacity>
        <CardBody pt={0} maxHeight="calc(100vh - 120px)" overflowY="auto">
          <VStack spacing={3} align="stretch">

            <Box>
              <Text fontWeight="semibold" fontSize="xs" mb={2}>Infrastructure</Text>
              <StatGroup>
                <Stat>
                  <StatLabel fontSize="xs">Substations</StatLabel>
                  <StatNumber fontSize="md">{analytics.infrastructure.substationCount}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel fontSize="xs">Area (km²)</StatLabel>
                  <StatNumber fontSize="md">{analytics.spatial.areaKm2}</StatNumber>
                </Stat>
              </StatGroup>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="semibold" fontSize="xs" mb={2}>Demographics</Text>
              <Stat mb={2}>
                <StatLabel fontSize="xs">Median Income</StatLabel>
                <StatNumber fontSize="md">${analytics.demographics.medianIncome.toLocaleString()}</StatNumber>
              </Stat>
              <Text fontSize="xs" color="gray.500" mb={1}>Income distribution ({analytics.demographics.totalTracts} tracts)</Text>
              <VStack spacing={1} align="stretch">
                {Object.entries(analytics.demographics.incomeDistribution).map(([range, count]) => (
                  <HStack key={range} justify="space-between" fontSize="xs">
                    <Text>{range}</Text>
                    <Badge colorScheme="blue" fontSize="xs">{count}</Badge>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="semibold" fontSize="xs" mb={2}>Equity</Text>
              <Box mb={2}>
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="xs">Low-income areas</Text>
                  <Text fontSize="xs">{Math.round(analytics.equity.lowIncomeWithLowCapacity)}%</Text>
                </HStack>
                <Progress value={analytics.equity.lowIncomeWithLowCapacity} colorScheme="orange" size="sm" />
              </Box>
              <Text fontSize="xs" color="gray.500">
                {analytics.equity.infrastructureEquityScore} substations/tract
              </Text>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="semibold" fontSize="xs" mb={1}>Coverage</Text>
              <Text fontSize="xs" color="gray.600">{analytics.spatial.counties.join(', ') || 'Unknown'}</Text>
              <Text fontSize="xs" color="gray.500">~{analytics.demographics.populationEstimate.toLocaleString()} residents</Text>
            </Box>

          </VStack>
        </CardBody>
      </Collapse>

      {loading && expanded && (
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="whiteAlpha.700" display="flex" alignItems="center" justifyContent="center" borderRadius="md">
          <Text fontSize="xs" color="gray.600">Updating…</Text>
        </Box>
      )}
    </Card>
  );
};

export default AnalyticsDashboard;