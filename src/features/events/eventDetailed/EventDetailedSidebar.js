import React from "react";
import { Item, Segment } from "semantic-ui-react";


export default function EventDetailedSidebar({attendees}) {
    return (
        <>
<Segment
    textAlign="center"
    style={{border: 'none', backgroundColor: "rgb(20, 100, 56)"}}
    attached="top"
    secondary
    inverted
>
    {attendees.length} {attendees.length > 1 ? "People" : "Person"} Going
</Segment>
<Segment attached>
    <Item.Group relaxed divided>
        {attendees.map( (attendee) => (
        <Item key={attendee.id} style={{position: 'relative'}}>
            <Item.Image size="tiny" src={attendee.photoURL || '/assets/user.png'} />
            <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                    <span>{attendee.name} </span>
                </Item.Header>
            </Item.Content>
        </Item>
         )
    )}
    </Item.Group>
   
</Segment>
</>
    )
}