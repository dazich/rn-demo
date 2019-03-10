/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Portal, Toast, InputItem, Button, WingBlank, WhiteSpace } from '@ant-design/react-native';
import { createFetch, to } from '../utils';
import { THEME } from '../config';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
	'Double tap R on your keyboard to reload,\n' +
	'Shake or press menu button for dev menu',
});

export default class Home extends Component {
	static navigationOptions = {
		title: '登录',
	};
	state = {
		seconds: '获取验证码',
		quickLogin: true
	};
	
	login = async () => {
		const { lock, quickLogin, phone, code, password } = this.state;
		const { navigate } = this.props.navigation;
		if (lock) return;
		
		if (!phone) {
			console.warn(quickLogin, phone, code)
			Toast.info('请输入手机号');
			return;
		}
		// if (quickLogin && !code) {
		// 	Toast.info('请输入验证码');
		// 	return;
		// }
		//
		// if (!quickLogin && !password) {
		// 	Toast.info('请输入密码');
		// 	return;
		// }
		
		const key = Toast.loading('登录中...', 0);
		const [err, res] = await to(
			createFetch.post('/v1/sms/getvcode', { phone, type: 1 }).then(r => r.data),
		);

		console.warn(res)

		Portal.remove(key);
		if (err || +res.code !== 0) {
			Toast.fail((err && err.message) || res.message || '登录失败');
			return;
		}
		
		Toast.info('登录成功', 3, () => navigate('Home'));
	}
	_gotoWeb = () => {
		this.props.navigation.push('Web');
	}
	render() {
		const { quickLogin, phone, password, code, counting, lock, seconds } = this.state;
		return (
			<View style={styles.container}>
				<WingBlank>
					<InputItem
						clear
						value={phone}
						onChange={value => {
							this.setState({
								phone: value,
							});
						}}
						placeholder="手机号"
					/>
					<WhiteSpace />
					<InputItem
						clear
						value={code}
						onChange={value => {
							this.setState({
								code: value,
							});
						}}
						placeholder="验证码"
					/>
					<WhiteSpace />
					<Button
						onPress={this.login}
						style={{backgroundColor: THEME.COLOR}}
					>Login</Button>
				</WingBlank>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
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
