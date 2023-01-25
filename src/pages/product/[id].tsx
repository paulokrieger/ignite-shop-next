import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";
import { useCart } from "../../context/CartContext";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { priceFormatter } from "../../utils/priceFormatter";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { handleAddToCart, handleRemoveFromCart, checkProductAlreadyInCart } =
    useCart();

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  // async function handleBuyProduct() {
  //   try {
  //
  //     const response = await axios.post("/api/checkout", {
  //       priceId: product.defaultPriceId,
  //     });

  //     const { checkoutUrl } = response.data;

  //     window.location.href = checkoutUrl;
  //   } catch (err) {
  //
  //     alert("Falha ao redirecionar ao checkout!");
  //   }
  // }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          {!checkProductAlreadyInCart(product.id) ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product);
              }}
            >
              Adicionar ao carrinho
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveFromCart(product);
              }}
            >
              Remover do carrinho
            </button>
          )}

          {/* <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
          >
            Adicionar ao carrinho
          </button> */}
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
/**
 getStaticPaths -> quando executa-se o build, é passado ao getStaticProps os parametros abaixo
 pode deixar em vazio, que gera-se automático.
 porém é obrigatório para deploy
 */
export const getStaticPaths: GetStaticPaths = async () => {
  //nesse caso pode deixar em branco, no caso de um
  //grande ecommerce, botar os produtos mais acessados

  return {
    paths: [{ params: { id: "prod_NBImYr1ABSKG3n" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceFormatter(price.unit_amount),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
