import React from 'react';
import { Link } from "react-router-dom";
import { Header, Segment, Icon, Image } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
    return(
        <Segment clearing>
            <Header as="h2" floated="left">
                <Link to="/">
                    Cooks' Helper
                </Link>
            </Header>
            <Header as="h2" floated="right">
                <Link to="" onClick={handleLogout}>
                    Log Out
                </Link>
            </Header>
        </Segment>
    )
}