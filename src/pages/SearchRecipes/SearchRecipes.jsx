import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
// import {create, getAll} from '../../utils/postApi'
import { Grid, Form } from "semantic-ui-react";
import * as recipeAPI from "../../utils/recipeApi"
import RecipeList from "../../components/RecipeList/RecipeList"

export default function SearchRecipes ({ user, handleLogout }) {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [state, setState] = useState({
        recipeSet: []
    });
    const [loading, setLoading] = useState(true);

    function handleChange(e) {
        e.preventDefault();
        const lower = e.target.value.toLowerCase()
        const matches = recipes.filter((recipe) => {
            return recipe.name.toLowerCase().includes(lower);
        })
        setState({
            recipeSet: matches
        })
    }


    // Function to actually get the recipes from the database
    async function getRecipes() {
        try {
            const data = await recipeAPI.getAll();
            setLoading(() => false);
            setRecipes([...data.recipes]);
            setState({
                ...state,
                recipeSet: [...data.recipes]
            })
        } catch (err) {
            console.log(err.message, "<- error message");
            setError(err.message);
        }
    }
    // useEffect will get the recipes at the start, when the page loads
    useEffect(() => {
        getRecipes();
    }, [])

    if(loading) {
        return (
            <>
                <PageHeader user={user} handleLogout={handleLogout} />
                <h1>Loading...</h1>
            </>
        )
    }

    // Returning the page data
    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={user} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 1000}}>
                    <Form>
                        <Form.Input
                            name="terms"
                            placeholder="search"
                            onChange={handleChange}
                        />
                    </Form>
                </Grid.Column>
            </Grid.Row>
            
            {state.recipeSet.length > 0
                ?
                <Grid.Row>
                    <Grid.Column style={{maxWidth: 1250}}>
                        <RecipeList 
                            user={ user }
                            recipes={ state.recipeSet }
                        />
                    </Grid.Column>
                </Grid.Row>
                :<h1 id="msg4">No Matches Found</h1>
            }
            <Grid.Row ><p id="recipe-grid"> </p></Grid.Row>
        </Grid>
    )
}