import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useLocation } from '../../context/LocationContext';
import { mockStores } from '../../data/mockStores';
import { ShoppingBag, MapPin, Navigation } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default Leaflet icons in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: null,
    iconUrl: null,
    shadowUrl: null,
});

// Custom Icon Creator
const createCustomIcon = (color = '#1A2F4F') => {
    return new L.DivIcon({
        html: renderToStaticMarkup(
            <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute w-full h-full bg-white rounded-full shadow-md border-2" style={{ borderColor: color }}></div>
                <div className="absolute w-1 h-3 bg-white left-1/2 -bottom-2 -translate-x-1/2 border-l-2 border-r-2" style={{ borderColor: color, height: '8px', width: '2px', border: 'none', background: color }}></div>
                <ShoppingBag size={16} color={color} className="relative z-10" />
            </div>
        ),
        className: 'custom-marker-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 40], // Point at bottom center
        popupAnchor: [0, -40]
    });
};

const userIcon = new L.DivIcon({
    html: renderToStaticMarkup(
        <div className="relative flex items-center justify-center w-8 h-8">
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
        </div>
    ),
    className: 'user-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

// Component to handle map centering
const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 13, { duration: 1.5 });
        }
    }, [center, map]);
    return null;
};

const StoreMap = ({ height = '400px' }) => {
    const { location, calculateDistance } = useLocation();

    // Default center (NYC) if no user location
    const defaultCenter = [40.7128, -74.0060];
    const center = location ? [location.lat, location.lng] : defaultCenter;

    return (
        <div className="w-full rounded-xl overflow-hidden shadow-sm border border-grey-200 z-0 relative" style={{ height }}>
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController center={center} />

                {/* User Location Marker */}
                {location && (
                    <Marker position={[location.lat, location.lng]} icon={userIcon}>
                        <Popup className="custom-popup">
                            <div className="font-semibold text-sm">You are here</div>
                        </Popup>
                    </Marker>
                )}

                {/* Store Markers */}
                {mockStores.map(store => {
                    const distance = location ? calculateDistance(location.lat, location.lng, store.lat, store.lng) : null;

                    return (
                        <Marker
                            key={store.id}
                            position={[store.lat, store.lng]}
                            icon={createCustomIcon(store.isOpen ? '#1A2F4F' : '#9CA3AF')}
                        >
                            <Popup className="custom-popup">
                                <div className="min-w-[150px]">
                                    <h3 className="font-bold text-navy-900">{store.name}</h3>
                                    <p className="text-xs text-grey-600 mb-2">{store.address}</p>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className={`px-2 py-0.5 rounded-full ${store.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {store.isOpen ? 'Open Now' : 'Closed'}
                                        </span>
                                        {distance !== null && (
                                            <span className="flex items-center gap-1 font-medium text-navy-600">
                                                <Navigation size={10} />
                                                {distance} km
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {
                !location && (
                    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-md p-2">
                        <p className="text-xs text-grey-500">Enable location to see nearby stores</p>
                    </div>
                )
            }
        </div >
    );
};

export default StoreMap;
