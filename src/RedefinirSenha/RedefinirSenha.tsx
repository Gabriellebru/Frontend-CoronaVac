//react imports
import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

//my imports
import Loading from '../Components/Loading/Loading';
import styles from '../Styles/mainStyle';
import { CircleButton } from '../Components/Buttons/CircleButton/CircleButton';
import PasswordTextInput from '../Components/TextInputs/PasswordInput/PasswordInput';
import CustomButton from '../Components/Buttons/CustomButton/CustomButton';
import api from '../Services/api'
import { colors } from 'react-native-elements';
import { BackgroundImageURl } from '../Services/constants';

interface RedefinirSenhaProps {
    email: string,
    senha: string
}

export default function RedefinirSenha() {

    const navigation = useNavigation();

    const [txtSenha, setSenha] = React.useState('');
    const [txtConfirmarSenha, setConfirmarSenha] = React.useState('');
    const [txtEmail, setEmail] = React.useState('');
    const [flLoading, setLoading] = React.useState(false)

    function navigateToWelcome() {
        navigation.goBack();
    }


    if (flLoading) {
        return (<Loading />)
    }

    async function Redefinir() {
        const errors: Array<string> = [];
        let SenhaAlterada: RedefinirSenhaProps = {
            "email": txtEmail,
            "senha": txtSenha,
        }


        if (txtSenha != txtConfirmarSenha) {
            errors.push('\n\nSenhas não coincidem')
        }
        if (txtConfirmarSenha.trim() === '' && txtSenha.trim() != '') {
            errors.push('\n\nÉ obrigatório digitar novamente a senha')
        }

        setLoading(true)
        await api.put(`/paciente/RedefinirSenha`, SenhaAlterada)
            .then(() => {
                if (errors.length != 0) {
                    throw new Error()
                }
                setLoading(false);
                Alert.alert('Aviso', 'Senha redefinida');
                navigation.navigate('Login');
            })
            .catch((e) => {
                if (e.response != undefined && e.response.data != undefined && e.response.data.errors != undefined) {
                    Object.values(e.response.data.errors).map((item: any) => {
                        errors.push(`\n\n${Object.values(item)}`);
                    })
                    Alert.alert('Aviso: Verifique os erros a seguir', `${errors}`)
                }
                else if (e.response != undefined && e.response.data != undefined && e.response.data.Message != null) {
                    Alert.alert('Aviso', `${e.response.data.Message}`)

                }
                else {
                    Alert.alert('Aviso', `${errors}`)
                }
                setLoading(false)
            })
    }

    return (
        <ImageBackground source={BackgroundImageURl} style={styles.image} blurRadius={0.7}>
            <SafeAreaView style={styles.container}>
                <View style={{ backgroundColor: 'rgba(100,100,100, 0.5)', borderRadius: 10, height: '70%', width: '70%' }}>
                    <View style={styles.container}>
                        <View style={styles.form}>
                            <Text style={RedefinirStyles.textTitle}>Redefinir senha</Text>
                            <TextInput style={RedefinirStyles.textInput}
                                placeholder="Digite seu email"
                                onChangeText={(text) => { setEmail(text); }}
                                value={txtEmail}
                            >
                            </TextInput>
                            <PasswordTextInput
                                placeholder="Digite sua nova senha"
                                onChangeText={(text) => { setSenha(text); }}
                                value={txtSenha}
                            />
                            <PasswordTextInput
                                placeholder={'Digite senha novamente'}
                                onChangeText={(text) => { setConfirmarSenha(text); }}
                                value={txtConfirmarSenha}
                            />
                            <CustomButton
                                title={'Redefinir senha'}
                                onPress={Redefinir}
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
            </SafeAreaView>
        </ImageBackground>
    );
}

const RedefinirStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        color: colors.white,
        fontSize: 28,
        marginBottom: 8,
        height: 80
    },
    textInput: {
        height: 38,
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        width: 230,
        marginBottom: 16,
        paddingHorizontal: 8
    },
    textInputPassword: {
        height: 40,
        borderWidth: 0,
        width: '70%',
        marginBottom: 16,
        paddingHorizontal: 8
    },
    buttonIn: {
        backgroundColor: 'red',
        borderRadius: 8,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextIn: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    passwordContainer: {
        backgroundColor: 'white',
        marginBottom: 16,
        height: 40,
        borderColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconEye: {
        paddingHorizontal: 8,
        marginTop: 6
    }
})









