import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import ProfileScreen from './screens/ProfileScreen';
import ModalContent from './components/ModalContent';
import ButtonWrapper from './components/ButtonWrapper';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '@env';

const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();


export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 51.0447,
    longitude: -114.0719,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
    setSearchQuery("");
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    };

    getLocation();
  }, []);

  const handleStartParking = (content) => {
    // Add your start parking functionality here
    console.log('Start parking at:', location);
    openModal('BookParking');
  };

  const handleBookParking = () => {
    setModalContent('Timer');
  };

  const handleEndParking = () => {
    closeModal();
  };

  const saveLocation = async () => {
    if (location) {
      await AsyncStorage.setItem('parkingLocation', JSON.stringify(location));
      console.log('Parking spot saved:', location);
    } else {
      console.log('Location not available yet.');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {({ navigation }) => (
            <View style={styles.container}>
              <View style={styles.profileButtonContainer}>
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => navigation.navigate('ProfileScreen')}
                >
                  <Image
                    source={require('./assets/profile-icon.png')}
                    style={styles.profileIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* <Text style={styles.title}>This is the Home screen</Text>
              <Text style={styles.subtitle}>Where the map will be displayed</Text> */}

              <MapView
                style={styles.map}
                // need a way to set current location
                initialRegion={initialRegion}
              >
                {location && (
                  <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                )}
                {selectedLocation && (
                  <Marker coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }} />
                )}
                {location && selectedLocation && (
                  <MapViewDirections
                    origin={{ latitude: location.latitude, longitude: location.longitude }}
                    destination={{ latitude: Number(selectedLocation.latitude), longitude: Number(selectedLocation.longitude)}}                    
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    onReady={result => {
                      console.log('Destination:', { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude });
                      console.log(`Distance: ${result.distance} km`);
                      console.log(`Duration: ${result.duration} min.`);
                    }}
                  />
                )}
              </MapView>

              <TouchableOpacity style={styles.startParkingButton} onPress={handleStartParking}>
                <Text style={styles.startParkingButtonText}>Start Parking</Text>
              </TouchableOpacity>

              <ButtonWrapper openModal={openModal} />

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

                    <ModalContent modalContent={modalContent} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSelectedLocation={setSelectedLocation}
                      closeModal={closeModal} />
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
  startParkingButton: {
    position: 'absolute',
    bottom: '15%', // Adjust the position as needed
    left: width / 2 - 75, // Adjust the position as needed
    backgroundColor: '#A8D5BA',
    padding: 15,
    borderRadius: 10,
  },
  startParkingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
