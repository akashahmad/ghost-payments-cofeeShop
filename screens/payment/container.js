import React from "react";
import Component from "./index";
import {Consumer} from '../../store';
const index = (props) => {
    let {navigation} = props;
    return (
        <Consumer>
            {
                ({dispatch, id, user, businessName}) => (
                    <Component
                        businessName={businessName}
                        dispatch={dispatch}
                        navigation={navigation}
                        id={id} user={user}
                    />
                )
            }
        </Consumer>
    )
};

export default index