import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, List, Segment } from "semantic-ui-react";
import { deleteEventInFirestore } from "../../../app/firestore/firestoreService";
import EventListAttendee from "./EventListAttendee";

export default function EventListItem ({event}) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                        <Item.Content>
                            <Item.Header content={event.title} />
                            <Item.Description>
                                Hosted by {event.hostedBy}
                            </Item.Description>
                            {event.isCancelled && (
                                <Label 
                                style={{top: "10px"}}
                                ribbon="right"
                                color="red"
                                content="This event has benn cancelled"
                                />
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span> 
                {/* use of date-fns to change the format of the date to a string */}
                    <Icon name="clock" /> {format (event.date, "MMMM d, yyyy" )}  
                    <Icon name="marker" /> {event.venue.address}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {event.attendees.map(attendee => (
                        <EventListAttendee key={attendee.id} attendee={attendee}/>
                    ))}
                </List>
            </Segment>
            <Segment clearing>
                <div>{event.description}</div>
                <Button 
                onClick={() => deleteEventInFirestore(event.id)} 
                color="red" 
                floated="right" 
                content="delete" />
                <Button as={Link} to={`/events/${event.id}`} 
                style={{backgroundColor: "rgb(20, 100, 56)", color: "white" }} 
                // color="white"
                // floated="right" 
                // content="view"
                
                floated="right" 
                content="view" />
                />
            </Segment>
        </Segment.Group>
    )
}