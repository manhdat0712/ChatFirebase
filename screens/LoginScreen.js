import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}) {
  const [emailPress, setEmailPress] = useState(false);
  const [passwordPress, setPasswordPress] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginHandle() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('chat', {
          userName: email.substring(0, email.indexOf('@')),
        });
      })
      .catch(error => {
        Alert.alert('Login Fails with ', error + '\n' + 'Create an Account?', [
          {
            text: 'Yep',
            onPress: () => navigation.navigate('create'),
          },
          {
            text: 'Cancle',
            style: 'cancle',
          },
        ]);
      });
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
      </View>
      <View style={{flex: 1, paddingHorizontal: 40, marginTop: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 35, color: '#7B2F78'}}>
          Login
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
        <TouchableOpacity
          style={{marginTop: 10}}
          onPress={() => navigation.navigate('create')}>
          <Text style={{color: '#7B2F78', fontSize: 15}}>
            You have no account? let's create one!
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => loginHandle()}
            style={{
              paddingHorizontal: 25,
              paddingVertical: 5,
              backgroundColor: '#7B2F78',
              borderRadius: 20,
            }}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              Sign In
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <Entypo name="facebook" style={{fontSize: 25, color: '#087BEA'}} />
            <View
              style={{
                marginLeft: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{color: '#087BEA', fontSize: 15, fontWeight: 'bold'}}>
                Login with facebook
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}
