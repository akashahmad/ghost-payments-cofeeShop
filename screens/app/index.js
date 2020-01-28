import React, {useState, useEffect} from 'react';
import BusinessName from "../BusinessName/container";
import Navigations from "../navigation/container";
import {View, StatusBar} from "react-native";
import Loader from "../commonComponents/loader";
function App({loader, businessName}) {

    return <View style={{flex: 1}}>
        <StatusBar hidden/>
        {
            businessName ?
                <Navigations/>
                :
                <BusinessName/>
        }
        {
            loader &&
            <Loader/>
        }
    </View>
}


export default App;

