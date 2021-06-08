import { format } from "date-fns";
import React, { useState } from "react";
import { Button, Grid, Icon, Segment } from "semantic-ui-react";
import EventDetailedMap from "./EventDetailedMap";

export default function EventDetailedInfo({event}) {
    const [mapVisible, setMapVisible] = useState(false);



    return (
        <Segment.Group>
    <Segment attached="top">
        <Grid>
            <Grid.Column width={1}>
                <Icon size="large" color="teal" name="info"/>
            </Grid.Column>
            <Grid.Column width={15}>
                <p>{event.description} </p>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign="middle">
            <Grid.Column width={1}>
                <Icon name="calendar" size="large" color="teal"/>
            </Grid.Column>
            <Grid.Column width={15}>
                <span>{format (event.date, "MMMM d, yyyy" )} </span>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign="middle">
            <Grid.Column width={1}>
                <Icon name="marker" size="large" color="teal"/>
            </Grid.Column>
            <Grid.Column width={11}>
                <span>{event.venue.address} </span>
            </Grid.Column>
            <Grid.Column width={4}>
                <Button onClick={() => setMapVisible(!mapVisible)} 
                color="teal" 
                size="tiny" 
                content={mapVisible? "Hide Map": "Show Map"}/>
            </Grid.Column>
        </Grid>
    </Segment>
    {mapVisible && <EventDetailedMap latLng={event.venue.latLng} />}
</Segment.Group>
    )
}