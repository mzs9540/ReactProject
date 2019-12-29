import React, {Component} from "react";
import {Typography, Grid, Box, Fab, TextField, MenuItem, Select} from "@material-ui/core";
import {Field, reduxForm} from "redux-form";


class PlaceOrder extends Component {

    onSubmit = formValues => {
        this.props.onSubmit(this.props.items, formValues);
    };

    renderTextInput = ({ input, type, id, label, variant, style, required}) => {
        return (
            <TextField {...input} variant={variant} type={type} id={id} label={label} style={style} required={required}/>
        )
    };

    handleSelect = (event, item) => {
        this.props.onSelect(event, item);
    };

    onKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    render() {
        return (
                <Grid container>
                    <Grid container item sm={6}>
                    <Box boxShadow={3} style={{margin: '20px', padding: '10px'}}>
                    {this.props.items.map((item) => {
                        return (
                            <Grid container spacing={1} item key={item.item.id}>
                                <Grid item sm={3} style={{height: '20vh', position:"relative"}}>
                                    <img src={item.item.img_url}
                                         alt={item.item.name}
                                         height="80%"
                                         width="80%"
                                         style={{'borderRadius': '10%'}}
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <Typography variant="subtitle2">Item: {item.item.name}</Typography>
                                    <Typography variant="subtitle2">Cost: Rs. {item.item.cost}</Typography>
                                    <Typography variant="subtitle2">Quantity :
                                    <Select
                                        labelId="labelSelectViewProduct"
                                        id="selectViewProduct"
                                        value={item.quantity}
                                        onChange={ event => this.handleSelect(event, item)}
                                    >
                                        <MenuItem value={5}>Five </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={15}>Fifteen</MenuItem>
                                    </Select>
                                    </Typography>
                                </Grid>
                                <Grid item sm={4}>
                                    <Typography variant="subtitle2">Type: {item.item.type}</Typography>
                                    <Typography variant="subtitle2">Model No.: {item.item.model_no}</Typography>
                                    {(this.props.location.pathname !== '/buynow' ? <Fab color='primary' aria-label='buy' onClick={() => this.props.removeProductFromCart(item)}>
                                        remove
                                    </Fab> : null)}
                                </Grid>
                            </Grid>
                        )
                    })}
                    </Box>
                    </Grid>
                    <Grid item sm={6}>
                    <Box boxShadow={3} style={{margin: '20px', padding: '10px'}}>
                    <h3> Personal Details:</h3>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} onKeyPress={this.onKeyPress}>
                        <Field component={this.renderTextInput}
                               name="firstname"
                               variant="outlined"
                               type="text" id="firstnamecheckout"
                               label="First name"
                               margin="normal"
                               style={{margin: "5px"}}
                               required= {true}
                        />
                        <Field component={this.renderTextInput}
                               name="lastname"
                               variant="outlined"
                               type="text" id="lastnamecheckout"
                               label="Last name"
                               margin="normal"
                               style={{margin: "5px"}}
                               required= {true}
                        />
                        <Field component={this.renderTextInput}
                                   name="phonecheckout"
                                   variant="outlined"
                                   type="text" id="phonecheckout"
                                   label="Phone No."
                                   margin="normal"
                                   style={{margin: "5px"}}
                                   required= {true}
                            />
                            <Field component={this.renderTextInput}
                                   name="emailcheckout"
                                   variant="outlined"
                                   type="email" id="emailcheckout"
                                   label="Email"
                                   margin="normal"
                                   style={{margin: "5px"}}
                                   required= {true}
                            />
                            <hr/>
                            <h3> Enter Address:</h3>
                            <Field component={this.renderTextInput}
                                   name="housename"
                                   variant="outlined"
                                   type="text" id="housename"
                                   label="House No., Building name"
                                   margin="normal"
                                   style={{margin:"5px", width:"100%"}}
                                   required= {true}
                            />
                            <Field component={this.renderTextInput}
                                   name="roadname"
                                   variant="outlined"
                                   type="text" id="roadname"
                                   label="Road Name, Area, Colony"
                                   margin="normal"
                                   style={{margin:"5px", width:"100%"}}
                                   required= {true}
                            />
                            <Field component={this.renderTextInput}
                                   name="city"
                                   variant="outlined"
                                   type="text" id="city"
                                   label="City"
                                   margin="normal"
                                   style={{margin: "5px"}}
                                   required= {true}
                            />
                            <Field component={this.renderTextInput}
                                   name="state"
                                   variant="outlined"
                                   type="text" id="state"
                                   label="State"
                                   margin="normal"
                                   style={{margin: "5px"}}
                                   required= {true}
                            />
                            <Field component={this.renderTextInput}
                                   name="pincode"
                                   variant="outlined"
                                   type="number" id="pincode"
                                   label="Pincode"
                                   margin="normal"
                                   style={{margin: "5px"}}
                                   required= {true}
                            />
                            <Field component={this.renderTextInput}
                                   name="landmark"
                                   variant="outlined"
                                   type="text" id="landmark"
                                   label="Landmark (Optional)"
                                   margin="normal"
                                   style={{margin: "5px"}}
                                   required= {false}
                            />
                            <br/>
                            <Fab variant='extended' color='primary' aria-label='placeOrder'
                                 type='submit'>
                                Place Order
                            </Fab>
                        </form>
                    </Box>
                    </Grid>
                </Grid>
        );
    }
}

export default reduxForm({form: 'CheckoutForm'})(PlaceOrder);
