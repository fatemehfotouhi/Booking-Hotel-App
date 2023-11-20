import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet"
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map({ markerLocation }) {
    const [position, setPosition] = useState([51.505, -0.09]);
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(() => {
        if (lat && lng) setPosition([lat, lng])
    }, [lat, lng])

    const { isLoadingGeoLocation, userGeoLocation, getUserGeoLocation } = useGeoLocation();
    useEffect(() => {
        if (userGeoLocation?.lat && userGeoLocation?.lng) setPosition([userGeoLocation.lat, userGeoLocation.lng])
    }, [userGeoLocation])

    return (
        <div className="mapContainer">
            <MapContainer
                className="map"
                center={position}
                zoom={13}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ChangeMarker newPosition={position} />
                <DetectClick />
                <button className="getLocation" onClick={getUserGeoLocation}>
                    {isLoadingGeoLocation ? "Loading..." : "Use your Location"}
                </button>
                {markerLocation.map((item) => {
                    return (
                        <Marker key={item.id} position={[item.latitude, item.longitude]}>
                            <Popup>
                                {item.name} <br /> {item.host_location}
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        </div>
    )
}

export default Map;;

function ChangeMarker({ newPosition }) {
    const map = useMap();
    map.setView(newPosition)
    return null;
}
function DetectClick() {
    const navigate = useNavigate();
    useMapEvent("click", e => navigate(`/bookmarks/add/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`));
    return null;
}