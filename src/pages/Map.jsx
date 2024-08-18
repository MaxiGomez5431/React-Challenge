import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from 'react-leaflet';
import { customBlueIcon, customRedIcon } from '../assets/customIcons.js'
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
    const [areRedMarkersOnMap, setAreRedMarkersOnMap] = useState(false)

    const addMarker = (icon) => {
        setMapPointers([
            ...mapPointers,
            <Marker position={[markerCoordinates.yCoordinate, markerCoordinates.xCoordinate]} key={mapPointers.length} icon={icon} />
        ]);
    };

    const addPolygon = () => {
        const polygonPosition = [
            [polygonCoordinate.yPolygon1, polygonCoordinate.xPolygon1],
            [polygonCoordinate.yPolygon2, polygonCoordinate.xPolygon2],
            [polygonCoordinate.yPolygon3, polygonCoordinate.xPolygon3],
        ];
        setMapPointers([
            ...mapPointers,
            <Polygon pathOptions={{ color: 'red' }} positions={polygonPosition} key={mapPointers.length} />
        ]);
    };

    const setPolygonByStep = (arrayLatLng) => {
        if (polygonCoordinate.yPolygon1 === null && polygonCoordinate.xPolygon1 === null) {
            setPolygonCoordinate({ ...polygonCoordinate, yPolygon1: arrayLatLng[0], xPolygon1: arrayLatLng[1] });
            setMarkerCoordinates({ yCoordinate: arrayLatLng[0], xCoordinate: arrayLatLng[1] })
            setAreRedMarkersOnMap(true)
        } else if (polygonCoordinate.yPolygon2 === null && polygonCoordinate.xPolygon2 === null) {
            setPolygonCoordinate({ ...polygonCoordinate, yPolygon2: arrayLatLng[0], xPolygon2: arrayLatLng[1] });
            setMarkerCoordinates({ yCoordinate: arrayLatLng[0], xCoordinate: arrayLatLng[1] })
        } else {
            setPolygonCoordinate({ ...polygonCoordinate, yPolygon3: arrayLatLng[0], xPolygon3: arrayLatLng[1] });
            setAreRedMarkersOnMap(false)
        }
    }

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

    const removeRedMarkers = () => {
        let actualMapPointers = mapPointers
        actualMapPointers.splice(actualMapPointers.length - 2, 2)
        setMapPointers(actualMapPointers)
        addPolygon()
    }

    useEffect(() => {
        if(polygonCoordinate.yPolygon3 !== null) {
            removeRedMarkers()
            setPolygonCoordinate({
                yPolygon1: null, xPolygon1: null,
                yPolygon2: null, xPolygon2: null,
                yPolygon3: null, xPolygon3: null,
            })
            
        } else if (polygonCoordinate.yPolygon1 !== null || polygonCoordinate.yPolygon2 !== null) {
            addMarker(customRedIcon)
            setMarkerCoordinates({
                yCoordinate: null, xCoordinate: null,
            })
        }
    }, [polygonCoordinate])

    useEffect(() => {
        if(markerCoordinates.yCoordinate !== null && !clickMode) {
            addMarker(customBlueIcon)
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

            <div id="mode-container">
                <button id="change-click-mode" onClick={() => {
                    if (!areRedMarkersOnMap) {
                        setClickMode(!clickMode)
                    }

                }}>Cambiar modo</button>
                <p id="text-click-mode">{clickMode ? "Colocando polígonos, coloca 3 coordenadas para poder colocar un polígono." : "Colocando pines, haz click en el mapa para colocar un pin."}</p>
            </div>
        </>
    );
}

export default Map;