
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Slider, Carousel, Flex, Toast, Button} from '@ant-design/react-native';
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


    constructor(props) {
        super(props);
        this.state = {};

        // try { this._getPageData() } catch {}
    }

    _getPageData = async () => {
        const url = 'v1/util/getBanner';
        const [err, res] = await to(createFetch.post(url, {}).then(r => r.data));
        console.warn(url, res);
        if (err || +res.code !== 0) {
            Toast.fail((err && err.message) || res.message || '网络异常');
            return;
        }
	}

	_gotoWeb = () => {
		this.props.navigation.navigate('Login', {uri: 'http://10.31.41.7:3000/user'});
	}

	_getCode = async () => {
        const url = '/api/login/getPhoneCode';
        const [err, res] = await to(createFetch.post(url, {type: 1, phone: "18202729129"}));
        if (err) {
            Toast.info(err.message || '网络异常');
            return;
        }
        Toast.success('发送成功');
	}
	
	_logout = async () => {
		const url = '/api/login/logout';
		const [err, res] = await to(createFetch(url));
		if (err) {
			Toast.info(err.message || '网络异常');
			return;
		}
		Toast.success('退出成功');
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
					onPress={this._gotoWeb}
				>Login</Button>
				<Button
					type="warning"
					onPress={this._getCode}
				>getcode</Button>
				<Button
					type="warning"
					onPress={this._logout}
				>Logout</Button>
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
