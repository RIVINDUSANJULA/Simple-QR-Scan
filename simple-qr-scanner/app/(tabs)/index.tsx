import React, { useState } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <View>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>
          We need camera permissions to scan QR codes.
        </Text>
        <TouchableOpacity 
          onPress={requestPermission}
        >
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    Alert.alert(
      "QR Code Scanned!", 
      data, 
      [{ text: "Scan Again", onPress: () => setScanned(false) }]
    );
  };

  return (
    <View>
      <CameraView
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      >
        <View>
          {scanned && (
            <TouchableOpacity 
              onPress={() => setScanned(false)}
            >
              <Text>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}

          <Link href="/modal">
            <Text>App Info</Text>
          </Link>

        </View>
      </CameraView>
    </View>
  );
}