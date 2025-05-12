import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
    popularDishes: [],
    newDishes: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularDishes: (sate, action) => {
            sate.popularDishes = action.payload;
        },
         setNewDishes: (sate, action) => {
            sate.newDishes = action.payload;
        },
          setTopUsers: (sate, action) => {
            sate.topUsers = action.payload;
        },
    }
});

export const { setPopularDishes, setNewDishes, setTopUsers } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;