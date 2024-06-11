import React, { useState } from 'react';
import { SimpleGrid, Image, Box, Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure} from '@chakra-ui/react';

type ImageData = {
  src: string;
  title: string;
};

const images: ImageData[] = [
  { src: '/images/pge_circuit_capacity_distribution.png', title: 'PG&E Distribution Capacity' },
  { src: '/images/feeders-by-substation.png', title: 'feeders by substation' },
  { src: '/images/total-customers-top-5-substations.png', title: 'top 5 substations # of customers' },
  { src: '/images/top-feeders-with-customers-in-the-bay.png', title: '' },
  { src: '/images/geographical-distribution-of-line-capacities.png', title: '' },
  { src: '/images/california-counties-median-incomes.png', title: '' },
];

const ImageGrid: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Box p={5}>
      <SimpleGrid columns={2} spacing={5}>
      {images.map((image, index) => (
        <Box key={index} boxShadow="lg" p="2" rounded="lg" bg="white" width="100%" maxWidth="500px" overflow="hidden" cursor="pointer" onClick={() => handleImageClick(image)}>
            <Image src={image.src} alt={image.title} width="100%" objectFit="contain" />
        </Box>
        ))}
      </SimpleGrid>

      {/* Modal for Fullscreen Image Display */}
      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {selectedImage && (
            <Image src={selectedImage.src} alt={selectedImage.title} width="100%" height="100%" objectFit="contain" />
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageGrid;
