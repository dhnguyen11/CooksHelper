import React from 'react';
import { Card } from "semantic-ui-react"
import RecipeCard from "../../components/RecipeCard/RecipeCard"

export default function RecipeList({ user, recipes }) {
    return(
        <Card.Group centered itemsPerRow={1} stackable>
            {
                recipes.map((recipe) => {
                    return (
                        <RecipeCard 
                            key={recipe._id}
                            recipe={recipe}
                            user={ recipe.user.username }
                        />
                    )
                })
            }
        </Card.Group>
    )
}