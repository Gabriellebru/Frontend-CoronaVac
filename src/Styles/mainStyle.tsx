import colors from '../Styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    safearea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%'
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
        height: 38,
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        width: 230,
        marginBottom: 16,
        paddingHorizontal: 8,

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
        paddingBottom: '10%',
        color: 'white'
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    question: {
        fontSize: 17,
        color: colors.heading
    },
    vaccineListCss: {

    },
    itemVaccineCSS: {

    }
});

export default styles;