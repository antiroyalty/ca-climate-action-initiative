# Adding New Layers to the Grid Explorer Map

This guide explains how to add new data layers to the Grid Explorer mapping application.

## Overview

The Grid Explorer uses a modular layer system where each data layer is created as an async function that returns an ArcGIS layer object. Layers are organized in the `src/views/layers/` directory and integrated into the main map through several components.

## Step-by-Step Process

### 1. Create the Layer File

Create a new file in `src/views/layers/` following the naming convention `create[LayerName]Layer.ts`.

**Basic Layer Structure:**
```typescript
// src/views/layers/createYourNewLayer.ts
import { loadModules } from 'esri-loader';

export const createYourNewLayer = async () => {
  const [LayerType, Renderer, Symbol] = await loadModules([
    'esri/layers/[LayerType]',
    'esri/renderers/[RendererType]',
    'esri/symbols/[SymbolType]'
  ]);

  // Configure symbol/styling
  const symbol = new Symbol({
    // Symbol properties
  });

  // Configure renderer
  const renderer = new Renderer({
    symbol: symbol
  });

  return new LayerType({
    url: 'your-data-source-url',
    title: 'Your Layer Title',
    renderer: renderer,
    visible: false,  // Set default visibility
    // Additional layer properties
  });
};
```

### 2. Layer Types and Examples

#### GeoJSON Layer (for local geojson files)
```typescript
export const createFeederLayer = async () => {
  const [GeoJSONLayer, SimpleRenderer, SimpleLineSymbol] = await loadModules([
    'esri/layers/GeoJSONLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleLineSymbol'
  ]);

  const lineSymbol = new SimpleLineSymbol({
    color: [226, 119, 40], // Orange
    width: 1
  });

  const renderer = new SimpleRenderer({
    symbol: lineSymbol
  });

  return new GeoJSONLayer({
    url: 'geojson/feeder.geojson',
    title: 'Feeders',
    renderer: renderer,
    visible: false
  });
};
```

#### Feature Layer (for ArcGIS services with popups)
```typescript
export const createSubstationsLayer = async () => {
  const [FeatureLayer, SimpleRenderer, SimpleMarkerSymbol, PopupTemplate] = await loadModules([
    'esri/layers/FeatureLayer',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/PopupTemplate'
  ]);

  const markerSymbol = new SimpleMarkerSymbol({
    color: [226, 119, 255], // Purple
    size: 6
  });

  const renderer = new SimpleRenderer({
    symbol: markerSymbol
  });

  // Optional: Configure popup template
  const popupTemplate = new PopupTemplate({
    title: '<strong>{FIELD_NAME}</strong>',
    content: `
      <div>
        <strong>Property:</strong> {FIELD_VALUE}
      </div>
    `
  });

  return new FeatureLayer({
    url: 'https://services.arcgis.com/your-feature-service-url',
    title: 'Your Layer Title',
    renderer: renderer,
    popupTemplate: popupTemplate,
    visible: true,
    outFields: ['*']  // Load all fields for popups
  });
};
```

### 3. Update Layer Index

Add your new layer to `src/views/layers/index.ts`:

```typescript
export { createYourNewLayer } from './createYourNewLayer';
```

### 4. Import and Load in MapView

In `src/views/MapView.tsx`:

1. **Add import:**
```typescript
import { createYourNewLayer } from './layers/createYourNewLayer';
```

2. **Load in useEffect:**
```typescript
const loadLayers = async () => {
  // ... existing layers
  const yourNewLayer = await createYourNewLayer();
  
  setLayers({
    // ... existing layers
    yourNewLayer,
  });
};
```

### 5. Update TypeScript Interface

In `src/views/components/LayerListComponent.tsx`, add your layer to the `Layers` interface:

```typescript
export interface Layers {
  // ... existing layers
  yourNewLayer: __esri.FeatureLayer; // or __esri.GeoJSONLayer, etc.
}
```

### 6. Add to Layer Categories

In the `categorizeLayers` function in `LayerListComponent.tsx`, add your layer to the appropriate category:

```typescript
const categorizeLayers = (layers: Layers) => {
  return {
    Utility: [
      // ... existing utility layers
      { key: 'yourNewLayer', layer: layers.yourNewLayer },
    ],
    Population: [
      // ... population layers
    ],
    Climate: [
      // ... climate layers
    ],
  };
};
```

## Best Practices

### Styling Guidelines
- Use consistent color schemes that don't conflict with existing layers
- Set appropriate symbol sizes (6-8px for points, 1-2px for lines)
- Use `visible: false` by default for non-essential layers

### Performance Considerations
- Use `outFields: ['*']` only when you need popup functionality
- Consider layer drawing order (more important layers should load first)
- Test with large datasets to ensure smooth performance

### Data Sources
- **Local files:** Place in `/public/geojson/` directory
- **ArcGIS services:** Use full feature service URLs
- **External APIs:** Ensure CORS is properly configured

### Popup Templates
- Keep popup content concise and well-formatted
- Use HTML/CSS for better styling
- Include only relevant fields to avoid clutter
- Test popups with various screen sizes

## Common Layer Types

| Layer Type | Use Case | Data Source |
|------------|----------|-------------|
| `GeoJSONLayer` | Local geospatial data files | `/public/geojson/*.geojson` |
| `FeatureLayer` | ArcGIS feature services | ArcGIS REST endpoints |
| `MapImageLayer` | Tiled map services | ArcGIS Map Service URLs |
| `GraphicsLayer` | Dynamic graphics/annotations | Programmatically created |

## Troubleshooting

### Layer Not Appearing
1. Check browser console for loading errors
2. Verify data source URL is accessible
3. Ensure layer is added to the map in `MapView.tsx`
4. Check if layer visibility is set to `true`

### TypeScript Errors
1. Verify layer type in `Layers` interface matches actual layer type
2. Check that all imports are correctly typed
3. Ensure `esri-loader` modules are properly loaded

### Styling Issues
1. Verify renderer and symbol configuration
2. Check for conflicting layer styles
3. Test symbol visibility at different zoom levels

## Example Implementation

See `src/views/layers/createSubstationsLayer.ts` for a complete example with popup templates, or `src/views/layers/createFeederLayer.ts` for a simpler GeoJSON implementation.