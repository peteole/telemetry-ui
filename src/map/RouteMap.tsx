import { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
export const RouteMap: FC = props => {
    return (
        <div style={{ height: "400px" }}>
            <MapContainer style={{ height: "50vh", width: "90vw" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}