import { useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { useHotels } from "../context/HotelsProvider";

function Map() {
    const { data } = useHotels();
    const [position, setPosition] = useState([51.505, -0.09]);

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
                {data.map((item) => {
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

export default Map