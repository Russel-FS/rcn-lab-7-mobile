import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.texto}>Planificador de Gastos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B82F6',
  },
  texto: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    paddingTop: 30,
  },
});
