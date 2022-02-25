import React from 'react';
import { Card } from "semantic-ui-react"

export default function RecipeCard({ recipe, user }) {
    return (
        <Card key={recipe._id} raised>
            <Card.Content textAlign="left">
                { recipe.name } by { user }
            </Card.Content>
        </Card>
    )
}