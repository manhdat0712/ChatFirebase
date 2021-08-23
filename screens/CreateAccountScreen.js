import {create} from 'eslint/lib/rules/*';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
export default function LoginScreen({navigation}) {
  const [emailPress, setEmailPress] = useState(false);
  const [passwordPress, setPasswordPress] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  function createAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setErr('Successfully created');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErr('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setErr('That email address is invalid!');
        }
      });
    auth().signOut();
  }

  return (
    <View style={{flex: 1}}>
      <View style={{height: 250, flexDirection: 'row-reverse'}}>
        <View
          style={{
            width: '90%',
            borderBottomLeftRadius: 60,
            backgroundColor: '#7B2F78',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Entypo name="chat" style={{fontSize: 100, color: '#FFF'}} />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="left"
            style={{
              marginRight: -18,
              fontWeight: 'bold',
              marginTop: 25,
              fontSize: 40,
              color: 'black',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingHorizontal: 40, marginTop: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 35, color: '#7B2F78'}}>
          Create Account
        </Text>
        <Text
          style={{
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Email
        </Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          onFocus={() => setEmailPress(true)}
          onBlur={() => setEmailPress(false)}
          style={{
            borderBottomColor: emailPress ? '#7B2F78' : 'grey',
            borderBottomWidth: emailPress ? 3 : 1,
            textAlign: 'center',
            fontSize: 20,
          }}
        />
        <Text
          style={{
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Password
        </Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          onFocus={() => setPasswordPress(true)}
          onBlur={() => setPasswordPress(false)}
          secureTextEntry={true}
          style={{
            borderBottomColor: passwordPress ? '#7B2F78' : 'grey',
            borderBottomWidth: passwordPress ? 3 : 1,
            textAlign: 'center',
            fontSize: 20,
          }}
        />

        {err && (
          <Text
            style={{
              color: err === 'Successfully created' ? '#7B2F78' : 'grey',
              fontSize: 15,
            }}>
            {err}
          </Text>
        )}

        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => createAccount()}
            style={{
              paddingHorizontal: 25,
              paddingVertical: 5,
              backgroundColor: '#7B2F78',
              borderRadius: 20,
            }}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
