import {
  TextInput, TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Switch
} from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../ApiService/api';

const eye = 'eye';
const eyeOff = 'eye-off';


export default function Cadastro() {
  const [tipoPessoa, setTipoPessoa] = useState(false);
  const [flShowPass, setShowPass] = useState(true);
  const [iconPass, setIconPass] = useState(eyeOff);
  const [txtName, setName] = useState('');
  const [txtUser, setUser] = useState('');
  const [txtEmail, setEmail] = useState('');
  const [txtPassword, setPassword] = useState('');  
  const [txtPasswordConfirm, setPasswordConfirm] = useState('');
  const [tipo, setTipo] = useState('');
  const [lstErrors, setListErrors] = useState([]);
  const [area, setArea] = useState('');
  const [RA, setRA] = useState('');

  const navigation = useNavigation();

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

  async function handlePost() {
    if (camposPrenchidos()) {
      let objNewStudent = {
        nome: txtName,
        tipopessoA_ID: tipoPessoa ? 1 : 2,
        email: txtEmail,
        senha: txtPassword,
        ra: tipoPessoa ? RA : '',
        areA_ATUACAO: area,
        usuario: txtUser  
      };

      const data = objNewStudent;
      console.log(data);
      const response = await api.post("/login/create", data);
      alert('Usuario Criado!');
    }
  }
  function camposPrenchidos() {
    let validacoes = [];
    let retorno = true;
    if (txtName.trim() === '') {
      validacoes.push('Campo Nome é obrigatório');
      retorno = false;
    }
    if (txtEmail.trim() === '') {
      validacoes.push('Campo Email é obrigatório');
      retorno = false;
    }
    if (txtPassword.trim() === '') {
      validacoes.push('Campo senha é obrigatório');
      retorno = false;
    }
    if (txtPasswordConfirm.trim() === '') {
      validacoes.push('Campo confirmar senha é obrigatório');
      retorno = false;
    }
    if (txtPasswordConfirm != txtPassword) {
      validacoes.push('As senhas devem ser iguais...');
      retorno = false;
    }
    if (tipo === '2' && area === '') {
      validacoes.push('Campo área é obrigatório');
      retorno = false;
    }
    setListErrors(validacoes);
    return retorno;
  }

  console.log('tipoPessoa', tipoPessoa)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput style={styles.input}
        placeholder="Nome"
        onChangeText={text => setName(text)}
        maxLength={50}
        value={txtName}
      />
      <TextInput style={styles.input}
        placeholder="Usuário"
        onChangeText={text => setUser(text)}
        maxLength={50}
        value={txtUser}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={text => setPassword(text)}
          value={txtPassword}
          secureTextEntry={flShowPass}
          maxLength={11}
        />
        <Feather
          style={styles.iconEye}
          name={iconPass}
          size={18}
          color={'red'}
          onPress={handleChangeIcon}
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          onChangeText={text => setPasswordConfirm(text)}
          value={txtPasswordConfirm}
          secureTextEntry={flShowPass}
          maxLength={11}
        />
        <Feather
          style={styles.iconEye}
          name={iconPass}
          size={18}
          color={'red'}
          onPress={handleChangeIconConfirm}
        />
      </View>

      <TextInput style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        maxLength={50}
        value={txtEmail}
      />

      {!tipoPessoa && (
        <TextInput style={styles.input}
          placeholder="Area de atuação"
          onChangeText={text => setArea(text)}
          maxLength={50}
          value={area}
        />)}

      {tipoPessoa &&(
        <TextInput style={styles.input}
        placeholder="RA"
        onChangeText={text => setRA(text)}
        maxLength={6}
        value={RA}/>
      )}


      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.textResult} > Professor </Text>
        <Switch
          onValueChange={() => setTipoPessoa(!tipoPessoa)}
          value={tipoPessoa}
        />
        <Text style={styles.textResult} > Aluno </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText} >Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.clickFont} onPress={() => navigation.navigate('Login')}>
        Faça login
      </Text>
      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('Home')} >
        <Text style={styles.buttonText} >Voltar</Text>
      </TouchableOpacity>
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
  title: {
    color: '#2F819D',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50

  },
  multiplo: {
    border: "solid #D5D5D5",
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    border: "solid #2F819D",
    marginTop: 10,
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textInputPassword: {
    height: 40,
    borderWidth: 0,
    width: '70%',
    marginBottom: 16,
    paddingHorizontal: 8
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
  textInputPassword: {
    height: 30,
    borderWidth: 0,
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 8
  },
  passwordContainer: {
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
  },
});
