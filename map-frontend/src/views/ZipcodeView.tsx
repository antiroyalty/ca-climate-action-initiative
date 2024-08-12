import React, { useState } from 'react';
import { Box, FormControl, Input, Button, VStack, HStack, Text, SimpleGrid } from '@chakra-ui/react';

interface ZipcodeViewProps {
  setZipcode: (zipcode: string) => void;
}

const ZipcodeView: React.FC<ZipcodeViewProps> = ({ setZipcode }) => {
  const [zipcode, setLocalZipcode] = useState('');

  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalZipcode(event.target.value);
  };

  const handleZipcodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (zipcode.length === 5) {
      setZipcode(zipcode);
    }
  };

  const handleSampleZipcodeClick = (zipcode: string) => {
    setZipcode(zipcode);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bg="gray.100">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
        <form onSubmit={handleZipcodeSubmit}>
          <VStack spacing={4}>
            <FormControl id="zipcode" isRequired>
              <HStack spacing={2}>
                <Input
                  type="text"
                  value={zipcode}
                  onChange={handleZipcodeChange}
                  maxLength={5}
                  placeholder="Enter zipcode"
                  focusBorderColor="teal.400"
                  autoFocus
                />
                <Button type="submit" colorScheme="blue">Go</Button>
              </HStack>
            </FormControl>
            <Text mt={12} fontSize="xl" textAlign="center">
              Just want to explore? Try these zipcodes:
            </Text>
            <SimpleGrid columns={2} spacing={2} textAlign="center" fontSize="lg">
            <Text
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={() => handleSampleZipcodeClick('94104')}
              >
                San Francisco: 94104
              </Text>

              <Text
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={() => handleSampleZipcodeClick('90001')}
              >
                Los Angeles: 90001
              </Text>
              <Text
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={() => handleSampleZipcodeClick('94704')}
              >
                Berkeley: 94704
              </Text>
              <Text
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={() => handleSampleZipcodeClick('95811')}
              >
                Sacramento: 95811
              </Text>

            </SimpleGrid>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ZipcodeView;
