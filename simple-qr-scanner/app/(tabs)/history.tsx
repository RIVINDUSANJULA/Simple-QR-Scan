import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

interface HistoryItem {
  id: string;
  data: string;
  date: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

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
    <View className="flex-1 bg-zinc-950 p-4">
      {/* Header Area */}
      <View className="flex-row justify-between items-center mb-6 mt-4">
        <Text className="text-3xl font-bold text-white">Scan History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory} className="bg-red-500/20 px-4 py-2 rounded-lg">
            <Text className="text-red-500 font-semibold">Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List Area */}
      {history.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-zinc-500 text-lg">No QR codes scanned yet.</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-zinc-900 p-4 mb-3 rounded-xl border border-zinc-800">
              <Text className="text-green-400 text-xs mb-1 font-bold uppercase tracking-wider">{item.date}</Text>
              <Text className="text-white text-base" selectable={true}>
                {item.data}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}