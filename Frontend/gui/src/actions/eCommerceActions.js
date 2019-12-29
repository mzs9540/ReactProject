import * as types from './types';
import itemsList from "../apis/itemsList";
import history from "../history";

export const fetchProductsStart = () => {
    return {
        type: types.FETCH_PRODUCTS_START
    }
};

export const fetchProductsSuccess = products => {
    return {
        type: types.FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
};

export const fetchProductsFail = error => {
    return {
        type: types.FETCH_PRODUCTS_FAIL,
        payload: error
    }
};

export const fetchProducts = (query = "") => {
    return dispatch => {
        dispatch(fetchProductsStart());
        if (query === "") {
            return itemsList.get('/items')
                .then(res => dispatch(fetchProductsSuccess(res.data)))
                .catch(err => dispatch(fetchProductsFail(err)))
        } else {
            return itemsList.get(`/items/${query}`)
                .then(res => dispatch(fetchProductsSuccess(res.data)))
                .catch(err => dispatch(fetchProductsFail(err)))
        }
    }
};

export const buyNow = (item,  quantity) => (dispatch, getState) => {
    dispatch({type: types.BUY_NOW, payload: {item, quantity}});
    if (getState().auth.token === null) {
        history.push({ pathname: '/login', state: {from: {pathname: "/buynow"}}});
    } else {
        history.push("/buynow")
    }
};

export const addToCartProcess = (item, quantity) => {
    return {
        type: types.ADD_PRODUCT_TO_CART,
        quantity,
        item
    }
};

export const addToCart = (item, quantity, loc) => (dispatch, getState) =>{
    if (getState().auth.token === null) {
        history.push({ pathname: '/login', state: {from: loc}})
    } else {
        const item1 = getState().cart.cart.find(e => e.item.id === item.item.id);
        if (!item1) {
            return itemsList.post('/cart/',
                {
                    'item_id': item.item.id,
                    'item': item.item,
                    'quantity': quantity
                },
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }).then(dispatch(addToCartProcess(item, 1)))
        }
    }
};

export const getCart= () => async dispatch => {
    const res = await itemsList.get('/cart/',
        {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

    dispatch({type: types.GET_CART, payload: res.data});
};

export const removeProductFromCartProcess = item => {
    return {
        type: types.REMOVE_PRODUCT_FROM_CART,
        payload: item
    }
};

export const removeProductFromCart = item => async dispatch => {
    await itemsList.delete(`/cart/${item.item.id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        data: {
            'item_id': item.item.id,
            'item': item.item,
        },
    });
    dispatch(removeProductFromCartProcess(item));
};

export const updateQuantityProcess = res => {
    return {
        type: types.UPDATE_PRODUCT_QUANTITY,
        payload: res
    }
};

export const updateQuantity = (item, quantity) => async dispatch => {
    const res = await itemsList.post('/cart/',
        {
            'item_id': item.item.id,
            'item': item.item,
            'quantity': quantity
        },
        {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
    dispatch(updateQuantityProcess(res.data))
};

export const updateQuantityBuynow = (item, quantity) => async dispatch => {
    dispatch({
        type: types.UPDATE_PRODUCT_QUANTITY_BUYNOW,
        payload: {item, quantity}
    })
};

export const incProductQuantity = (item, quantity) => {
    return {
        type: types.INC_PRODUCT_QUANTITY,
        item,
        quantity
    }
};

export const decProductQuantity = (item, quantity) => {
    return {
        type: types.DEC_PRODUCT_QUANTITY,
        item,
        quantity
    }
};

export const emptyCart = () => {
    return {
        type: types.EMPTY_CART
    }
};

export const setShipping = address => {
    return {
        type: types.SET_SHIPPING,
        payload: address
    }
};

export const orderConfirmedProcess = formValues => {
    return {
        type: types.TOGGLE_CHECKOUT_COMPLETE,
        payload: formValues
    }
};

export const orderConfirmed = items => async dispatch => {
    const res = await itemsList.post('/order/',
        {
            items
        },
        {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
    dispatch(orderConfirmedProcess(res.data));
    history.push('/ordersummary');
};