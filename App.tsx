import { StatusBar } from 'expo-status-bar';

import './global.css';
import { Container } from '~/components/Container';
import { Alert, Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import Header from '~/components/Header';
import NuevoPresupuesto from '~/components/NuevoPresupuesto';
import { useState } from 'react';
import ControlPresupuesto from '~/components/ControlPresupuesto';
import FormularioGasto from '~/components/FormularioGasto';

export interface Gasto {
  id: number;
  cantidad: number;
}

export default function App() {
  const [validarPresupuesto, setValidarPresupuesto] = useState<boolean>(false);
  const [presupuesto, setPresupuesto] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const [gastos, setGastos] = useState<Gasto[]>([
    {
      id: 1,
      cantidad: 30,
    },
    {
      id: 2,
      cantidad: 40,
    },
    {
      id: 3,
      cantidad: 50,
    },
  ]);
  const handlePresupuesto = (presupuesto: number) => {
    console.log('Presupuesto:', presupuesto);
    if (Number(presupuesto) > 0) {
      setValidarPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto debe ser mayor a 0 ');
    }
  };

  return (
    <>
      <Container>
        <View style={styles.header}>
          <Header />
          {validarPresupuesto ? (
            <ControlPresupuesto gastos={gastos} presupuesto={presupuesto} />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handlePresupuesto={handlePresupuesto}
            />
          )}
        </View>
        {modal && (
          <Modal visible={modal} animationType="slide">
            <FormularioGasto />
          </Modal>
        )}
        {validarPresupuesto && (
          <Pressable onPress={() => setModal(true)}>
            <Image style={styles.imagen} source={require('./src/img/nuevo-gasto.png')} />
          </Pressable>
        )}
      </Container>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B82F6',
  },
  imagen: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
