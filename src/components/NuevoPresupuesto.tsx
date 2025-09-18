import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

interface Props {
  handlePresupuesto: (presupuesto: number) => void;
  presupuesto: number;
  setPresupuesto: (presupuesto: number) => void;
}

export default function NuevoPresupuesto({
  handlePresupuesto,
  presupuesto,
  setPresupuesto,
}: Props) {
  const handleTextChange = (text: string) => {
    if (text === '') {
      setPresupuesto(0);
    } else {
      setPresupuesto(parseInt(text));
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Nuevo Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agregar tu presupuesto"
        style={styles.input}
        value={presupuesto?.toString()}
        onChangeText={handleTextChange}
      />
      <Pressable onPress={() => handlePresupuesto(presupuesto)} style={styles.boton}>
        <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
    transform: [{ translateY: 50 }],
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 12,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
