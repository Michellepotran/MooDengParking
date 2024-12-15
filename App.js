import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Image, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './screens/ProfileScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  // This is the function to open modal instead of navigating to a new screen 
  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
    setSearchQuery("");
  };

  // This closes the modal
  const closeModal = () => setModalVisible(false);

  //for location mapping
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    };

    getLocation();
  }, []);

  const saveLocation = async () => {
    if (location) {
      await AsyncStorage.setItem('parkingLocation', JSON.stringify(location));
      console.log('Parking spot saved:', location);
    } else {
      console.log('Location not available yet.');
    }
  };

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {({ navigation }) => (
            <View style={styles.container}>
              {/* This is for the Profile button on top right side */}
              <View style={styles.profileButtonContainer}>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => navigation.navigate('ProfileScreen')}
                >
                  <Image
                    source={require('./assets/profile-icon.png')} // Adjust the path as necessary
                    style={styles.profileIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* <Text style={styles.title}>This is the Home screen</Text>
              <Text style={styles.subtitle}>Where the map will be displayed</Text> */}

              {/* MapView to display the user's location */}
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 37.78825, // Default latitude
                  longitude: -122.4324, // Default longitude
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                {/* Display Marker if the location is available */}
                {location && (
                  <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                )}
              </MapView>

              {/* Button to save the current location */}
              <Button title="Save Parking Spot" onPress={saveLocation} />

              {/* Error message if location permission is denied */}
              {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

              {/* Making the buttons look like a tab navigator at the bottom of the app */}
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openModal('Search')}
                >
                  <Ionicons name="location" size={24} color="#211F27" />
                  <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openModal('Favorites')}
                >
                  <Ionicons name="car" size={24} color="#211F27" />
                  <Text style={styles.buttonText}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openModal('History')}
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
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: 'Profile' }} // Optional header title
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  profileButtonContainer: {
    position: 'relative',
    alignItems: 'flex-end',
    width: width,
  },
  imageContainer: {
    position: 'relative',
    top: height * 0.10,
    right: width * 0.05,
    zIndex: 1,
  },
  profileIcon: {
    width: 50,
    height: 50,
  },
  map: {
    position: 'absolute',
    width: width,
    height: height,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});