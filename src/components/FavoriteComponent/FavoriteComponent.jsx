import React from "react";
import { Icon } from "semantic-ui-react"

export default function FavoriteComponent( { user, recipe, addFavorite, deleteFavorite } ) {
    // Determine if the user liked the post
    const favoriteIndex = recipe.favorites.findIndex(favorite => favorite.username === user.username)
    // Set the favorite color
    const favoriteColor = favoriteIndex > -1 ? 'red' : 'grey';
    // handle a click on the heart
    // If liked, a click should add as favorite
    // otherwise it should remove the favorite
    const clickHandler = favoriteIndex > -1 ? () => deleteFavorite(recipe.favorites[favoriteIndex]._id) : () => addFavorite(recipe._id)

    return(
        <Icon name={"heart"} size="big" color={favoriteColor} onClick={clickHandler} />
    )
}