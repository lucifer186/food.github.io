import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meal";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/Cart-contextProvider";

function App() {
  const [cartIsShown, setcartIsShown] = useState(false);

  const shownCartHandler = () => {
    setcartIsShown(true);
  };

  const HideCartHandler = () => {
    setcartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={HideCartHandler} />}
      <Header showCart={shownCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
