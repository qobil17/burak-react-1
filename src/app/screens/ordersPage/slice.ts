import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: [],
};

const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {
        setPausedOrders: (state, action) => {
            state.pausedOrders = action.payload;
        },
         setProcessorders: (state, action) => {
            state.processOrders = action.payload;
        },
          setFinishedOrders: (state, action) => {
            state.finishedOrders = action.payload;
        },
    }
});

export const { setPausedOrders, setProcessorders, setFinishedOrders } = ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;