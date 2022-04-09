import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { formatReal } from "../helpers/helper";
import Dialog from "react-native-dialog";
import { updateUser } from "../redux/actions/userActions";

export default function RestaurantTickets() {
  const user = useSelector((state) => state.user).user;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.money.toString());
  const mealValue = 4.2;

  const dispatcher = useDispatch();

  const decrementValue = () => {
    if (parseFloat(user.money) - parseFloat(mealValue) >= 0) {
      user.money = user.money - mealValue;
    }
    dispatcher(updateUser(user));
  };

  function handleCashChange() {
    if (value.length > 0) {
      user.money = parseFloat(value.replace(",", "."));
      console.log(user.money);
      dispatcher(updateUser(user));
    }
  }

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginTop: 20,
      marginHorizontal: 20,
      borderColor: theme.colors.outline,
      borderWidth: 1,
    },
    saldoTitleCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    saldoBodyCard: {
      justifyContent: "space-between",
      alignItems: "flex-end",
      borderTopWidth: 1,
      borderColor: theme.colors.outline,
      padding: 10,
    },
    saldo: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 10,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    alterarSaldoButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: 100,
      marginRight: 10,
      marginVertical: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    debitarRefeicaoButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 100,
      padding: 10,
      marginVertical: 10,
    },
    leftIconButton: {
      marginRight: 10,
    },
    titleCentered: {
      color: theme.colors.onSurface,
      textAlign: "center",
      fontSize: 20,
    },
    iconPlaceholder: {
      width: 24,
      height: 24,
    },
    saldoValue: {
      color: theme.colors.primary,
      fontSize: 30,
      textAlign: "center",
      flex: 1,
    },
    debitarBtnText: {
      color: theme.colors.onPrimary,
      fontSize: 14,
      textAlign: "center",
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
    },
    alterarBtnText: {
      color: theme.colors.primary,
      fontSize: 14,
      textAlign: "center",
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
    },
  });
  return (
    <View style={styles.card}>
      <View style={styles.saldoTitleCard}>
        <MaterialIcons
          style={styles.leftIconButton}
          name="account-balance-wallet"
          size={24}
          color={theme.colors.onSurfaceVariant}
        />
        <Text style={styles.titleCentered}>Saldo da Carteirinha</Text>
        <View style={styles.iconPlaceholder}></View>
      </View>
      <View style={styles.saldoBodyCard}>
        <View style={styles.saldo}>
          <Text style={styles.saldoValue}>{formatReal(user.money)}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.alterarSaldoButton}
            onPress={() => setOpen(true)}
          >
            <Text style={styles.alterarBtnText}>Alterar saldo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => decrementValue()}
            style={styles.debitarRefeicaoButton}
          >
            <Text style={styles.debitarBtnText}>Debitar refeição</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Dialog.Container visible={open}>
        <Dialog.Title>Alterar</Dialog.Title>
        <Dialog.Description></Dialog.Description>
        <Dialog.Input
          keyboardType="decimal-pad"
          value={value.toString()}
          onChangeText={setValue}
        ></Dialog.Input>
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setOpen(false);
            setValue(user.money.toString());
          }}
        />
        <Dialog.Button
          label="Ok"
          disabled={
            value.search(/^\$?\d+(((.\d{3})*(\,\d*))|((,\d{3})*(\.\d*)))?$/) < 0
          }
          onPress={() => {
            handleCashChange();
            setOpen(false);
          }}
        />
      </Dialog.Container>
    </View>
  );
}