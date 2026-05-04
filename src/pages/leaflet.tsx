import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polygon,
} from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import { useState, useRef } from "react"

export function Leaflet() {
  const [polygons, setPolygons] = useState([])
  const featureGroupRef = useRef()

  const handleCreate = (e) => {
    const layer = e.layer

    // ambil koordinat polygon
    const latlngs = layer.getLatLngs()

    const newPolygon = {
      id: Date.now(),
      coords: latlngs,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    }

    setPolygons((prev) => [...prev, newPolygon])

    console.log("Polygon:", latlngs)
  }

  return (
    <div style={{ height: "92vh" }}>
      <MapContainer
        center={[-6.1021, 106.882]}
        zoom={15}
        maxZoom={22}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={22}
          maxNativeZoom={19}
        />

        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={handleCreate}
            draw={{
              rectangle: false,
              polygon: true,
              circle: false,
              marker: false,
              polyline: false,
              circlemarker: false,
            }}
          />
          {polygons.map((poly) => (
            <Polygon key={poly.id} positions={poly.coords} color={poly.color} />
          ))}
        </FeatureGroup>
      </MapContainer>
    </div>
    // <div style={{ height: "92vh", width: "100%" }}>
    //   <MapContainer
    //     center={[-6.12, 106.898]}
    //     zoom={25}
    //     style={{ height: "100%", width: "100%" }}
    //   >
    //     <TileLayer
    //       attribution="&copy; OpenStreetMap"
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     />

    //     <Marker position={[-6.1194, 106.895]}>
    //       <Popup>Ini contoh marker</Popup>
    //     </Marker>
    //   </MapContainer>
    // </div>
  )
}
