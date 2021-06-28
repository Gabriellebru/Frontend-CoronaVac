//react imports
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

//my imports
import styles from '../../Styles/mainStyle'
import { useEffect } from 'react';
import { colors } from 'react-native-elements';
import CustomButton from '../../Components/Buttons/CustomButton/CustomButton';
import OptionButton from '../../Components/Buttons/OptionButton/OptionButton';
import Header from '../../Components/Header/Header';
import FeatherIcon from 'react-native-vector-icons/Feather'
import api from '../../Services/api';

interface vaccineType {
    title: string,
    active: boolean
}

export default function Home() {

    const navigation = useNavigation();
    const [username, setusername] = React.useState<string>('');
    const [email, setEmail] = React.useState('')

    async function LoaduserName() {
        const user: string = await AsyncStorage.getItem('@AppCoronaVac:username') || ''
        const Email: string = await AsyncStorage.getItem('@AppCoronaVac:Email') || ''
        setusername(user)
        setEmail(Email)
    }
    useEffect(() => {
        LoaduserName();
    }, [])

    function navigateToWelcome() {
        navigation.navigate('Welcome');
    }
    function navigateToCompletarCadastro() {
        navigation.navigate('CompletarCadastro');
    }

    const vaccineTypeList: vaccineType[] = [
        {
            title: '1ª Dose COVID',
            active: false
        },
        {
            title: '2ª Dose COVID',
            active: false
        },
    ]

    const [listVaccine, setLista] = React.useState<vaccineType[]>(vaccineTypeList);

    async function deleteUser() {
        await api.delete(`/paciente/DeletarUsuario/${email}`).then(() => {
            Alert.alert('Aviso', 'Conta apagada');
            navigation.navigate('Login')
        }).catch((e) => {
            Alert.alert('Erro', `${e.response.data}`)
        })
    }

    async function options() {
        Alert.alert('Configurações', '', [
            {
                text: 'Voltar'
            },
            {
                text: 'Sair',
                onPress: () => {
                    Alert.alert('Aviso:', 'Deseja realmente sair?', [
                        {
                            text: 'Sair',
                            onPress: () => {
                                navigation.navigate('Login');
                            }
                        },
                        {
                            text: 'Voltar'
                        }
                    ])
                }
            },
            {
                text: 'Excluir',
                onPress: () => {
                    Alert.alert('Cuidado!', 'Deseja realmente excluir a conta?', [
                        {
                            text: 'Sim, apagar agora!',
                            onPress: deleteUser
                        },
                        {
                            text: 'Voltar'
                        }
                    ])
                }
            }
        ])
    }


    return (

        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={options}
            >
                <FeatherIcon color={'darkred'} size={45} style={{ height: 50, width: 50, marginTop: '10%', marginLeft: '87%' }} name='settings'></FeatherIcon>
            </TouchableOpacity>
            <Header />
            <View style={HomeStyle.container}>
                <View style={HomeStyle.vaccineListCss}>
                    <FlatList
                        data={listVaccine}
                        renderItem={({ item }) => (
                            <OptionButton title={item.title} active onPress={() => { Alert.alert('Aviso:', 'Não pode tomar') }} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        contentContainerStyle={HomeStyle.itemVaccineCSS}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.form}>
                        <Text style={HomeStyle.texto}>Para realizar a solicitação da 1° ou 2° Dose da vacina, complete o cadastro.</Text>
                        <Text>Clique no botão finalizar cadastro</Text>

                        <CustomButton
                            title={'Sair'}
                            onPress={navigateToWelcome}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView >


    );
}

const HomeStyle = StyleSheet.create({
    bemvindo: {
        fontSize: 30
    },
    texto: {
        color: colors.black,
        fontSize: 20
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: '20%'
    },
    header: {
        paddingHorizontal: 20
    },
    question: {
        fontSize: 17,
        color: 'white'
    },
    vaccineListCss: {
        marginTop: '20%'
    },
    itemVaccineCSS: {

    }
})

