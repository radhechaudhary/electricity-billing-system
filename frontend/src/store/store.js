import { configureStore } from "@reduxjs/toolkit";
import dataReducer from '../features/data.Slice'

const store= configureStore({
    reducer:dataReducer
})
export default store