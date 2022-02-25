import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
// import {create, getAll} from '../../utils/postApi'
import { Grid } from "semantic-ui-react";
import * as recipeAPI from "../../utils/recipeApi"
import RecipeList from "../../components/RecipeList/RecipeList"

export default function MyCookbook ({ user, handleLogout }) {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true)

    // Function to actually get the recipes from the database
    async function getRecipes() {
        try {
            const data = await recipeAPI.getFavorites();
            setLoading(() => false);
            setRecipes([...data.recipes]);
        } catch (err) {
            console.log(err.message, "<- error message");
            setError(err.message);
        }
    }
    // useEffect will get the recipes at the start, when the page loads
    useEffect(() => {
        getRecipes();
    }, [])
    // Returning the page data
    if(loading) {
        return (
            <>
                <PageHeader user={user} handleLogout={handleLogout} />
                <h1>Loading...</h1>
            </>
        )
    }
    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={user} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 1250}}>
                    <RecipeList 
                        user={ user }
                        recipes={ recipes }
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}