import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { pb } from "../lib/pocketbase";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  async function fetchCart() {
    if (!currentUser) return;
    try {
      const records = await pb.collection("cart").getFullList({
        filter: `user = "${currentUser.id}" `,
        expand: "product",
      });

      setCart(records);
    } catch (error) {
      console.log(error);
    }
  }
  async function clearCart() {
    if (!currentUser) return;
    try {
      await Promise.all(
        cart.map(async (item) => {
          await pb.collection("cart").delete(item.id);
        })
      );
      setCart([]);
      console.log("CLEAR!");
    } catch (error) {
      console.log(error);
    }
  }

  function increaseQuantity(productId) {
    const updatedCart = cart.map((item) => {
      if (item.expand.product.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    updateCartInDatabase(updatedCart);
  }

  function decreaseQuantity(productId) {
    const updatedCart = cart.map((item) => {
      if (item.expand.product.id === productId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    updateCartInDatabase(updatedCart);
  }

  async function deleteCartItem(productId) {
    if (!currentUser) return;
    try {
      const updatedCart = cart.filter(
        (item) => item.expand.product.id !== productId
      );

      setCart(updatedCart);

      const cartItemToDelete = cart.find(
        (item) => item.expand.product.id === productId
      );

      if (cartItemToDelete) {
        await pb.collection("cart").delete(cartItemToDelete.id);
      }

      console.log("Deleted!");
    } catch (error) {
      console.log(error);
    }
  }
  async function updateCartInDatabase(updateCart) {
    if (!currentUser) return;

    try {
      await Promise.all(
        updateCart.map(async (item) => {
          await pb.collection("cart").update(item.id, {
            quantity: item.quantity,
          });
        })
      );
      console.log("Updated!");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchCart();
    }
  }, [currentUser]);

  useEffect(() => {
    function calculateTotal() {
      const totalAmount = cart.reduce((sum, item) => {
        const productPrice = parseFloat(item.expand.product.sellingPrice);
        return sum + productPrice * item.quantity;
      }, 0);
      setTotal(totalAmount);
    }
    calculateTotal();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        increaseQuantity,
        decreaseQuantity,
        deleteCartItem,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
