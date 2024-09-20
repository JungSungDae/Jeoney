import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert, Dimensions, Text, ScrollView } from 'react-native';
import MenuBar from './MenuBar';
import CrewClubSmaple from "../Data/CrewClubSmaple.json"

const CrewWindow = () => {

return (
<View style={styles.container}>
	<ScrollView >
		<View style={styles.crewClubsContainer}>
			{CrewClubSmaple.rooms.map((room, index) => {
				return(
					<View key={index} style={styles.roomViewContainer}>
						<Text>
							{room.title}
						</Text>
					{room.tags.map((tag, index) => {
						return(
							<Text key={index}>
								{"#" + tag}
							</Text>
							)
						})}

						<Text>
							{room.currentMemberCount}
						</Text>
						<Text>
							{room.maxMemberCount}
						</Text>
					</View>
				)
			})}
		</View>
	</ScrollView>
	<MenuBar/>
</View>
);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 0,
		backgroundColor: '#F5F5F5',
	},
	crewClubsContainer : {
		flex: 1,
		padding: 0,
		backgroundColor: '#F0F0F0',
		justifyContent : "center",
		alignItems : "center",
		padding : 20,
		gap : 20,
		marginBottom : 70,
		marginTop : "10%"
	},
	roomViewContainer : {
		borderRadius : 10,
		backgroundColor : "white",
		width : "100%",
		padding : "5%"
	}
});

export default CrewWindow;
