import React from "react";
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {authLogin} from "../actions";
import {Container, TextField, Fab, Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import history from "../history";

class Login extends React.Component {

    renderInput = ({input, type, id, label, margin, meta: { touched, error, warning }}) => {
        return (
            <Box>
            <TextField {...input} type={type} id={id} label={label} margin={margin} required/>
                {touched && ((error && <Box>{error}</Box>) || (warning && <Box>{warning}</Box>))}
            </Box>
        )
    };

    onSubmit = (formValues) => {
        this.props.authLogin(formValues.username, formValues.password);
        if(this.props.location.state !== undefined) {
            history.push(this.props.location.state.from.pathname);
        } else {
            history.push('/');
        }
        console.log(this.props.location.state.dis);
    };

    render() {
        return(
            <div>
                <Container maxWidth='sm'>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="username" component={this.renderInput} type="text" id="username"
                           label="Username"
                           margin="normal"/>
                           <br/>
                    <Field name="password" component={this.renderInput} type="password"
                           id="password"
                           label="Password"
                           margin="normal"/>
                           <br/>
                        <Fab variant="extended" aria-label="login" type='submit'>
                            Login
                        </Fab>
                        or
                        <Link to='/signup'>Signup</Link>
                    </form>
                </Container>
            </div>
        )
    }
}

Login = connect(null, {authLogin})(Login);

export default reduxForm({form: 'loginForm'})(Login);