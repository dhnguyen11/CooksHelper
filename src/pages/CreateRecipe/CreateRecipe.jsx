import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
// import {create, getAll} from '../../utils/postApi'
import { Grid, Form, Segment, Button } from "semantic-ui-react";

export default function CreateRecipe({ user, handleLogout }){
    const [name, setName] = useState("")
    async function handleSubmit(e) {

    }

    function handleChange(e){
        setName(e.target.value)
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <Header user={user} handleLogout={handleLogout}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Form autocomplete="off" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="name"
                            placeholder="name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    <Button>Add Ingredient</Button>
                    <Button>Add Instruction</Button>
                </Segment>
                </Form>
            </Grid.Row>
        </Grid>
    )
}