import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';

import styles from '../../Styles/mainStyle'

export default function IMC() {
  const [txtIdadeAnos, SetIdade] = React.useState('');
  const [flVisualiza, setFlVisualiza] = React.useState(false);
  const [txtPeso, setPeso] = React.useState('');
  const [txtAltura, setAltura] = React.useState('');
  const [classificacao, setClassificacao] = React.useState('');
  const [imc, setImc] = React.useState(0);
  const [corClassificacao, setCorClassificacao] = React.useState('black');


  function  CalculoIMC(){
    //  peso / (altura * altura)
    const imc:number = Number(txtPeso) / (Number(txtAltura) * Number(txtAltura));
    if(imc < 18.5){
      setImc(imc);
      setClassificacao('Peso Baixo');
      setCorClassificacao('yellow');
    }
    else if(imc >= 18.5 && imc <= 24.9){
      setImc(imc);
      setClassificacao('Peso Normal');
      setCorClassificacao('green');
    }
    else if(imc >= 25.0 && imc <= 29.9){
      setImc(imc);
      setClassificacao('Sobrepeso');
      setCorClassificacao('#f2c1ae');
  }
  else if(imc >= 30.0 && imc <= 34.9){
      setImc(imc);
      setClassificacao('Obesidade Grau I');
      setCorClassificacao('orange');
  }
  else if(imc >= 35.0 && imc <= 39.9){
    setImc(imc);
    setClassificacao('Obesidade Severa Grau II');
    setCorClassificacao('#e64b12');
  }
  else if(imc >= 40){
    setImc(imc);
    setClassificacao('Obesidade Mórbida Grau III');
    setCorClassificacao('red');
  }
  else{
    setImc(0);
    setClassificacao('Sem classificação');
    setCorClassificacao('black');
  }  
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.container}>
          <Text>Bem vindo!</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="Digite seu peso"
              style={styles.textInput}
              onChangeText={(text) => { setPeso(text); }}
              value={txtPeso}
            ></TextInput>
            <TextInput
              placeholder="Digite sua altura"
              style={styles.textInput}
              onChangeText={(text) => { setAltura(text); }}
              value={txtAltura}
            ></TextInput>
               <TouchableOpacity
                style={styles.buttonClickMe}
                activeOpacity={0.7}
                onPress={CalculoIMC}
              >
                  <Text style={styles.textButton}>Calcular IMC</Text>
               </TouchableOpacity>
            <Text style= {{color:corClassificacao}}>{classificacao}</Text>
            <Text>IMC: {imc}</Text>
          </View> 
        </View> 
      </KeyboardAvoidingView> 
    </SafeAreaView>
  );
}

