import { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  priceNumber: number;
  defaultPriceId: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartItemsQuantity: number;
  cartTotalPrice: number;
  handleAddToCart: (product: CartItem) => void;
  handleRemoveFromCart: (product: CartItem) => void;
  checkProductAlreadyInCart: (productId: string) => boolean;
}

export const CartContext = createContext({} as CartContextType);

interface CartProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  console.log(cartItems);

  const cartItemsQuantity = cartItems.length;

  const cartTotalPrice = cartItems.reduce((total, product) => {
    return total + product.priceNumber;
  }, 0);

  function handleAddToCart(product: CartItem) {
    setCartItems((state) => [...state, product]);
  }

  function handleRemoveFromCart(product: CartItem) {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);

    setCartItems(updatedCart);
  }

  function checkProductAlreadyInCart(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsQuantity,
        cartTotalPrice,
        handleAddToCart,
        handleRemoveFromCart,
        checkProductAlreadyInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
