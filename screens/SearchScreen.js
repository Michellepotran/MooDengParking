// function SearchScreen() {
//     return (
//       <View style={styles.screenContainer}>
//         <Text >Search Screen</Text>
//       </View>
//     );
//   }

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SearchScreen() {
    return (
        <View style={styles.container}>
            <Text>this is the search screen for now</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

