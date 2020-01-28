import React, {Component} from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import {View} from "react-native";
import MainDashboard from "../mainDashboard/container";
import Payment from "../payment/container";


function Navgation() {
    return <View style={{flex: 1}}>
        <AppContainer/>
    </View>
}


const AppStack = createStackNavigator({
    Home: {
        screen: MainDashboard,
        navigationOptions: ({navigation}) => ({
            headerTitle: " "
        })
    },
    Payment: {
        screen: Payment,
        navigationOptions: ({navigation}) => ({
            headerTitle: "Payment"
        })
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'black',
            height: 80,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            textAlign: "center",
            flex: 1,
            fontSize: 16
        }
    },
});


const AppContainer = createAppContainer(AppStack);


export default Navgation;