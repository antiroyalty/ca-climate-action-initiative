# California Grid Explorer

Interactive mapping application for exploring California's electrical grid infrastructure, demographics, and electrification scenarios for research and policy analysis.

## Features

- **Interactive ArcGIS-based mapping** with multiple data layers
- **Real-time analytics dashboard** showing infrastructure and demographic metrics
- **Multiple visualization layers** including:
  - Electrical substations and feeders
  - Census demographic data (income, age)
  - Grid capacity and electrification scenarios
- **ZIP code-based navigation** with automatic geocoding
- **Layer management** with toggle controls and legends

## Prerequisites

- Node.js 16 or higher
- npm or yarn package manager
- ArcGIS API key (for geocoding and some data layers)

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd map-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   Create a `.env` file in the root directory:
   ```
   REACT_APP_ARCGIS_API_KEY=your_arcgis_api_key_here
   ```
   
   To get an ArcGIS API key:
   - Visit [ArcGIS Developers](https://developers.arcgis.com/)
   - Create a free account
   - Generate an API key with geocoding permissions

4. **Start development server**
   ```bash
   npm start
   ```
   
   The application will open at [http://localhost:3000](http://localhost:3000)

## Development Commands

- `npm start` - Start development server with hot reload
- `npm test` - Run test suite in watch mode
- `npm run build` - Build optimized production bundle
- `npm run eject` - Eject from Create React App (irreversible)

## Project Structure

```
src/
├── views/
│   ├── components/           # Reusable map components
│   │   ├── MapComponent.tsx     # Core ArcGIS map setup
│   │   ├── LayerListComponent.tsx   # Layer visibility controls
│   │   ├── LegendComponent.tsx      # Map legend display
│   │   └── AnalyticsDashboard.tsx   # Real-time analytics panel
│   ├── layers/              # Data layer creation functions
│   │   ├── createFeederLayer.ts     # Electrical feeder data
│   │   ├── createSubstationsLayer.ts # Substation locations
│   │   ├── createMedianIncomeLayer.ts # Census income data
│   │   └── ...
│   ├── MapView.tsx          # Main map interface
│   ├── ZipcodeView.tsx      # ZIP code input screen
│   └── ...
├── App.tsx                  # Root component with routing logic
└── ...
```

## Data Sources

- **ArcGIS Feature Services** for geographic data layers
- **U.S. Census ACS** for demographic information
- **PG&E Infrastructure Data** for electrical grid components
- **Custom GeoJSON** files for specialized datasets

## Key Technologies

- **React 18** with TypeScript
- **ArcGIS JavaScript API 4.x** via esri-loader
- **Chakra UI** for component styling
- **Create React App** for build tooling

## Analytics Dashboard

The analytics dashboard provides real-time metrics for the current map view:

- **Infrastructure metrics**: Substation counts, grid capacity analysis
- **Demographic analysis**: Income distribution, population estimates
- **Equity metrics**: Infrastructure density by income level
- **Spatial coverage**: Area, counties, and ZIP codes in view

Analytics update automatically as you pan and zoom the map.

## Development Tips

1. **Layer Development**: New data layers go in `src/views/layers/` and should follow the async function pattern returning ArcGIS layer objects

2. **Environment Variables**: All config should use `REACT_APP_` prefix to be available in the browser

3. **TypeScript**: The project uses strict TypeScript - include type definitions for new components

4. **Performance**: Large datasets are loaded asynchronously and can be toggled on/off to maintain map performance

