import React from 'react';
import { Link } from "react-router-dom";
import { Header, Segment, Icon, Image } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
    return(
        <Segment clearing>
            <Header as="h2" floated="left">
                <Image
                    src={
                        user?.photoUrl 
                            ? user.photoUrl
                            : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    }
                    avatar
                    size="medium"
                    ></Image>
            </Header>
            <Header as="h2" floated="right">
                <Link to="/">
                    <Icon name="home"></Icon>
                </Link>
                <Link to="" onClick={handleLogout}>
                    Log Out
                </Link>
            </Header>
        </Segment>
    )
}