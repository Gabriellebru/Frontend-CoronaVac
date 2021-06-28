//react imports
import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//my imports
import Loading from '../../Components/Loading/Loading';
import styles from '../../Styles/mainStyle';
import { CircleButton } from '../../Components/Buttons/CircleButton/CircleButton';
import CustomButton from '../../Components/Buttons/CustomButton/CustomButton';

import api from '../../Services/api'
import TextButton from '../../Components/Buttons/TextButton/TextButton';
import { BackgroundImageURl } from '../../Services/constants'

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
  function navigateToRedefinirSenha() {
    navigation.navigate('RedefinirSenha');
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
    setLoading(true)
    try {
      const response = await api.post(`/paciente/Login`, objLogin);
      if (response.data.auth && response.data.needMoreInfo) {
        await AsyncStorage.setItem('@AppCoronaVac:Email', response.data.pacienteRetorno.email)
          .then(() => {
            setLoading(false);
            navigation.navigate('CompletarCadastro');
          })

      }
      else {
        await AsyncStorage.setItem('@AppCoronaVac:Username', response.data.pacienteRetorno.nome)
          .then(() => {
            setLoading(false);
            navigation.navigate('Home');
          })
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
    <ImageBackground source={BackgroundImageURl} style={styles.image} blurRadius={0.7}>
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: 'rgba(100,100,100, 0.5)', borderRadius: 10, height: '60%', width: '70%' }}>
          <View style={styles.form}>
            <Text style={styles.title}>Login</Text>
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
            <CustomButton
              title={'Entrar'}
              onPress={navigateToHome}
            />
            <TextButton
              title={'Esqueceu a senha?'}
              onPress={navigateToRedefinirSenha}
            />
            <View style={{ paddingTop: '10%' }}>
              <CircleButton
                title={'<'}
                onPress={navigateToWelcome}
              />
            </View>
          </View>
        </View>
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
    paddingHorizontal: 8,

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









