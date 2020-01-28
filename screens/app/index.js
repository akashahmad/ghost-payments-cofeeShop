import React, {useState, useEffect} from 'react';
import Navigations from "../navigation/container";
import {View, StatusBar} from "react-native";
import Loader from "../commonComponents/loader";
function App({loader}) {

    return <View style={{flex: 1}}>
        <StatusBar hidden/>
        <Navigations/>
        {
            loader &&
            <Loader/>
        }
    </View>
}


export default App;

