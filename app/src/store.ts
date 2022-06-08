import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './features/device/device-slice';

export const store = configureStore({
    reducer: {
        device: deviceReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;