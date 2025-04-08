import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen() {
  const user = {
    name: "Shreedhar Thiruvengadan",
    email: "shreedharsree799@gmail.com",
    address: "Four Seasons Pg , Thoraipakkam , Chennai",
    profileImage: "https://media.licdn.com/dms/image/v2/D5603AQGyRhpsWC5MRQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731347107408?e=1749686400&v=beta&t=M2D9Qm319PBgprtdC0kznicEVkyMf0gUrCqL0R_fgXQ",
  };

  const handleLogout = () => {
    Alert.alert("Logged Out", "You have been logged out successfully.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.profileSection}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>


        <ProfileOption icon={<Ionicons name="cart-outline" size={24} color="#1f5a67" />} label="Your Orders" />
        <ProfileOption icon={<MaterialIcons name="location-on" size={24} color="#1f5a67" />} label="Your Addresses" />
        <ProfileOption icon={<FontAwesome5 name="credit-card" size={20} color="#1f5a67" />} label="Payment Methods" />
        <ProfileOption icon={<Ionicons name="settings-outline" size={24} color="#1f5a67" />} label="Settings & Preferences" />
        <ProfileOption icon={<Ionicons name="log-out-outline" size={24} color="#e53935" />} label="Logout" onPress={handleLogout} logout />
      </ScrollView>
    </SafeAreaView>
  );
}

const ProfileOption = ({ icon, label, onPress, logout }) => (
  <TouchableOpacity style={[styles.optionCard, logout && { borderColor: '#e53935' }]} onPress={onPress}>
    <View style={styles.optionIcon}>{icon}</View>
    <Text style={[styles.optionText, logout && { color: '#e53935' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#4a9eb0",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  editProfileBtn: {
    marginTop: 10,
    backgroundColor: "#1f5a67",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    color: "#fff",
    fontSize: 14,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
