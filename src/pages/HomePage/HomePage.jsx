import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
// import {create, getAll} from '../../utils/postApi'
import { Grid } from "semantic-ui-react";
import HomeSelect from "../../components/HomeSelect/HomeSelect"

export default function HomePage({ user, handleLogout }) {
    return (
        <>
            <Header user={user} handleLogout={handleLogout} />
            <h1>This is the HomePage</h1>
            <HomeSelect />
        </>
    )
}