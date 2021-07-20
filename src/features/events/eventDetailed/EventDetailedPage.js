import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToEvents } from "../eventActions";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

export default function EventDetailedPage({match}) {
    const event = useSelector(state => state.event.events.find(e => e.id === match.params.id));
    const dispatch = useDispatch();
    // getting notifications of the loading and error indicators from async store 
    const {loading, error} = useSelector((state) => state.async);
    //then attemp to get the event from firestore
    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    });
    //while waiting for "data:" response from firestore...
    if (loading || (!event && !error)) return <LoadingComponent content="Loading event..." />
    if (error) return <Redirect to="/error" />
    //when firestore gives back the event, causes the Selector to rerender and so allowing the code below to be executed 
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event.attendees} />
            </Grid.Column>
        </Grid>
    )
}