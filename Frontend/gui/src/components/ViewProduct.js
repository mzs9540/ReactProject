import React, {Component} from "react";
import { connect } from 'react-redux';
import {fetchProducts, addToCart, buyNow, getCart} from "../actions/eCommerceActions";
import {Grid, Typography, Fab, Box} from "@material-ui/core";
import ShopIcon from '@material-ui/icons/Shop';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import {Link} from "react-router-dom";

class ViewProduct extends Component {

    componentDidMount() {
        this.props.fetchProducts(this.props.match.params.prodId);
    }

    handleAddToCart = item => {
        this.props.addToCart(item,'5', this.props.location);
    };

    handleBuy = item => {
        this.props.buyNow(item.item, 5);
    };

    render() {
        let item;
        if (this.props.products.length > 0) {
            item = this.props.products.find(e => e.item.id === this.props.item.item.id);
        }
        let button;
        if (!item) {
            button = <Fab variant='extended' color='primary' aria-label='buy'
                          onClick={() => this.handleAddToCart(this.props.item)}>
                <ShoppingCartOutlinedIcon/>
                Add To Cart
            </Fab>
        } else {
            button = <Link to="/checkout"><Fab variant='extended' color='primary' aria-label='buy'>
                <ShoppingCartOutlinedIcon/>
                Go To Cart
            </Fab>
            </Link>
        }
        return (
            <Box boxShadow={3} style={{margin: '20px', padding: '10px'}}>
            <Grid container style={{textAlign:"center"}}>
                <Grid item sm style={{height: '80vh', position:"relative"}}>
                    <img src={this.props.item.item.img_url}
                         alt={this.props.item.item.name}
                         height="100%"
                         style={{'borderRadius': '10%'}}
                    />
                </Grid>
                <Grid item sm>
                    <Typography variant='h3' align='center'>{this.props.item.item.name}</Typography>
                    <hr/>
                    <Typography>Model No.: {this.props.item.item.model_no}</Typography>
                    <Typography>Type: {this.props.item.item.type}</Typography>
                    <Typography variant='h4'>Cost: Rs. {this.props.item.item.cost}</Typography>
                    <br/>
                    {button}
                    <Fab variant='extended' color='primary' aria-label='buy'
                         onClick={() => this.handleBuy(this.props.item)} style={{margin: 5}}>
                        <ShopIcon/>
                        Buy Now
                    </Fab>
                </Grid>
            </Grid>
            </Box>
        );
    }
}

const mapStateToProps = state => {
    return {
        item: state.items.products[0],
        products: state.cart.cart,
        redirect: state.auth.redirect,
    }
};

export default connect(mapStateToProps, {fetchProducts, addToCart, buyNow, getCart})(ViewProduct);