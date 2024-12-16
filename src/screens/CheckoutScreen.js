import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { Button, Card, TextInput } from "react-native-paper";
import { pb } from "../lib/pocketbase";
import { useNavigation } from "@react-navigation/native";

export default function CheckoutScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { total, cart, clearCart } = useCart();
  const navigation = useNavigation();

  async function onSubmit(data) {
    console.log(data);

    const [expireMonth, expireYear] = data.cardDate.split("/");
    const paymentCard = {
      cardHolderName: data.cardName,
      cardNumber: data.cardNumber,
      expireMonth: expireMonth,
      expireYear: expireYear,
      cvc: data.cardCvc,
      registeredCard: "0",
    };

    const [name, surname] = data.name.split(" ");

    const buyer = {
      id: "BY123",
      name: name,
      surname: surname,
      gsmNumber: data.telefon,
      email: "test@test.com",
      identityNumber: "12345678901",
      lastLoginDate: "2024-12-01 10:00:00",
      registrationDate: "2023-12-01 10:00:00",
      registrationAddress: data.address,
      ip: "85.34.72.112",
      city: "Izmir",
      country: "Turkey",
      zipCode: "35000",
    };

    shippingAddress = {
      address: data.address,
      zipCode: "35000",
      contactName: data.name,
      city: "Izmir",
      country: "Turkey",
    };

    billingAddress = {
      address: data.address,
      zipCode: "35000",
      contactName: data.name,
      city: "Izmir",
      country: "Turkey",
    };
    const basketItems = cart.map((item) => ({
      id: item.expand.product.id,
      name: item.expand.product.name,
      category1: "Kategori 1",
      category2: "Kategori 2",
      price: item.expand.product.sellingPrice * item.quantity,
      itemType: "PHYSICAL",
    }));

    const paymentData = {
      price: total,
      paidPrice: total,
      currency: "TRY",
      basketId: "B67832",
      paymentCard: paymentCard,
      buyer: buyer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      basketItems: basketItems,
    };

    try {
      const response = await fetch(
        "https://genuine-crappie-sensible.ngrok-free.app/api/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const result = await response.json();
      const formData = {
        fullname: data.name,
        adres: data.address,
        telefon: data.telefon,
        cart: cart,
      };
      console.log(formData);
      const record = await pb.collection("order").create(formData);

      console.log("success");
      clearCart();
      navigation.navigate("OrderSuccess")
    } catch (error) {
      console.log("ERRORRR ", error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View className="flex flex-row justify-center mb-4 gap-4">
        <Text className="text-xl font-semibold">Toplam</Text>
        <Text className="text-xl font-semibold">
          {total} {"\u20ba"}
        </Text>
      </View>
      <Card className="p-4">
        <Card.Title title="Bilgilerinizi Giriniz" />
        <Card.Content>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Ad Soyad alanı zorunludur" }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                label="Ad Soyad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                error={!!errors.name}
                mode="outlined"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500 mt-1">{errors.name.message}</Text>
          )}

          <Controller
            name="telefon"
            control={control}
            rules={{
              required: "Telefon numarası zorunludur",
              pattern: {
                value: /^5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
                message: "Geçersiz telefon numarası",
              },
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                label="Telefon Numarası"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                error={!!errors.telefon}
                mode="outlined"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.telefon && (
            <Text className="text-red-500 mt-1">{errors.telefon.message}</Text>
          )}

          <Controller
            name="address"
            control={control}
            rules={{ required: "Adres alanı zorunludur" }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                label="Adres"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                error={!!errors.address}
                mode="outlined"
              />
            )}
          />
          {errors.address && (
            <Text className="text-red-500 mt-1">{errors.address.message}</Text>
          )}

          <Controller
            name="cardName"
            control={control}
            rules={{ required: "Kart Sahibi alanı zorunludur" }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                label="Kart Sahibi"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                error={!!errors.cardName}
                mode="outlined"
              />
            )}
          />
          {errors.cardName && (
            <Text className="text-red-500 mt-1">{errors.cardName.message}</Text>
          )}

          <Controller
            name="cardNumber"
            control={control}
            rules={{
              required: "Kredi kartı numarası zorunludur",
              pattern: {
                value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
                message: "Geçersiz kredi kartı numarası",
              },
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                label="Kart Numarası"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                error={!!errors.cardNumber}
                mode="outlined"
                keyboardType="number-pad"
              />
            )}
          />
          {errors.cardNumber && (
            <Text className="text-red-500 mt-1">
              {errors.cardNumber.message}
            </Text>
          )}

          <View className="flex-row gap-2">
            <View className="w-1/2">
              <Controller
                name="cardDate"
                control={control}
                rules={{
                  required: "Kart SKT alanı zorunludur",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Geçersiz son kullanma tarihi (MM/YY formatında)",
                  },
                }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    label="Son Kullanma Tarihi (MM/YY)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value || ""}
                    error={!!errors.cardDate}
                    mode="outlined"
                    keyboardType="number-pad"
                  />
                )}
              />
              {errors.cardDate && (
                <Text className="text-red-500 mt-1">
                  {errors.cardDate.message}
                </Text>
              )}
            </View>
            <View className="w-1/2">
              <Controller
                name="cardCvc"
                control={control}
                rules={{
                  required: "CVc alanı zorunludur",
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: "Geçersiz CVc",
                  },
                }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    label="CVC"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value || ""}
                    error={!!errors.cardCvc}
                    mode="outlined"
                    keyboardType="number-pad"
                  />
                )}
              />
              {errors.cardCvc && (
                <Text className="text-red-500 mt-1">
                  {errors.cardCvc.message}
                </Text>
              )}
            </View>
          </View>

          <Button
            mode="contained"
            className="mt-7"
            onPress={handleSubmit(onSubmit)}
          >
            Ödeme Yap
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});
