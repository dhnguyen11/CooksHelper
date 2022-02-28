import React from "react";
import { Link } from "react-router-dom"
import { Card, Icon } from "semantic-ui-react"
import "./HomeSelect.css"

export default function HomeSelect() {
    return (
        <Card.Group centered itemsPerRow={3} stackable>
            <Card id="home-card-one">
                <Link to="/new" >
                    <Icon size="large" name="write" />
                    Add a Recipe
                </Link>
            </Card>
            <Card id="home-card-two">
                <Link to="/recipes" >
                    <Icon size="large" name="book" />
                    View My Cookbook
                </Link>
            </Card>
            <Card id="home-card-three">
                <Link to="/search" >
                    <Icon size="large" name="search" />
                    Search Recipes
                </Link>
            </Card>
        </Card.Group>
    )
}