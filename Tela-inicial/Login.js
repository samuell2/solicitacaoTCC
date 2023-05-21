import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../ApiService/api';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const eye = 'eye';
const eyeOff = 'eye-off';

export default function Login() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: true,
      shouldShowAlert: true,
    })
  });

  async function handleCallNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Teste',
        body: 'Teste Corpo',
        priority: 'true',
        data: {}
      },
      trigger: {
        seconds: 1,
      }
    })
  }


  const navigation = useNavigation();
  const [txtUser, setUser] = useState('');
  const [txtPassword, setPassword] = useState('');
  const [flShowPass, setShowPass] = useState(true);
  const [iconPass, setIconPass] = useState(eyeOff);

  useEffect(() => {
    setPassword('');
    setUser('');
  }, [])

  async function autenticarLogin() {
    let loginTxt = txtUser;
    let senhaTxt = txtPassword;

    //AsyncStorage.setItem('@SistemaTCC:userName', response.data[0].nome);



    const response = await api.get(`/Users?user=${loginTxt}&password=${senhaTxt}`);
    const filteredData = response.tipo;
    // const idPessoa = response.data[0].id;
    // const nomePessoa = response.data[0].name;

    if (response.data.length < 1) {
      alert('Usuario e/ou senha invalido!');
    }
    else if (txtUser === '') {
      alert('Campo usuário é obrigatório!');
    }
    else if (txtPassword === '') {
      alert('Campo senha é obrigatório!');
    }
    else {
      AsyncStorage.setItem('@SistemaTCC:userID', String(response.data[0].id));
      AsyncStorage.setItem('@SistemaTCC:userName', String(response.data[0].name));
      if (response.data[0].tipo === "1") {
        navigation.navigate('srchProf')
      }
      else {
        navigation.navigate('srchAluno')
      }
    }
  }
  function handleChangeIcon() {
    let icone = iconPass == eye ? eyeOff : eye;
    let flShowPassAux = !flShowPass;
    setShowPass(flShowPassAux);
    setIconPass(icone);
  }

  function handleChangeIconConfirm() {
    let icone = iconPass == eye ? eyeOff : eye;
    let flShowPassAux = !flShowPass;
    setShowPass(flShowPassAux);
    setIconPass(icone);
  }



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          placeholder="Usuário"
          onChangeText={text => setUser(text)}
          maxLength={50}
          value={txtUser}
        />
        <View style={styles.passwordContainer}>
          <TextInput style={styles.input}
            placeholder="Senha"
            onChangeText={text => setPassword(text)}
            maxLength={50}
            secureTextEntry={flShowPass}
            value={txtPassword}
          />
          <Feather
            style={styles.iconEye}
            name={iconPass}
            size={18}
            color={'red'}
            onPress={handleChangeIcon}
          />
        </View>
        <View style={styles.container2}>
          <TouchableOpacity style={styles.button} onPress={autenticarLogin} >
            <Text style={styles.buttonText} >Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleCallNotification()} >
            <Text style={styles.buttonText} >Teste</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.genFont}>
          Não possui cadastro?
        </Text>
        <Text style={styles.clickFont} onPress={() => navigation.navigate('Cadastro')}>
          Cadastre-se
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('Home')} >
          <Text style={styles.buttonText} >Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    marginTop: '10%',
    marginBottom: '10%'
  },
  title: {
    color: '#2F819D',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50,
  },
  genFont: {
    color: 'black',
    fontSize: 15,
    marginTop: 1,
  },
  clickFont: {
    color: 'blue',
    fontSize: 15,
    marginTop: 1,
  },
  inputContainer: {
    width: '100%',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  input: {
    border: "solid #9F9F9F",
    marginTop: 20,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 15,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    width: '70%',
    marginBottom: 16,
    paddingHorizontal: 8
  },
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#2F819D',
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
  },
  buttonBack: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#838383',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  passwordContainer: {
    flex: 1,
    marginBottom: 16,
    height: '6%',
    borderColor: 'white',
    borderRadius: 8,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconEye: {
    paddingHorizontal: 8,
    color: 'black',
    marginTop: 30,
  }
});
