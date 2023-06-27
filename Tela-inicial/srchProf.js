import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import api from '../ApiService/api';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function BuscaProfessor() {

  useEffect(() => {
    ObterProfessores();
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
  const [idAluno, setIDAluno] = useState('');
  const [nameAluno, setNameAluno] = useState('');



  async function ObterProfessores() {
    //alert('Fazendo requisição');
    const response = await api.get("/login/GetProfessor");
    setProfList(response.data.result);
    const id = await AsyncStorage.getItem('@SistemaTCC:userID') || '';
    setNameAluno(await AsyncStorage.getItem('@SistemaTCC:userName')) || '';
    setIDAluno(id);
    const aluno = await api.post("/login/getPeople", { pessoA_ID: idAluno });
    AsyncStorage.setItem('@SistemaTCC:userID', id);
    AsyncStorage.setItem('@SistemaTCC:userName', String(nameAluno));
  }

  const Item = ({ NOME, foto, AREA_ATUACAO, PESSOA_ID }) => (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={{ uri: foto }} style={styles.foto} />
        <View>
          <Text style={styles.nome}>{NOME}</Text>
          <Text style={styles.genFont}>{AREA_ATUACAO}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => NavegarSolic(PESSOA_ID)}>
          <Text style={styles.buttonText2} >+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // AsyncStorage.setItem('@SistemaTCC:userID', String(idAluno));
  const filteredData = profList.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  async function NavegarSolic(id) {
    AsyncStorage.setItem('@SistemaTCC:profID', id);
    navigation.navigate('Solicitacao')
  }

  const renderItem = ({ item }) => (
    <Item key={item.pessoA_ID} AREA_ATUACAO={item.areA_ATUACAO} NOME={item.nome} foto={'https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head.png'} PESSOA_ID={item.pessoA_ID} />
  );
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Professores</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Digite um nome..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.pessoA_ID}
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
  buttonText2: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25
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
    paddingHorizontal: 100
  }
});