import { View } from "react-native";
import { useSelector } from "react-redux";
import { selectBids } from "../store/ordersSlice";
import BackgroundLine from "./BackgroundLine";

type Props = {};

const BidsTable: React.FunctionComponent<Props> = () => {
  const bids = useSelector(selectBids);
  return (
    <View style={{flex: 1}}>
      {Object.keys(bids).map((key) => (<BackgroundLine reverse key={`${key}`} price={Number(key)} entry={bids[Number(key)]} />))}
    </View>
  );
}

export default BidsTable;