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
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../ApiService/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Solicitar() {
  const [nomeSolic, setName] = useState('');
  const [descSolic, setDesc] = useState('');
  const [lstErrors, setListErrors] = useState([]);
  const navigation = useNavigation();
  const [idAluno, setIDAluno] = useState('');
  const [idProf, setIDProf] = useState('');
  const [sizeDesc, setSizeDesc] = useState(0);

  async function handlePost() {
    if (camposPrenchidos()) {
      const alunoId = await AsyncStorage.getItem('@SistemaTCC:userID') || '';
      const profId = await AsyncStorage.getItem('@SistemaTCC:profID') || '';
      //const nameAluno = await AsyncStorage.getItem('@SistemaTCC:userName') || '';

      let objNewSolic = {
        nomE_PROJ: nomeSolic,
        descricao: descSolic,
        alunO_SOLIC_ID: alunoId,
        //nameAluno: nameAluno,
        proF_ORIENT_ID: profId,
      };
      console.log(objNewSolic);
      const response = await api.post("/worker/sendRequest", objNewSolic);

      alert('Solicitação Criada!');
    }
  }
  function camposPrenchidos() {
    let validacoes = [];
    let retorno = true;
    if (nomeSolic.trim() === '') {
      validacoes.push('Campo nome é obrigatório');
      retorno = false;
    }
    if (descSolic.trim() === '') {
      validacoes.push('Campo descrição é obrigatório');
      retorno = false;
    }
    setListErrors(validacoes);
    return retorno;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Solicitação</Text>
      <TextInput style={styles.input}
        placeholder="Titulo"
        onChangeText={text => setName(text)}
        maxLength={50}
        value={nomeSolic}
      />
      {/* <TextInput style={styles.input}
        placeholder="Tema"
        onChangeText={text => setTema(text)}
        maxLength={50}
        value={temaSolic}
      /> */}
      <TextInput
        style={{
          border: "solid #9F9F9F",
          // marginTop: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          fontSize: 15,
          color: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          width: '70%',
          marginBottom: 16,
          paddingHorizontal: 8,
          height: (sizeDesc < 40) ? 40 : sizeDesc,
          // alignContent:'center'
        }}
        multiline={true}
        placeholder="Descrição"
        onChangeText={text => setDesc(text)}
        maxLength={100}
        value={descSolic}
        onContentSizeChange={e => setSizeDesc(e.nativeEvent.contentSize.height, 50)}
      />
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText} >Enviar</Text>
      </TouchableOpacity>
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
    marginTop: 50,
    marginBottom: 20
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
    // marginTop: 20,
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
  inputDesc: {
    border: "solid #9F9F9F",
    marginTop: 0,
    height: 100,
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
