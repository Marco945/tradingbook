import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { decreaseDecimals, increaseDecimals, selectPrecisionKey } from "../store/ordersSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const PrecisionControls: React.FunctionComponent<Props> = ({}) => {
	const dispatch = useDispatch();
  const precision = useSelector(selectPrecisionKey);

  const handlePrecisionIncrement = useCallback(() => {
    dispatch(increaseDecimals());
  }, [])

  const handlePrecisionDecrement = useCallback(() => {
    dispatch(decreaseDecimals())
  }, []
	)
	return (
		<View style={styles.container}>
			<TouchableOpacity style={[styles.button, precision === 'P0' && styles.disabled]} onPress={handlePrecisionIncrement} disabled={precision === 'P0'}><Text>+</Text></TouchableOpacity>
			<TouchableOpacity style={[styles.button, precision === 'P4' && styles.disabled]} onPress={handlePrecisionDecrement} disabled={precision === 'P4'}><Text>-</Text></TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
	},
	button: {
		padding: 12,
		backgroundColor: 'green',
	},
	disabled: {
		opacity: 0.5,
	}
});

export default PrecisionControls;