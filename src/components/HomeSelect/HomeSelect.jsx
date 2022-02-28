import React from "react";
import { Link } from "react-router-dom"
import { Card, Icon } from "semantic-ui-react"
import "./HomeSelect.css"

export default function HomeSelect() {
    return (
        <Card.Group centered itemsPerRow={2} stackable>
            <Card id="home-card-one">
                <Link to="/new" id="home-link-one">
                    <Icon size="huge" name="write" />
                    Add a Recipe
                </Link>
            </Card>
            <Card id="home-card-two">
                <Link to="/recipes" id="home-link-two">
                    <Icon size="huge" name="book" />
                    View My Cookbook
                </Link>
            </Card>
            <Card id="home-card-three">
                <Link to="/search" id="home-link-three">
                    <Icon size="huge" name="search" />
                    Search Recipes
                </Link>
            </Card>
            <Card id="home-card-four">
                <Link to="/groceries" id="home-link-four">
                    <Icon size="huge" name="list alternate outline" />
                    Shopping list
                </Link>
            </Card>
        </Card.Group>
    )
}