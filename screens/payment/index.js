import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import Avatar from '../../assets/img/avatar.png';
import {showMessage} from "react-native-flash-message";
import uuid from 'uuid';
import {apiPath} from '../../config';
import axios from 'axios';
const Payment = (props) => {
    let {businessName, user, navigation, dispatch} = props;
    const [uid] = useState(uuid());
    const [quantity, setQuantity] = useState(0);
    const [quantityCheck, setQuantityCheck] = useState(false);
    const [total, setTotal] = useState(0.0);
    const [totalCheck, setTotalCheck] = useState(false);
    const [coffeeName, setCoffeeName] = useState("");
    const [coffeeNameCheck, setCoffeeNameCheck] = useState(false);

    const addPayment = () => {
        let requestedData = {
            uid,
            user,
            shopName: businessName,
            coffeeName,
            totalCharged: total,
        };
        if (!quantity | !coffeeName | !total) {
            if (!quantity) {
                setQuantityCheck(true)
            }
            if (!coffeeName) {
                setCoffeeNameCheck(true)
            }
            if (!total) {
                setTotalCheck(true)
            }
        }
        else {
            dispatch({
                type: "SET_LOADER",
                payload: true
            });
            axios.post(apiPath + "/charge", requestedData).then(res => {
                dispatch({
                    type: "SET_LOADER",
                    payload: false
                });
                showMessage({
                    message: "Payment Successfully Deducted.",
                    type: "success",
                    backgroundColor: "#28a745",
                    color: "white",
                    icon: "info",
                    duration: 5000
                });
                navigation.navigate('Home');
            }).catch(err => {
                dispatch({
                    type: "SET_LOADER",
                    payload: false
                });
                showMessage({
                    message: err.message,
                    type: "danger",
                    backgroundColor: "red",
                    color: "white",
                    icon: "info",
                    duration: 5000
                })
            })
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content"/>
            <View style={styles.containerHero}>
                <Text style={styles.headerNameText}>{businessName}</Text>
                <Text style={styles.checkoutText}>CHECKOUT</Text>
                <View style={styles.profileOrderContainer}>
                    <View style={styles.cardss}>
                        <View style={styles.avatarImageContainer}>
                            <Image
                                source={user.photoURL ? ({uri: user.photoURL}) : Avatar}
                                style={styles.avatarImage}
                            />
                        </View>
                    </View>
                    <View style={styles.orderContainer}>
                        <Text
                            style={styles.orderText}>{((user.firstName ? user.firstName : "") + (user.lastName ? (" " + user.lastName) : ""))}</Text>
                        <View style={styles.quantityOrderContainer}>
                            <View>
                                <TextInput
                                    value={quantity ? quantity : ""}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        setQuantityCheck(false);
                                        setQuantity(text.replace(/[^0-9]/g, ''))
                                    }}
                                    style={styles.quantityInput}
                                />
                                {quantityCheck && <View>
                                    <Text style={{color: "red"}}>Quantity is required</Text>
                                </View>}
                                <Text style={styles.quantityText}>Quantity</Text>
                            </View>
                            <View>
                                <Text style={styles.xText}>X</Text>
                            </View>
                            <View>
                                <TextInput
                                    onChangeText={(text) => {
                                        setCoffeeNameCheck(false);
                                        setCoffeeName(text)
                                    }}
                                    style={styles.orderInput}
                                />
                                {coffeeNameCheck && <View>
                                    <Text style={{color: "red"}}>Name is Requird</Text>
                                </View>}
                                <Text style={styles.orderCoffeeText}>Name of item</Text>
                            </View>
                        </View>
                        <View style={styles.quantityOrderContainer}>
                            <View>
                                <Text style={styles.totalText}>Total</Text>
                            </View>
                            <View>
                                <Text style={styles.moneyText}>$</Text>
                            </View>
                            <View>
                                <TextInput
                                    value={total ? total : ""}
                                    onChangeText={(text) => {
                                        setTotalCheck(false);
                                        setTotal(text.replace(/[^\d.]/g, ''))
                                    }}
                                    keyboardType={'numeric'}
                                    style={styles.totalInput}/>
                            </View>
                        </View>
                        {totalCheck && <View style={styles.quantityOrderContainer}>
                            <View>
                                <Text style={{color: "red"}}>Total is required</Text>
                            </View>
                        </View>}
                        <TouchableOpacity
                            onPress={() => addPayment()}
                            style={styles.signButtonnn}>
                            <Text style={styles.logInButtonnnTextss}>CHARGE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },

    containerHero: {
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '100%'
    },

    signButtonnn: {
        backgroundColor: 'black',
        borderColor: '#7997F3',
        borderWidth: 3,
        borderRadius: 6,
        width: 200,
        marginTop: 35,
        paddingTop: 14,
        paddingBottom: 14,
        marginLeft: '15%'
    },

    logInButtonnnTextss: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
        textAlign: 'center'
    },

    totalInput: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 12,
        width: 300,
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: 'white',
        color: 'black',
        marginTop: 5,
        marginLeft: 5

    },

    moneyText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '700',
        marginLeft: 20
    },

    totalText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '700',
    },

    xText: {
        color: 'white',
        fontSize: 35,
        fontWeight: '700',
        marginLeft: 12
    },

    orderCoffeeText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
        // marginLeft: '35%',
        opacity: .75,
        marginTop: 10,
        marginLeft: '5%'
    },

    orderInput: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 12,
        width: 500,
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: 'white',
        color: 'black',
        marginTop: 15,
        marginLeft: '5%'

    },

    quantityText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
        // marginLeft: '35%',
        opacity: .75,
        marginTop: 10
    },

    quantityInput: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 12,
        width: 50,
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: 'white',
        color: 'black',
        marginTop: 15,
        // marginLeft: '33%'
    },

    quantityOrderContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '15%',
        marginTop: 15
    },

    orderText: {
        color: 'white',
        fontSize: 35,
        fontWeight: '700',
        marginTop: 32,
        marginLeft: '15%'
    },

    cardss: {
        backgroundColor: 'white',
        width: 180,
        height: 180,
        marginTop: 35,
        marginLeft: '5%'
    },

    profileOrderContainer: {
        display: 'flex',
        flexDirection: 'row'
    },

    avatarImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },

    avatarImage: {
        height: 120,
        width: 120,
        marginTop: '10%'
    },

    headerNameText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '400',
        marginLeft: '5%',
        opacity: .75,
        marginTop: '5%'
    },

    checkoutText: {
        color: 'white',
        fontSize: 40,
        fontWeight: '700',
        marginLeft: '5%',
        marginTop: 20
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

export default Payment;