import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    TouchableOpacityProps
} from 'react-native';

import colors from '../../../Styles/colors';

interface TextButtonProps extends TouchableOpacityProps {
    title: string,
}

export default function TextButton({ title, ...rest }: TextButtonProps) {
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
        width: 200,
        borderRadius: 10,
        borderWidth: 0,
        height: 40,
        alignItems: 'center'
    },

    TitleStyle: {
        color: colors.white,
        fontWeight: 'bold',
        marginTop: 10
    }
});
