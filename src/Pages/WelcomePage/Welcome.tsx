import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';


import styles from '../../Styles/mainStyle';
import CustomButton from '../../Components/Buttons/CustomButton/CustomButton';
import colors from '../../Styles/colors';
import { BackgroundImageURl } from '../../Services/constants';

export default function Welcome() {

    //variables
    const navigation = useNavigation();

    //functions
    function navigateToLogin() {
        navigation.navigate('Login');
    }
    function navigateToCadastro() {
        navigation.navigate('Cadastro');
    }

    //code
    return (
        <ImageBackground source={BackgroundImageURl} style={styles.image} blurRadius={0.7} >
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: 'rgba(100,100,100, 0.5)', borderRadius: 10, height: '50%', width: '70%' }}>
                    <View style={styles.form}>
                        <View style={{ paddingBottom: '30%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={WelcomeStyles.titulo}  >{'Bem vindo ao \nCovid-19 Mobile!'}</Text>
                            <Image style={WelcomeStyles.imagem} source={require('../../resources/vacina.png')}
                            />
                            {/* <Text style={WelcomeStyles.texto}>{'Se você já possui cadastro, clique em \n"LOGIN", caso contrário realiza um novo \n"CADASTRO" '}</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CustomButton style={WelcomeStyles.ButtonStyle}
                                title={'Login'}
                                onPress={navigateToLogin}
                            />
                            <Text>{'\t'}</Text>
                            <CustomButton style={WelcomeStyles.ButtonStyle}
                                title={'Cadastrar-se'}
                                onPress={navigateToCadastro}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const WelcomeStyles = StyleSheet.create({
    ButtonStyle: {
        width: 120,
        backgroundColor: colors.red,
        height: 40,
        alignItems: 'center',
        borderRadius: 50
    },
    texto: {
        color: colors.white,
        fontSize: 15,
        alignSelf: 'center',
        paddingTop: '30%'
    },
    titulo: {
        fontSize: 30,
        color: colors.white
    },
    imagem: {
        width: 120,
        height: 130,
        marginBottom: '-10%',
        marginTop: '10%'
    }
})
