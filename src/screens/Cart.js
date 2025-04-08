import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../redux/cartSlice";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

    console.log(cart);

  return (
    <View style={styles.container}>


      <View style={styles.header}>
        <Text style={styles.headerTitle}>CART</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>


          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>
                    ₹ {item.price} x {item.quantity}
                  </Text>
                  <View style={styles.buttonsRow}>
                    <TouchableOpacity
                      onPress={() => dispatch(increaseQty(item.id))}
                      style={styles.qtyButton}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dispatch(decreaseQty(item.id))}
                      style={styles.qtyButton}
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dispatch(removeFromCart(item.id))}
                      style={styles.removeButton}
                    >
                      <Ionicons name="trash-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={{ padding: 16 }}
          />



          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ₹ {total}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  qtyButton: {
    backgroundColor: "#6200ee",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  qtyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#e53935",
    padding: 6,
    borderRadius: 6,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
  },
});
