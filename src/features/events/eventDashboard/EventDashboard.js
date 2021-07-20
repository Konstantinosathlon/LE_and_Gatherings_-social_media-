import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";

export default function EventDashboard() {
    const dispatch = useDispatch();
    const {events} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);
//custom hook
//passing the parameters inside an object just to have named parameters
  useFirestoreCollection({
      query: () => listenToEventsFromFirestore(),
      data: events => dispatch(listenToEvents(events)),
      deps: [dispatch]
  })

    return (
        <Grid>
            <Grid.Column width={10}>
                {loading &&
                <>
                    <EventListItemPlaceholder />
                    <EventListItemPlaceholder />
                </>
                }
               <EventList 
               events={events} 
                />
            </Grid.Column>
            <Grid.Column width={6}>
                    <EventFilters />
            </Grid.Column>
        </Grid>
    )
}