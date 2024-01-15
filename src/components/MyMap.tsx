import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./myMap.scss";
import { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { IonLoading, IonRow } from "@ionic/react";

const MyMap = () => {
  const [showLoading, setShowLoading] = useState(true);

  const [loading, setLoading] = useState<any>(true);

  const [error, setError] = useState<any>(null);

  const [myPostion, setMyPostion] = useState<any>(null);

  const position: number[] = [56.52635293804066, 9.614244537563335];

  const [mySpot, setMySpot] = useState("");

  const [spots, setSpots] = useState("")

 

  const spot = L.icon({
    iconUrl: "/assets/my-icon.png",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, 0],
  });

  const useSpot = L.icon({
    iconUrl: "/assets/spot-icon.png",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, 0],
  });

  const markerPositions = [
    {
      image: "assets/position-images/spot-icon.jpg",
      location: "Skæring",
      name: "Skæring",
      latitude: "56.2314977010896",
      longitude: "10.320953067889777",
    },
    {
      image: "/assets/position-images/spot-icon.jpg",
      location: "Ebeltoft",
      name: "glasmuseet",
      latitude: "56.19656102762782",
      longitude: "10.678123381787396",
    },
    {
      image: "/assets/position-images/spot-icon.jpgg",
      location: "Lønstrup",
      name: "lønstrup",
      latitude: "57.47520549523601",
      longitude: "9.797069303027442",
    },
    {
      image: "/assets/position-images/spot-icon.jpg",
      location: "Kalyves",
      name: "Provlita",
      latitude: "35.45508926793525",
      longitude: "24.171037403669782",
    },
    {
      image: "/assets/position-images/spot-icon.jpg",
      location: "Kalyves",
      name: "Dimitra",
      latitude: "35.456922591535694",
      longitude: "24.167508999612433",
    },
    {
      image: "/assets/position-images/spot-icon.jpg",
      location: "Kalyves",
      name: "Cactus coffee",
      latitude: "35.45797294238098",
      longitude: "24.16576565846501",
    },
  ];
  useEffect(() => {

    setMySpot(spot);
    setSpots(useSpot);

    (async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setMyPostion(coordinates.coords);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    })();
    setMySpot(L.icon({ iconUrl: "/assets/my-icon.png" }));
  }, []);

  if (loading)
    return (
      <IonLoading
        spinner={"bubbles"}
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Vent lige lidt... henter kortdata"}
        duration={5000}
      />
    );

  if (error) return <div>error!</div>;

  return (
    <div id="content">
      <MapContainer center={position} zoom={7} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[myPostion.latitude, myPostion.longitude]}
          icon={spot}
        >
          <Popup>Im here</Popup>
        </Marker>
        
        {markerPositions.map( (data, index) => (
            <Marker 
            key={"map" + index}
            id="animate"
            position={[data.latitude, data.longitude]}
            icon={spots}
            >

                <Popup>
                    <IonRow className="headline">{data.location}</IonRow>
                    <IonRow className="comment">{data.name}</IonRow>

                </Popup>



            </Marker>
        ))
        }

      </MapContainer>
    </div>
  );
};

export default MyMap;
