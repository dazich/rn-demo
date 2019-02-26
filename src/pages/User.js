
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import {
	Toast,
} from '@ant-design/react-native';
import { createFetch, to, login } from '../utils';

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
		console.warn(res)
		if (err || +res.code !== 0) {
			Toast.fail((err && err.message) || res.message || '网络异常');
			return;
		}

		const { list, user_info } = res.data;
		this.setState({ list, user_info });
	}

	_onPressItem = (url) => {
		Linking.openURL(url).catch(err => Toast.fail(err));
	}


	render() {
		let { list, user_info } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.user_info}>
						<View style={styles.portrait}>
							<Image source={user_info.user_photo} alt="" />
						</View>
						<Text
							style={`${user_info.user_phone ? styles.user_phone : styles.login_btn}`}
							onPress={() => {
								!user_info.user_phone && login();
							}}
						>
							{user_info.user_phone || '立即登录'}
						</Text>
					</View>
				</View>
				{list.map((v, i) => (
					<TouchableOpacity onPress={() => this._onPressItem(v.url)} key={i}>
						<View style={{...styles.row, marginTop: v.margin_top}} >
							<Image source={{uri: v.icon}} style={{width: 40, height: 40}} />
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
		backgroundColor: '#f2f2f2',
		paddingBottom: 80,
	},
	user_info: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		height: 300,
		backgroundColor: '#fddd03',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: 80,
		paddingLeft: 30,
		backgroundColor: '#fff',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
	},
	title: {
	  marginLeft: 20,
    color: '#333',
    fontSize: 20
  }
});
