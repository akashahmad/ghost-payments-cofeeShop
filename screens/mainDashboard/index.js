import React, {useEffect, useState} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import Logo from '../../assets/img/logo.png';
import Avatar from '../../assets/img/avatar.png';
import RNLocation from 'react-native-location';
import {GeoFire} from 'geofire';
import firebase from "../../utils/firebase";
import {distinctArray, distinct} from '../../functions'
RNLocation.configure({
    distanceFilter: 10, // Meters
    desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: "other",
    allowsBackgroundLocationUpdates: true,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: true,
})
const DashBoard = (props) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        RNLocation.requestPermission({
            ios: 'always', // or 'always'
            android: {
                detail: 'fine', // or 'fine'
                rationale: {
                    title: "We need to access your location",
                    message: "We use your location to show where you are on the map",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        }).then(granted => {
            if (granted) {
                startUpdatingLocation();
            }
        });
    }, []);
    const startUpdatingLocation = () => {
        let keys = [];
        RNLocation.subscribeToLocationUpdates(
            locations => {
                const lat = parseFloat(locations[0].latitude);
                const long = parseFloat(locations[0].longitude);
                let location = [lat, long];
                const geoFire = new GeoFire(firebase.database().ref("/geolocs"));
                geoFire.query({radius: 0.01524, center: location}).on('key_entered', (key) => {
                    keys.push(key);
                    setNewUsers(distinctArray(keys));
                })
            }
        );
    };
    const setNewUsers = (newUsers) => {
        let list = [];
        newUsers.forEach(val => {
            firebase.database()
                .ref('/users/' + val)
                .once('value',
                    (snapshot) => {
                        list = [...list, snapshot.val()];
                        setUsers([...list])
                    })
        });
    };
    let uniqueUsers = distinct(users, "uid");
    let {navigation} = props;
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content"/>
            <ScrollView>
                <View style={styles.newContainerHero}>
                    <Image
                        source={Logo}
                        style={styles.logoImage}
                    />
                    <View style={styles.cardContainer}>
                        {uniqueUsers && uniqueUsers.length !== 0 && uniqueUsers.map((sin, ind) =>
                            <TouchableOpacity key={ind} onPress={() => navigation.navigate('Payment')}
                                              style={styles.card}>
                                <View style={styles.nameContainer}>
                                    <Text
                                        style={styles.nameContainerText}>{((sin.firstName ? sin.firstName : "") + (sin.lastName ? (" " + sin.lastName) : ""))}</Text>
                                </View>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={sin.photoURL ? ({uri: sin.photoURL}) : Avatar}
                                        style={styles.avatarImage}
                                    />
                                </View>
                                <View style={styles.coffeeContainer}>
                                    <Text
                                        style={styles.coffeeContainerText}>{sin.favoriteCoffee ? sin.favoriteCoffee : "No favorite Coffee added"}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },

    newContainerHero: {
        display: "flex",
        justifyContent: 'center',
        // alignItems: 'center',
        height: '40%',
    },

    cardContainer: {
        display: 'flex',
        flexDirection: 'row'
    },

    coffeeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    coffeeContainerText: {
        color: 'black',
        fontSize: 13,
        fontWeight: '500',
        opacity: .75
    },

    nameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    nameContainerText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '700',
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },

    avatarImage: {
        height: 75,
        width: 75
    },

    logoImage: {
        marginLeft: '5%',
        height: 40,
        width: 210
    },

    usersContainer: {

        // // alignItems: 'center',
        // height: '40%',
    },

    card: {
        backgroundColor: 'white',
        width: 160,
        height: 160,
        marginTop: 35,
        marginLeft: '5%'
    },

    cardContainer: {
        // paddingTop: 70,
        // paddingBottom: 70,
        // paddingRight: 0,
        // paddingLeft: 0
    },

    businessNameText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: '5%'
    },

    businessNameField: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 12,
        width: '90%',
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: 'white',
        color: 'black',
        marginTop: 10,
        marginLeft: '5%'
    },

    centerButton: {
        marginTop: 10,
        marginLeft: '5%'
    },

    signButton: {
        backgroundColor: 'black',
        borderColor: '#7997F3',
        borderWidth: 3,
        borderRadius: 6,
        width: '20%',
        marginTop: 15,
        paddingTop: 14,
        paddingBottom: 14,
        marginLeft: '5%'
    },

    logInButtonTextss: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
        textAlign: 'center'
    },
});

export default DashBoard;