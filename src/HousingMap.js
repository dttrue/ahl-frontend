import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';

const HousingMap = ({ projectData, apikey }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        let map;

        // Check if API key is provided and mapRef.current is not null
        if (apikey && mapRef.current) {
            const platform = new H.service.Platform({
                'apikey': apikey
            });
            const defaultLayers = platform.createDefaultLayers();

            map = new H.Map(
                mapRef.current,
                defaultLayers.vector.normal.map,
                {
                    zoom: 10,
                    center: { lat: 40.7128, lng: -74.0060 }
                }
            );

            const mapEvents = new H.mapevents.MapEvents(map);
            new H.mapevents.Behavior(mapEvents);

            // Create markers for each project and add them to the map
            projectData.forEach(project => {
                if (project.latitude && project.longitude) {
                    const marker = new H.map.Marker({ lat: project.latitude, lng: project.longitude });
                    map.addObject(marker);
                }
            });
        } else {
            console.error("API key is not provided or the map container is not ready.");
        }

        // Cleanup function to dispose of the map when the component unmounts
        return () => {
            if (map) {
                map.dispose();
            }
        };
    }, [apikey, projectData]); // Dependencies array includes projectData and apikey

    // Return the map container
    return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default HousingMap;


