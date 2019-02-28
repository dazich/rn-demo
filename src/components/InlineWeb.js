import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class MyWeb extends Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		return (
			<WebView
				source={{uri: 'http://test-webapp.imcjbt.com/xxzs/order'}}
			/>
		);
	}
}