import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';

const BuildingMap = ({ building, apikey }) => {
    const mapRef = useRef(null);
    useEffect(() => {
      if (!apikey || !building) return;
  
      const platform = new H.service.Platform({
          'apikey': apikey
      });
      const defaultLayers = platform.createDefaultLayers();
      
      // Initialize the map
      const map = new H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
              zoom: 15,
              center: { lat: building.latitude, lng: building.longitude },
          }
      );
  
      // Setup map events and behavior
      const mapEvents = new H.mapevents.MapEvents(map);
      new H.mapevents.Behavior(mapEvents);
  
      // Add a marker for the building
      const marker = new H.map.Marker({ lat: building.latitude, lng: building.longitude });
      map.addObject(marker);
  
      // Cleanup function
      return () => {
          map.dispose();
      };
  }, [apikey, building]); // Dependencies
   // Depend on the building prop to re-initialize when it changes

    return <div ref={mapRef} className="map"  />;
};

export default BuildingMap;










