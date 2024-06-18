import React, { useState } from 'react';
import MapView from './MapView';
import { loadModules } from 'esri-loader';

const ZipcodeMapView: React.FC = () => {
  const [zipcode, setZipcode] = useState('');
  const [center, setCenter] = useState<__esri.Point | null>(null);

  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
  };

  const handleZipcodeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const [Locator] = await loadModules(['esri/tasks/Locator']);
    const locator = new Locator({ url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer' });

    const results = await locator.addressToLocations({
      address: { "Postal": zipcode }
    });

    if (results.length > 0) {
      const location = results[0].location;
      setCenter(location);
    }
  };

  return (
    <div>
      <form onSubmit={handleZipcodeSubmit}>
        <input type="text" value={zipcode} onChange={handleZipcodeChange} placeholder="Enter zipcode" />
        <button type="submit">Submit</button>
      </form>
      {center && <MapView/>}
    </div>
  );
};

export default ZipcodeMapView;
