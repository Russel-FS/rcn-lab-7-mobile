import { Gasto } from 'App';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import globalStyles from '~/styles';

interface Props {
  presupuesto: number;
  gastos: Gasto[];
}

export default function ControlPresupuesto({ presupuesto, gastos }: Props) {
  const [disponible, setDisponible] = React.useState(0);
  const [gastado, setGastado] = React.useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;
    setDisponible(totalDisponible);
    setGastado(totalGastado);
    console.log(totalGastado);
  }, []);

  return (
    <View style={styles.contendor}>
      <View style={styles.centrarGrafica}>
        <Image style={styles.imagen} source={require('../img/grafico.jpg')} />
      </View>
      <View style={styles.contenedorTexto}>
        <Text style={styles.valor}>Presupuesto: {presupuesto}</Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {disponible}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {gastado}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contendor: {
    ...globalStyles.contendor,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  imagen: {
    width: 200,
    height: 200,
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
});
