import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

export default function SignUpPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: ""
  })

  const [selectedFile, setSelectedFile] = useState("")
  const navigate = useNavigate();

  // Function to handle changes to the form
  // Resets the state whenever the form changes
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  // Function to handle file input
  // sets the selected file to the input file
  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

  // Function to handle the form submission
  async function handleSubmit(e){
    e.preventDefault();

    // Creating formdata for the state
    // This needs to be done because this form sends a file

    const formData = new FormData();

    // Appending the photo to formData

    formData.append('photo', selectedFile)

    // Using a loop to append the remainder of the state to the formData

    for (let key in state) {
      formData.append(key, state[key])
    }

    // code to submit formData
    try{
      // Sending the formData to userService
      await userService.signup(formData)
      // Getting the token and setting it to local storage
      props.handleSignUpOrLogin()
      // Returning to home
      navigate('/')
    } catch(err) {
      // Setting the error if an error is thrown
      setError(err.message)
    }

  }

  return (
    <>
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450}}>
          <Header as="h2" color="black" textAlign="center">Sign Up For An Account</Header>
          <Form autocomplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                type="username"
                name="username"
                placeholder="username"
                value={state.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="password"
                name="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="password"
                name="passwordConf"
                placeholder="Confirm Password"
                value={state.passwordConf}
                onChange={handleChange}
                required
              />
              <Form.TextArea
                label="bio"
                name="bio"
                placeholder="Tell us about you!"
                onChange={handleChange}
              />
              <Form.Field>
                <Form.Input
                  type="file"
                  name="photo"
                  placeholder="upload image"
                  onChange={handleFileInput}
                  required
                />
              </Form.Field>
              <Button 
                color="black"
                size="large"
                type="submit"
                className="btn"
              >
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Returning user? <Link to="/login">Log In</Link>
          </Message>
          {error ? <ErrorMessage error={error} /> : null}
        </Grid.Column>
      </Grid>
    </>
  );
}
