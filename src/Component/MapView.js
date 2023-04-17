import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useLocation } from 'react-router-dom';
import Map, { Marker, Popup, MapRef } from "react-map-gl";
import { Link } from "react-router-dom";
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
          longitude: parties[0].longitude,
          latitude: parties[0].latitude,
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
                <img
                  src={`${process.env.REACT_APP_SERVERURL}map_marker.png`}
                  width="20px"
                />
              </Marker>
              {popupInfo && (
                <Popup
                  anchor="top"
                  longitude={Number(popupInfo.longitude)}
                  latitude={Number(popupInfo.latitude)}
                  onClose={() => setPopupInfo(null)}
                  className="flex flex-col w-full justify-center self-center"
                >
                  <div
                    key={popupInfo.name}
                    className="flex flex-col w-full justify-center self-center"
                  >
                    <span>{popupInfo.name}</span>
                    <span>
                      {moment(popupInfo.party_date).format("DD-MM-YYYY HH:MM")}
                    </span>
                    <Link
                      target="_new"
                      className="text-primary"
                      to={`/party/${popupInfo.id}`}
                    >
                      {popupInfo.name}
                    </Link>
                  </div>
                  <img
                    width="20%"
                    src={`${process.env.REACT_APP_SERVERURL}${
                      popupInfo.image_path ?? "default.jpeg"
                    }`}
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
