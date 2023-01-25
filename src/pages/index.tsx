import Image from "next/image";

import Head from "next/head";

import { useKeenSlider } from "keen-slider/react";

import {
  HomeContainer,
  Product,
  ProductFooterDetails,
} from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { Handbag, Trash } from "phosphor-react";
import { CartItem, useCart } from "../context/CartContext";
import { priceFormatter } from "../utils/priceFormatter";

interface HomeProps {
  products: CartItem[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({ slides: { perView: 3, spacing: 48 } });
  const { handleAddToCart, handleRemoveFromCart, checkProductAlreadyInCart } =
    useCart();

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <ProductFooterDetails>
                  <span>
                    <strong>{product.name}</strong>
                    <strong>{product.price}</strong>
                  </span>
                  {!checkProductAlreadyInCart(product.id) ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                    >
                      <Handbag size={24} />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFromCart(product);
                      }}
                    >
                      <Trash size={24} />
                    </button>
                  )}
                </ProductFooterDetails>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceFormatter(price.unit_amount),
      defaultPriceId: price.id,
      priceNumber: price.unit_amount,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
