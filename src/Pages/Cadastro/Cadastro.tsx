//react imports
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

//my imports
import styles from '../../Styles/mainStyle'
import { CircleButton } from '../../Components/Buttons/CircleButton/CircleButton'
import Loading from '../../Components/Loading/Loading'

import api from '../../Services/api'
import { AxiosResponse } from 'axios';
import CustomButton from '../../Components/Buttons/CustomButton/CustomButton';
import PasswordTextInput from '../../Components/TextInputs/PasswordInput/PasswordInput';
import { BackgroundImageURl } from '../../Services/constants';


interface CadastroProps {
    nome: string,
    email: string,
    senha: string,
    confirmaSenha: string
}

export default function Cadastro() {

    const navigation = useNavigation();
    const image = { uri: BackgroundImageURl }
    const [txtNome, setNome] = React.useState('');
    const [txtEmail, setEmail] = React.useState('');
    const [txtSenha, setSenha] = React.useState('');
    const [txtConfirmarSenha, setConfirmarSenha] = React.useState('');

    const [flLoading, setLoading] = React.useState(false);

    let errors: Array<string> = []

    if (flLoading) {
        return (<Loading />)
    }

    async function navigateToLogin() {
        if (txtSenha.trim() != '') {
            if (txtConfirmarSenha.trim() === '') {
                errors.push('\n\nCampo confirmar senha é obrigatório');
            }
            else if (txtConfirmarSenha != txtSenha) {
                errors.push('\n\nSenhas não coincidem');
            }
        }
        realizaCadastro();
    }

    async function realizaCadastro() {
        setLoading(true);
        const objCadastro: CadastroProps = {
            nome: txtNome,
            email: txtEmail,
            senha: txtSenha,
            confirmaSenha: txtConfirmarSenha
        }
        await api.post(`/paciente/Cadastro`, objCadastro)
            .then(response => {
                if (response.data.auth) {
                    setLoading(false);
                    Alert.alert('Aviso', 'Cadastro realizado!\nInicie a sessao na tela de Login')
                    navigation.navigate('Login');
                }
            })
            .catch((e) => {
                setLoading(false);
                if (e.response.data.errors != undefined && e.response.data.errors.length != 0) {
                    e.response.data.errors.map((item: any) => {
                        Object.values(item).map((item: any) => {
                            errors.push('\n\n' + item);
                        })
                    })
                    Alert.alert('Aviso', `${errors}`)
                }
            })
    }


    function navigateToWelcome() {
        navigation.navigate('Welcome');
    }

    return (
        <ImageBackground source={BackgroundImageURl} style={styles.image} blurRadius={0.7}>
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: 'rgba(100,100,100, 0.5)', borderRadius: 10, height: '70%', width: '70%' }}>
                    <KeyboardAvoidingView style={styles.container}>
                        <View>
                            <View style={styles.container}>
                                <View style={styles.form}>
                                    <Text style={styles.title}>Cadastro</Text>
                                    <TextInput
                                        placeholder="Nome completo"
                                        style={styles.textInput}
                                        onChangeText={(text) => { setNome(text); }}
                                        value={txtNome}
                                    ></TextInput>
                                    <TextInput
                                        placeholder="E-mail"
                                        style={styles.textInput}
                                        onChangeText={(text) => { setEmail(text); }}
                                        value={txtEmail}
                                    ></TextInput>
                                    <PasswordTextInput
                                        placeholder="Senha"
                                        onChangeText={(text) => { setSenha(text); }}
                                        value={txtSenha}
                                        secureTextEntry={true}
                                    ></PasswordTextInput>
                                    <PasswordTextInput
                                        placeholder="Confirmar Senha"
                                        onChangeText={(text) => { setConfirmarSenha(text); }}
                                        value={txtConfirmarSenha}
                                        secureTextEntry={true}
                                    ></PasswordTextInput>
                                    <CustomButton
                                        title={'Cadastrar'}
                                        onPress={navigateToLogin}
                                    />
                                    <View style={{ paddingTop: '25%' }}>
                                        <CircleButton
                                            title={'<'}
                                            onPress={navigateToWelcome}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

