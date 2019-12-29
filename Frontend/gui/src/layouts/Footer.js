import React, {Component} from "react";
import { Paper, Tabs, Tab} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {authLogout} from "../actions";


class Footer extends Component {

    handleChange = (e, index) => {
        this.props.onSelect(index);
    }

    render() {
        return (
            <Paper square>
                <Tabs
                    value={this.props.index}
                    indicatorColor="primary"
                    onChange={this.handleChange}
                    textColor="primary"
                    aria-label="disabled tabs example"
                >
                    <Tab label="Home Page" component={Link} to='/'/>

                </Tabs>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
};

export default connect(mapStateToProps, {authLogout})(Footer);