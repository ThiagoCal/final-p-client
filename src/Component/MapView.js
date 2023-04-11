import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';
import Map, {Marker,  Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import moment from 'moment';


export const MapView = (props) => {
    const [partiesmap, setParties] = useState([props.state]);
    const [popupInfo, setPopupInfo] = useState(null);
  
    useEffect(() => {
      console.log('parties', partiesmap);
    }, [partiesmap]);
  
    if (partiesmap || partiesmap.length > 0) {
        return (
            <>
                <Map
                    id="mymap"
                    initialViewState={{
                        longitude: 34.855499,
                        latitude: 32.109333,
                        zoom: 10
                    }}
                    style={{width: 800, height: 600}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                > 
                    {partiesmap.length > 0 ? 
                        partiesmap[0].map(party => (
                            <>
                                <Marker
                                    key={party.id}
                                    latitude={party.latitude}
                                    longitude={party.longitude}
                                    anchor="bottom"
                                    onClick={e => {
                                        // If we let the click event propagates to the map, it will immediately close the popup
                                        // with `closeOnClick: true`
                                        e.originalEvent.stopPropagation();
                                        // setPopupInfo(party);
                                    }}
                                >
                                        <div
                                        style={{
                                        height: 10,
                                        width: 10,
                                        backgroundColor: "#"+Math.floor(Math.random()*16777215).toString(16),
                                        borderRadius: 10,
                                        textAlign: 'center'
                                        }}
                                        >
                                        <span></span>
                                        </div>
                                </Marker>
                                {/* {popupInfo && ( 
                                    <Popup
                                        anchor="top"
                                        longitude={Number(popupInfo.longitude)}
                                        latitude={Number(popupInfo.latitude)}
                                        onClose={() => setPopupInfo(null)}
                                    >
                                        <div>
                                        {popupInfo.name}, {moment(popupInfo.party_date).format('DD-MM-YYYY HH:MM')} |{' '}
                                        <a
                                            target="_new"
                                            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}`}
                                        >
                                            {popupInfo.name}
                                        </a>
                                        </div>
                                        <img width="100%" src={popupInfo.image} />
                                    </Popup>
                                    )} */}
                            </>
                        )) 
                        : <></>
                    }
                  
                </Map> 
            </>
        );
    } else {
        return <></>;
    }
};

  export default MapView;