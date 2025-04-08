import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import bannerImg from "../images/Ecommerce.png";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MINI E-COMM</Text>
        
      </View>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.bannerCont}>
            <Image source={bannerImg} style={styles.banner} />
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
            style={styles.card}
          >
            <View>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "#4a9eb0",
  },
  iconContainer: {
    position: "absolute",
    right: 20,
    top: 45,
    zIndex: 1,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  bannerCont: {
    padding: 3,
  },
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 5,
  },
  container: {
    paddingHorizontal: 5,
    paddingBottom: 20,
    gap: 10,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    margin: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    maxWidth: "48%", // To ensure two columns fit well
  },
  image: {
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  category: {
    color: "#888",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#1a73e8",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
