import React from 'react';
import { Link } from "react-router-dom";
import { Header, Segment, Icon, Image } from "semantic-ui-react";
import "./PageHeader.css"

export default function PageHeader({ user, handleLogout }) {
    return(
        <Segment clearing id="page-header">
            <Header as="h2" floated="left">
                <Link id="header-one" to="/">
                    Cooks' Helper
                </Link>
            </Header>
            <Header as="h2" floated="right">
                <Link id="header-two" to="" onClick={handleLogout}>
                    Log Out
                </Link>
            </Header>
        </Segment>
    )
}