import React from "react";
import {View} from "react-native";
import Component from "./index";
import {Consumer, Provider} from '../../store';
import FlashMessage  from "react-native-flash-message";

const index = () => {
    return (
        <View style={{flex: 1}}>
            <Provider>
                <Consumer>
                    {
                        ({businessName, loader}) => (
                            <Component loader={loader} businessName={businessName}/>
                        )
                    }
                </Consumer>
            </Provider>
            <FlashMessage
                position="top"
                autoHide={true}
                hideOnPress={true}
            />
        </View>
    )
};

export default index