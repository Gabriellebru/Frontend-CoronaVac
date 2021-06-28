import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import FormStyles from '../../../Styles/formStyle';
import { Feather } from '@expo/vector-icons';


interface PasswordConfig {
    flShowPass: boolean,
    iconPass: any
}

interface PasswordTextInputProps extends TextInputProps {
    placeholder: string,
    FeatherColor?: string
}


export default function PasswordTextInput({ placeholder, FeatherColor, ...rest }: PasswordTextInputProps) {

    const [objPasswordConfig, setConfigForm] = React.useState<PasswordConfig>
        ({ flShowPass: false, iconPass: 'eye-off' });
    const [txtLogin, setLogin] = React.useState('')
    const [txtSenha, setSenha] = React.useState('')

    function handleChangeIcon() {

        let icone = objPasswordConfig.iconPass === "eye" ? "eye-off" : "eye";
        let flShowPass = !objPasswordConfig.flShowPass;
        setConfigForm({ iconPass: icone, flShowPass });
    }
    return (
        <View style={styles.passwordContainer}>
            <TextInput
                style={FormStyles.textInputPassword}
                placeholder={placeholder}
                onChangeText={text => setSenha(text)}
                value={txtSenha}
                secureTextEntry={!objPasswordConfig.flShowPass}
                {...rest}
            />
            <Feather
                style={styles.iconEye}
                name={objPasswordConfig.iconPass}
                size={25}
                color={FeatherColor == null ? 'red' : FeatherColor}
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
        height: 38,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        width: 230,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconEye: {
        marginTop: 6,
        marginRight: 10
    }
});