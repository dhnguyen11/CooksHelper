import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
// import {create, getAll} from '../../utils/postApi'
import { Grid } from "semantic-ui-react";
import HomeSelect from "../../components/HomeSelect/HomeSelect"

export default function HomePage({ user, handleLogout }) {
    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <Header user={user} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <h1>This is the HomePage</h1>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 1250}}>
                    <HomeSelect />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}