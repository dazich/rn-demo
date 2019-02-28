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
		// window.ReactNativeWebView.postMessage(string)
		this.props.navigation.setParams({title: msg})
	}
	
	render() {
		const { navigation } = this.props;
		const uri = navigation.getParam('uri');
		
		return (
			<WebView
				onMessage={event => this.onMessage(event.nativeEvent.data)}
				onError={error => console.log(error)}
				cacheEnabled={false}
				originWhitelist={['*']}
				javaScriptEnabled={true}
				source={{uri}}
			/>
		);
	}
}