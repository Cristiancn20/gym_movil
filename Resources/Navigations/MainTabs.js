import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Perfil from '../Screens/UsserAuth/Perfil';
import Noticies from '../Screens/UsserAuth/Notices';
import Exercises from '../Screens/UsserAuth/Exercises';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Ejercicios'
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#C91D2D',
                    color: 'white'
                }
            }}>
            <Tab.Screen name="Noticies" component={Noticies}
                options={{
                    tabBarLabel: 'Noticias',
                    tabBarLabelStyle: {
                        color: "white"
                    },
                    tabBarActiveBackgroundColor: '#a50303',
                    tabBarIcon: () => (
                        <FontAwesome5 name="bell" size={24} color="white" />
                    )
                }} />
            <Tab.Screen name="Ejercicios" component={Exercises}
                options={{
                    tabBarLabel: 'Ejercicios',
                    tabBarLabelStyle: {
                        color: "white"
                    },
                    tabBarActiveBackgroundColor: '#a50303',
                    tabBarIcon: () => (
                        <FontAwesome5 name="diagnoses" size={24} color="white" />
                    )
                }}
            />
            <Tab.Screen name="Perfil" component={Perfil}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarLabelStyle: {
                        color: "white"
                    },
                    tabBarActiveBackgroundColor: '#a50303',
                    tabBarIcon: () => (
                        <FontAwesome5 name="user" size={24} color="white" />
                    )
                }} />
                
        </Tab.Navigator>
    );
}