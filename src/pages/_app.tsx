import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";

import Image from "next/image";
import Cart from "../components/Cart";
import { CartContextProvider, useCart } from "../context/CartContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <Cart />
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}
