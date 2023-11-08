import { View } from "react-native";
import { useSelector } from "react-redux";
import { selectAsks } from "../store/ordersSlice";
import BackgroundLine from "./BackgroundLine";

type Props = {};

const AsksTable: React.FunctionComponent<Props> = () => {
	const asks = useSelector(selectAsks);
	return (
    <View style={{flex: 1}}>
			{Object.keys(asks).map((key) => (<BackgroundLine key={`${key}`} price={Number(key)} entry={asks[Number(key)]} />))}
    </View>
  );
}

export default AsksTable;