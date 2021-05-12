//@ts-check
import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Appoiment from './components/Appoiment';
import FormContainer from './components/Form';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [appoiments, setAppoiments] = useState([]);

  //Muestra u oculta el formulario
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  //Ocultar teclado
  const closeKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador de Citas</Text>
        <View>
          <TouchableHighlight
            onPress={() => handleShowForm()}
            style={styles.btnShowForm}>
            <Text style={styles.textShowForm}>
              {showForm ? 'Cancelar' : 'Crear nueva cita'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contain}>
          {showForm ? (
            <>
              <Text style={styles.title}>Crear nueva cita</Text>
              <FormContainer
                appoiments={appoiments}
                setAppoiments={setAppoiments}
                setShowForm={setShowForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {appoiments.length > 0
                  ? 'Administra tus citas'
                  : 'No hay citas'}
              </Text>
              <FlatList
                style={styles.list}
                data={appoiments}
                renderItem={({item}) => (
                  <Appoiment item={item}  setAppoiments={ setAppoiments} />
                )}
                keyExtractor={appoiment => appoiment.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4594d8',
    flex: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contain: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  list: {
    flex: 1,
  },
  btnShowForm: {
    padding: 10,
    backgroundColor: '#134169',
    marginVertical: 10,
  },
  textShowForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
