import { createSlice } from "@reduxjs/toolkit"
import { getMenuItems } from "../../helpers/user-menu";

const initialState = {
    user: null,
    isUserLogin: false,//kullanicinin login mi degil mi yani null mi degil mi oldugnu kontrol eder
    userMenu: []
}

const authSlice = createSlice({
    name : "auth", //action olusturuken ihtiyac oluyor
    initialState,
    reducers:{
        login:(state,action) => { //mevcut suanki state i getirir, islem basarili olunca user bilgileri action icine gelir, gondercegimiz user payload ile gelir
            state.user = action.payload; //yani girilen user i alip direk state iicne atmis oluyoruz
            state.isUserLogin=true;
            state.userMenu = getMenuItems(action.payload.role) //rolü burdan aliyoruz 
        },
        logout: (state) => {
            state.user = null;
            state.isUserLogin = false;
            state.userMenu = [];
        }
    }

})


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


