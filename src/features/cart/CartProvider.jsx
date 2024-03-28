import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  console.log(cart);

  const DeleteItemFromCart = (itm) => {
    setCart((cartItem) => cartItem.filter((items) => items !== itm));
    toast.error(`${itm.title} deleted from cart`);
  };

  const HandleDecreaseCart = (itmsTitle) => {
    setCart((cartItems) =>
      cartItems.map((items) =>
        items.title === itmsTitle && items.quantity > 1
          ? {
              ...items,
              quantity: items.quantity - 1,
              price: (items.price / items.quantity) * (items.quantity - 1),
            }
          : items,
      ),
    );
  };

  const HandleIncreaseQuantity = (itmsTitle) => {
    setCart((cartItem) =>
      cartItem.map((items) =>
        items.title === itmsTitle
          ? {
              ...items,
              quantity: items.quantity + 1,
              price: (items.price / items.quantity) * (items.quantity + 1),
            }
          : items,
      ),
    );
  };

  const addToCart = (itms) => {
    const existingItems = cart.find(
      (cartItems) => cartItems.title === itms.title,
    );

    if (existingItems) {
      const updatedItems = cart.map((cartItem) =>
        cartItem.title === itms.title
          ? {
              ...cartItem,
              quantity: cartItem.quantity + +itms.quantity,
              price: cartItem.price + itms.price,
            }
          : cartItem,
      );
      toast.success(`${itms.title} sucessfully added to cart`);
      setCart(updatedItems);
    } else {
      toast.success(`${itms.title} sucessfully added to cart`);
      setCart((items) => [...items, itms]);
    }
  };

  const value = {
    cart,
    addToCart,
    HandleIncreaseQuantity,
    HandleDecreaseCart,
    DeleteItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const value = useContext(CartContext);

  return value;
}

export default CartProvider;
