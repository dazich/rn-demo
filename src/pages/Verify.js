
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Toast, Flex } from '@ant-design/react-native';
import { createFetch, to, login } from '../utils';
import { THEME } from "../config";
import HeaderTitle from "../components/HeaderTitle";

const verifyStatus = {
	1: '已认证',
	3: '已过期',
};

export default class User extends Component {
	static navigationOptions = {
		headerTitle: (
			<HeaderTitle title="认证中心"/>
		),
	}
	
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			user_info: {},
		};
		
		try { this.query() } catch {}
	}
	
	async query() {
		const url = '/api/user/profile';
		const [err, res] = await to(createFetch(url).then(r => r.data));
		if (err || +res.code !== 0) {
			Toast.fail((err && err.message) || res.message || '网络异常');
			return;
		}
		
		const { list = [] } = res.data;
		const [list0={}, list1={}] = list;
		const verifyList = list0.list.concat(list1.list)
		
		this.setState({ list: verifyList });
	}
	
	_onPressItem = (uri) => {
		this.props.navigation.push('Web', {uri});
	}
	
	
	render() {
		let { list, user_info } = this.state;
		return (
			<ScrollView style={styles.container}>
				<View style={styles.header}>
					<View style={styles.user_info}>
						<View style={styles.portrait}>
							<Image source={{uri: user_info.user_photo}} alt="" />
						</View>
						<Text>
							认证无碍，提现畅快！
						</Text>
					</View>
				</View>
				{list.map((v, i) => (
					<TouchableOpacity onPress={() => this._onPressItem(v.url)} key={i}>
						<Flex justify="between" style={styles.row}>
							<View style={{...styles.row, marginTop: v.margin_top}} >
								<Image source={{uri: v.icon}} style={{width: 40, height: 40}} />
								<Text style={styles.title}>{v.name}</Text>
							</View>
							<Text style={{...styles.verifyBtn, backgroundColor: +v.status === 1 ? THEME.COLOR : '#aaa'}}>{verifyStatus[v.status] || '去认证'}</Text>
						</Flex>
					</TouchableOpacity>
				))}
			</ScrollView>
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
		// backgroundColor: '#fddd03',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: 80,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#fff',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: 1,
	},
	title: {
		marginLeft: 20,
		color: '#333',
		fontSize: 20
	},
	verifyBtn: {
		padding: 10,
		borderRadius: 4,
		color: '#fff',
		fontSize: 16,
	}
});
