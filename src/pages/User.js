
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import {
	Toast,
} from '@ant-design/react-native';
import { createFetch, to } from '../utils';

export default class User extends Component {
  static navigationOptions = {
    title: 'User'
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      user_info: {},
    };

    this.query();
  }

  async query() {
    const url = '/api/user/center';
    const [err, res] = await to(createFetch(url).then(r => r.data));
    if (err || +res.code !== 0) {
      Toast.fail((err && err.message) || res.message || '网络异常', 2);
      return;
    }

    const { list, user_info } = res.data;
    this.setState({ list, user_info, bhhOrder });
  }
	
	_onPressItem = (url) => {
		Linking.openURL(url).catch(err => Toast.fail(err));
  }
  

  render() {
	  const { list, user_info } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.user_info}>
            <View style={styles.portrait}>
              <Image source={user_info.user_photo} alt="" />
            </View>
            <Text
              style={`${user_info.user_phone ? styles.user_phone : styles.login_btn}`}
              onClick={() => {
                !user_info.user_phone && login();
              }}
            >
              {user_info.user_phone || '立即登录'}
            </Text>
          </View>
        </View>
	      {list.map((v, i) => (
		      <TouchableOpacity onPress={() => this._onPressItem(v.url)}>
            <View style={styles.row}>
	            <Image style={styles.icon} src={v.icon} alt="" />
	            <Text style={styles.title}>{v.title}</Text>
            </View>
		      </TouchableOpacity>
	      ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
