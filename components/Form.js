//@ts-check
import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Form = ({appoiments, setAppoiments, setShowForm}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [newAppoiment, setNewAppoiment] = useState({
    technology: '',
    name: '',
    phone: '',
    event: '',
    date: '',
    time: '',
  });

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleChange = useCallback(
    (name, value) => setNewAppoiment({...newAppoiment, [name]: value}),
    [newAppoiment],
  );

  const handleConfirmDate = useCallback(
    (name, date) => {
      const options = {year: 'numeric', month: 'long', day: '2-digit'};
      setNewAppoiment({
        ...newAppoiment,
        [name]: date.toLocaleDateString('es-Es', options),
      });
      hideDatePicker();
    },
    [newAppoiment],
  );

  const showTimePicker = useCallback(() => {
    setTimePickerVisibility(true);
  }, []);

  const hideTimePicker = useCallback(() => {
    setTimePickerVisibility(false);
  }, []);

  const handleConfirmTime = useCallback(
    (name, time) => {
      const options = {hour: 'numeric', minute: '2-digit', hour12: false};
      setNewAppoiment({
        ...newAppoiment,
        [name]: time.toLocaleString('en-US', options),
      })
      hideTimePicker()
    },
    [newAppoiment],
  );

  //Crear nueva cita
  const createNewAppoiment = useCallback(() => {
    const emptyString = data => data.trim() === '';
    if (Object.values(newAppoiment).some(emptyString)) {
      showAlert();
      return;
    }
    const {technology, name, phone, event, date, time} = newAppoiment;
    const appoiment = {technology, name, phone, date, time, event};
    appoiment.id = shortid.generate();
    const newAppoiments = [...appoiments, appoiment];
    setAppoiments(newAppoiments);

    setShowForm(false);
  }, [appoiments, newAppoiment, setAppoiments, setShowForm]);

  //Muestra la alerta si falla la validacion
  const showAlert = useCallback(() => {
    Alert.alert(
      'Error', //título
      'Todos los campos son obligatorios', //mensaje
      [{text: 'OK'}], //Array de botones
    );
  }, []);
  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Tecnología:</Text>
          <TextInput
            style={styles.input}
            onChangeText={tech => handleChange('technology', tech)}
          />
        </View>
        <View>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            onChangeText={name => handleChange('name', name)}
          />
        </View>
        <View>
          <Text style={styles.label}>Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={phone => handleChange('phone', phone)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button
            title="Seleccionar fecha"
            color={'#3ccaa9'}
            onPress={showDatePicker}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={date => handleConfirmDate('date', date)}
            onCancel={hideDatePicker}
          />
          <Text>{newAppoiment.date}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button
            title="Seleccionar hora"
            color={'#3ccaa9'}
            onPress={showTimePicker}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={time => handleConfirmTime('time', time)}
            onCancel={hideTimePicker}
            is24Hour
          />
          <Text>{newAppoiment.time}</Text>
        </View>
        <View>
          <Text style={styles.label}>Evento:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={event => handleChange('event', event)}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => createNewAppoiment()}
            style={styles.submitButton}>
            <Text style={styles.submitText}>Crear nueva cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#e9f6f7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#293bbf',
    marginVertical: 10,
  },
  submitText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Form;
