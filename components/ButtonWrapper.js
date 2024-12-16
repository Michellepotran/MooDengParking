import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonWrapper = ({ openModal }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
        marginTop: 8
      }
});

export default ButtonWrapper;