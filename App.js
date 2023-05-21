import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Login from './Tela-inicial/Login';
import Home from './Tela-inicial/Home'
import Cadastro from './Tela-inicial/Cadastro'
import srchProf from './Tela-inicial/srchProf'
import srchAluno from './Tela-inicial/srchAluno'
import Solicitar from './Tela-inicial/Solicitar'
import TrocaSenha from './Tela-inicial/TrocaSenha';
import { useNavigation } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TrocaSenha" component={TrocaSenha} />
        <Stack.Screen name="srchProf" component={srchProf} />
        <Stack.Screen name="Solicitacao" component={Solicitar} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="srchAluno" component={srchAluno} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#003D94',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textResult: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});