import { FC } from "react";
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
export type mapProps = {
    route: [number, number][];
}
export const RouteMap: FC<mapProps> = props => {
    const route = props.route.filter(el => isPlausible(el[0]) && isPlausible(el[1]));
    const center: [number, number] = (route.length > 0) ? route[0] : [51.505, -0.09];
    return (
        <div style={{ height: "400px" }}>
            <MapContainer style={{ height: "50vh", width: "90vw" }} center={center} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={route} />
            </MapContainer>
        </div>
    )
}
const isPlausible = (pos: number) => {
    return isFinite(pos) && !isNaN(pos) && pos !== 0
}