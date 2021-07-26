/* global google */
import React, { useState } from "react";
import { Segment,  Header, Button, Confirm} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listenToEvents } from "../eventActions";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import { listenToEventFromFirestore, updateEventInFirestore, addEventToFirestore, cancelEventToggle } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

export default function EventForm({ match, history }) {
    const {loading, error} = useSelector((state) => state.async);
    const dispatch = useDispatch();
    const [loadingCancel, setLoadingCancel] =useState(false);
    const [confirmOpen, setConfirmOpen] =useState(false);
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));
    
    const initialValues = selectedEvent ?? {
        title: "",
        category: "",
        city: {
            address: "",
            latLng: null
        },
        description: "",
        venue: {
            address: "",
            latLng: null
        },
        date: ""    
    }
    const validationSchema = Yup.object({
        title: Yup.string().required(),
        category: Yup.string().required(),
        description: Yup.string().required(),
        city: Yup.object().shape({
            address: Yup.string().required("city is a required field")
        }),
        venue: Yup.object().shape({
            address: Yup.string().required("venue is a required field")
        }),
        date: Yup.string().required()
    });
    async function handleCancelToggle(event) {
        setConfirmOpen(false);
        setLoadingCancel(true);
        try {
            await cancelEventToggle(event);
            setLoadingCancel(false);
        }catch (error) {
            setLoadingCancel(true);
            toast.error(error.message);
        }
    }

    useFirestoreDoc({
        // !! is used to transform the value into a boolean
        shouldExecute: !!match.params.id,
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    });

    if (loading) return <LoadingComponent content="Loading event..." />
    if (error) return <Redirect to="/error" />

    return (
        <Segment clearing>          
            <Formik
            initialValues={initialValues}
            validationSchema ={validationSchema}
            onSubmit={ async (values, {setSubmitting}) => {
                try {selectedEvent
                ? await updateEventInFirestore(values)
                : await addEventToFirestore(values);
                setSubmitting(false);
                history.push("/events");
                }catch (error) {
                    toast.error(error.message);
                    setSubmitting(false);
                }
                
            }}
            >
                {({isSubmitting, dirty, isValid, values}) => (
                    <Form className="ui form" >
                    <Header sub color="teal" content= "Event details" />
                        <MyTextInput name="title" placeholder="Event title" />
                        <MySelectInput name="category" placeholder="Category" options={categoryData} />
                        <MyTextArea name="description" placeholder="Description" rows="3" />
                        <Header sub color="teal" content= "Location details" />               
                        <MyPlaceInput name="city" placeholder="City" />
                        <MyPlaceInput 
                            name="venue" 
                            disabled={!values.city.latLng}
                            placeholder="Venue"
                            options={{
                                location: new google.maps.LatLng(values.city.latLng),
                                radius: 1000,
                                types: ["establishment"]
                            }}
                            />
                        <MyDateInput 
                            autoComplete="off"
                            name="date" 
                            placeholderText="Event date"
                            timeFormat="HH:mm"
                            showTimeSelect
                            timeCaption="time" 
                            dateFormat="MMMM d, yyyy h:mm a" />
                    {selectedEvent &&
                    <Button 
                    loading={loadingCancel}
                    type="button" 
                    floated="left" 
                    content={selectedEvent.isCancelled? "Reactivate event" : "Cancel Event" }
                    color={selectedEvent.isCancelled? "green" : "red" }     
                    onClick={() => setConfirmOpen(true)}
                    />}
                    <Button 
                    loading={isSubmitting} 
                    disabled={!isValid || !dirty || isSubmitting}
                    type="submit" 
                    floated="right" 
                    positive content="Submit" />
                    <Button as={Link} to="/events" 
                    disabled={isSubmitting}
                    type="submit" 
                    floated="right"  
                    content="Cancel" />
                </Form> 
                ) }
                    
            </Formik> 
            <Confirm 
            content={selectedEvent?.isCancelled? "This will reactivate the event - are you sure?" :
            "This will cancel your event - are you sure?"}
            open= {confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => handleCancelToggle(selectedEvent)}
            />  
        </Segment>
    )
}