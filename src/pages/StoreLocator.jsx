import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import L from 'leaflet';

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const StoreLocator = () => {
    // Pakistani Store Data
    const stores = [
        {
            id: 1,
            name: "Khaadi - Dolmen Mall Clifton",
            address: "Dolmen Mall, Clifton, Karachi",
            phone: "021-111-542-233",
            hours: "11:00 AM - 10:00 PM",
            position: [24.8138, 67.0295]
        },
        {
            id: 2,
            name: "Gul Ahmed Ideas - Zamzama",
            address: "Zamzama Commercial, DHA Phase 5, Karachi",
            phone: "021-111-485-485",
            hours: "10:30 AM - 9:30 PM",
            position: [24.8075, 67.0359]
        },
        {
            id: 3,
            name: "Junaid Jamshed - Packages Mall",
            address: "Packages Mall, Walton Road, Lahore",
            phone: "042-111-786-786",
            hours: "11:00 AM - 10:00 PM",
            position: [31.4697, 74.2728]
        },
        {
            id: 4,
            name: "Sapphire - Centaurus Mall",
            address: "Centaurus Mall, F-8, Islamabad",
            phone: "051-111-727-744",
            hours: "10:00 AM - 10:00 PM",
            position: [33.7074, 73.0551]
        },
        {
            id: 5,
            name: "Outfitters - Emporium Mall",
            address: "Emporium Mall, Johar Town, Lahore",
            phone: "042-111-688-348",
            hours: "11:00 AM - 11:00 PM",
            position: [31.4697, 74.2638]
        },
        {
            id: 6,
            name: "Alkaram Studio - Lucky One",
            address: "Lucky One Mall, Rashid Minhas Rd, Karachi",
            phone: "021-111-255-272",
            hours: "10:00 AM - 10:00 PM",
            position: [24.9208, 67.0855]
        }
    ];

    const [selectedStore, setSelectedStore] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                () => {
                    // Default to Karachi if denied
                    setUserLocation([24.8607, 67.0011]);
                }
            );
        }
    }, []);

    // Component to fly map to location
    const FlyToStore = ({ position }) => {
        const map = useMap();
        useEffect(() => {
            if (position) map.flyTo(position, 14);
        }, [position, map]);
        return null;
    };

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 bg-white border-r border-grey-200 overflow-y-auto p-4 z-10 shadow-lg md:shadow-none">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-navy-900 mb-2">Find a Store</h1>
                    <p className="text-grey-600 text-sm">Visit our partner stores across Pakistan.</p>
                </div>

                <div className="space-y-4">
                    {stores.map((store) => (
                        <button
                            key={store.id}
                            onClick={() => setSelectedStore(store)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${selectedStore?.id === store.id
                                ? 'border-navy-600 bg-navy-50 ring-1 ring-navy-600'
                                : 'border-grey-200 hover:border-navy-300 hover:bg-grey-50'
                                }`}
                        >
                            <h3 className="font-bold text-navy-900 mb-1">{store.name}</h3>
                            <div className="space-y-2 text-sm text-grey-600">
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                    <span>{store.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 shrink-0" />
                                    <span>{store.hours}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 shrink-0" />
                                    <span>{store.phone}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Map */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-full relative z-0">
                <MapContainer
                    center={[30.3753, 69.3451]} // Center of Pakistan
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />

                    {selectedStore && <FlyToStore position={selectedStore.position} />}

                    {stores.map((store) => (
                        <Marker
                            key={store.id}
                            position={store.position}
                            eventHandlers={{
                                click: () => setSelectedStore(store),
                            }}
                        >
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold text-sm mb-1">{store.name}</h3>
                                    <p className="text-xs text-grey-600">{store.address}</p>
                                    <p className="text-xs text-grey-500">{store.phone}</p>
                                    <a
                                        href={`https://maps.google.com/?q=${store.position[0]},${store.position[1]}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-navy-600 text-xs font-semibold mt-2 inline-flex items-center gap-1 hover:underline"
                                    >
                                        Get Directions <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default StoreLocator;
