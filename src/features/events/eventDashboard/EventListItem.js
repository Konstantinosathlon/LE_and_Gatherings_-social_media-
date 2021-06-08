import { format } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import { deleteEvent } from "../eventActions";
import EventListAttendee from "./EventListAttendee";

export default function EventListItem ({event}) {
    const dispatch = useDispatch();
    
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
                onClick={() => dispatch(deleteEvent(event.id))} 
                color="red" 
                floated="right" 
                content="delete" />
                <Button as={Link} to={`/events/${event.id}`} 
                color="teal" 
                floated="right" 
                content="view" />
            </Segment>
        </Segment.Group>
    )
}