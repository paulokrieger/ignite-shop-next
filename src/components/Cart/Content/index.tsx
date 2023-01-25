import axios from "axios";
import Image from "next/image";
import { useState } from "react";

import shirt1 from "../../../assets/camisetas/shirt1.png";
import { useCart } from "../../../context/CartContext";
import {
  CartContentContainer,
  CartProduct,
  CartResume,
  Product,
  ProductImage,
  ProductInfo,
} from "../../../styles/components/CartContent";
import { priceFormatter } from "../../../utils/priceFormatter";

export default function CartContent() {
  const { cartItemsQuantity, cartTotalPrice, handleRemoveFromCart, cartItems } =
    useCart();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  const cartIsNotEmpty = cartItemsQuantity > 0;

  return (
    <CartContentContainer>
      <CartProduct>
        {cartIsNotEmpty ? (
          cartItems.map((product) => (
            <Product key={product.id}>
              <ProductImage>
                <Image src={product.imageUrl} width={100} height={100} alt="" />
              </ProductImage>
              <ProductInfo>
                <span>
                  <p>{product.name}</p>
                  <span>{product.price}</span>
                </span>
                <button onClick={(e) => handleRemoveFromCart(product)}>
                  Remover
                </button>
              </ProductInfo>
            </Product>
          ))
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "5rem",
            }}
          >
            Nenhum produto na sacola
          </span>
        )}
      </CartProduct>

      {cartIsNotEmpty ? (
        <CartResume>
          <table>
            <tbody>
              <tr>
                <td>Quantidade</td>
                <td>
                  {cartItemsQuantity} ite{cartItemsQuantity > 1 ? "ns" : "m"}
                </td>
              </tr>
              <tr>
                <td>Valor total</td>
                <td>{priceFormatter(cartTotalPrice)}</td>
              </tr>
            </tbody>
          </table>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Finalizar compra
          </button>
        </CartResume>
      ) : (
        <></>
      )}
    </CartContentContainer>
  );
}
