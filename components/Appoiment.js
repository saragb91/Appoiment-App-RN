//@ts-check
import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const Appoiment = ({item,  setAppoiments}) => {

  const deleteAppoiment = useCallback((id) => {
    setAppoiments(actualAppoiments => {
      return actualAppoiments.filter(appoiment => appoiment.id !== id);
    });
  },[setAppoiments])

  return (
    <View style={styles.appoiment}>
      <View>
        <Text style={styles.label}>Tecnología:</Text>
        <Text style={styles.text}>{item.technology}</Text>
      </View>
      <View>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View>
        <Text style={styles.label}>Evento:</Text>
        <Text style={styles.text}>{item.event}</Text>
      </View>
      <View style={styles.btnView}>
        <TouchableHighlight
          onPress={() => deleteAppoiment(item.id)}
          style={styles.deleteButton}>
          <Text style={styles.deleteText}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appoiment: {
    backgroundColor: '#fffbc6',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
  deleteButton: {
    width:'50%',
    padding: 10,
    backgroundColor: '#f75f5f',
    marginVertical: 10,
  },
  deleteText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnView:{
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default Appoiment;
