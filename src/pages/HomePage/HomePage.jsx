import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom"
// import {create, getAll} from '../../utils/postApi'
import { Grid } from "semantic-ui-react";

export default function HomePage({ user, handleLogout }) {
    return (
        <>
            <Header user={user} handleLogout={handleLogout} />
            <h1>This is the HomePage</h1>
        </>
    )
}