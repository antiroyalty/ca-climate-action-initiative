import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Card,
  CardBody,
  Spinner,
  Alert,
  AlertIcon,
  HStack,
  IconButton,
  Divider
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

interface SearchResult {
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  score: number;
  attributes: {
    Match_addr: string;
    Addr_type: string;
  };
}

interface SearchBarProps {
  onLocationSelect: (location: { latitude: number; longitude: number }, address: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchAddresses = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
      const endpoint = 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
      
      const params = new URLSearchParams({
        SingleLine: query,
        outFields: 'Match_addr,Addr_type,City,Region,Country',
        maxLocations: '8',
        f: 'json',
        countryCode: 'USA',
        category: 'Address,Postal,Populated Place'
      });

      if (apiKey) {
        params.append('token', apiKey);
      }

      const url = `${endpoint}?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Search service unavailable');
      }

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const searchResults: SearchResult[] = data.candidates
          .filter((candidate: any) => candidate.score > 70) // Filter for good matches
          .map((candidate: any) => ({
            address: candidate.address,
            location: {
              latitude: candidate.location.y,
              longitude: candidate.location.x
            },
            score: candidate.score,
            attributes: candidate.attributes
          }));

        setResults(searchResults);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
        setError('No locations found for your search');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to search locations. Please try again.');
      setResults([]);
      setShowResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    searchAddresses(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    onLocationSelect(result.location, result.address);
    setSearchTerm(result.address);
    setShowResults(false);
    setResults([]);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setShowResults(false);
    setError(null);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box ref={searchRef} position="relative" width="100%" maxWidth="400px">
      <HStack spacing={2}>
        <Input
          placeholder="Search for address, city, or ZIP code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          bg="white"
          border="2px solid"
          borderColor="gray.200"
          _focus={{
            borderColor: "blue.400",
            boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)"
          }}
          size="md"
        />
        
        {searchTerm && (
          <IconButton
            aria-label="Clear search"
            icon={<CloseIcon />}
            onClick={clearSearch}
            size="sm"
            variant="ghost"
          />
        )}
        
        <Button
          onClick={handleSearch}
          isLoading={isSearching}
          loadingText="Searching"
          leftIcon={<SearchIcon />}
          colorScheme="blue"
          size="md"
          minWidth="100px"
        >
          Search
        </Button>
      </HStack>

      {/* Search Results Dropdown */}
      {(showResults || error) && (
        <Card
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          bg="white"
          shadow="lg"
          zIndex={1001}
          maxHeight="300px"
          overflowY="auto"
        >
          <CardBody p={2}>
            {error && (
              <Alert status="warning" size="sm" mb={2}>
                <AlertIcon />
                <Text fontSize="sm">{error}</Text>
              </Alert>
            )}

            {results.length > 0 && (
              <VStack spacing={1} align="stretch">
                <Text fontSize="xs" color="gray.600" px={2} py={1}>
                  Found {results.length} location{results.length !== 1 ? 's' : ''}
                </Text>
                <Divider />
                {results.map((result, index) => (
                  <Box
                    key={index}
                    p={2}
                    cursor="pointer"
                    _hover={{ bg: 'gray.100' }}
                    borderRadius="md"
                    onClick={() => handleResultSelect(result)}
                  >
                    <Text fontSize="sm" fontWeight="medium">
                      {result.attributes.Match_addr}
                    </Text>
                    <HStack justify="space-between" mt={1}>
                      <Text fontSize="xs" color="gray.600">
                        {result.attributes.Addr_type}
                      </Text>
                      <Text fontSize="xs" color="blue.600">
                        {result.score}% match
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}

            {isSearching && (
              <HStack justify="center" p={4}>
                <Spinner size="sm" />
                <Text fontSize="sm">Searching locations...</Text>
              </HStack>
            )}
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default SearchBar;