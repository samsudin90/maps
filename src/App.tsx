import { Routes, Route } from "react-router-dom"
import { Home } from "@/pages/home.tsx"
import { Navbar } from "@/components/navbar.tsx"
import { Leaflet } from "@/pages/leaflet.tsx"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"

export function App() {
  return (
    <div className="">
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/leaflet" element={<Leaflet />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
