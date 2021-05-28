import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({setFormOpen}){
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory(); //history hook provided by react-router-dom

    function handleSignOut() {
        setAuthenticated(false);
        history.push("./");
    }
    
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} exact to="/" header>  {/*"as" is a shortcut from semantic to act as another component*/}
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}}/>
                    Social Groups
                </Menu.Item>
                <Menu.Item as={NavLink} to="/events" name="Events"/>
                {authenticated &&
                <Menu.Item as={NavLink} to="/createEvent">
                    <Button positive inverted content="Create Event" />
                </Menu.Item>}
                {authenticated? <SignedInMenu signOut={handleSignOut} /> : <SignedOutMenu setAuthenticated={setAuthenticated} /> } 
                
            </Container>
        </Menu>
    )
}