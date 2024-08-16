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
        <article id="map">
            <MapContainer 
                center={[0, 0]} 
                zoom={2} 
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
        </article>

        <article>
            
            <section className='input-marker-container dropdown-menu'>
                <input className='map-input' type="number" id="yCoordinate" placeholder='Coord x' onChange={handleInputChangeMarker}/>
                <input className='map-input' type="number" id="xCoordinate" placeholder='Coord y'onChange={handleInputChangeMarker}/>
                <button className="map-input-btn" onClick={addMarker}>Agregar Pin</button>
            </section>

            <section className='input-polygon-container dropdown-menu'>
                <input className='map-input' type="number" id="yPolygon1" placeholder='Coord x 1' onChange={handleInputChangePolygon}/>
                <input className='map-input' type="number" id="xPolygon1" placeholder='Coord y 1' onChange={handleInputChangePolygon}/>

                <input className='map-input' type="number" id="yPolygon2" placeholder='Coord x 2' onChange={handleInputChangePolygon}/>
                <input className='map-input' type="number" id="xPolygon2" placeholder='Coord y 2' onChange={handleInputChangePolygon}/>

                <input className='map-input' type="number" id="yPolygon3" placeholder='Coord x 3' onChange={handleInputChangePolygon}/>
                <input className='map-input' type="number" id="xPolygon3" placeholder='Coord y 3' onChange={handleInputChangePolygon}/>
                
                <button id='polygon-btn' className="map-input-btn" onClick={addPolygon}>Agregar Polígono</button>
            </section>
        </article>
        </>
    );
}

export default Map;