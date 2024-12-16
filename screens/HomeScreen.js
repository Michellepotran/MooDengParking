import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './SearchScreen';
import FavoritesScreen from './FavoritesScreen';
import HistoryScreen from './HistoryScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  return (
    <View style={styles.container}>
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

      {/* Tab Navigator for different screens */}
      <Tab.Navigator initialRouteName="Search">
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default HomeScreen;
