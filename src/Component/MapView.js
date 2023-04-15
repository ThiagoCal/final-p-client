import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useLocation } from 'react-router-dom';
import Map, { Marker, Popup, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import moment from "moment";
import ControlPanel from "./ControlPanel";

export const MapView = ({ parties }) => {
  const [popupInfo, setPopupInfo] = useState(null);

  const mapRef = useRef();

  const onSelectCity = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);

  if (!parties || parties.length === 0) return null;
  console.log(parties);

  return (
    <div style={{ position: "relative" }}>
      <Map
        id="mymap"
        initialViewState={{
          longitude: 34.77294,
          latitude: 32.074111,
          zoom: 12,
        }}
        style={{ width: 600, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        ref={mapRef}
        key={"map"}
      >
        {parties.length > 0 ? (
          parties.map((party) => (
            <>
              <Marker
                key={party.id}
                latitude={party.latitude}
                longitude={party.longitude}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setPopupInfo(party);
                }}
              >
                <div
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: "cyan",
                    borderRadius: 10,
                    textAlign: "center",
                  }}
                >
                  <span></span>
                </div>
              </Marker>
              {popupInfo && (
                <Popup
                  anchor="top"
                  longitude={Number(popupInfo.longitude)}
                  latitude={Number(popupInfo.latitude)}
                  onClose={() => setPopupInfo(null)}
                >
                  <div key={popupInfo.name}>
                    {popupInfo.name}
                    {moment(popupInfo.party_date).format(
                      "DD-MM-YYYY HH:MM"
                    )} |{" "}
                    <a
                      target="_new"
                      href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}`}
                    >
                      {popupInfo.name}
                    </a>
                  </div>
                  <img
                    width="100%"
                    src={popupInfo.image}
                    alt={popupInfo.name}
                  />
                </Popup>
              )}
            </>
          ))
        ) : (
          <></>
        )}
      </Map>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          // zIndex: 1,
          backgroundColor: "white",
          padding: "1em",
          opacity: 0.8,
          borderRadius: "10px",
        }}
        key={"city-select"}
      >
        <ControlPanel onSelectCity={onSelectCity} />
      </div>
    </div>
  );
};

export default MapView;
