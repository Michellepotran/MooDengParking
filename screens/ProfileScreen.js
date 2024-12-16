import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Svg, { G, Defs, ClipPath, Path, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const baseFontSize = 16; // Define a base font size

const ProfileScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const handleLogin = () => {
        // Handle login logic here
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Handle logout logic here
        setIsLoggedIn(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoggedIn ? (
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profileImage}
                        source={require('../assets/profile.png')}
                    />
                    <Svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.5 5C12 5 14 7 14 9.5C14 12 12 14 9.5 14C7 14 5 12 5 9.5C5 7 7 5 9.5 5ZM9.5 6C8.57174 6 7.6815 6.36875 7.02513 7.02513C6.36875 7.6815 6 8.57174 6 9.5C6 10.4283 6.36875 11.3185 7.02513 11.9749C7.6815 12.6313 8.57174 13 9.5 13C10.4283 13 11.3185 12.6313 11.9749 11.9749C12.6313 11.3185 13 10.4283 13 9.5C13 8.57174 12.6313 7.6815 11.9749 7.02513C11.3185 6.36875 10.4283 6 9.5 6ZM3 2H5L7 0H12L14 2H16C16.7956 2 17.5587 2.31607 18.1213 2.87868C18.6839 3.44129 19 4.20435 19 5V14C19 14.7956 18.6839 15.5587 18.1213 16.1213C17.5587 16.6839 16.7956 17 16 17H3C2.20435 17 1.44129 16.6839 0.87868 16.1213C0.316071 15.5587 0 14.7956 0 14V5C0 4.20435 0.316071 3.44129 0.87868 2.87868C1.44129 2.31607 2.20435 2 3 2ZM7.41 1L5.41 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V14C1 14.5304 1.21071 15.0391 1.58579 15.4142C1.96086 15.7893 2.46957 16 3 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V5C18 4.46957 17.7893 3.96086 17.4142 3.58579C17.0391 3.21071 16.5304 3 16 3H13.59L11.59 1H7.41Z" fill="#1F1B1B" />
                    </Svg>

                    <Text style={styles.profileName}>Moodeng Hippo</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoContainerContent}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M4 20C4 18.9391 4.42143 17.9217 5.17157 17.1716C5.92172 16.4214 6.93913 16 8 16H16C17.0609 16 18.0783 16.4214 18.8284 17.1716C19.5786 17.9217 20 18.9391 20 20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20Z" stroke="#14AE5C" stroke-linejoin="round" />
                                <Path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#14AE5C" />
                            </Svg>

                            <Text style={styles.infoText}>Personal Info</Text>
                        </View>
                        <View style={styles.infoContainerContent}>
                            <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M11.0001 6.41665V8.24998M10.9982 1.83331C8.24089 1.83331 6.45339 3.68406 4.33955 4.35873C3.47972 4.63373 3.0498 4.77031 2.87564 4.96373C2.70147 5.15623 2.65105 5.43948 2.5493 6.00415C1.45847 12.0505 3.8418 17.6403 9.52514 19.8165C10.1347 20.0502 10.44 20.1666 11.001 20.1666C11.562 20.1666 11.8681 20.0493 12.4786 19.8156C18.1611 17.6403 20.5416 12.0505 19.4508 6.00415C19.3491 5.43948 19.2977 5.15623 19.1236 4.96281C18.9494 4.7694 18.5204 4.63281 17.6606 4.35873C15.5458 3.68406 13.7556 1.83331 10.9982 1.83331Z" stroke="#14AE5C" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>

                            <Text style={styles.infoText}>Login and Security</Text>
                        </View>
                        <View style={styles.infoContainerContent}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M11.4999 18C15.4999 18 18.9599 15.78 20.7399 12.5C18.9599 9.22 15.4999 7 11.4999 7C7.49989 7 4.03989 9.22 2.25989 12.5C4.03989 15.78 7.49989 18 11.4999 18ZM11.4999 6C16.0599 6 19.9999 8.65 21.8599 12.5C19.9999 16.35 16.0599 19 11.4999 19C6.93989 19 2.99989 16.35 1.13989 12.5C2.99989 8.65 6.93989 6 11.4999 6ZM11.4999 8C13.9999 8 15.9999 10 15.9999 12.5C15.9999 15 13.9999 17 11.4999 17C8.99989 17 6.99989 15 6.99989 12.5C6.99989 10 8.99989 8 11.4999 8ZM11.4999 9C10.5716 9 9.6814 9.36875 9.02502 10.0251C8.36864 10.6815 7.99989 11.5717 7.99989 12.5C7.99989 13.4283 8.36864 14.3185 9.02502 14.9749C9.6814 15.6313 10.5716 16 11.4999 16C12.4282 16 13.3184 15.6313 13.9748 14.9749C14.6311 14.3185 14.9999 13.4283 14.9999 12.5C14.9999 11.5717 14.6311 10.6815 13.9748 10.0251C13.3184 9.36875 12.4282 9 11.4999 9Z" fill="#14AE5C" />
                            </Svg>


                            <Text style={styles.infoText}>Data and Privacy</Text>
                        </View>
                        <View style={styles.infoContainerContent}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M12 4.5C12 4.36739 11.9473 4.24021 11.8536 4.14645C11.7598 4.05268 11.6326 4 11.5 4C11.3674 4 11.2402 4.05268 11.1464 4.14645C11.0527 4.24021 11 4.36739 11 4.5V6.03C8.75 6.28 7 8.18 7 10.5V16.41L5.41 18H17.59L16 16.41V10.5C16 8.18 14.25 6.28 12 6.03V4.5ZM11.5 3C11.8978 3 12.2794 3.15804 12.5607 3.43934C12.842 3.72064 13 4.10218 13 4.5V5.21C15.31 5.86 17 8 17 10.5V16L20 19H3L6 16V10.5C6 8 7.69 5.86 10 5.21V4.5C10 4.10218 10.158 3.72064 10.4393 3.43934C10.7206 3.15804 11.1022 3 11.5 3ZM11.5 22C10.9237 22.0001 10.365 21.8011 9.91855 21.4367C9.47209 21.0722 9.16527 20.5647 9.05 20H10.09C10.1928 20.2918 10.3837 20.5445 10.6362 20.7233C10.8888 20.9021 11.1906 20.9981 11.5 20.9981C11.8094 20.9981 12.1112 20.9021 12.3638 20.7233C12.6163 20.5445 12.8072 20.2918 12.91 20H13.95C13.8347 20.5647 13.5279 21.0722 13.0815 21.4367C12.635 21.8011 12.0763 22.0001 11.5 22Z" fill="#14AE5C" />
                            </Svg>


                            <Text style={styles.infoText}>Notification Preferences</Text>
                        </View>
                    </View>
                    <View style={styles.helpContainer}>
                        <View style={styles.helpContainerContent}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M3.464 16.828C2 15.657 2 14.771 2 11C2 7.229 2 5.343 3.464 4.172C4.93 3 7.286 3 12 3C16.714 3 19.071 3 20.535 4.172C21.999 5.344 22 7.229 22 11C22 14.771 22 15.657 20.535 16.828C19.072 18 16.714 18 12 18C9.49 18 8.2 19.738 6 21V17.788C4.906 17.625 4.101 17.338 3.464 16.828Z" stroke="#14AE5C" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>

                            <Text style={styles.helpText}>Message Center</Text>
                        </View>
                        <View style={styles.helpContainerContent}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <G clip-path="url(#clip0_36_149)">
                                    <Path d="M15 19C19.9706 19 24 14.9706 24 10C24 5.02944 19.9706 1 15 1C10.0294 1 6 5.02944 6 10C6 14.9706 10.0294 19 15 19Z" stroke="#14AE5C" />
                                    <Path d="M12 18.5C12.2761 18.5 12.5 18.2761 12.5 18C12.5 17.7239 12.2761 17.5 12 17.5C11.7239 17.5 11.5 17.7239 11.5 18C11.5 18.2761 11.7239 18.5 12 18.5Z" fill="#14AE5C" />
                                    <Path d="M15 14V13.143C15 12.429 15.357 11.762 15.951 11.366L16.55 10.966C16.9959 10.6683 17.3615 10.2653 17.6144 9.7926C17.8673 9.3199 17.9998 8.79211 18 8.256V8C18 7.20435 17.6839 6.44129 17.1213 5.87868C16.5587 5.31607 15.7956 5 15 5C14.2044 5 13.4413 5.31607 12.8787 5.87868C12.3161 6.44129 12 7.20435 12 8" stroke="#14AE5C" />
                                </G>
                                <Defs>
                                    <ClipPath id="clip0_36_149">
                                        <Rect width="24" height="24" fill="white" />
                                    </ClipPath>
                                </Defs>
                            </Svg>

                            <Text style={styles.helpText}>Help</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.ctaContainer} onPress={handleLogout}>
                        <Text style={styles.ctaText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.loginContainer}>
                    <Text style={styles.header}>Sign In</Text>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={[styles.input, styles.usernameBox]}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={[styles.input, styles.passwordBox]}
                        placeholder="Password"
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                        <Text style={styles.signInButtonText}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={styles.forgotPassword}>Reset Password</Text>

                    <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign up here</Text></Text>
                    <Text style={styles.orConnect}>Or Connect</Text>
                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image source={require('../assets/google-icon.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image source={require('../assets/facebook-icon.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
    },
    profileContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    profileImage: {
        resizeMode: 'contain',
        width: width * 0.4, // 20% of viewport width
        aspectRatio: 1,
        marginTop: 10,
    },
    profileName: {
        fontSize: baseFontSize * 2,
        fontWeight: 'regular',
        paddingTop: 10,
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'left',
        borderColor: 'gray',
        width: width * 0.8, // 80% of viewport width
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginBottom: 40, // Add margin to create space between elements
    },
    infoContainerContent: {
        justifyContent: 'left',
        alignItems: 'left',
        textAlign: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    infoText: {
        fontSize: baseFontSize ,
        alignSelf: 'center',
        paddingLeft: 15,
    },
    helpContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start', // Use a valid value for justifyContent
        borderColor: 'gray',
        width: width * 0.8, // 80% of viewport width
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginBottom: 40, // Add margin to create space between elements
    },
    helpContainerContent: {
        justifyContent: 'left',
        alignItems: 'left',
        flexDirection: 'row',
        padding: 10,
    },
    helpText: {
        fontSize: baseFontSize ,
        alignSelf: 'center',
        paddingLeft: 15,
    },
    ctaContainer: {
        backgroundColor: '#3a506b',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        borderRadius: 10,
    },
    ctaText: {
        color: '#fff',
        fontWeight: '400',
        textAlign: 'center',
        padding: 10,
    },
    loginContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        margin: 20,
        padding: 20,
    },
    label: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: baseFontSize * 1,
        lineHeight: 23,
        color: '#000000',
        paddingBottom: 10,
    },
    input: {
        height: 'auto',
        fontSize: baseFontSize * 1,
        width: '80%',
        borderColor: 'gray',
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(217, 217, 217, 0.4)',
        borderRadius: 10,
    },
    usernameBox: {
        position: 'relative',
        left: '10.4%',
        right: '10.13%',
    },
    passwordBox: {
        position: 'relative',
        left: '10.4%',
        right: '10.13%',
    },
    signInButton: {
        backgroundColor: '#3a506b',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        borderRadius: 10,
    },
    signInButtonText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: baseFontSize * 1.25, // 1.25rem equivalent
        lineHeight: 23,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    signUpText: {
        alignSelf: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: baseFontSize,
        lineHeight: 21,
        color: '#000000',
        padding: 10,
    },
    signUpLink: {
        color: '#30A5DC',
    },
    forgotPassword: {
        alignSelf: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: baseFontSize,
        lineHeight: 21,
        color: '#000000',
        padding: 10,
    },
    orConnect: {
        alignSelf: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: baseFontSize,
        lineHeight: 21,
        color: '#000000',
        padding: 10,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '50%',
    },
    socialButton: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        flex: 1,
    },
    socialIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    header: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: baseFontSize * 1.5,
        lineHeight: 23,
        color: '#000000',
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default ProfileScreen;