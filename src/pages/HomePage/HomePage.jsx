import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Grid } from "semantic-ui-react";
import HomeSelect from "../../components/HomeSelect/HomeSelect"
import "./HomePage.css"

export default function HomePage({ user, handleLogout }) {
    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={user} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <h1>Cooks' Helper</h1>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 1250}}>
                    <HomeSelect />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}