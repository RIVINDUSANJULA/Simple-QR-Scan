import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

// Define what our history data looks like
interface HistoryItem {
  id: string;
  data: string;
  date: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // useFocusEffect runs every time the user navigates to this specific tab
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('qr-history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };

  const clearHistory = async () => {
    Alert.alert("Clear History", "Are you sure you want to delete all scanned codes?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem('qr-history');
          setHistory([]);
        } 
      }
    ]);
  };

  return (
    <View>
      <View >
        <Text>Scan History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Text>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View>
          <Text>No QR codes scanned yet.</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <Text>{item.date}</Text>
              <Text selectable={true}>
                {item.data}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}