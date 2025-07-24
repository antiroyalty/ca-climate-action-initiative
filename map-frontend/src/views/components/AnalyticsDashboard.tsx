import React, { useEffect, useState } from 'react';
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
  Heading
} from '@chakra-ui/react';
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

  const calculateAnalytics = async () => {
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
  };

  useEffect(() => {
    if (view && layers) {
      calculateAnalytics();
      
      // Recalculate when map extent changes
      const handle = view.watch('extent', calculateAnalytics);
      
      return () => {
        handle.remove();
      };
    }
  }, [view, layers]);

  if (!analytics) {
    return (
      <Card position="absolute" top="20px" left="20px" width="320px" bg="white" shadow="lg" zIndex={1000}>
        <CardHeader>
          <Heading size="md">Analytics Dashboard</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} height="60px" width="100%" />
            ))}
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card position="absolute" top="20px" left="20px" width="320px" bg="white" shadow="lg" zIndex={1000}>
      <CardHeader>
        <Heading size="md">Analytics Dashboard</Heading>
        <Text fontSize="sm" color="gray.600">ZIP Code: {zipcode}</Text>
      </CardHeader>
      
      <CardBody>
        <VStack spacing={4} align="stretch">
          
          {/* Infrastructure Metrics */}
          <Box>
            <Text fontWeight="bold" mb={2}>Infrastructure</Text>
            <StatGroup>
              <Stat>
                <StatLabel fontSize="xs">Substations</StatLabel>
                <StatNumber fontSize="lg">{analytics.infrastructure.substationCount}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="xs">Area (km²)</StatLabel>
                <StatNumber fontSize="lg">{analytics.spatial.areaKm2}</StatNumber>
              </Stat>
            </StatGroup>
          </Box>

          <Divider />

          {/* Demographics */}
          <Box>
            <Text fontWeight="bold" mb={2}>Demographics</Text>
            <Stat mb={3}>
              <StatLabel fontSize="xs">Median Income</StatLabel>
              <StatNumber fontSize="lg">${analytics.demographics.medianIncome.toLocaleString()}</StatNumber>
            </Stat>
            
            <Text fontSize="xs" mb={2}>Income Distribution ({analytics.demographics.totalTracts} tracts)</Text>
            <VStack spacing={1} align="stretch">
              {Object.entries(analytics.demographics.incomeDistribution).map(([range, count]) => (
                <HStack key={range} justify="space-between" fontSize="xs">
                  <Text>{range}</Text>
                  <Badge colorScheme="blue" size="sm">{count}</Badge>
                </HStack>
              ))}
            </VStack>
          </Box>

          <Divider />

          {/* Equity Analysis */}
          <Box>
            <Text fontWeight="bold" mb={2}>Equity Metrics</Text>
            <VStack spacing={2} align="stretch">
              <Box>
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="xs">Low Income Areas</Text>
                  <Text fontSize="xs">{Math.round(analytics.equity.lowIncomeWithLowCapacity)}%</Text>
                </HStack>
                <Progress 
                  value={analytics.equity.lowIncomeWithLowCapacity} 
                  colorScheme="orange" 
                  size="sm" 
                />
              </Box>
              
              <Stat>
                <StatLabel fontSize="xs">Infrastructure Density</StatLabel>
                <StatNumber fontSize="sm">{analytics.equity.infrastructureEquityScore} substations/tract</StatNumber>
              </Stat>
            </VStack>
          </Box>

          <Divider />

          {/* Coverage Info */}
          <Box>
            <Text fontWeight="bold" mb={2}>Coverage</Text>
            <VStack spacing={1} align="stretch" fontSize="xs">
              <HStack justify="space-between">
                <Text>Counties:</Text>
                <Text>{analytics.spatial.counties.join(', ') || 'Unknown'}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Est. Population:</Text>
                <Text>{analytics.demographics.populationEstimate.toLocaleString()}</Text>
              </HStack>
            </VStack>
          </Box>

          {loading && (
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="white" opacity={0.8} display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="sm">Updating...</Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AnalyticsDashboard;