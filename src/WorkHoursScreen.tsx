import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel } from "victory-native";


interface WorkHoursData {
  day: string;
  hours: number;
}

export default function WorkHoursScreen() {
  // Sample data representing hours worked each day
  const [workHours, setWorkHours] = useState<WorkHoursData[]>([
    { day: 'Monday', hours: 8 },
    { day: 'Tuesday', hours: 7.5 },
    { day: 'Wednesday', hours: 8 },
    { day: 'Thursday', hours: 6 },
    { day: 'Friday', hours: 7 },
    { day: 'Saturday', hours: 5 },
    { day: 'Sunday', hours: 0 },
  ]);

  // Calculate total and average hours
  const totalHours = workHours.reduce((total, day) => total + day.hours, 0);
  const averageHours = (totalHours / workHours.length).toFixed(2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Work Hours Analytics</Text>
      
      <View style={styles.chartContainer}>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryBar
            data={workHours}
            x="day"
            y="hours"
            labels={({ datum }) => `${datum.hours} hrs`}
            style={{ data: { fill: '#4CAF50' } }}
            labelComponent={<VictoryLabel dy={30}/>}
          />
        </VictoryChart>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Total Hours: {totalHours}</Text>
        <Text style={styles.statsText}>Average Hours per Day: {averageHours}</Text>
      </View>

      <FlatList
        data={workHours}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.day}: {item.hours} hours</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  listItemText: {
    fontSize: 16,
  },
});
