
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Slider, Button, Carousel} from '@ant-design/react-native';
import HeaderTitle from "../components/HeaderTitle";
import {APP_NAME} from "../config";

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

export default class Home extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;
		return {
			headerTitle: (
				<HeaderTitle title={params ? params.otherParam : APP_NAME} />
			),
			// headerRight: <View/>
		};
	};

	state = {};

	_gotoWeb = () => {
		this.props.navigation.navigate('Web', {uri: 'http://120.78.170.195:5000/order'});
	}

	_onLoanNumChange = (e) => {
		this.setState({loanNum: e});
	}

	render() {
		const { min=500, max=1000, loanNum, disabled } = this.state;
		return (
			<ScrollView style={styles.container}>
				<Text>{loanNum}</Text>
				<Slider
					min={min}
					max={max}
					value={loanNum}
					defaultValue={max}
					step={50}
					onChange={this._onLoanNumChange}
					disabled={disabled}
				/>
				<Carousel
					style={styles.wrapper}
					selectedIndex={1}
					autoplay
					infinite
					afterChange={this.onHorizontalSelectedIndexChange}
				>
					<View
						style={[styles.containerHorizontal, { backgroundColor: 'red' }]}
					>
						<Text>Carousel 1</Text>
					</View>
					<View
						style={[
							styles.containerHorizontal,
							{ backgroundColor: 'yellow' },
						]}
					>
						<Text>Carousel 2</Text>
					</View>
				</Carousel>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
				<Button
					type="warning"
					title="Go to User"
					onPress={this._gotoWeb}
				>Test</Button>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	containerHorizontal: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 150,
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
