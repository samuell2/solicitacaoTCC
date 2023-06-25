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

export default function Solicitacoes() {

    const [nomProj, setProj] = useState('');
    const [desc, setDesc] = useState('');

    async function BuscarSolic()
    {
        const idSolic = await AsyncStorage.getItem('@SistemaTCC:solicID');
        const response = await api.post("/worker/gerReqData", {solicitacaO_ID: idSolic});
        setProj(response.data.result.nomE_PROJ);
        setDesc(response.data.result.descricao);
        console.log(response);
        
    }
    BuscarSolic()
   

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Solicitação</Text>
            <View style={styles.inputContainer}>
               <Text style={styles.title2}>Título:</Text>
               <Text style={styles.genFont}>{nomProj}</Text>
               <Text style={styles.title2}>Descrição:</Text>
               <Text style={styles.genFont}>{desc}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('srchAluno')} >
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
    title2: {
        textAlign: 'right',
        color: '#2F819D',
        fontSize: 20,
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
        //marginTop: 10,
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
