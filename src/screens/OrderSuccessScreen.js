import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function OrderSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Başarı İkonu */}
      <Image
        source={require("../../assets/success.png")} // kendi success ikonunuzun yolunu belirtin
        style={styles.successImage}
      />

      {/* Başarı Mesajı */}
      <Text style={styles.title}>Sipariş Başarılı!</Text>
      <Text style={styles.message}>
        Siparişiniz başarıyla tamamlandı. Size en kısa sürede teslim
        edilecektir. Teşekkür ederiz!
      </Text>

      {/* Ana Sayfaya Git Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BottomTabs", { screen: "home" })}
      >
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>

      {/* Sipariş Detayları Butonu */}
      <TouchableOpacity
        disabled={true}
        style={[styles.button, styles.buttonOutline]}
        onPress={() => navigation.navigate("OrderDetails")}
      >
        <Text style={[styles.buttonText, styles.buttonOutlineText]}>
          Sipariş Detaylarını Gör
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgb(236, 236, 236)",
  },
  successImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5D38BE",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#5D38BE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: "#5D38BE",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#5D38BE",
  },
});
