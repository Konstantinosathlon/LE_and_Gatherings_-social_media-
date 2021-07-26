import { Formik } from 'formik';
import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import * as Yup from "yup";

export default function AccountPage() {
    return (
        <Segment>
            <Header dividing size="large" content="Account" />
            <div>
                <Header color="teal" sub content="Change Password" />
                <p>Use this form to change your password</p>
                <Formik initialValues={{newPassword1: "", newPassword2: ""}}
                validationSchema={}
                >

                </Formik>
            </div>
           
        </Segment>
    )
}
