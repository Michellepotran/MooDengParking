// function SearchScreen() {
//     return (
//       <View style={styles.screenContainer}>
//         <Text >Search Screen</Text>
//       </View>
//     );
//   }

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
    const navigation = useNavigation(); 
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => navigation.navigate('ProfileScreen')}
            >
                <Image
                    source={require('../assets/profile-icon.png')} // Adjust the path as necessary
                    style={styles.profileIcon}
                />
            </TouchableOpacity>
            <Text>Search Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
    },
    profileIcon: {
        width: 50,
        height: 50,
    },
});
