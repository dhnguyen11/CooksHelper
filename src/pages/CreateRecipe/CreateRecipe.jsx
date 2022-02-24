import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
// import {create, getAll} from '../../utils/postApi'
import { Header, Grid, Form, Segment, Button } from "semantic-ui-react";
import * as recipeAPI from "../../utils/recipeApi"

export default function CreateRecipe({ user, handleLogout }) {
    const [state, setState] = useState({
        name: "",
        ingredients: [""],
        instructions: [""]
    });

    async function handleSubmit(e) {
        const data = await recipeAPI.create(state);
        console.log(data)
    }

    function handleEnter(e) {
        console.log(e.charCode, e.target.name)
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
                        <Segment stacked>
                            <Grid centered>
                                <Grid.Row>
                                    <Form.Input
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
                                    <Button onClick={addIngredient} className="btn">Add Ingredient</Button>
                                </Grid.Row>
                                <Header as="h2">Instructions</Header>
                                {
                                    state.instructions.map((instruction, idx) => {
                                        let instructionId = `${idx}`
                                        return (
                                            <Grid.Row key={idx}>
                                                <Form.Input
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
                                    <Button onClick={addInstruction} className="btn">Add Instruction</Button>
                                </Grid.Row>
                                <Grid.Row>
                                    <Button type="submit" className="btn">
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