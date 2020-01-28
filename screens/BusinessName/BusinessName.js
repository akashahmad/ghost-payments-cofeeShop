import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
} from 'react-native';

const App = (props) => {
    let {dispatch} = props;
    const [businessName, setBusinessName] = useState(null);
    const [businessNameEmpty, setBusinessNameEmp] = useState(false);
    const signIn = () => {
        if (!businessName) {
            setBusinessNameEmp(true)
        } else {
            dispatch({
                type: "SET_BUSINESS_NAME",
                payload: businessName
            })
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content"/>
            <View style={styles.containerHero}>
                <Text style={styles.businessNameText}>Name of Business</Text>
                <TextInput
                    autoFocus
                    onChangeText={value => {
                        setBusinessNameEmp(false);
                        setBusinessName(value)
                    }}
                    style={styles.businessNameField}
                    placeholder='Name of business'/>
                {
                    businessNameEmpty &&
                    <Text style={{color: "red"}}>Business is required</Text>
                }
                <TouchableOpacity
                    onPress={() => signIn()}
                    style={styles.signButton}>
                    <Text style={styles.logInButtonTextss}>CONFIRM</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        // alignItems: 'center',
        height: '90%'
    },

    businessNameText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: '5%'
    },

    businessNameField: {
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

export default App;
