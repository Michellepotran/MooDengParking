// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SearchScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>this is the search screen</Text>
    </View>
  );
}

function FavoritesScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Favorites Screen</Text>
    </View>
  );
}

function HistoryScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>History Screen</Text>
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Search">
        <Tab.Screen name="Search" component={SearchScreen} options={{tabBarLabel: 'Search', tabBarIcon:({color,size})=>(<Entypo name="location" size={24} color="black" />)}} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{tabBarLabel: 'Favorites', tabBarIcon:({color,size})=>(<AntDesign name="car" size={24} color="black" />)}} />
        <Tab.Screen name="History" component={HistoryScreen} options={{tabBarLabel: 'History', tabBarIcon:({color,size})=>(<MaterialIcons name="history" size={24} color="black" />)}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


