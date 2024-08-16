import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function Map() {
    const [markerCoordinates, setMarkerCoordinates] = useState({
        yCoordinate : 0, xCoordinate : 0,
    })
    const [polygonCoordinate, setPolygonCoordinate] = useState({
        yPolygon1 : 0, xPolygon1 : 0,
        yPolygon2 : 0, xPolygon2 : 0,
        yPolygon3 : 0, xPolygon3 : 0
    })
    const [mapPointers, setMapPointers] = useState([])
    

    const handleInputChangeMarker = (inputEvent) => {
        const newValue = parseFloat(inputEvent.target.value) || 0
        const markerId = inputEvent.target.id
        setMarkerCoordinates({...markerCoordinates, [markerId]: newValue})
    };

    const handleInputChangePolygon = (inputEvent) => {
        const newValue = parseFloat(inputEvent.target.value) || 0
        const polygonId = inputEvent.target.id
        setPolygonCoordinate({...polygonCoordinate, [polygonId]: newValue})
    };

    const addMarker = () => {
        setMapPointers([...mapPointers, <Marker position={[markerCoordinates.yCoordinate, markerCoordinates.xCoordinate]} key={mapPointers.length} />]);
    }

    const addPolygon = () => {
        const polygonPosition = [
            [polygonCoordinate.yPolygon1, polygonCoordinate.xPolygon1],
            [polygonCoordinate.yPolygon2, polygonCoordinate.xPolygon2],
            [polygonCoordinate.yPolygon3, polygonCoordinate.xPolygon3],
        ]
        const purpleOptions = { color: 'red' }
        setMapPointers([...mapPointers, <Polygon pathOptions={purpleOptions} positions={polygonPosition} key={mapPointers.length} />]);
    }

    return (
        <>
        <main id="map">
            <MapContainer 
                center={[-34.60358867783092, -58.381559691538015]} 
                zoom={13} 
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
            
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <div id='mappointers-container'>
                {mapPointers.map((component, index) => (
                    <div key={index}>
                        {component}
                    </div>
                ))}
            </div>

            </MapContainer>
        </main>

        <article>
            <section className='input-marker-container dropdown-menu'>
                <input type="number" id="yCoordinate" onChange={handleInputChangeMarker}/>
                <input type="number" id="xCoordinate" onChange={handleInputChangeMarker}/>
                <button onClick={addMarker}>Agregar Marcador</button>
            </section>

            <section className='input-polygon-container dropdown-menu'>
                <input type="number" id="yPolygon1" onChange={handleInputChangePolygon}/>
                <input type="number" id="xPolygon1" onChange={handleInputChangePolygon}/>

                <input type="number" id="yPolygon2" onChange={handleInputChangePolygon}/>
                <input type="number" id="xPolygon2" onChange={handleInputChangePolygon}/>

                <input type="number" id="yPolygon3" onChange={handleInputChangePolygon}/>
                <input type="number" id="xPolygon3" onChange={handleInputChangePolygon}/>

                <button id="polygon-btn" onClick={addPolygon}>Agregar Polígono</button>
            </section>
        </article>
        </>
    );
}

export default Map;