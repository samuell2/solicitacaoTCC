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

export default function TrocaSenha() {


    const [email, setEmail] = useState('');

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldSetBadge: true,
            shouldShowAlert: true,
        })
    });
    async function handleCallNotification() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status != 'granted'){
          alert ('Você não pode receber notificações!')
          return;
        }
        await Notifications.getExpoPushTokenAsync();
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Troque sua senha!',
            body: 'Uma solicitação para alterar sua senha foi enviada para o seu e-mail ' + email,
            priority: 'true',
            data: {}
          },
          trigger: {
            seconds: 1,
          }
        })
      }


    const navigation = useNavigation();

    async function autenticar() {
        if (email === '') {
            alert('Preencha o campo e-mail!');
        }
        else {
            handleCallNotification();
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Trocar Senha</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    placeholder="E-mail"
                    onChangeText={text => setEmail(text)}
                    maxLength={50}
                    value={email}
                />
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.button} onPress={autenticar} >
                        <Text style={styles.buttonText} >Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('Login')} >
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
