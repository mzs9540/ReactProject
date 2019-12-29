import React from "react";
import {Container, Fab, TextField} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {authSignup} from "../actions";
import {Link} from "react-router-dom";

class Signup extends React.Component{

    renderInput = ({input, type, id, label, margin}) => {
        return (
            <TextField {...input} type={type} id={id} label={label} margin={margin}/>
        )
    };

    onSubmit = (formValues) => {
        this.props.authSignup(formValues.username, formValues.email, formValues.password1, formValues.password2);
        this.props.history.push('/');
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
                        <Field name="email" component={this.renderInput} type="email" id="email"
                               label="Email"
                               margin="normal"/>
                               <br/>
                        <Field name="password1" component={this.renderInput} type="password"
                               id="password1"
                               label="Enter Password"
                               margin="normal"/>
                        <br/>
                        <Field name="password2" component={this.renderInput} type="password"
                               id="password2"
                               label="Enter Same Password"
                               margin="normal"/>
                               <br/>
                        <Fab variant="extended" aria-label="Signup" type='submit'>
                            Signup
                        </Fab>
                        or
                        <Link to='/login'>Login</Link>
                    </form>
                </Container>
            </div>
        )
    }
}
Signup = connect(null, {authSignup})(Signup);

export default reduxForm({form: 'SignupForm'})(Signup);