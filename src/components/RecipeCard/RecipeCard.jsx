import React from 'react';
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom"

export default function RecipeCard({ recipe, user }) {
    return (
        <Card key={recipe._id} raised>
            <Card.Content textAlign="left">
                <Link to={`/recipes/${recipe._id}`}>
                    { recipe.name } by { user }
                </Link>
            </Card.Content>
            
        </Card>
    )
}