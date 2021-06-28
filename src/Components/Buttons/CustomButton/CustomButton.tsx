import React from 'react';
import {
    StyleSheet,
    TouchableOpacityProps,
    TouchableOpacity,
    Text
} from 'react-native';

import { Button, ButtonProps } from 'react-native-elements'
import colors from '../../../Styles/colors';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string,
}

export default function CustomButton({ title, ...rest }: CustomButtonProps) {
    return (
        <TouchableOpacity
            style={styles.ButtonStyle}
            activeOpacity={0.7}
            {...rest}
        >
            <Text style={styles.TitleStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: colors.red,
        width: 200,
        borderRadius: 50,
        borderWidth: 0,
        height: 40,
        alignItems: 'center',
        marginTop: '5%'
    },

    TitleStyle: {
        color: colors.white,
        fontWeight: 'bold',
        marginTop: 10
    }
});
