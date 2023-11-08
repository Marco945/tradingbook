import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WebSocketHandler from './src/WebSocketHandler';
import { Provider } from 'react-redux';
import { store } from './src/store';
import OrdersTable from './src/components/OrdersTable';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <OrdersTable />
        <WebSocketHandler />
        <StatusBar style="auto" />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
