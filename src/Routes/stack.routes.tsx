import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../Styles/colors';
import IMC from '../Pages/IMCpage/imc';
import Login from '../Pages/Login/Login';
import Welcome from '../Pages/WelcomePage/Welcome';
import Cadastro from '../Pages/Cadastro/Cadastro';
import Home from '../Pages/HomePage/Home';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />
        <stackRoutes.Screen
            name="Login"
            component={Login}
        />
        <stackRoutes.Screen
            name="Cadastro"
            component={Cadastro}
        />
        <stackRoutes.Screen
            name="Home"
            component={Home}
        />
        <stackRoutes.Screen
            name="IMC"
            component={IMC}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;