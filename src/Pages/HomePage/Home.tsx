//react imports
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';

//my imports
import styles from '../../Styles/mainStyle'

export default function Home() {

    const navigation = useNavigation();
    const [txtUsuario, setUsuario] = React.useState('');
    const [txtSenha, setSenha] = React.useState('');
    const image = { uri: "https://media.gazetadopovo.com.br/viver-bem/2019/02/vacina-filho-pais-antivacina-600x400-38413e10.jpg" }

    return (
        <ImageBackground source={image} style={styles.image}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container}>
                    <View>
                        <View style={styles.container}>
                            <View style={styles.form}>
                                <Text style={styles.title}>Se ainda não tomou a vacina, solicite a sua já</Text>


                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

