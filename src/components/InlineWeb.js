import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class MyWeb extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;
		return {
			title: params ? params.otherParam : '网页',
		};
	};
	
	render() {
		const { navigation } = this.props;
		const uri = navigation.getParam('uri');
		
		return (
			<WebView source={{uri}} />
		);
	}
}