import * as Dialog from "@radix-ui/react-dialog";
import { Handbag, X } from "phosphor-react";
import { useCart } from "../../context/CartContext";

import { Close, Content, Overlay, Title } from "../../styles/components/Cart";
import CartContent from "./Content";

export default function Cart() {
  const { cartItemsQuantity } = useCart();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          {cartItemsQuantity > 0 && <span>{cartItemsQuantity}</span>}
          <Handbag size={24} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Close>
            <X size={24} weight="bold" />
          </Close>
          <Title>Sacola de compras</Title>
          <CartContent />
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
