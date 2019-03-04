
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import {Slider, Carousel, Flex, Toast} from '@ant-design/react-native';
import HeaderTitle from "../components/HeaderTitle";
import {APP_NAME} from "../config";
import to from "../utils/to";
import createFetch from "../utils/createFetch";

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

	_getCode = async () => {
        const url = 'v1/sms/getvcode';
        const [err, res] = await to(createFetch.post(url, {type: 1, phone: 18202729129}).then(r => r.data));
        console.warn(res)
        if (err || +res.code !== 0) {
            Toast.fail((err && err.message) || res.message || '网络异常');
            return;
        }
	}

	_onLoanNumChange = (e) => {
		this.setState({loanNum: e});
	}

	render() {
		const { min=500, max=1000, loanNum, disabled } = this.state;
		return (
			<ScrollView style={styles.container}>
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
				
				<Flex direction="column" justify="center" style={{marginTop: 20}}>
					<Text style={{fontSize: 40}}>{loanNum || max}</Text>
					<Text>数目</Text>
				</Flex>
				<Flex justify="between">
					<Text>{min}</Text>
					<Text>{max}</Text>
				</Flex>
				<Slider
					min={min}
					max={max}
					value={loanNum}
					defaultValue={max}
					step={50}
					onChange={this._onLoanNumChange}
					disabled={disabled}
				/>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
				<Button
					type="warning"
					title="Go to User"
					onPress={this._getCode}
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
