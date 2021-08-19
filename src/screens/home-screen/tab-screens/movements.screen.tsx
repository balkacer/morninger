import React, { useState } from "react";
import { Card } from "components";
import GenerateMocks from "mocks";
import Theme from "theme";
import {
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  View,
  StyleSheet
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import GlobalStyle from "styles";
import { Mocks, MovementTypes, ScreenNames } from "enums";
import { MovementModel } from "models";
import Database from "database";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { BlurView } from "expo-blur";

function MovementsScreen() {
  let colorScheme = useColorScheme();
  const styles = GlobalStyle(colorScheme, Platform.OS);
  const theme = Theme(colorScheme);

  const [movements, setMovements] = useState<MovementModel[] | null>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const insertNewData = () => {
    GenerateMocks<MovementModel>(Mocks.MOVEMENT, 3).forEach((mv) => {
      Database.insert<MovementModel>(
        "movements",
        Object.keys(mv),
        Object.values(mv)
      );

      getData();
    });
  };

  const getData = () => {
    Database.select<MovementModel>("movements", []).then(({ data }) => {
      setMovements(data);
    });
  };

  const getCategoryName = async (id: number) => {
    const result = await Database.select<any>(
      "movement_categories",
      ["name"],
      `id = ${id}`
    );
    if (result.code === null) {
      return result.data ? result.data[0] : "toke";
    }
  };

  return (
    <>
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
              width: 80,
              backgroundColor: theme.colors.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              borderRadius: 10,
              borderBottomEndRadius: 0,
              borderTopEndRadius: 0,
              marginRight: -20,
              padding: 5,
              paddingLeft: 8,
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Icon
              type="ionicon"
              size={30}
              name="add"
              color={theme.colors.background}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 5 }}
        data={movements}
        renderItem={({ item }) => {
          const { amount, type, category, date } = item;
          return (
            <TouchableOpacity onPress={() => null}>
            <Card
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                marginVertical: 5,
                padding: 20,
                backgroundColor: theme.colors.card
              }}
            >
            <Text
              style={{
                color: theme.colors.title,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {"Food"}
            </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: theme.colors.placeholder,
                  fontSize: 20,
                }}
              >
                {type === MovementTypes.INPUT ? "+" : "-"}${amount.toFixed(2)}
                USD
              </Text>
              {/* <Text>{date}</Text> */}
            </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id + ""}
      />
    </>
  );
}

const styles2 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MovementsScreen;
