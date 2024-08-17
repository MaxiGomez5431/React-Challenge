import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
    const [markerCoordinates, setMarkerCoordinates] = useState({
        yCoordinate: null, xCoordinate: null,
    });
    const [polygonCoordinate, setPolygonCoordinate] = useState({
        yPolygon1: null, xPolygon1: null,
        yPolygon2: null, xPolygon2: null,
        yPolygon3: null, xPolygon3: null,
    });
    const [mapPointers, setMapPointers] = useState([]);

    const [clickMode, setClickMode] = useState(false)

    const addMarker = () => {
        const purpleOptions = { color: 'red' };

        setMapPointers([
            ...mapPointers,
            <Marker pathOptions={purpleOptions} position={[markerCoordinates.yCoordinate, markerCoordinates.xCoordinate]} key={mapPointers.length} />
        ]);
    };

    const setPolygonByStep = (arrayLatLng) => {
        if (polygonCoordinate.yPolygon1 === null && polygonCoordinate.xPolygon1 === null) {
            setPolygonCoordinate({ ...polygonCoordinate, yPolygon1: arrayLatLng[0], xPolygon1: arrayLatLng[1] });
        } else if (polygonCoordinate.yPolygon2 === null && polygonCoordinate.xPolygon2 === null) {
            setPolygonCoordinate({ ...polygonCoordinate, yPolygon2: arrayLatLng[0], xPolygon2: arrayLatLng[1] });
        } else {
            setPolygonCoordinate({ ...polygonCoordinate, yPolygon3: arrayLatLng[0], xPolygon3: arrayLatLng[1] });
        }
    }

    const addPolygon = () => {
        const polygonPosition = [
            [polygonCoordinate.yPolygon1, polygonCoordinate.xPolygon1],
            [polygonCoordinate.yPolygon2, polygonCoordinate.xPolygon2],
            [polygonCoordinate.yPolygon3, polygonCoordinate.xPolygon3],
        ];
        const purpleOptions = { color: 'red' };
        setMapPointers([
            ...mapPointers,
            <Polygon pathOptions={purpleOptions} positions={polygonPosition} key={mapPointers.length} />
        ]);
    };

    function MouseCoordinates() {
        let arrayCoordinates = [0,0]

        useMapEvents({
            mousemove: (event) => {
                const { lat, lng } = event.latlng;
                arrayCoordinates = [lat, lng]
                
            },
            click: () => {
                if (clickMode){
                    setPolygonByStep(arrayCoordinates)
                } else {
                    setMarkerCoordinates({
                        yCoordinate: arrayCoordinates[0],
                        xCoordinate: arrayCoordinates[1],
                    })
                }
            },
        }); 
        return null;
    }

    useEffect(() => {
        if(polygonCoordinate.yPolygon3 !== null) {
            addPolygon()
            setPolygonCoordinate({
                yPolygon1: null, xPolygon1: null,
                yPolygon2: null, xPolygon2: null,
                yPolygon3: null, xPolygon3: null,
            })
        }
    }, [polygonCoordinate])

    useEffect(() => {
        if(markerCoordinates.yCoordinate !== null) {
            addMarker()
            setMarkerCoordinates({
                yCoordinate: null, xCoordinate: null,
            })
        }
    }, [markerCoordinates])

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

                    {mapPointers.map((component, index) => (
                        <div key={index}>
                            {component}
                        </div>
                    ))}

                    <MouseCoordinates />
                </MapContainer>
            </article>

            <button id="change-click-mode" onClick={() => setClickMode(!clickMode)}>{clickMode ? "Colocando Polígonos" : "Colocando Pines"}</button>

        </>
    );
}

export default Map;