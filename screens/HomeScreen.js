// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Location from 'expo-location';




// const HomeScreen = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     };

//     getLocation();
//   }, []);

//   const saveLocation = async () => {
//     Geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//         await AsyncStorage.setItem('parkingLocation', JSON.stringify({ latitude, longitude }));
//       },
//       (error) => console.error(error)
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//       >
//         {location && <Marker coordinate={location} />}
//       </MapView>
//       <Button title="Save Parking Spot" onPress={saveLocation} />
//     </View>
//   );
// };

// export default HomeScreen;


// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function HomeScreen() {
//   const handlePress = () => {
//     console.log('Home button pressed');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to the Home Screen</Text>
//       <Button title="Go to Home" onPress={handlePress} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './SearchScreen';
import FavoritesScreen from './FavoritesScreen';
import HistoryScreen from './HistoryScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Search">
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
    );
}
