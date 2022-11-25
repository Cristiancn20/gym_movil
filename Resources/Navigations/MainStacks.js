import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Screens/Login";
import Splash from "../Screens/Splash";
import Register from "../Screens/Register";
import ResetPass from "../Screens/ResetPass";
import NewPass from "../Screens/NewPass";
import ContainerFragment from "../Screens/UsserAuth/ContainerFragment";
import Pago from "../Screens/UsserAuth/Pago.js";
import Rutina_Brazo_ from "../Screens/UsserAuth/Exercises/Brazo";
import Rutina_Pecho_ from "../Screens/UsserAuth/Exercises/Pecho";
import Rutina_Hombro_ from "../Screens/UsserAuth/Exercises/Hombro";
import Rutina_Pierna_ from "../Screens/UsserAuth/Exercises/Pierna";

const Stack = createNativeStackNavigator()

const MainStacks = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                />
                <Stack.Screen
                    name="ResetPass"
                    component={ResetPass}
                />
                <Stack.Screen
                    name="NewPass"
                    component={NewPass}
                />
                <Stack.Screen
                    name="ContainerFragment"
                    component={ContainerFragment}
                />
                <Stack.Screen
                    name="Pago"
                    component={Pago}
                />
                <Stack.Screen
                    name="Rutina_Brazo"
                    component={Rutina_Brazo_}
                />
                <Stack.Screen
                    name="Rutina_Pecho"
                    component={Rutina_Pecho_}
                />
                <Stack.Screen
                    name="Rutina_Hombro"
                    component={Rutina_Hombro_}
                />
                 <Stack.Screen
                    name="Rutina_Pierna"
                    component={Rutina_Pierna_}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default MainStacks