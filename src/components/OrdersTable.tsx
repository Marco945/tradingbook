import { ScrollView, View, StyleSheet } from "react-native";
import BidsTable from "./BidsTable";
import AsksTable from "./AsksTable";
import PrecisionControls from "./PrecisionControls";

type Props = {};

const OrdersTable: React.FunctionComponent<Props> = () => {
  return (
    <View style={styles.container}>
      <PrecisionControls />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <BidsTable />
        <AsksTable />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  scrollView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 6
  }
});

export default OrdersTable;