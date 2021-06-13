import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import FormStyles from '../../../Styles/formStyle';
import { Feather } from '@expo/vector-icons';


interface PasswordConfig {
    flShowPass: boolean,
    iconPass: any
}

interface PasswordTextInputProps extends TextInputProps {
    placeholder: string
}


export default function PasswordTextInput({ placeholder, ...rest }: PasswordTextInputProps) {

    const [objPasswordConfig, setConfigForm] = React.useState<PasswordConfig>
        ({ flShowPass: false, iconPass: 'eye' });
    const [txtLogin, setLogin] = React.useState('')
    const [txtSenha, setSenha] = React.useState('')

    function handleChangeIcon() {

        let icone = objPasswordConfig.iconPass === "eye" ? "eye-off" : "eye";
        let flShowPass = !objPasswordConfig.flShowPass;
        setConfigForm({ iconPass: icone, flShowPass });
    }
    return (
        <View style={FormStyles.FormContainer}>
            <TextInput
                style={FormStyles.textInputPassword}
                placeholder={placeholder}
                onChangeText={text => setSenha(text)}
                value={txtSenha}
                secureTextEntry={objPasswordConfig.flShowPass}
                {...rest}
            />
            <Feather
                style={styles.iconEye}
                name={objPasswordConfig.iconPass}
                size={25}
                color={'red'}
                onPress={handleChangeIcon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
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
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
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
        marginBottom: 16,
        height: 40,
        borderColor: '#dcdce6',
        borderRadius: 8,
        borderWidth: 1,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconEye: {
        paddingHorizontal: 8,
        marginTop: 6
    }
});