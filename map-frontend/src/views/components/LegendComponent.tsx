import React from 'react';
import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react';
import { Layers } from './LayerListComponent';

interface LegendComponentProps {
  view: __esri.MapView;
  layers: Layers;
}

// ── Color extraction ───────────────────────────────────────────────────────────

function toCSS(color: any): string {
  if (!color) return 'transparent';
  if (Array.isArray(color)) {
    const [r = 0, g = 0, b = 0, a = 255] = color;
    return `rgba(${r},${g},${b},${a > 1 ? a / 255 : a})`;
  }
  return `rgba(${color.r ?? 0},${color.g ?? 0},${color.b ?? 0},${color.a ?? 1})`;
}

// ── Swatch components ──────────────────────────────────────────────────────────

const CircleSwatch = ({ color }: { color: string }) => (
  <Box flexShrink={0} w="10px" h="10px" borderRadius="full" bg={color} />
);

const LineSwatch = ({ color }: { color: string }) => (
  <Box flexShrink={0} w="18px" h="3px" bg={color} mt="1px" />
);

const FillSwatch = ({ fill, outline }: { fill: string; outline: string }) => (
  <Box flexShrink={0} w="13px" h="13px" borderRadius="2px" bg={fill} border="1.5px solid" borderColor={outline} />
);

const OutlineSwatch = ({ outline }: { outline: string }) => (
  <Box flexShrink={0} w="13px" h="13px" borderRadius="2px" bg="transparent" border="2px solid" borderColor={outline} />
);

// ── Entry renderers ────────────────────────────────────────────────────────────

const Row = ({ swatch, label }: { swatch: React.ReactNode; label: string }) => (
  <HStack spacing={2} align="center">
    {swatch}
    <Text fontSize="xs" color="gray.700" lineHeight="short">{label}</Text>
  </HStack>
);

const ClassBreaksGroup = ({ title, infos }: {
  title: string;
  infos: { fillColor: string; outlineColor: string; label: string }[];
}) => (
  <Box>
    <Text fontSize="xs" fontWeight="semibold" color="gray.500" mb={1}>{title}</Text>
    <VStack spacing={1} align="stretch" pl={1}>
      {infos.map((b, i) => (
        <Row key={i} swatch={<FillSwatch fill={b.fillColor} outline={b.outlineColor} />} label={b.label} />
      ))}
    </VStack>
  </Box>
);

// ── Legend entry builder ───────────────────────────────────────────────────────

type Entry =
  | { type: 'single'; swatch: React.ReactNode; label: string }
  | { type: 'breaks'; title: string; infos: { fillColor: string; outlineColor: string; label: string }[] };

function entryForLayer(key: string, layer: any): Entry | null {
  if (!layer?.visible) return null;

  // MapImageLayer — hardcode county outline appearance
  if (layer.type === 'map-image') {
    return {
      type: 'single',
      swatch: <OutlineSwatch outline="rgba(26,11,187,0.8)" />,
      label: layer.title ?? 'County Boundaries',
    };
  }

  const renderer = layer.renderer;
  if (!renderer) return null;

  if (renderer.type === 'simple') {
    const sym = renderer.symbol;
    if (!sym) return null;
    if (sym.type === 'simple-marker') {
      return { type: 'single', swatch: <CircleSwatch color={toCSS(sym.color)} />, label: layer.title };
    }
    if (sym.type === 'simple-line') {
      return { type: 'single', swatch: <LineSwatch color={toCSS(sym.color)} />, label: layer.title };
    }
    if (sym.type === 'simple-fill') {
      return {
        type: 'single',
        swatch: <FillSwatch fill={toCSS(sym.color)} outline={toCSS(sym.outline?.color)} />,
        label: layer.title,
      };
    }
  }

  if (renderer.type === 'class-breaks') {
    const infos = (renderer.classBreakInfos ?? []).map((info: any) => ({
      fillColor: toCSS(info.symbol?.color),
      outlineColor: toCSS(info.symbol?.outline?.color) || '#555',
      label: info.label ?? '',
    }));
    return { type: 'breaks', title: layer.title, infos };
  }

  return null;
}

// ── Component ──────────────────────────────────────────────────────────────────

const LegendComponent: React.FC<LegendComponentProps> = ({ layers }) => {
  const entries: Entry[] = Object.entries(layers)
    .map(([key, layer]) => entryForLayer(key, layer))
    .filter((e): e is Entry => e !== null);

  if (entries.length === 0) return null;

  return (
    <Box
      position="absolute"
      bottom="20px"
      right="10px"
      p={4}
      bg="white"
      boxShadow="lg"
      borderRadius="lg"
      zIndex={1000}
      maxHeight="220px"
      overflowY="auto"
      minWidth="160px"
      maxWidth="220px"
    >
      <VStack spacing={2} align="stretch">
        {entries.map((entry, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Divider />}
            {entry.type === 'single'
              ? <Row swatch={entry.swatch} label={entry.label} />
              : <ClassBreaksGroup title={entry.title} infos={entry.infos} />
            }
          </React.Fragment>
        ))}
      </VStack>
    </Box>
  );
};

export default LegendComponent;
