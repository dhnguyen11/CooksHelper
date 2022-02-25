import React from "react"
import { Grid } from 'semantic-ui-react'

export default function Ingredient({ ingredient }) {
    
    return (
        <Grid.Column style={{ maxwidth: 900 }}>
            <h4>{ingredient}</h4>
        </Grid.Column>
    )
}