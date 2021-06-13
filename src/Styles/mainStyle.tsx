import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextHello: {
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

    TextResponse: {
        paddingTop: 10
    },

    textInput: {
        height: 40,
        borderColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        width: 200,
        textAlign: 'center',
        marginBottom: 16,
        backgroundColor: 'white'
    },

    form: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonClickMe: {
        backgroundColor: 'red',
        borderRadius: 8,
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    simpleText: {
        paddingTop: 10
    },

    backButton: {
        backgroundColor: 'red',
        borderRadius: 8,
        height: 45,
        width: 115,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 40,
        paddingBottom: '30%'
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
});



export default styles;