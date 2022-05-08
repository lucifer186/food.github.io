import React, { useRef,useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = (value) => value.trim() === "";
const isFive = (value) => value.trim().length === 10;
const CheckOut = (props) => {
  const[formInputisValid, setFormInputIsvalid] = useState({
      name:true,
      city:true,
      address:true,
      phoneno:true
  }) 
  const NameRef = useRef();
  const CityRef = useRef();
  const AddressRef = useRef();
  const phoneRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredname = NameRef.current.value;
    const cityname = CityRef.current.value;
    const addressname = AddressRef.current.value;
    const phonename = phoneRef.current.value;

    const enterednameIsvalid = !isEmpty(enteredname)
    const citynameIsvalid = !isEmpty(cityname)
    const addressnameIsvalid = !isEmpty(addressname)
    const phonenameIsvalid = isFive(phonename)

    setFormInputIsvalid({
        name:enterednameIsvalid,
        city:citynameIsvalid,
        address:addressnameIsvalid,
        phoneno:phonenameIsvalid,
    })

    const formIsvalid = enterednameIsvalid && citynameIsvalid && addressnameIsvalid && phonenameIsvalid;

    if(!formIsvalid){
        return;
    }
    props.onConfirm({
      name:enteredname,
      city:cityname,
      address:addressname,
      phoneno:phonename
    })



  };
  return (
    <form onSubmit={confirmHandler} className = {classes.form}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={NameRef} />
        {!formInputisValid.name && <p className = {classes.valid}>Please enter a valid name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={AddressRef} />
        {!formInputisValid.address && <p className = {classes.valid}>Please enter a address name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="number">Phone no. </label>
        <input type="number" id="number" ref={phoneRef} />
        {!formInputisValid.phoneno && <p className = {classes.valid}>Please enter a valid phone number</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={CityRef} />
        {!formInputisValid.city && <p className = {classes.valid}>Please enter a cityname</p>}
      </div>
      <div className = {classes.actions}>
      <button className = {classes.submit}>Confirm</button>
      <button type="button" onClick={props.onClose}  >
        Cancel
      </button>
      </div>
    </form>
  );
};

export default CheckOut;
