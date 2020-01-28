import React from "react";
import Component from "./BusinessName";
import {Consumer} from '../../store';
const index = (props) => {
    let {navigation} = props;
    return (
        <Consumer>
            {
                ({dispatch, businessName}) => (
                    <Component
                        dispatch={dispatch}
                        businessName={businessName}
                        navigation={navigation}
                    />
                )
            }
        </Consumer>
    )
};

export default index