import { Text, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Order, selectPrecision } from "../store/ordersSlice";
import { memo } from "react";

type Props = {price: number, entry: Order, reverse?: boolean};

function firstFormat(number: number, precision: number): number {
	return Number(number.toFixed(precision));
}

function formatNumber(number: number, precision: number): string {
	let parsedNumber = firstFormat(number, precision);
	if(parsedNumber < 100000) {
		return String(parsedNumber);
	}
	return `${firstFormat(parsedNumber / 1000, precision)}K`;
}

const BackgroundLine: React.FunctionComponent<Props> = ({price, entry: {amount, count, total}, reverse = false}) => {
	const precision = useSelector(selectPrecision);
	return (
		<View style={[styles.container, reverse && styles.reverse]}>
			<View style={[styles.marker, reverse && styles.markerReverse]} />
			<Text style={styles.text}>{formatNumber(price, precision)}</Text>
			<Text style={styles.text}>{formatNumber(total, precision)}</Text>
			<Text style={styles.text}>{formatNumber(amount, precision)}</Text>
			<Text style={styles.smallText}>{formatNumber(count, 0)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5',
		marginTop: 1,
		marginHorizontal: 4,
		flexDirection: 'row',
		alignItems: 'center',
    justifyContent: 'space-between',
		borderRadius: 2,
	},
	marker: {
		height: '100%',
		width: 4,
		backgroundColor: 'red',
	},
	reverse: {
		flexDirection: 'row-reverse',
	},
	markerReverse: {
		marginLeft: 4,
		backgroundColor: 'green',
	},
	text: {
		flex: 2,
		fontSize: 11,
		paddingVertical: 4,
		textAlign: 'right',
	},
	smallText: {
		flex: 1,
		fontSize: 11,
	}
})

export default memo(BackgroundLine);