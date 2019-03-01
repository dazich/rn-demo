import React, { Component } from 'react';
import { Text } from 'react-native';

export default class HeaderTitle extends Component {
	render() {
		const { title } = this.props;
		return (
			<Text
				style={{
					flex: 1,
					textAlign: 'center',
					color: '#fff',
					fontSize: 22,
				}}>{ title }</Text>
		);
	}
}