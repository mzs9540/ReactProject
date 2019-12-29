import React, {Component, Fragment} from "react";
import {Paper, Grid} from "@material-ui/core";
import CardLayout from "../layouts/Cards";
import {connect} from 'react-redux';
import {fetchProducts, getCart} from "../actions/eCommerceActions";
import {Link} from "react-router-dom";

const style = {
    Paper: {
        padding:20,
        marginTop: 10,
        marginBottom: 10
    }
};

class Homepage extends Component{

    componentDidMount() {
        this.props.fetchProducts();
    };

    render() {
        return (
            <Fragment>
                <Grid container style={{padding: '30px'}}>
                    <Grid item sm>
                        <CardLayout
                            item="Cup 1"
                            img="https://res.cloudinary.com/mzs/image/upload/v1574402745/Practise/Crockery%20Project/WhatsApp_Image_2019-11-13_at_20.44.38.jpg"
                            ht="300"
                            alt="Cup 1"
                            title="Cups"
                            link="/login"
                        />
                    </Grid>

                    <Grid item sm>
                        <CardLayout
                            item="Cup 2"
                            img="https://res.cloudinary.com/mzs/image/upload/v1574402974/Practise/Crockery%20Project/WhatsApp_Image_2019-11-13_at_20.44.28.jpg"
                            ht="300"
                            alt="Cup 1"
                            title="Cups"
                            link="/login"
                        />
                    </Grid>
                    <Grid item sm>
                        <CardLayout
                            item="Cup 3"
                            img="https://res.cloudinary.com/mzs/image/upload/v1574403030/Practise/Crockery%20Project/WhatsApp_Image_2019-11-13_at_20.44.30.jpg"
                            ht="300"
                            alt="Cup 1"
                            title="Cups"
                            link="/login"
                        />
                    </Grid>
                </Grid>
            <Grid container>
                <Grid item sm>
                    <Paper style={style.Paper}>
                        {this.props.products.map(prod => {
                            return (
                                <Link to={`/product/${prod.item.id}`} key={prod.item.id}>{prod.item.name}</Link>
                            )
                        })}
                    </Paper>
                </Grid>
                <Grid item sm>
                    <Paper style={style.Paper}>
                        Right Pane
                    </Paper>
                </Grid>
            </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: Object.values(state.items.products)
    }
};

export default connect(mapStateToProps, {fetchProducts, getCart})(Homepage);