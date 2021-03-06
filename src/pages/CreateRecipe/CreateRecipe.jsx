import React, { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
// import {create, getAll} from '../../utils/postApi'
import { Header, Grid, Form, Segment, Button } from "semantic-ui-react";
import * as recipeAPI from "../../utils/recipeApi"
import * as favoriteAPI from "../../utils/favoriteApi"
import { useNavigate } from "react-router-dom"

export default function CreateRecipe({ user, handleLogout }) {
    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        ingredients: [""],
        instructions: [""],
        glutenFree: false,
        vegan: false
    });

    async function handleSubmit(e) {
        const data = await recipeAPI.create(state);
        console.log(data)
        const data2 = await favoriteAPI.create(data.recipe._id)
        navigate(`/recipes/${data.recipe._id}`)
    }

    function handleEnter(e) {
        if (e.charCode === 13) {
            e.preventDefault();
            switch(e.target.name) {
                case 'ingredient': 
                    addIngredient(e);
                    break;
                case 'ing-btn':
                    addIngredient(e)
                    break;
                case 'instruction':
                    addInstruction(e)
                    break;
                case 'inst-btn':
                    addInstruction(e)
                    break;
                case 'sub-btn':
                    handleSubmit(e)
                    break;
            }
        }
    }

    function handleChange(e) {
        e.preventDefault()
        if (["ingredient"].includes(e.target.name)) {
            let newIngredients = [...state.ingredients];
            let loc = parseInt(e.target.id)
            newIngredients[loc] = e.target.value;
            setState({
                ...state,
                ingredients: newIngredients
            })
        }
        else if (["instruction"].includes(e.target.name)) {
            let newInstructions = [...state.instructions];
            let loc = parseInt(e.target.id)
            newInstructions[loc] = e.target.value;
            setState({
                ...state,
                instructions: newInstructions
            })
        }
        else {
            console.log(e.target.name)
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }

    function addIngredient(e) {
        e.preventDefault()
        setState({
            ...state,
            ingredients: [...state.ingredients, ""]
        })
    }

    function addInstruction(e) {
        e.preventDefault()
        setState({
            ...state,
            instructions: [...state.instructions, ""]
        })
    }

    function toggleGluten(e) {
        e.preventDefault()
            setState({
                ...state,
                glutenFree: !state.glutenFree
            })
        
    }

    function toggleVegan(e) {
        e.preventDefault()
            setState({
                ...state,
                vegan: !state.vegan
            })
        
    }

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={user} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Header as="h1" textAlign='center'>Create Recipe</Header>
            </Grid.Row>
            <Grid.Row style={{ maxWidth: 450 }}>
                <Grid.Column>
                    <Form autoComplete="off" onKeyPress={handleEnter} onSubmit={handleSubmit}>
                        <Segment>
                            <Grid centered>
                                <Grid.Row>
                                    <Form.Input
                                        style={{ minWidth: 350 }}
                                        name="name"
                                        placeholder="name"
                                        value={state.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid.Row>

                                <Header as="h2">Ingredients</Header>
                                {
                                    state.ingredients.map((ingredient, idx) => {
                                        let ingredientId = `${idx}`
                                        return (
                                            <Grid.Row key={idx}>
                                                <Form.Input
                                                    style={{ minWidth: 350 }}
                                                    type="text"
                                                    name="ingredient"
                                                    data-id={idx}
                                                    id={ingredientId}
                                                    placeholder="ingredient"
                                                    className="ingredient"
                                                    value={ingredient}
                                                    onChange={handleChange}
                                                />
                                            </Grid.Row>
                                        )
                                    })
                                }
                                <Grid.Row>
                                    <Button 
                                        onClick={addIngredient} 
                                        name="ing-btn" 
                                        className="btn"
                                    >
                                        Add Ingredient
                                    </Button>
                                </Grid.Row>
                                <Header as="h2">Instructions</Header>
                                {
                                    state.instructions.map((instruction, idx) => {
                                        let instructionId = `${idx}`
                                        return (
                                            <Grid.Row key={idx}>
                                                <Form.TextArea
                                                    style={{ minWidth: 350 }}
                                                    type="text"
                                                    name="instruction"
                                                    data-id={idx}
                                                    id={instructionId}
                                                    placeholder="instruction"
                                                    className="instruction"
                                                    value={instruction}
                                                    onChange={handleChange}
                                                />
                                            </Grid.Row>
                                        )
                                    })
                                }
                                <Grid.Row>
                                    <Button 
                                        onClick={addInstruction} 
                                        className="btn"
                                        name="inst-btn"
                                    >
                                        Add Instruction
                                    </Button>
                                </Grid.Row>
                                <Grid.Row>
                                    <Form.Checkbox label="Vegan Friendly" name="vegan" onChange={toggleVegan}/>
                                    <Form.Checkbox label="Gluten Free" name="glutenFree" onClick={toggleGluten}/>
                                </Grid.Row>
                                <Grid.Row>
                                    <Button 
                                        type="submit" 
                                        className="btn" 
                                        name="sub-btn"
                                    >
                                    Create Recipe
                                    </Button>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}