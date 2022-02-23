import React from "react";
import { Link } from "react-router-dom"
import { Card, Icon, Grid } from "semantic-ui-react"

export default function HomeSelect() {
    return (
        <Card.Group centered itemsPerRow={3} stackable>
            <Card>
                <Link to="/new">
                    <Icon size="large" name="write"></Icon>
                    Add a Recipe
                </Link>
            </Card>
            <Card>
                <Link to="/">
                    <Icon size="large" name="book"></Icon>
                    View My Cookbook
                </Link>
            </Card>
            <Card>
                <Link to="/">
                    <Icon size="large" name="search"></Icon>
                    Search Recipes
                </Link>
            </Card>
        </Card.Group>
    )
}