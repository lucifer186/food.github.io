import React from "react";

const CartContext = React.createContext({
    items: [],
    Totalamount: 0,
    additem : (item) =>{},
    Removeitem : (id) =>{},
    clearCart:() =>{}
})

export default  CartContext;