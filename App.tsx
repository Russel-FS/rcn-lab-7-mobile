import { StatusBar } from 'expo-status-bar';

import './global.css';
import { Container } from '~/components/Container';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '~/components/Header';
import NuevoPresupuesto from '~/components/NuevoPresupuesto';
import { useState } from 'react';
import ControlPresupuesto from '~/components/ControlPresupuesto';
import FormularioGasto from '~/components/FormularioGasto';
import { generarId } from '~/helpers';
import ListadoGastos from '~/components/ListadoGastos';

export interface Gasto {
  id?: number | string;
  cantidad: number;
  nombre: string;
  categoria: string;
  fecha: number | Date;
}

export default function App() {
  const [validarPresupuesto, setValidarPresupuesto] = useState<boolean>(false);
  const [presupuesto, setPresupuesto] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [gasto, setGasto] = useState<Gasto>();
  const handlePresupuesto = (presupuesto: number) => {
    console.log('Presupuesto:', presupuesto);
    if (Number(presupuesto) > 0) {
      setValidarPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto debe ser mayor a 0 ');
    }
  };

  const handleModal = () => {
    setGasto({} as Gasto);
    setModal(!modal);
  };

  const handleGasto = (gasto: Gasto) => {

    if ([gasto.cantidad, gasto.categoria, gasto.nombre].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [{ text: 'OK' }]);
      return

    }
    if (gasto.id) {
      setGastos(gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState));
      return
    } else { 
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setModal(false);
  };

  const eliminarGasto = (id: number | string) => {
    Alert.alert(
      "¿Deseas eliminar el gasto?",
      "Un gasto eliminado no se puede recuperar",
      [
        {
          text: "Si, Eliminar",
          onPress: () => {
            setGastos(gastos.filter(gasto => gasto.id !== id));
            setModal(false);
            setGasto({} as Gasto);
          },
        },
        {
          text: "No, Cancelar",
          style: "cancel",
        },
      ]
    ) 
  };

  return (
    <>
      <Container>
        <ScrollView>
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

          {validarPresupuesto && (
            <ListadoGastos setGasto={setGasto} setModal={handleModal} gastos={gastos} ></ListadoGastos>
          )}
          {modal && (
            <Modal visible={modal} animationType="slide">
              <FormularioGasto eliminarGasto={eliminarGasto} handleGasto={handleGasto} gasto={gasto} setGasto={setGasto} setModal={setModal} />
            </Modal>
          )}

        </ScrollView>
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
    bottom: 20,
    right: 10,
  },
});
