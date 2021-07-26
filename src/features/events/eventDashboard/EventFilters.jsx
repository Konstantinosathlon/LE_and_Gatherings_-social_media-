import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

export default function EventFilters() {
    return (
        <>
            <Menu vertical size="large" style={{width: "100%"}}>
                <Header icon="filter" attached style={{color: "rgb(20, 100, 56)" }} content="filters" />
                <Menu.Item content="All Events" />
                <Menu.Item content="I 'm going" />
                <Menu.Item content="AI 'm hosting" />
            </Menu>
            <Header icon="calendar" attached style={{color: "rgb(20, 100, 56)" }} content="Select date"  />
            <Calendar />
        </>
    )
}