import React from 'react';
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom"

export default function RecipeCard({ recipe, user }) {
    return (
        <Card key={recipe._id} raised style={{padding: 15}}>
            <Link to={`/recipes/${recipe._id}`}>
                <Card.Content textAlign="left">
                    { recipe.name } by { user }
                </Card.Content>
             </Link>
        </Card>
    )
}