import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
// import {create, getAll} from '../../utils/postApi'
import { Header, Grid, Form, Segment, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom"

export default function MyCookbook ({ user, handleLogout }) {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={user} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    In MyCookbook
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}