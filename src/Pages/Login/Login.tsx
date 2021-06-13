//react imports
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

//my imports
import Loading from '../../Components/Loading/Loading'
import styles from '../../Styles/mainStyle'
import { CircleButton } from '../../Components/Buttons/CircleButton/CircleButton'

import api from '../../Services/api'

interface LoginProps {
  email: string,
  senha: string
}

interface PasswordConfig {
  flShowPass: boolean,
  iconPass: any
}

export default function Login() {

  const navigation = useNavigation();
  const image = { uri: "https://media.gazetadopovo.com.br/viver-bem/2019/02/vacina-filho-pais-antivacina-600x400-38413e10.jpg" }

  const [txtSenha, setSenha] = React.useState('');
  const [txtEmail, setEmail] = React.useState('');
  const [flLoading, setLoading] = React.useState(false)
  const [objPasswordConfig, setConfigForm] = React.useState<PasswordConfig>({ flShowPass: true, iconPass: 'eye-off' });

  function handleChangeIcon() {
    let icone = objPasswordConfig.iconPass === "eye" ? "eye-off" : "eye";
    let flShowPass = !objPasswordConfig.flShowPass;
    setConfigForm({ iconPass: icone, flShowPass });
  }

  function navigateToWelcome() {
    navigation.goBack();
  }

  if (flLoading) {
    return (<Loading />)
  }

  async function navigateToHome() {
    let objLogin: LoginProps = { email: txtEmail, senha: txtSenha };
    if (txtEmail.trim() === '') {
      alert('Campo login é obrigatório');
      return;
    }
    if (txtSenha.trim() === '') {
      alert('Campo senha é obrigatório');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post(`/paciente/Login`, objLogin);
      if (response.data.auth) {
        setLoading(false);
        navigation.navigate('Home');
      }
    }
    catch (e) {
      if (e == 'Error: Request failed with status code 401') {
        alert('Login e/ou senha inválidos');
      }
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground source={image} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View>
            <View style={styles.container}>
              <View style={styles.form}>
                <Text style={styles.title}>Bem vindo!</Text>
                <TextInput
                  placeholder="Digite seu email"
                  style={loginStyles.textInput}
                  onChangeText={(text) => { setEmail(text); }}
                  value={txtEmail}
                ></TextInput>
                <View style={loginStyles.passwordContainer}>
                  <TextInput
                    placeholder="Digite sua senha"
                    style={loginStyles.textInputPassword}
                    onChangeText={(text) => { setSenha(text); }}
                    value={txtSenha}
                    secureTextEntry={objPasswordConfig.flShowPass}
                  ></TextInput>
                  <Feather
                    style={loginStyles.iconEye}
                    name={objPasswordConfig.iconPass}
                    size={28}
                    color={'red'}
                    onPress={handleChangeIcon}
                  />
                </View>
                <TouchableOpacity
                  style={styles.buttonClickMe}
                  activeOpacity={0.7}
                  onPress={navigateToHome}
                >
                  <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>
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
      </SafeAreaView>
    </ImageBackground>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    color: 'red',
    fontSize: 28,
    marginBottom: 8
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    width: 200,
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









