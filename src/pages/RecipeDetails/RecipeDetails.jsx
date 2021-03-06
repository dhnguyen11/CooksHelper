import React, { useState, useEffect } from "react"
import PageHeader from "../../components/PageHeader/PageHeader";
import { Grid, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import * as recipeAPI from "../../utils/recipeApi";
import * as favoriteAPI from "../../utils/favoriteApi";
import * as groceryAPI from "../../utils/groceryApi";
import FavoriteComponent from "../../components/FavoriteComponent/FavoriteComponent";
import { useNavigate } from "react-router-dom";
import "./RecipeDetails.css"


export default function RecipeDetails({ user, handleLogout }){
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [isOwner, setIsOwner] = useState(false)
    const navigate = useNavigate();
    let idx = 0;
    
    // Grabbing the param from the browser
    const { recipeId } = useParams();

    async function getRecipe() {
        try {
            const data = await recipeAPI.getOne(recipeId);
            setRecipe(data.recipe);
            setIngredients(data.recipe.ingredients);
            setInstructions(data.recipe.instructions);
            if (data.recipe.user.username === user.username) {
                setIsOwner(true);
            }
            setLoading(false);
        } catch(err) {
            setLoading(() => false);
            setError("Recipe does not exist");
        }
    }

    useEffect(() => {
        getRecipe();
    }, [recipeId])
    
    

    async function addFavorite(recipeId) {
        console.log(recipeId, "recipeId")
        try {
            const data = await favoriteAPI.create(recipeId)
            getRecipe();
        }catch(err){
            console.log(err.message);
            setError(err.message);
        }
    }

    async function deleteFavorite(favoriteId) {
        console.log(favoriteId, "favoriteID")
        try {
            const data = await favoriteAPI.removeFavorite(favoriteId);
            getRecipe();
        }catch(err){
            console.log(err.message);
            setError(err.message);
        }
    }

    async function deleteRecipe() {
        try {
            const data = await recipeAPI.deleteOne(recipe._id)
            navigate("/")
        } catch(err){
            console.log(err.message);
            setError(err.message)
        }
    }

    async function addGroceries() {
        try {
            const data = await groceryAPI.addGroceries(recipe._id)
            navigate("/groceries")
        } catch(err) {
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
                <Grid.Column floated="left" width={1}></Grid.Column>
                {isOwner 
                    ? <Grid.Column floated="left" width={2}><Button onClick={deleteRecipe}>Delete</Button></Grid.Column>
                    : <Grid.Column floated="left" width={2}></Grid.Column>
                }
                <Grid.Column width={10}></Grid.Column>
                <Grid.Column floated="right" width={2}>
                    <FavoriteComponent user={user} recipe={recipe} addFavorite={addFavorite} deleteFavorite={deleteFavorite} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <h1>{ recipe.name }</h1>
            </Grid.Row>
            <Grid.Row>
                <h3>by {recipe.user.username}</h3>
            </Grid.Row>
            { recipe.glutenFree
                ? <Grid.Row>
                    <h3>Gluten Free</h3>
                </Grid.Row>
                : <></>
            }
            { recipe.vegan
                ? <Grid.Row>
                    <h3>Vegan-Friendly</h3>
                </Grid.Row>
                : <></>
            }
            <Grid.Row>
                <Button onClick={addGroceries}>Make This!</Button>
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
            <Grid.Row ><p id="recipe-grid"> </p></Grid.Row>
        </Grid>
    )
}