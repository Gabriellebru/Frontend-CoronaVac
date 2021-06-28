import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Button
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import colors from '../../Styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {

    const navigation = useNavigation();
    const [userName, setUserName] = useState<string>('');
    const [UserImageURL, setUrlImage] = useState<string>('');

    async function loadStoreUserName() {
        const user: string = await AsyncStorage.getItem('@AppCoronaVac:Username') || '';
        setUrlImage('../../resources/user-icon');
        setUserName(user);
    }

    useEffect(() => {
        loadStoreUserName();
    }, []);




    function goToUserPage() {
        navigation.navigate('UserPage')
    }


    return (
        <View style={styles.container}>
            <View>
                <View style={styles.greetingBox}>
                    <Text style={styles.greeting}>Bem vindo, </Text>
                    <Text style={styles.userName}>{userName.split(' ').slice(0, 1)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingVertical: 20,
        marginTop: '10%',
    },
    userImage: {
        width: 75,
        height: 75,
        borderRadius: 40,
        alignSelf: 'center',
        marginBottom: '10%'
    },
    greeting: {
        fontSize: 32,
        color: 'black'
    },
    userName: {
        fontSize: 32,
        color: 'black',
        fontWeight: 'bold'
    },
    greetingBox: {
        flexDirection: 'row'
    },

});