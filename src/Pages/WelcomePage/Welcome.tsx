import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';


import { BackgroundImageURl } from '../../../assets/constants'
import styles from '../../Styles/mainStyle'

export default function Welcome() {

    //variables
    const navigation = useNavigation();
    const image = { uri: BackgroundImageURl }

    //functions
    function navigateToLogin() {
        navigation.navigate('Login');
    }
    function navigateToCadastro() {
        navigation.navigate('Cadastro');
    }

    //code
    return (
        <ImageBackground source={image} style={styles.image}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container}>
                    <View>
                        <Text style={styles.title}>Seja bem vindo!</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity
                                style={styles.buttonClickMe}
                                activeOpacity={0.7}
                                onPress={navigateToLogin}
                            >
                                <Text style={styles.textButton}>Login</Text>
                            </TouchableOpacity>
                            <Text>{'\t'}</Text>
                            <TouchableOpacity
                                style={styles.buttonClickMe}
                                activeOpacity={0.7}
                                onPress={navigateToCadastro}
                            >
                                <Text style={styles.textButton}>Cadastrar-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    )
}

