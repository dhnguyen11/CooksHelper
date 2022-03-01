import React from 'react';
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom"
import "./RecipeCard.css"

export default function RecipeCard({ recipe, user }) {
    return (
        <Card key={recipe._id} raised style={{padding: 15}}>
            <Link to={`/recipes/${recipe._id}`}>
                <Card.Content>
                    { recipe.name } by { user } 
                    { recipe.vegan
                        ? <Icon name="leaf" color="green" id="vegan-symbol" size="large" />
                        : <Icon name="leaf" disabled color="grey" id="vegan-symbol" size="large" />
                    }
                    { recipe.glutenFree
                        ? <Icon.Group size="large" id="gluten-symbol">
                            <Icon fitted name="pagelines" color="brown" />
                            <Icon name='dont' color="red" size="large"></Icon>
                          </Icon.Group>
                        : <Icon.Group size="large" id="gluten-symbol">
                            <Icon disabled fitted name="pagelines" color="grey" />
                            <Icon disabled name='dont' color="grey" size="large"></Icon>
                          </Icon.Group>
                    }
                </Card.Content>
             </Link>
        </Card>
    )
}