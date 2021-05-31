import React from "react";
import { Segment,  Header, Button} from "semantic-ui-react";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default function EventForm({ match, history }) {
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));
    
    const initialValues = selectedEvent ?? {
        title: "",
        category: "",
        city: "",
        description: "",
        venue: "",
        date: ""    
    }
    const validationSchema = Yup.object({
        title: Yup.string().required(),
        category: Yup.string().required(),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required()
    })
    return (
        <Segment clearing>
            
            <Formik
            initialValues={initialValues}
            validationSchema ={validationSchema}
            onSubmit={ values => {
                selectedEvent
                ? dispatch(updateEvent({...selectedEvent, ...values}))
                : dispatch(createEvent({
                     ...values,
                     id: cuid(), 
                     hostedBy: "Bob", 
                     attendees: [], 
                     hostPhotoURL: "/assets/user.png" }));
                history.push("/events");
            }}
            >
                {({isSubmitting, dirty, isValid}) => (
                    <Form className="ui form" >
                    <Header sub color="teal" content= "Event details" />
                        <MyTextInput name="title" placeholder="Event title" />
                        <MySelectInput name="category" placeholder="Category" options={categoryData} />

                        <Header sub color="teal" content= "Location details" />
                        <MyTextArea name="description" placeholder="Description" rows="3" />
                        <MyTextInput name="city" placeholder="City" />
                        <MyTextInput name="venue" placeholder="Venue" />
                        <MyDateInput 
                        name="date" 
                        placeholderText="Event date"
                        timeFormat="HH:mm"
                        showTimeSelect
                        timeCaption="time" 
                        dateFormat="MMMM d, yyyy h:mm a" />
                
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
        </Segment>
    )
}