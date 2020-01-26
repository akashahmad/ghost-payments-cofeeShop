import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Card
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Logo from './assets/img/logo.png';
import Avatar from './assets/img/avatar.png';

const SecondScreen: () => React$Node = () => {
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="black" barStyle="light-content" />
			<View style={styles.newContainerHero}>
				<Image
					source={Logo}
					style={styles.logoImage}
				/>
				<View style={styles.cardContainer}>
					<TouchableOpacity style={styles.card}>
						<View style={styles.nameContainer}>
							<Text style={styles.nameContainerText}>Danny Minutillo</Text>
						</View>
						<View style={styles.imageContainer}>
							<Image 
								source={Avatar}
								style={styles.avatarImage}
							/>
						</View>
						<View style={styles.coffeeContainer}>
							<Text style={styles.coffeeContainerText}>Grande Black Coffee</Text>
						</View>
					</TouchableOpacity>	
					{/* <TouchableOpacity style={styles.card}>
						<View style={styles.nameContainer}>
							<Text style={styles.nameContainerText}>Danny Minutillo</Text>
						</View>
						<View style={styles.imageContainer}>
							<Image 
								source={Avatar}
								style={styles.avatarImage}
							/>
						</View>
						<View style={styles.coffeeContainer}>
							<Text style={styles.coffeeContainerText}>Grande Black Coffee</Text>
						</View>
					</TouchableOpacity>	 */}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},

	newContainerHero: {
		justifyContent: 'center',
		// alignItems: 'center',
		height: '40%', 
	},

	cardContainer: {
		display: 'flex',
		flexDirection: 'row'
	},

	coffeeContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},

	coffeeContainerText: {
		color: 'black',
		fontSize: 13,
		fontWeight: '500',
		opacity: .75
	},

	nameContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},

	nameContainerText: {
		color: 'black',
		fontSize: 15,
		fontWeight: '700',
	},

	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 12
	},

	avatarImage: {
		height: 75,
		width: 75
	},

	logoImage: {
		marginLeft: '5%',
		height: 40,
		width: 210
	},

	usersContainer: {
		
		// // alignItems: 'center',
		// height: '40%',
	},

	card: {
		backgroundColor: 'white',
		width: 160,
		height: 160,
		marginTop: 35,
		marginLeft: '5%'
	},

	cardContainer: {
		// paddingTop: 70,
		// paddingBottom: 70,
		// paddingRight: 0,
		// paddingLeft: 0
	},

	businessNameText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '700',
		marginLeft: '5%'
	},

	businessNameField: {
		borderWidth: 1,
		borderColor: 'white',
		padding: 12,
		width: '90%',
		borderWidth: 2,
		borderRadius: 6,
		backgroundColor: 'white',
		color: 'black',
		marginTop: 10,
		marginLeft: '5%'
	},

	centerButton: {
		marginTop: 10,
		marginLeft: '5%'
	},

	signButton: {
		backgroundColor: 'black',
		borderColor: '#7997F3',
		borderWidth: 3,
		borderRadius: 6,
		width: '20%',
		marginTop: 15,
		paddingTop: 14,
		paddingBottom: 14,
		marginLeft: '5%'
	},

	logInButtonTextss: {
		color: 'white',
		fontWeight: '800',
		fontSize: 16,
		textAlign: 'center'
	},
});

export default SecondScreen;