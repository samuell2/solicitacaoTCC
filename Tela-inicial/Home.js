import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function Home() {

  const navigation = useNavigation();
  //https://cdn-icons-png.flaticon.com/512/2890/2890697.png


  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2890/2890697.png' }} style={styles.foto} />
      <Text style={styles.title}>SOLICITAÇÃO TCC</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
      <Text style={styles.genFont}>PAGINA INICIAL</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
          <Text style={styles.buttonText} >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')} >
          <Text style={styles.buttonText} >Cadastro</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
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
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 50
  },
  genFont: {
    color: '#2F819D',
    fontSize: 20,
    marginTop: 1,
  },
  clickFont: {
    color: 'blue',
    fontSize: 15,
    marginTop: 1,
  },
  inputContainer: {
    marginTop: 10,
    width: '80%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 'stretch',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  input: {
    border: "solid #9F9F9F",
    marginTop: 20,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 15,
    color: '#D5D5D5',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '48%'
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
  foto: {
    
    width: 100,
    height: 100,
    alignItems:'center'
    //borderRadius: 25,
    //marginRight: 10,
  }
});