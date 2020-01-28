import React from "react";
import Component from "./index";
import {Consumer} from '../../store';
const index = (props) => {
    let {navigation} = props;
    return (
        <Consumer>
            {
                ({dispatch}) => (
                    <Component
                        dispatch={dispatch}
                        navigation={navigation}
                    />
                )
            }
        </Consumer>
    )
};

export default index