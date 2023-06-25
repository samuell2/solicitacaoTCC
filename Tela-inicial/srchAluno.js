import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import api from '../ApiService/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BuscaAluno() {

  useEffect(() => {
    ObterSolicitacao();
  },
    []

  );

  const noResultsComponent = (
    <View >
      <Text style={{ fontStyle: 'italic' }}>Nenhum resultado encontrado</Text>
    </View>
  );

  const navigation = useNavigation();
  const [profList, setProfList] = useState([]);
  const [search, setSearch] = useState('');
  const [alunoNome, setAluno] = useState('');


  async function ObterSolicitacao() {
    //alert('Fazendo requisição');
    const id = await AsyncStorage.getItem('@SistemaTCC:userID') || '';
    const response = await api.post("/worker/getRequests", {alunO_SOLIC_ID: 0, proF_ORIENT_ID: id});
    console.log("AAAAAAAAA",response.data.result);
    setProfList(response.data.result);

  }

  async function NavegarSolic(id) {
    AsyncStorage.setItem('@SistemaTCC:solicID', id);
    navigation.navigate('Solicitacoes')
  }

  const filteredData = profList.filter((item) =>
    item.nomE_PROJ.toLowerCase().includes(search.toLowerCase())
  );

  const Item = ({ nome, aluno, desc, id }) => (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.nome}>{aluno}</Text>
        <View>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.genFont}>{desc.slice(0,20) + '...'}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => NavegarSolic(id)}>
          <Text style={styles.buttonText} >Ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  const renderItem = ({ item }) => (
    <Item nome={item.nomE_PROJ} desc={item.descricao} aluno={item.nomE_ALUNO} id={item.solicitacaO_ID} />
  );
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.container2}>
          <Text style={styles.title}>Solicitações</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.item}>
            <Text style={styles.title2}>Aluno</Text>
            <Text style={styles.title2}>Solicitação</Text>
            <Text style={styles.title2}>                          </Text>
          </View>
        </View>
      </View>
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.solicitacaO_ID}
          ItemSeparatorComponent={() => <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />}
        />
      ) : (
        noResultsComponent
      )}
      <View>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText} >Voltar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );


};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    width: '100vw',
    marginTop: '10px'

  },
  container2: {
    backgroundColor: 'white',
    alignItems: 'center',
    //justifyContent: 'space-around',
    display: 'flex',
    width: '100vw',
    marginTop: '10px'

  },
  title: {
    color: '#2F819D',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50

  },
  title2: {
    color: '#2F819D',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 50

  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    justifyContent: 'center', height: 50,
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
  cont: {
    flexDirection: 'row'
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
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 10,
    width: '80%',
    justifyContent: 'space-around'
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nome: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#2F819D',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8
  }
});