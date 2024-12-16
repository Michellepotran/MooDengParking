import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { getParkingHistory } from '../api/apiParking';
import { getFavorites, deleteFavorite } from '../api/apiFavorites';
import Svg, { Ellipse, Path } from 'react-native-svg';
import { GOOGLE_MAPS_API_KEY } from '@env';
import axios from 'axios';


const ModalContent = ({ modalContent, searchQuery, setSearchQuery, setSelectedLocation, closeModal, handleBookParking, handleEndParking }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (modalContent === "History" || modalContent === "Favorites") {
            fetchData(modalContent);
        }
    }, [modalContent]);

    const fetchData = async (modalContent) => {
        setLoading(true);
        try {
            let result;
            if (modalContent === "History") {
                result = await getParkingHistory();
                console.log("response.data: ", result);
            } else if (modalContent === "Favorites") {
                result = await getFavorites();
                console.log("response.data: ", result);
            }

            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFavorite = async (id) => {
        try {
            await deleteFavorite(id);
            fetchData("Favorites");
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    };

    const handleSelectLocation = (location) => {
        console.log('location:', location);
        if (location && location.latitude && location.longitude) {
            setSelectedLocation({
                latitude: location.latitude,
                longitude: location.longitude
            });
            closeModal(); // Close the modal
        }
    };

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const data = { input: query }

            const response = await axios.post(`https://places.googleapis.com/v1/places:autocomplete`, data, {
                headers: {
                    'Content-Type': 'application/json', 'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY
                }
            });

            const suggestions = response.data.suggestions.map(suggestion => { const { placeId } = suggestion.placePrediction; const description = `${suggestion.placePrediction.structuredFormat.mainText.text}, ${suggestion.placePrediction.structuredFormat.secondaryText.text}`; return { placeId, description }; });
            console.log('response:', suggestions);
            console.log('placeid:', suggestions[0].placeId);
            console.log('description:', suggestions[0].description);
            setSuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSuggestionPress = async (suggestion) => {
        try {
            const placeId = suggestion.placeId;
            const url = `https://places.googleapis.com/v1/places/${placeId}`

            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY },
                params: {
                    fields: 'location',
                }
            });
            const location = response.data.location;
            console.log('location:', location.latitude, location.longitude);
            handleSelectLocation(location);
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };

    const filteredData = data.filter(item =>
        item.locationName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        switch (modalContent) {
            case "Search":
                return (
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search here..."
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                fetchSuggestions(text);
                            }}
                        />
                        <Text style={styles.modalText}>Search</Text>
                        <ScrollView style={styles.resultsContainer} contentContainerStyle={styles.scrollContent}>
                            {suggestions.map((suggestion) => (
                                <TouchableOpacity key={suggestion.placeId} style={styles.suggestionItem} onPress={() => handleSuggestionPress(suggestion)}>
                                    <Text style={styles.suggestionText}>{suggestion.description}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
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
                        <ScrollView style={styles.resultsContainer} contentContainerStyle={styles.scrollContent}>
                            {filteredData.length > 0 ? (
                                filteredData.map((result) => (
                                    <TouchableOpacity key={result.id} style={styles.historyItem} onPress={() => handleSelectLocation(result)}>
                                        <Svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.0693 4.64989C17.5017 2.63985 21.7208 2.67498 25.1211 4.74192C28.4879 6.85095 30.5342 10.6149 30.5151 14.664C30.4368 18.6864 28.2426 22.4675 25.4998 25.3905C23.9168 27.0851 22.1459 28.5836 20.2233 29.8554C20.0253 29.9708 19.8084 30.048 19.5834 30.0833C19.3667 30.074 19.1558 30.0095 18.9695 29.8956C16.0343 27.9847 13.4593 25.5456 11.3682 22.6954C9.6185 20.3163 8.62443 17.442 8.521 14.4628C8.51873 10.4061 10.6368 6.65992 14.0693 4.64989ZM16.0525 16.1413C16.6299 17.5759 17.9928 18.5117 19.5048 18.5117C20.4953 18.5189 21.4475 18.119 22.1492 17.4012C22.8508 16.6834 23.2436 15.7073 23.2401 14.6904C23.2454 13.1382 22.3387 11.7358 20.9433 11.138C19.5479 10.5402 17.9392 10.865 16.8682 11.9607C15.7971 13.0563 15.4752 14.7068 16.0525 16.1413Z" fill="#130F26" />
                                            <Ellipse opacity="0.4" cx="19.5182" cy="33.25" rx="7.85514" ry="1.58333" fill="#130F26" />
                                        </Svg>

                                        <Text style={styles.resultsText}>{result.locationName}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteFavorite(result.id)}>
                                            <Svg onPress="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M1 4.5H2.91667M2.91667 4.5H18.25M2.91667 4.5L2.91667 16.75C2.91667 17.2141 3.1186 17.6592 3.47804 17.9874C3.83749 18.3156 4.325 18.5 4.83333 18.5H14.4167C14.925 18.5 15.4125 18.3156 15.772 17.9874C16.1314 17.6592 16.3333 17.2141 16.3333 16.75V4.5M5.79167 4.5V2.75C5.79167 2.28587 5.9936 1.84075 6.35305 1.51256C6.71249 1.18437 7.2 1 7.70833 1H11.5417C12.05 1 12.5375 1.18437 12.897 1.51256C13.2564 1.84075 13.4583 2.28587 13.4583 2.75V4.5M7.70833 8.875V14.125M11.5417 8.875V14.125" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </Svg>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.resultsText}>No favorites available.</Text>
                            )}
                        </ScrollView>
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
                        <ScrollView style={styles.resultsContainer} contentContainerStyle={styles.scrollContent}>
                            {filteredData.length > 0 ? (
                                filteredData.map((result) => (
                                    <TouchableOpacity key={result.id} style={styles.historyItem} onPress={() => handleSelectLocation(result)}>
                                        <Svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#C6C5C5" />
                                            <Path d="M22 18L27 13L22 8" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M11 24V17C11 15.9391 11.4214 14.9217 12.1716 14.1716C12.9217 13.4214 13.9391 13 15 13H27" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                                        </Svg>

                                        <Text style={styles.resultsText}>{result.locationName}</Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.resultsText}>No history available.</Text>
                            )}
                        </ScrollView>
                    </View>
                );
            case "BookParking":
                return (
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Book Parking</Text>
                        <TouchableOpacity style={styles.bookParkingButton} onPress={handleBookParking}>
                            <Text style={styles.bookParkingButtonText}>Book Parking</Text>
                        </TouchableOpacity>
                    </View>
                );
            case "Timer":
                return (
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Parking Timer</Text>
                        <Text style={styles.timerText}>00:00:00</Text> {/* Replace with actual timer */}
                        <TouchableOpacity style={styles.endParkingButton} onPress={handleEndParking}>
                            <Text style={styles.endParkingButtonText}>End Parking</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
    };

    return renderContent();
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        color: '#666',
    },
    resultsContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingTop: 10,
        marginTop: 10,
        minHeight: 200,
        flexGrow: 1,
        scrollable: true,
    },
    scrollContent: {
        paddingBottom: 20,
        // width: '100%',
        height: 150,
        // flexGrow: 1,
        // scrollable: true,
    },
    resultsText: {
        fontSize: 16,
        color: '#666',
        alignItems: 'center',
    },
    historyItem: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        minHeight: 60,
        flexDirection: 'row',
        borderRadius: 5,
    },
    bookParkingButton: {
        backgroundColor: '#ff6347',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    bookParkingButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    endParkingButton: {
        backgroundColor: '#ff6347',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    endParkingButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default ModalContent;