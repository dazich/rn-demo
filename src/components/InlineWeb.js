import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { APP_NAME } from "../config";

export default class MyWeb extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', APP_NAME),
		};
	};
	
	onMessage = (msg) => {
		console.warn('onMessage:', msg);
		this.props.navigation.setParams({title: msg})
	}
	
	render() {
		const { navigation } = this.props;
		const uri = navigation.getParam('uri');
		
		return (
			<WebView
				source={{uri}}
				// onMessage={this.onMessage}
				// javaScriptEnabled={true}//指定WebView中是否启用JavaScript
			/>
		);
	}
}