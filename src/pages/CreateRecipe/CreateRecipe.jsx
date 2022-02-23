import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
// import {create, getAll} from '../../utils/postApi'
import { Header, Grid, Form, Segment, Button } from "semantic-ui-react";

export default function CreateRecipe({ user, handleLogout }) {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);

    async function handleSubmit(e) {

    }

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function addIngredient(e) {
        e.preventDefault()
        setIngredients([...ingredients, ""]);
    }

    function addInstruction(e) {
        e.preventDefault()
        setInstructions([...instructions, ""]);
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
                    <Form autocomplete="off" onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Grid centered>
                                <Grid.Row>
                                    <Form.Input
                                        name="name"
                                        placeholder="name"
                                        value={name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid.Row>

                                <Header as="h2" floated="center">Ingredients</Header>
                                {
                                    ingredients.map((ingredient, idx) => {
                                        let ingredientId = `${ingredient}=${idx}`
                                        return (
                                            <Grid.Row>
                                                <Form.Input
                                                    type="text"
                                                    name={ingredient}
                                                    data-id={idx}
                                                    id={ingredientId}
                                                    placeholder="ingredient"
                                                />
                                            </Grid.Row>
                                        )
                                    })
                                }
                                <Grid.Row>
                                    <Button onClick={addIngredient} className="btn">Add Ingredient</Button>
                                </Grid.Row>
                                <Header as="h2" floated="center">Instructions</Header>
                                {
                                    instructions.map((instruction, idx) => {
                                        let instructionId = `${instruction}=${idx}`
                                        return (
                                            <Grid.Row>
                                                <Form.Input
                                                    type="text"
                                                    name={instruction}
                                                    data-id={idx}
                                                    id={instructionId}
                                                    placeholder="instruction"
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