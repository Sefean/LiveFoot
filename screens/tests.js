import React from 'react';
import { View, Text } from 'react-native';


function Cat(props) {
    return (
        <View>
            <Text style={{paddingTop: 30}}>Hello, I am {props.name}</Text>
        </View>
    );
}

export default function cafe() {

    return (
        <View>
            <Cat name="Sergio" />
            <Cat name="Ferrero" />
        </View>
    )
}