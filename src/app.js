import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null, containerStyle: null };

	componentWillMount() {
		firebase.initializeApp({
			apiKey: '',
			authDomain: '',
			databaseURL: '',
			storageBucket: '',
			messagingSenderId: ''
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true: 
				return (
					<View style={{ flexDirection: 'row' }}>
						<Button onPress={() => firebase.auth().signOut()} >
							Log Out
						</Button>
					</View>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner size="large" />;
		}
	}

	render() {
		return (
			<View style={this.containerStyle}>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
