import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loggedIn: false,
    payedBills:{},
    pendingBills:{},
    dueBills:[],
    users:{},
    profile:{}
}
export const dataSlice= createSlice({
    name:'data',
    initialState,
    reducers:{
        setLoggedIn:(state, action)=>{
            state.loggedIn=action.payload;
        },
        setPayedBills:(state, action)=>{
            state.payedBills=action.payload;
            console.log(state.payedBills)
        },
        setPendingBills:(state, action)=>{
            state.pendingBills=action.payload;
        },
        setDueBills:(state, action)=>{
            state.dueBills=action.payload;
        },
        setUsers:(state, action)=>{
            state.users=action.payload;
        },
        setProfile:(state, action)=>{
            state.profile=action.payload;
        }
        
    }
})

export const {setLoggedIn, setPayedBills, setPendingBills, setDueBills, setUsers, setProfile}= dataSlice.actions;
export default dataSlice.reducer