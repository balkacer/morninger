import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, Platform } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Database from "database";
import { MovementTypes, ScreenNames } from "enums";
import Moment from "moment";
import { MovementModel } from "models";
import Theme from "theme";
import { useColorScheme } from "react-native-appearance";
import { Title } from "components";
import GlobalStyle from "styles";

export default function AnalyticsScreen() {
  const [incomings, setIncomings] = useState<{
    dates: string[];
    total: number[];
  }>({ dates: [], total: [] });
  const [expenses, setExpenses] = useState<{
    dates: string[];
    total: number[];
  }>({ dates: [], total: [] });
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncoming, setTotalIncoming] = useState<number>(0);

  const colorScheme = useColorScheme();
  const theme = Theme(colorScheme);
  const styles = GlobalStyle(colorScheme, Platform.OS);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Database.select<MovementModel>("movements", []).then(({ data }) => {
      let _totalIncoming = 0;
      let _totalExpenses = 0;
      const totalIncoming: { dates: string[]; total: number[] } = {
        dates: [],
        total: [],
      };
      const totalExpenses: { dates: string[]; total: number[] } = {
        dates: [],
        total: [],
      };

      data?.forEach((movement) => {
        const date = Moment(movement.date + "").format("MMMM D");

        if (movement.type === MovementTypes.INPUT) {
          _totalIncoming += movement.amount;

          if (!totalIncoming.dates.includes(date)) {
            totalIncoming.dates.push(date);
            totalIncoming.total.push(movement.amount);
          } else {
            const index = totalIncoming.dates.findIndex((c) => c === date);
            totalIncoming.total[index] += movement.amount;
          }
        } else {
          _totalExpenses += movement.amount;

          if (!totalExpenses.dates.includes(date)) {
            totalExpenses.dates.push(date);
            totalExpenses.total.push(movement.amount);
          } else {
            const index = totalExpenses.dates.findIndex((c) => c === date);
            totalExpenses.total[index] += movement.amount;
          }
        }
      });
      setTotalIncoming(_totalIncoming);
      setTotalExpenses(_totalExpenses);
      setIncomings(totalIncoming);
      setExpenses(totalExpenses);
    });
  };
  return (
    <>
      <View style={styles.toolbarRow}>
      <Text style={styles.toolbarTitle}>{ScreenNames.ANALYTICS}</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Title color={theme.colors.title} text="Income Chart" />
        </View>
        <LineChart
          data={{
            labels: incomings.dates,
            datasets: [
              {
                data: [
                  totalIncoming,
                  totalIncoming / 3,
                  totalIncoming / 2,
                  totalIncoming / 4,
                  0,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: theme.colors.movementInput,
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 15,
              padding: 20,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "0",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 15,
            padding: 20,
          }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <Title color={theme.colors.title} text="Expenses Chart" />
        </View>
        <LineChart
          data={{
            labels: expenses.dates,
            datasets: [
              {
                data: [
                  totalExpenses,
                  totalExpenses / 3,
                  totalExpenses / 2,
                  totalExpenses / 4,
                  0,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: theme.colors.movementOutput,
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 15,
              padding: 20,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "0",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 15,
            padding: 20,
          }}
        />
      </View>
    </>
  );
}
