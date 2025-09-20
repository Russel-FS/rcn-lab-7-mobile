import { Gasto } from 'App';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { formatearFecha } from '~/helpers';
import globalStyles from '~/styles';

interface Props {
    gasto: Gasto;
    setGasto: (gasto: Gasto) => void
    setModal: (modal: boolean) => void
}

const diccionarioIconos = {
    ahorro: require('../img/icono_ahorro.png'),
    comida: require('../img/icono_comida.png'),
    casa: require('../img/icono_casa.png'),
    gastos: require('../img/icono_gastos.png'),
    ocio: require('../img/icono_ocio.png'),
    salud: require('../img/icono_salud.png'),
};

export default function Gastos({ gasto, setGasto, setModal }: Props) {


    const handleLongPress = () => {
        setModal(true);
        setGasto(gasto);
    };

    return (
        <Pressable onLongPress={handleLongPress}>
            <View style={styles.contenedor}>
                <View style={styles.contenido}>
                    <View style={styles.contenedorImagen}>
                        <Image
                            source={diccionarioIconos[gasto.categoria as keyof typeof diccionarioIconos]}
                            style={styles.imagen}
                        />
                    </View>
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.categoria}>{gasto.categoria}</Text>
                        <Text style={styles.nombre}>{gasto.nombre}</Text>
                        <Text style={styles.cantidad}>{gasto.cantidad}</Text>
                        <Text style={styles.fecha}>{formatearFecha(gasto.fecha)}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contendor,
    },
    contenido: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    contenedorImagen: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagen: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
    contenedorTexto: {
        flex: 1,
    },
    categoria: {
        color: '#94a3bb',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    nombre: {
        fontSize: 22,
        color: '#64748B',
    },
    cantidad: {
        fontSize: 22,
        fontWeight: '700',
    },
    fecha: {
        marginTop: 10,
        color: '#64748B',
    },
});
