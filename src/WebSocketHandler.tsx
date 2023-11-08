import { useCallback, useEffect, useRef, useState } from "react"
import { selectPrecisionKey, updateValues } from "./store/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const subscribeMessage = { 
	event: 'subscribe',
	channel: 'book',
	symbol: 'tBTCUSD',
};

const WebSocketHandler = () => {
	const [webSocketOpened, setWebSocketOpened] = useState(false);
	const [webSocketConnected, setWebSocketConnected] = useState(true);
	const currentChannel = useRef('');
	const webSocketRef = useRef(new WebSocket('wss://api-pub.bitfinex.com/ws/2'))
	const dispatch = useDispatch();
	const precision = useSelector(selectPrecisionKey);

	const openWebSocket = () => {
		webSocketRef.current.addEventListener('open', (event) => {console.log('opened', event); setWebSocketOpened(true);})
		webSocketRef.current.addEventListener('message', (event) => {
			const parsedEvent = JSON.parse(event.data);
			if(parsedEvent.event) {
				if(parsedEvent.event ==='subscribed') {
					currentChannel.current = parsedEvent.chanId;
				}
				return;
			}
			if(parsedEvent.length && typeof parsedEvent[1] === 'string') {
				// 'cs' || 'hb'
				return;
			}
			dispatch(updateValues(parsedEvent));
		})
		webSocketRef.current.addEventListener('error', (event) => {console.error('error', event);})
		webSocketRef.current.addEventListener('close', (event) => {console.log('close', event); setWebSocketOpened(false);})
	}

	const unsubscribe = () => {
		if(currentChannel.current) {
			webSocketRef.current.send(JSON.stringify({
				"event": "unsubscribe",
				"chanId": currentChannel.current
			 }));
		}
	}

	useEffect(() => {
		openWebSocket();
		return () => {
			// if(!__DEV__) {
				webSocketRef.current.close();
			// }
    }
	}, [])

	useEffect(() => {
		if(!webSocketOpened) {
			return;
    }
		unsubscribe();
		webSocketRef.current.send(JSON.stringify({...subscribeMessage, prec: precision}));
	}, [precision, webSocketOpened])

	const handleConnection = useCallback(() => {
		if(webSocketConnected) {
			unsubscribe();
			webSocketRef.current.close();
			setWebSocketConnected(false);
			return;
		}
		webSocketRef.current = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
		openWebSocket();
		setWebSocketConnected(true);
	}, [webSocketConnected])

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleConnection}><Text>{webSocketConnected ? 'Disconnect' : 'Connect'}</Text></TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		marginBottom: 40,
		padding: 12,
		backgroundColor: 'green',
		borderRadius: 20,
	},
})

export default WebSocketHandler;