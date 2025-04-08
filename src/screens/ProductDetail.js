import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const dispatch = useDispatch();

  const totalItems = useSelector((state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>


      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart-outline" size={28} color="#fff" />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>


          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>



          <View style={styles.infoContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>₹ {product.price}</Text>



            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#fbbf24" />
              <Text style={styles.ratingText}>{product.rating?.rate} / 5</Text>
            </View>



            <Text style={styles.description}>{product.description}</Text>
          </View>
        </ScrollView>



        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => {
                dispatch(addToCart(product));
                Alert.alert("Success", "Item added to cart!");
            }}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "#4a9eb0",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  container: {
    paddingBottom: 100, // ensures content doesn't hide behind fixed button
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: "#6200ee",
    marginBottom: 10,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#555",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 25,
    lineHeight: 20,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  cartButton: {
    backgroundColor: "#1f5a67",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  iconContainer: {
    position: "relative",
    padding: 4,
  },

  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
