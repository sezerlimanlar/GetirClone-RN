import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { Button, Card, TextInput } from "react-native-paper";

export default function CheckoutScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { total } = useCart();

  function onSubmit(data) {
    console.log(data); // Form verisini buraya işle
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
            name="phone"
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
                error={!!errors.phone}
                mode="outlined"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone && (
            <Text className="text-red-500 mt-1">{errors.phone.message}</Text>
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
                name="cardCvv"
                control={control}
                rules={{
                  required: "CVV alanı zorunludur",
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: "Geçersiz CVV",
                  },
                }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    label="CVV"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value || ""}
                    error={!!errors.cardCvv}
                    mode="outlined"
                    keyboardType="number-pad"
                  />
                )}
              />
              {errors.cardCvv && (
                <Text className="text-red-500 mt-1">
                  {errors.cardCvv.message}
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
