import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");  

  // This is the function to open modal instead of navigating to a new screen 
  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
    setSearchQuery("");  
  };

  // This closes the modal
  const closeModal = () => setModalVisible(false);

  // Content for the different buttons
  const renderModalContent = () => {
    switch (modalContent) {
      case "Search":
        return (
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search here..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Text style={styles.modalText}>Search</Text>
            <View style={styles.resultsContainer}>
              {searchQuery ? (
                <Text style={styles.resultsText}>Results for: {searchQuery}</Text>
              ) : (
                <Text style={styles.resultsText}>No results yet.</Text>
              )}
            </View>
          </View>
        );
      case "Favorites":
        return (
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search favorites..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Text style={styles.modalText}>Favorites</Text>
            <View style={styles.resultsContainer}>
              {searchQuery ? (
                <Text style={styles.resultsText}>Results for: {searchQuery}</Text>
              ) : (
                <Text style={styles.resultsText}>No results yet.</Text>
              )}
            </View>
          </View>
        );
      case "History":
        return (
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search history..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Text style={styles.modalText}>History</Text>
            <View style={styles.resultsContainer}>
              {searchQuery ? (
                <Text style={styles.resultsText}>Results for: {searchQuery}</Text>
              ) : (
                <Text style={styles.resultsText}>No results yet.</Text>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Home screen</Text>
      <Text style={styles.subtitle}>Where the map will be displayed</Text>

      {/* Making the buttons look like a tab navigator at the button of the app */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => openModal("Search")}
        >
          <Ionicons name="location" size={24} color="#211F27" />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => openModal("Favorites")}
        >
          <Ionicons name="car" size={24} color="#211F27" />
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => openModal("History")}
        >
          <Ionicons name="time" size={24} color="#211F27" />
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for half-screen overlay */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentWithClose}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="chevron-down" size={30} color="#d2d2d2" />
            </TouchableOpacity>

            {renderModalContent()}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '90%',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 5,
    marginTop: 20,
  },
  button: {
    flex: 1, 
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#211F27',
    fontSize: 16,
    marginTop: 8, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentWithClose: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    paddingTop: 40,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'left', 
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  resultsContainer: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'flex-start', 
    paddingLeft: 10,
    paddingTop: 10, 
    marginTop: 10,
  },
  resultsText: {
    fontSize: 16,
    color: '#666',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: '55%',
    transform: [{ translateX: -15 }],
    backgroundColor: '#FFFF',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});






