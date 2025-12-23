import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null); // { lat, lng }
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState('prompt'); // prompt, granted, denied

    useEffect(() => {
        // Check if permission was already granted previously
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                setPermissionStatus(result.state);
            });
        }
    }, []);

    const requestLocation = () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setPermissionStatus('granted');
                setIsLoading(false);
            },
            (err) => {
                setError('Unable to retrieve your location. Please enable location services.');
                setPermissionStatus('denied');
                setIsLoading(false);
            }
        );
    };

    // Haversine formula to calculate distance in km
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return parseFloat(d.toFixed(1));
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    return (
        <LocationContext.Provider
            value={{
                location,
                error,
                isLoading,
                permissionStatus,
                requestLocation,
                calculateDistance
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
