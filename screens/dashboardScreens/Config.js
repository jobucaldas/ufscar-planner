import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Menu, Switch, TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from '../../helpers/helper';
import { updateSemester } from '../../redux/actions/semesterActions';
import { updateUser } from '../../redux/actions/userActions';
import { PreferencesContext } from '../../theme/PreferencesContext';

export default function Config() {
  const user = useSelector(state => state.user).user

  const colors = useTheme().colors;
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface1,
      padding: 20,

    },
    icon: {
      marginRight: 10
    },
    text: {
      color: colors.onSurfaceVariant,

    },
    textInput: {
      width: '100%',
      backgroundColor: colors.surface5,
      color: colors.onSurfaceVariant,
      height: 40,
    },
    datePickerInput: {
      width: '100%',
      backgroundColor: colors.surface5,
      color: colors.onSurfaceVariant,
      padding: 10,
      borderRadius: 5,
    },
    linha: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    opcao: {
      marginVertical: 10,
      marginTop: 20
    },
    switchContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    }

  });
  const [money, setMoney] = useState(user.meal.toString());
  const handleMoneyChange = (value) => {
    try {
      const valor = parseFloat(value.substring(3))
      if (!isNaN(valor)) {
        setMoney(value.substring(3))
        dispatch(updateUser({ ...user, meal: valor }))
      } else {
        setMoney('0')
        dispatch(updateUser({ ...user, meal: 0 }))
      }
    } catch (e) {
    }
  }

  const handleNameChange = (value) => {
    dispatch(updateUser({ ...user, name: value }))
  }
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);
  const setCampus = (name) => {
    dispatch(updateUser({ ...user, campus: name }))
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface1 }}>
      <ScrollView>
        <View style={{ ...styles.container, paddingTop: 10 }}>
          <View style={{ ...styles.opcao, marginTop: 10, marginBottom: 0 }}>
            <View style={styles.linha}>
              <View style={styles.linha}>
                <MaterialIcons style={styles.icon} name="nightlight-round" size={24} color={colors.onSurfaceVariant} />
                <Text style={styles.text}>Modo escuro </Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch color={colors.primary} value={isThemeDark} onValueChange={toggleTheme}></Switch>

              </View>
            </View>
          </View>

          <View style={styles.opcao}>
            <View style={styles.linha}>
              <MaterialIcons style={styles.icon} name="monetization-on" size={24} color={colors.onSurfaceVariant} />
              <Text style={styles.text}>Valor padrão da refeição</Text>
            </View>
          </View>
          <TextInput style={styles.textInput} value={"R$ " + money} onChangeText={handleMoneyChange}></TextInput>

          <View style={styles.opcao}>
            <View style={styles.linha}>
              <MaterialIcons style={styles.icon} name="school" size={24} color={colors.onSurfaceVariant} />
              <Text style={styles.text}>Campus da UFSCar</Text>
            </View>
          </View>
          <Menu
            visible={showMenu}
            onDismiss={closeMenu}
            anchor={<TouchableOpacity onPress={openMenu}><Text style={styles.datePickerInput} >{user.campus}</Text></TouchableOpacity>}>
            <Menu.Item onPress={() => { setCampus("Araras"); setShowMenu(false) }} title="Araras" />
            <Menu.Item onPress={() => { setCampus("Lagoa do Sino"); setShowMenu(false) }} title="Lagoa do Sino" />
            <Menu.Item onPress={() => { setCampus("São Carlos"); setShowMenu(false) }} title="São Carlos" />
            <Menu.Item onPress={() => { setCampus("Sorocaba"); setShowMenu(false) }} title="Sorocaba" />

          </Menu>

          <ConfigSemester />
          <View style={styles.opcao}>
            <View style={styles.linha}>
              <MaterialIcons style={styles.icon} name="account-circle" size={24} color={colors.onSurfaceVariant} />
              <Text style={styles.text}>Como você gostaria de ser chamado?</Text>
            </View>
          </View>
          <TextInput style={styles.textInput} value={user.name} onChangeText={handleNameChange}></TextInput>

        </View>
      </ScrollView></View>)
}


export function ConfigSemester() {
  const colors = useTheme().colors;
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    icon: {
      marginRight: 10
    },
    text: {
      color: colors.onSurfaceVariant,

    },
    datePickerInput: {
      width: '100%',
      backgroundColor: colors.surface5,
      padding: 10,
      borderRadius: 5,
    },
    linha: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    opcao: {
      marginVertical: 20
    },

  });
  const semester = useSelector((state) => state.semester).semester;

  const setBeginTime = (ndate) => {
    dispatch(updateSemester({ ...semester, init: ndate.toString() }));

  }
  const setEndTime = (ndate) => {
    dispatch(updateSemester({ ...semester, end: ndate.toString() }));
  }

  const [showBeginPicker, setShowBeginPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  return (<>
    <View style={{ ...styles.opcao, marginBottom: 10 }}>
      <View style={styles.linha}>
        <MaterialIcons style={styles.icon} name="calendar-today" size={24} color={colors.onSurfaceVariant} />
        <Text style={styles.text}>Início do semestre</Text>
      </View>
    </View>
    <DateTimePickerModal
      style={{ width: "100%" }}
      textColor={colors.onSurfaceVariant}
      isVisible={showEndPicker}
      mode={"date"}
      value={new Date(semester.end)}
      date={new Date(semester.end)}
      onCancel={() => {
        setShowEndPicker(false);
      }}
      onHide={() => {
        setShowEndPicker(false);
      }}
      onConfirm={(ndate) => {
        setShowEndPicker(false);
        setEndTime(ndate);
      }}
      cancelTextIOS={"Cancelar"}
      confirmTextIOS={"Confirmar"}
      headerTextIOS={"Escolha as datas"}
    />
    <DateTimePickerModal
      style={{ width: "100%" }}
      textColor={"#000"}
      isVisible={showBeginPicker}
      value={new Date(semester.init)}
      date={new Date(semester.init)}
      mode={"date"}
      onCancel={() => {
        setShowBeginPicker(false);
      }}
      onHide={() => {
        setShowBeginPicker(false);
      }}
      onConfirm={(ndate) => {
        setShowBeginPicker(false);
        setBeginTime(ndate);
      }}
      cancelTextIOS={"Cancelar"}
      confirmTextIOS={"Confirmar"}
      headerTextIOS={"Escolha as datas"}
    />
    <TouchableOpacity style={styles.datePickerInput} onPress={() => setShowBeginPicker(true)}>
      <Text style={styles.text}>{formatDate(new Date(semester.init))}</Text>
    </TouchableOpacity>

    <View style={{ ...styles.opcao, marginBottom: 10 }}>
      <View style={styles.linha}>
        <MaterialIcons style={styles.icon} name="calendar-today" size={24} color={colors.onSurfaceVariant} />
        <Text style={styles.text}>Término do semestre</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.datePickerInput} onPress={() => setShowEndPicker(true)}>
      <Text style={styles.text}>{formatDate(new Date(semester.end))}</Text>
    </TouchableOpacity></>)

}