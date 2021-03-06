import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

export default function EventDetailedHeader({event}) {
    return (
        <Segment.Group>
    <Segment basic attached="top" style={{padding: '0'}}>
        <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style= {eventImageStyle} />

        <Segment basic style={eventImageTextStyle} >
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Header
                            size="huge"
                            content= {event.title}
                            style={{color: 'white'}}
                        />
                         {/* use of date-fns to change the format of the date to a string */}
                        <p>{format (event.date, "MMMM d, yyyy" )} </p>
                        <p>
                            Hosted by <strong>{event.hostedBy} </strong>
                        </p>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    </Segment>

    <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button style={{backgroundColor: "rgb(20, 100, 56)", color: "white"}}>JOIN THIS EVENT</Button>

        <Button as={Link} to={`/manage/${event.id}`} style={{backgroundColor: "rgb(123, 223, 120)", color: "white"}} floated="right">
            Manage Event
        </Button>
    </Segment>
</Segment.Group>
    )
}