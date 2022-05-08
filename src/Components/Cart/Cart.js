import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Model";
import CartItem from "./CartItem";
import CartContext from "../../store/Cart-context";
import CheckOut from "./CheckOut";
import "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);


  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const submitFormHandler = async (useData) =>{
    setIsSubmiting(true)
    await fetch('https://reactjs-2f87c-default-rtdb.firebaseio.com/order.json',{
  
    method:'POST',
    body:JSON.stringify({
      user:useData,
      orderItem:cartCtx.items
    })
  }
    )
    setIsSubmiting(false)
    setdidSubmit(true)
    cartCtx.clearCart()


  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const ModelAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button}  onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const  CartItems = (
    <React.Fragment>
       {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <CheckOut onConfirm = {submitFormHandler} onClose = {props.onClose}/>}
      {!isCheckout && ModelAction}
    </React.Fragment>

  )
  const SubmittingOrder =  <p> Sending Order...  </p>
  const DidSubmitItems = (
  <div>
    <p>Order has been successfully sent</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
      </div>
  </div>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && CartItems}
      {isSubmiting && SubmittingOrder}
      {didSubmit && !isSubmiting && DidSubmitItems}
     
    </Modal>
  );
};
export default Cart;
