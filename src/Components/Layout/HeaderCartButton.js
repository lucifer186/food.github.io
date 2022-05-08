import React,{useContext,useEffect,useState} from "react";
import CartContext from "../../store/Cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = (props) => {
   const[btnIsHidden,setBtnIsHidden] = useState(false)
   const cartCtx = useContext(CartContext);
   const {items} = cartCtx
  const numberItemCart = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnclass = `${classes.button} ${btnIsHidden ? classes.bump:''}`
  useEffect(() => {
    if(items.length===0){
      return
    }
    setBtnIsHidden(true)
    const timer= setTimeout(()=>{
     setBtnIsHidden(false)
    },300)

    return ()=>{
      console.log('clear')
      clearTimeout(timer)
    }


  }, [items])
  return (
    <button className = {btnclass} onClick = {props.onClick}>
      <span className = {classes.icon}>
        <CartIcon />
      </span>
      <span>Your list</span>
      <span className = {classes.badge}>
        {numberItemCart}
      </span>
    </button>
  );
};
export default HeaderCartButton;
