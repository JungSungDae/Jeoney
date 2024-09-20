import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert, Dimensions, Text, ScrollView } from 'react-native';
import MenuBar from './MenuBar';
import CrewClubSmaple from "../Data/CrewClubSmaple.json"

const CrewWindow = ({navigation}) => {
  const getMemberCountColor = (current, max) => {
    if (current == max) return "#FF7171";
    if (current / max >= 0.5) return "#FFAD5A";
    return "#9AFF4D";
  };

  return (
    <View style={styles.container}>
      <ScrollView >
        <View style={styles.crewClubsContainer}>
          {CrewClubSmaple.rooms.map((room, index) => (
            <View key={index} style={styles.roomViewContainer}>
              <View style={styles.leftContents}>
                <Text style={styles.titleText}>
                  {room.title}
                </Text>
                <View style={styles.tagsContainer}>
                  {room.tags.map((tag, tagIndex) => (
                    <Text key={tagIndex} style={styles.tagText}>
                      {"#" + tag}
                    </Text>
                  ))}
                </View>	
              </View>
              
              <View style={styles.rightContents}>
                <Text style={[
                  styles.currentMemberCountText,
                  { color: getMemberCountColor(room.currentMemberCount, room.maxMemberCount) }
                ]}>
                  {room.currentMemberCount}
                </Text>
                <Text style={styles.maxMemberCountText}>
                  {"/ " + room.maxMemberCount}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <MenuBar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#F5F5F5',
  },
  crewClubsContainer: {
    flex: 1,
    padding: 0,
    backgroundColor: '#F0F0F0',
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
    marginBottom: 70,
    marginTop: "10%"
  },
  roomViewContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    padding: "5%",
    elevation: 5
  },
  leftContents: {
		marginTop : "1.5%",
    flex: 4
  },
  rightContents: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  titleText: {
    fontSize: 27,
    fontWeight: "bold"
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  currentMemberCountText: {
    fontSize: 100,
    fontWeight: "bold",
    height: 120,
  },
  maxMemberCountText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default CrewWindow;