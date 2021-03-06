import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import HomePage from "../HomePage/HomePage";
import userService from "../../utils/userService";
import CreateRecipe from "../CreateRecipe/CreateRecipe"
import MyCookbook from "../MyCookbook/MyCookbook"
import SearchRecipes from "../SearchRecipes/SearchRecipes"
import RecipeDetails from "../RecipeDetails/RecipeDetails"
import GroceryList from "../GroceryList/GroceryList"

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} />} />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/new"
          element={<CreateRecipe user={user} handleLogout={handleLogout}/>}
        />
        <Route
          path="/recipes"
          element={<MyCookbook user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/search"
          element={<SearchRecipes user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/recipes/:recipeId" 
          element={<RecipeDetails user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/groceries"
          element={<GroceryList user={user} handleLogout={handleLogout} />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
