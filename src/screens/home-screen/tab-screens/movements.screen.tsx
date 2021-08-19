import React, { useEffect, useState } from "react";
import { Card, Incoming } from "components";
import { Picker } from "@react-native-picker/picker";
import { USD } from "@dinero.js/currencies";
import { dinero, add } from "dinero.js";
import Theme from "theme";
import {
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  TextInput,
  Keyboard,
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import GlobalStyle from "styles";
import {
  IconTypes,
  Mocks,
  MovementCategories,
  MovementTypes,
  ScreenNames,
} from "enums";
import { MovementModel } from "models";
import Database from "database";
import { Icon } from "react-native-elements/dist/icons/Icon";

function MovementsScreen() {
  let colorScheme = useColorScheme();
  const styles = GlobalStyle(colorScheme, Platform.OS);
  const theme = Theme(colorScheme);

  const [movements, setMovements] = useState<MovementModel[] | null>([]);
  const [categories, setCategories] = useState<any[] | null>([]);
  const [totalBalance, setTotalBalace] = useState<number>(0);
  const [totalIncoming, setTotalIncoming] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newMovement, setNewMovement] = useState<MovementModel>(
    new MovementModel({
      amount: 0,
      category: MovementCategories.UNDEFINED,
      type: 0,
      date: "",
    })
  );

  useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    getData();
    getCategories();
  };
  const getCategories = async () => {
    const result = await Database.select<any>("movement_categories", []).then(
      (res) => {
        const cat: any = [];
        res.data?.forEach((dt) => {
          cat.push(dt);
        });
        setCategories(cat);
      }
    );
  };

  const categiriesList = categories?.map((cat) => (
    <Picker.Item
      style={{ fontSize: 18 }}
      key={cat.id}
      label={cat.name}
      value={cat.id}
    />
  ));

  const getData = () => {
    Database.select<MovementModel>("movements", []).then(({ data }) => {
      setMovements(data);
      let total = 0;
      let _totalIncoming = 0;
      let _totalExpenses = 0;
      data?.forEach((movement) => {
        total +=
          movement.type === MovementTypes.INPUT
            ? movement.amount
            : -movement.amount;
        movement.type === MovementTypes.INPUT
          ? (_totalIncoming += movement.amount)
          : (_totalExpenses += movement.amount);
      });
      setTotalBalace(total);
      setTotalIncoming(_totalIncoming);
      setTotalExpenses(_totalExpenses);
    });
  };

  const numberFormated = (money: string) => {
    return money.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const insertNewMovement = () => {
    const withoutDate = newMovement;
    delete withoutDate.date;
    Database.insert<MovementModel>(
      "movements",
      Object.keys(withoutDate),
      Object.values(withoutDate)
    );

    getData();
    toggleModal();
    setNewMovement(
      new MovementModel({
        amount: 0,
        category: MovementCategories.UNDEFINED,
        type: 0,
        date: "",
      })
    );
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,.35)",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background,
              width: "90%",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: theme.colors.text,
                }}
              >
                Add Movement
              </Text>
              <TouchableOpacity onPress={() => toggleModal()}>
                <Icon
                  type="ionicon"
                  name="md-close"
                  size={20}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 18,
                  marginBottom: 10,
                  marginLeft: 5,
                }}
              >
                Amount
              </Text>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <TextInput
                  allowFontScaling={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(txt) =>
                    setNewMovement({
                      ...newMovement,
                      amount: txt as any as number,
                    })
                  }
                  style={{
                    width: "100%",
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    borderRadius: 15,
                    fontSize: 18,
                    marginBottom: 20,
                    backgroundColor: theme.colors.card,
                  }}
                  keyboardType="numeric"
                  placeholderTextColor={theme.colors.placeholder}
                  placeholder="200.00"
                ></TextInput>
                <TouchableOpacity
                  style={{
                    width: 50,
                    borderRadius: 15,
                    paddingVertical: 15,
                    backgroundColor:
                      newMovement.type === 1
                        ? theme.colors.movementInput
                        : theme.colors.movementOutput,
                    right: 0,
                    position: "absolute",
                  }}
                  onPress={() =>
                    setNewMovement({
                      ...newMovement,
                      type: newMovement.type === 1 ? 2 : 1,
                    })
                  }
                >
                  <Icon
                    size={18}
                    color={theme.colors.background}
                    name={newMovement.type === 1 ? "arrow-up" : "arrow-down"}
                    type={IconTypes.IONICON}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 18,
                  marginBottom: 10,
                  marginLeft: 5,
                }}
              >
                Category
              </Text>
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: Platform.OS === "android" ? 15 : 0,
                  paddingVertical: Platform.OS === "android" ? 15 : 0,
                  padding: Platform.OS === "android" ? 20 : 0,
                  borderRadius: 15,
                  marginBottom: 20,
                  backgroundColor: theme.colors.card,
                }}
              >
                <Picker
                  style={{ margin: 0 }}
                  selectedValue={newMovement.category}
                  onValueChange={(itemValue) => {
                    Keyboard.dismiss();
                    setNewMovement({
                      ...newMovement,
                      category: itemValue as MovementCategories,
                    });
                  }}
                >
                  {categiriesList}
                </Picker>
              </View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  backgroundColor: theme.colors.primary,
                }}
                onPress={() => insertNewMovement()}
              >
                <Text style={{ color: theme.colors.background, fontSize: 18 }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.toolbarRow}>
        <View
          style={{
            alignItems: "center",
            padding: 0,
            margin: 0,
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Text style={styles.toolbarTitle}>{ScreenNames.MOVEMENTS}</Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: theme.colors.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              padding: 5,
            }}
            onPress={() => toggleModal()}
          >
            <Icon
              type="ionicon"
              name="md-add"
              color={theme.colors.background}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: theme.colors.secondaryText }}>
          Your total balance
        </Text>
        <Text
          style={{
            fontSize: 36,
            color:
              totalBalance > 0
                ? theme.colors.movementInput
                : theme.colors.movementOutput,
            fontWeight: "bold",
          }}
        >
          {numberFormated(totalBalance.toFixed(2))[0] == "-"
            ? "-$" + numberFormated(totalBalance.toFixed(2)).substr(1)
            : "$" + numberFormated(totalBalance.toFixed(2))}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 0,
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingVertical: 20,
          backgroundColor: theme.colors.card,
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius: 15,
        }}
      >
        <Incoming
          isInput={true}
          title="Total Incoming"
          value={`$${numberFormated(totalIncoming.toFixed(2))}`}
        ></Incoming>
        <Incoming
          isInput={false}
          title="Total Expenses"
          value={`$${numberFormated(totalExpenses.toFixed(2))}`}
        ></Incoming>
      </View>
      {/* <View
        style={{
          backgroundColor: theme.colors.placeholder,
          height: 1,
          width: "80%",
        }}
      ></View> */}
      <FlatList
        style={{
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginTop: 0,
        }}
        data={movements}
        renderItem={({ item }) => {
          const { amount, type, category, date } = item;
          return (
            <TouchableOpacity onPress={() => null}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: 'center',
                  marginVertical: 5,
                  padding: 15,
                  backgroundColor: theme.colors.card,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                  <Icon
                    type={IconTypes.IONICON}
                    name={
                      categories?.find((c) => c.id == category)?.icon as string
                    }
                    color={theme.colors.text}
                    style={{ marginRight: 10, alignSelf: 'center' }}
                  />
                  <View>
                  <Text
                    style={{
                      color: theme.colors.title,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {categories?.find((c) => c.id == category)?.name as string}
                  </Text>
                  <Text>{new Date(date).toLocaleDateString()}</Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontWeight: "bold",
                    color:
                      type === MovementTypes.INPUT
                        ? theme.colors.movementInput
                        : theme.colors.movementOutput,
                    fontSize: 20,
                  }}
                >
                  {type === MovementTypes.INPUT ? "+" : "-"}$
                  {numberFormated(amount.toFixed(2))}
                </Text>
              </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id + ""}
      />
    </>
  );
}
export default MovementsScreen;
