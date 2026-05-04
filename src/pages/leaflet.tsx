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
import * as turf from "@turf/turf"

export function Leaflet() {
  const [polygons, setPolygons] = useState([])
  const featureGroupRef = useRef()

  const handleCreate = (e) => {
    const layer = e.layer;

    const latlngs = layer.getLatLngs()[0];
    const newCoords = latlngs.map(p => [p.lng, p.lat]);
    newCoords.push(newCoords[0]);

    const newPolygonTurf = turf.polygon([newCoords]);

    let isValid = true;

    for (let poly of polygons) {
      const exCoords = poly.coords[0].map(p => [p.lng, p.lat]);
      exCoords.push(exCoords[0]);

      const existingPolygonTurf = turf.polygon([exCoords]);

      const isInvalid =
        turf.booleanOverlap(newPolygonTurf, existingPolygonTurf) ||
        turf.booleanWithin(newPolygonTurf, existingPolygonTurf) ||
        turf.booleanContains(existingPolygonTurf, newPolygonTurf) ||
        turf.booleanTouches(newPolygonTurf, existingPolygonTurf);

      if (isInvalid) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      alert("❌ Polygon tidak boleh berpotongan!");

      // 🔥 ini penting banget
      layer.remove(); // paksa hapus dari map

      return;
    }

    // baru simpan
    const newPolygon = {
      id: Date.now(),
      coords: layer.getLatLngs(),
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    };

    setPolygons((prev) => [...prev, newPolygon]);
  };

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
