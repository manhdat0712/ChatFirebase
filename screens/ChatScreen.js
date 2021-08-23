import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
export default function Chat({navigation, route}) {
  const {userName} = route.params;
  const [data, setData] = useState(null);
  const [chatOnFocus, setChatOnFocus] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [click, setClick] = useState(false);

  // console.log(userName);
  useEffect(() => {
    firestore()
      .collection('messages')
      .orderBy('createAt', 'asc')
      .get()
      .then(query => {
        const allData = [];
        query.forEach(doc => {
          allData.push(doc._data);
        });
        setData(allData);
        // console.log(data);
      });
  }, [click]);

  function sendMessage() {
    firestore().collection('messages').add({
      name: userName,
      message: messageInput,
      createAt: new Date(),
    });
    setClick(!click);
    setMessageInput('');
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
      <View style={{flex: 1}}>
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: '#7B2F78',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="left"
              style={{
                fontWeight: 'bold',
                fontSize: 30,
                color: 'white',
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              color: '#FFF',
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            Chat Room
          </Text>
        </View>
        <View
          style={{
            height: chatOnFocus ? '73%' : '86%',
            backgroundColor: '#E5E6FA',
          }}>
          <FlatList
            style={{flex: 1, marginTop: 10, paddingHorizontal: 10}}
            data={data}
            keyExtractor={item => item.createAt}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection:
                      userName === item.name ? 'row-reverse' : 'row',
                    marginTop: 2,
                  }}>
                  <View style={{maxWidth: 280}}>
                    {item.name !== userName && (
                      <Text style={{fontSize: 13}}>{item.name}</Text>
                    )}
                    <View
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        backgroundColor:
                          item.name !== userName ? '#FFFFFF' : '#8C90E0',
                        borderRadius: 10,
                      }}>
                      <Text style={{fontSize: 16}}>{item.message}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 5,
            marginBottom: chatOnFocus ? 26 : 0,
          }}>
          <TextInput
            placeholder={'Message'}
            value={messageInput}
            onChangeText={setMessageInput}
            onFocus={() => setChatOnFocus(true)}
            onBlur={() => setChatOnFocus(false)}
            style={{
              borderWidth: 1,
              width: '85%',
              borderRadius: 14,
              fontSize: 18,
            }}
          />
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => sendMessage()}>
              <FontAwesome
                name="send"
                style={{fontSize: 30, color: '#7B2F78'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
