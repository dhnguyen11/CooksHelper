import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom"
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

export default function LoginPage(props) {
  const [error, setError] = useState("")
  const [state, setState] = useState({
    email: "",
    password: ""
  })

  const navigate=useNavigate()

  // Function to handle changes to the form
  // Resets the state whenever the form changes
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  // Function to handle the form submission
  async function handleSubmit(e) {
    e.preventDefault();
    // setting up a try/catch
    try{
      // Attempting to login to the service
      await userService.login(state)
      // Getting the token
      props.handleSignUpOrLogin();
      // Navigating to home
      navigate("/");
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450}}>
          <Header as="h2" color="black" textAlign="center">Log In to Your Account</Header>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
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
              <Button 
                color="black"
                fluid
                size="large"
                type="submit"
                className="btn"
              >
                Log In
              </Button>
            </Segment>
          </Form>
          <Message>
            New user? <Link to="/signup">Sign Up</Link>
          </Message>
          {error ? <ErrorMessage error={error} /> : null}
        </Grid.Column>
      </Grid>
    </>
  );
}
