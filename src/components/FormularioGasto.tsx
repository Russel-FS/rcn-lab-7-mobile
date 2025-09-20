import { Picker } from '@react-native-picker/picker';
import { Gasto } from 'App';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Pressable,
  StyleSheet
} from 'react-native';
import globalStyles from '~/styles';

interface Props {
  setModal: (modal: boolean) => void;
  handleGasto: (gasto: Gasto) => void
  setGasto: (gasto: Gasto) => void
  eliminarGasto?: (id: number | string) => void
  gasto?: Gasto
}

export default function FormularioGasto({ setModal, handleGasto, setGasto, gasto, eliminarGasto }: Props) {

  const [nombre, setNombre] = React.useState('');
  const [cantidad, setCantidad] = React.useState(0);
  const [categoria, setCategoria] = React.useState('');
  const [id, setId] = React.useState<number | string>(0);
  const [fecha, setFecha] = React.useState<number | Date>();

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id as number);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <Pressable onLongPress={() => {
          setGasto({} as Gasto);
          setModal(false);
        }} onPress={() => setModal(false)} style={styles.btnCancelar}>
          <Text style={styles.btnCancelarTexto}>Cancelar</Text>
        </Pressable>

        {gasto?.id && <Pressable onLongPress={() => eliminarGasto && eliminarGasto(id)} style={{ ...styles.btnCancelar, backgroundColor: '#dc2626' }}>
          <Text style={styles.btnCancelarTexto}>Eliminar</Text>
        </Pressable>}
      </View>


      <View style={styles.formulario}>
        <Text style={styles.titulo}>Nuevo Gasto</Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
            placeholder="Nombre del gasto"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del gasto"
            keyboardType="numeric"
            value={cantidad?.toString()}
            onChangeText={(cantidad) => setCantidad(parseInt(cantidad))}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Categoría Gasto</Text>
          <Picker style={styles.input} selectedValue={categoria} onValueChange={setCategoria} >
            <Picker.Item label="--Seleccionar--" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Gastos varios" value="gastos" />
            <Picker.Item label="Ocio" value="ocio" />
          </Picker>
        </View>

        <Pressable onPress={() => handleGasto({ nombre, cantidad, categoria, id, fecha } as Gasto)} style={styles.submitBtn}>
          <Text style={styles.submitBtnTexto}>{gasto ? 'Guardar Cambios' : 'Crear Gasto'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  formulario: {
    ...globalStyles.contendor,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 25,
    color: '#64748B',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: '#3B82F6',
    padding: 10,
    marginTop: 20,
    borderRadius: 12,
  },
  submitBtnTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btnCancelar: {
    backgroundColor: '#db2777',
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
  },
  btnCancelarTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
