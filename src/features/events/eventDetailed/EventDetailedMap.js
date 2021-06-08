import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon, Segment } from "semantic-ui-react";

function Marker() {
    return (<Icon name="marker" size="big" color="red" />)
}

export default function EventDetailedMap({latLng, venue}) {
    const zoom= 14;
    return (
        <Segment attached="bottom" style={{padding: 0}}>
            <div style={{height: 300, width: "100%"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBNRajCJ90z9O6OiiECZddQ4awiZzqqqB0" }}
                    center={latLng}
                    zoom={zoom}
                    >
                        <Marker lat={latLng.lat} lng={latLng.lng} />
                </GoogleMapReact>
            </div>
        </Segment>
    )
}