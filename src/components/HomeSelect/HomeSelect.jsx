import React from "react";
import { Link } from "react-router-dom"
import { Card, Icon } from "semantic-ui-react"
import "./HomeSelect.css"

export default function HomeSelect() {
    return (
        <Card.Group centered itemsPerRow={3} stackable>
            <Card id="home-card-one" style={{ minWidth: 300, minHeight: 250}}>
                <Link to="/new">
                    <Icon size="large" name="write"></Icon>
                    Add a Recipe
                </Link>
            </Card>
            <Card>
                <Link to="/recipes" style={{ minWidth: 300, minHeight: 250}}>
                    <Icon size="large" name="book"></Icon>
                    View My Cookbook
                </Link>
            </Card>
            <Card>
                <Link to="/search" style={{ minWidth: 300, minHeight: 250}}>
                    <Icon size="large" name="search"></Icon>
                    Search Recipes
                </Link>
            </Card>
        </Card.Group>
    )
}