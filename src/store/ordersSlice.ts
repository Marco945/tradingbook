import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.';

export type Order = {
  count: number,
  amount: number,
  total: number,
};

type OrderMap = {[key: number]: Order};

const decimalMap = {
  5: 'P0',
  4: 'P1',
  3: 'P2',
  2: 'P3',
  1: 'P4',
}

type OrderBook = {
  bids: OrderMap;
  asks: OrderMap;
  decimals: number;
  decimalKey: string;
}

export type OrdersState = {
  value: OrderBook;
}

const initialState: OrdersState = {
  value: {
    bids: {},
    asks: {},
    decimalKey: 'P0',
    decimals: 5,
  },
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    initMap: (state, action) => {
      state.value.bids = action.payload.bids;
      state.value.asks = action.payload.asks;
    },
    updateBid: (state, action) => {
      const {price, count, amount} = action.payload
      state.value.bids[price] = {count, amount, total: count * amount}
    },
    updateAsk: (state, action) => {
      const {price, count, amount} = action.payload
      state.value.asks[price] = {count, amount, total: count * amount}
    },
    removeBid: (state, action) => {
      const {price} = action.payload
      delete state.value.bids[price]
    },
    removeAsk: (state, action) => {
      const {price} = action.payload
      delete state.value.asks[price]
    },
    increaseDecimals: (state) => {
      state.value.decimals += 1
      state.value.decimalKey = decimalMap[state.value.decimals]
      state.value.bids = {}
      state.value.asks = {}
    },
    decreaseDecimals: (state) => {
      state.value.decimals -= 1
      state.value.decimalKey = decimalMap[state.value.decimals]
      state.value.bids = {}
      state.value.asks = {}
    },
  },
})

function parseMap(initData: any) {
  const bids: OrderMap = {}
  const asks: OrderMap = {}

  for(const [price, count, amount] of initData) {
    if(amount <= 0) {
      asks[price] = {count, amount: -amount, total: count * (-amount)}
    } else {
      bids[price] = {count, amount, total: count * amount}
    }
  }
  return {bids, asks}
}

// TODO: refactor this function
export const updateValues = (message: any) => (dispatch) => {
  try {
    if(message[1].length > 3) {
      dispatch(initMap(parseMap(message[1])))
      return;
    }
    const [key, [price, count, amount]] = message
    if(amount > 0) {
      if(count === 0) {
        dispatch(removeBid({price}))
      } else {
        dispatch(updateBid({price, count, amount}))
      }
    } else { // amount <= 0
      if(count === 0) {
        dispatch(removeAsk({price}))
      } else {
        dispatch(updateAsk({price, count, amount: -amount}))
      }
    }
  } catch(error) {
    console.error('validateMessageAndUpdateValues error', error);
  }
}

export const selectBids = (state: RootState) => state.ordersReducer.value.bids;
export const selectAsks = (state: RootState) => state.ordersReducer.value.asks;
export const selectPrecisionKey = (state: RootState) => state.ordersReducer.value.decimalKey;
export const selectPrecision = (state: RootState) => state.ordersReducer.value.decimals;

export const { initMap, updateBid, updateAsk, removeAsk, removeBid, increaseDecimals, decreaseDecimals } = ordersSlice.actions

export default ordersSlice.reducer