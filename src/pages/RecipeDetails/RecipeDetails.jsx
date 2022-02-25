import React, { useState, useEffect } from "react"
import PageHeader from "../../components/PageHeader/PageHeader";
import { Grid, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import * as recipeAPI from "../../utils/recipeApi"
import * as favoriteAPI from "../../utils/favoriteApi"
import FavoriteComponent from "../../components/FavoriteComponent/FavoriteComponent";


export default function RecipeDetails({ user, handleLogout }){
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    let idx = 0;
    
    // Grabbing the param from the browser
    const { recipeId } = useParams();

    useEffect(() => {
        getRecipe();
    }, [recipeId])
    
    async function getRecipe() {
        try {
            const data = await recipeAPI.getOne(recipeId);
            setLoading(() => false);
            setRecipe(data.recipe);
            console.log(data.recipe)
            setIngredients(data.recipe.ingredients);
            setInstructions(data.recipe.instructions);
        } catch(err) {
            setLoading(() => false);
            setError("Recipe does not exist");
        }
    }

    async function addFavorite(recipeId) {
        try {
            const data = await favoriteAPI.create(recipeId)
            getRecipe();
        }catch(err){
            console.log(err.message);
            setError(err.message);
        }
    }

    async function deleteFavorite(favoriteId) {
        try {
            const data = await favoriteAPI.removeFavorite(favoriteId);
            getRecipe();
        }catch(err){
            console.log(err.message);
            setError(err.message);
        }
    }


    if (loading) {
        return (
            <>
                <PageHeader user={user} handleLogout={handleLogout} />
                <h1>Loading...</h1>
            </>
        )
    }

    if (error) {
        return (
            <>
                <PageHeader user={user} handleLogout={handleLogout} />
                <h1>Recipe not found</h1>
            </>
        )
    }

    return(
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={user} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={10}></Grid.Column>
                <Grid.Column floated="right" width={2}>
                    <FavoriteComponent user={user} recipe={recipe} addFavorite={addFavorite} deleteFavorite={deleteFavorite} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <h1>{ recipe.name }</h1>
            </Grid.Row>
            <Grid.Row>
                <h3>by {user.username}</h3>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 1000}}>
                    <h2>Ingredients</h2>
                </Grid.Column>
            </Grid.Row>
            {   
                ingredients.map((ingredient) => {
                    if (ingredient === '') {
                        return;
                    }
                    return (
                        <Grid.Row key={ingredient}>
                            <Grid.Column style={{ maxWidth: 900 }}>
                                <h4>{ingredient}</h4>
                            </Grid.Column>
                        </Grid.Row>
                    )
                })
            }
            <Grid.Row>
                <Grid.Column style={{maxWidth: 1000}}>
                    <h2>Instructions</h2>
                </Grid.Column>
            </Grid.Row>
            {
                instructions.map((instruction) => {
                    if (instruction === '') {
                        return;
                    }
                    idx++;
                    return (
                        <Grid.Row key={instruction}>
                            <Grid.Column style={{ maxWidth: 900 }}>
                                <h4>{idx}. {instruction}</h4>
                            </Grid.Column>
                        </Grid.Row>
                    )
                })
            }
        </Grid>
    )
}