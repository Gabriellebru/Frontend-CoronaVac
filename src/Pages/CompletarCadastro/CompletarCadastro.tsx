//react imports
import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

//my imports
import styles from '../../Styles/mainStyle'
import Loading from '../../Components/Loading/Loading'

import api from '../../Services/api'
import { AxiosResponse } from 'axios';
import { colors } from 'react-native-elements';
import CustomButton from '../../Components/Buttons/CustomButton/CustomButton';
import { BackgroundImageURl } from '../../Services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

interface UpdateRegisterConfig {
    cpf: string,
    peso: number,
    altura: number,
    dataNascimento: Date,
    cidade: string,
    UF: string,
    listaComorbidades: string,
    JaTeveCovid: string,
    email: string
}


export default function CompletarCadastro() {

    const navigation = useNavigation();
    const image = { uri: BackgroundImageURl }
    const [email, setEmail] = React.useState('');
    const [txtCpf, setCpf] = React.useState('');
    const [txtPeso, setPeso] = React.useState('');
    const [txtAltura, setAltura] = React.useState('');
    const [txtCidade, setCidade] = React.useState('');
    const [txtUF, setUF] = React.useState('');
    const [txtComorbidade, setComorbidade] = React.useState('');
    const [txtTeveCovid, setTeveCovid] = React.useState('')
    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState<any>('date');
    const [date, setDate] = React.useState(new Date(1598051730000));

    let errors: Array<string> = []


    const [flLoading, setLoading] = React.useState(false);

    async function loadStoredInformation() {
        const email = await AsyncStorage.getItem('@AppCoronaVac:Email') || ''
        setEmail(email)
    }

    React.useEffect(() => {
        setLoading(true)
        loadStoredInformation().then(() => {
            setLoading(false)
        });
        Alert.alert('Aviso!', 'Você precisa completar seu cadastro, para solicitar as doses das vacina.',
            [
                {
                    text: 'Voltar',
                    onPress: () => {
                        navigation.navigate('Login')
                    }
                },
                {
                    text: 'Continuar'
                }
            ]
        )

    }, [])


    if (flLoading) {
        return (<Loading />)
    }

    function onChange(event: any, selectedDate: any) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    function showMode(currentMode: string) {
        setShow(true);
        setMode(currentMode);
    };

    function showDatepicker() {
        showMode('date');
    };

    async function realizaUpdate() {
        setLoading(true);
        const objUpdate: UpdateRegisterConfig = {
            cpf: txtCpf,
            peso: parseFloat(txtPeso),
            altura: parseFloat(txtAltura),
            dataNascimento: date,
            cidade: txtCidade,
            UF: txtUF,
            listaComorbidades: txtComorbidade,
            JaTeveCovid: txtTeveCovid,
            email: email
        }
        await api.post(`/paciente/AtualizaCadastro`, objUpdate)
            .then(response => {
                if (response.data.atualizado) {
                    setLoading(false);
                    Alert.alert('Aviso', 'Cadastro atualizado')
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
    function navigateToLogin() {
        navigation.goBack();
    }
    return (
        <ImageBackground source={BackgroundImageURl} style={styles.image} blurRadius={0.7}>
            <View style={styles.container}>
                <View style={{ backgroundColor: 'rgba(100,100,100, 0.5)', borderRadius: 10, height: '90%', width: '80%', marginTop: '5%' }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={TituloStyles.form}>
                        <ScrollView>

                            <Text style={TituloStyles.titulo}>Completar cadastro</Text>
                            <TextInput
                                placeholder="Cpf"
                                style={styles.textInput}
                                onChangeText={(text) => { setCpf(text); }}
                                value={txtCpf}
                                maxLength={11}
                            ></TextInput>
                            <TextInput
                                placeholder="Peso"
                                style={styles.textInput}
                                onChangeText={(text) => { setPeso(text); }}
                                value={txtPeso}
                                maxLength={4}
                            ></TextInput>
                            <TextInput
                                placeholder="Altura"
                                style={styles.textInput}
                                onChangeText={(text) => { setAltura(text); }}
                                value={txtAltura}
                                maxLength={4}
                            ></TextInput>
                            <View>
                                <View>
                                    <TouchableOpacity
                                        onPress={showDatepicker}
                                        activeOpacity={0.7}
                                        style={{ height: 55, width: 230, alignItems: 'center', backgroundColor: 'white', borderWidth: 1, borderColor: 'black', borderRadius: 10, marginBottom: '5%' }}
                                    >
                                        <Text style={{ color: '#a3a3a3' }}>{'Informe sua data de nascimento'}</Text>
                                        <Text style={{ color: 'black', marginTop: 10 }}>{`${date.toLocaleDateString().substring(3, 5)}/${date.toLocaleDateString().substring(0, 2)}/${date.toLocaleDateString().substring(6, 8)}`}</Text>
                                    </TouchableOpacity>
                                </View>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        display="spinner"
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                            <TextInput
                                placeholder="Cidade"
                                style={styles.textInput}
                                onChangeText={(text) => { setCidade(text); }}
                                value={txtCidade}
                            ></TextInput>
                            <TextInput
                                placeholder="UF"
                                style={styles.textInput}
                                onChangeText={(text) => { setUF(text); }}
                                value={txtUF}
                                maxLength={2}
                            ></TextInput>
                            <TextInput
                                placeholder="Tem comorbidade?"
                                style={styles.textInput}
                                onChangeText={(text) => { setComorbidade(text); }}
                                value={txtComorbidade}
                                maxLength={3}
                            ></TextInput>
                            <TextInput
                                placeholder="Já teve Covid-19?"
                                style={styles.textInput}
                                onChangeText={(text) => { setTeveCovid(text); }}
                                value={txtTeveCovid}
                                maxLength={3}
                            ></TextInput>
                            <CustomButton
                                title={'Atualizar cadastro'}
                                onPress={realizaUpdate}
                            />
                            <CustomButton
                                title={'Voltar'}
                                onPress={navigateToLogin}
                            />
                            <View style={{ paddingTop: '25%' }}>
                            </View>
                        </ScrollView>

                    </KeyboardAvoidingView>
                </View>
            </View>
        </ImageBackground>
    );
}

const TituloStyles = StyleSheet.create({
    titulo: {
        fontSize: 28,
        color: colors.white,
        marginTop: '10%',
        marginBottom: '2%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    simpleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

