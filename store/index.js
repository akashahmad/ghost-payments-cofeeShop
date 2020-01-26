import React, {Component} from "react";
const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {...state, user: action.payload};
        case "SET_ID":
            return {...state, id: action.payload};
        case "SET_LOADER":
            return {...state, loader: action.payload};
        case "SET_LOGGEDIN":
            return {...state, loggedIn: action.payload};
        default:
            return state;
    }
};

export class Provider extends Component {
    state = {
        dispatch: action => {
            this.setState(state => reducer(state, action))
        },
        id: null,
        user: null,
        loader: false,
        loggedIn: false
    };

    render() {
        let {state, props: {children}} = this;
        return (
            <Context.Provider value={ state }>{children}</Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;