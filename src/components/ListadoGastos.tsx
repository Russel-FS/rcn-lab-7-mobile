import { Gasto } from 'App';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gastos from './Gasto';


interface Props {
    gastos: Gasto[]
    setGasto: (gasto: Gasto) => void
    setModal: (modal: boolean) => void
}

export default function ListadoGastos({ gastos, setModal , setGasto}: Props) {
    return (
        <View style={styles.contendor}>
            <Text style={styles.titulo}>Listado Gastos</Text>
            {gastos.length > 0 ? (
                gastos.map(gasto => (
                    <Gastos
                        setGasto={setGasto}
                        setModal={setModal}
                        key={gasto.id}
                        gasto={gasto}
                    />
                ))
            ) : (
                <Text style={styles.noGasto}>No hay gastos aún</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    contendor: {
        marginTop: 20,
    },
    titulo: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
    },
    noGasto: {
        marginTop: 10,
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    }
});
