import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Grid, Button } from "semantic-ui-react";
import * as groceryAPI from "../../utils/groceryApi"
import { useNavigate } from "react-router";
import "./GroceryList.css"

export default function GroceryList({ user, handleLogout }){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [groceries, setGroceries] = useState([]);

    const navigate = useNavigate();

    async function getGroceries() {
        try {
            const data = await groceryAPI.getGroceries();
            setGroceries(data.groceries)
            setLoading(false)
        }catch(err){
            setLoading(() => false);
            setError("List not found");
        }
    }

    useEffect(() => {
        getGroceries()
    }, [])

    async function deleteGroceries(){
        try{
            const deleted = await groceryAPI.emptyGroceries()
            const data = await groceryAPI.getGroceries();
            setGroceries(data.groceries)
            navigate("/groceries")
        }catch(err){
            console.log(err.message);
            setError(err.message)
        }
    }

    if (loading) {
        return (
            <>
                <PageHeader user={user} handleLogout={handleLogout} />
                <h1 >Loading...</h1>
            </>
        )
    }

    if (error) {
        return (
            <>
                <PageHeader user={user} handleLogout={handleLogout} />
                <h1 id="msg1">Grocery List Not Found</h1>
            </>
        )
    }

    if (groceries.length === 0) {
        return(
            <>
                <PageHeader user={user} handleLogout={handleLogout} />
                <h1 id="msg2">No Groceries Selected</h1>
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
                <h1>My Grocery List</h1>
            </Grid.Row>
            {   
                groceries.map((grocery, index) => {
                    if (grocery === '') {
                        return;
                    }
                    return (
                        <Grid.Row key={index}>
                            <Grid.Column style={{ maxWidth: 900 }}>
                                <h4>{grocery}</h4>
                            </Grid.Column>
                        </Grid.Row>
                    )
                })
            }
            <Grid.Row>
                <Button onClick={deleteGroceries}>Clear Grocery List</Button>
            </Grid.Row>
        </Grid>
    )
}