import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  devices: {},
  form: {
    noOfDevices: 30,
    size: 5,
    freq: 1,
  },
  totalDevices: 0,
  devicesOnline: 0,
  devicesOffline: null,
};

const deviceSlice = createSlice({
  name: "devices",
  initialState: initialState,
  reducers: {
    connectAllDevices(state) {
      for (let deviceId in state.devices) {
        state.devices[deviceId].intent = "connect";
      }
    },
    disconnectAllDevices(state) {
      for (let deviceId in state.devices) {
        state.devices[deviceId].intent = "disconnect";
      }
    },
    online(state, action) {
      const deviceId = action.payload.deviceId;
      state.devices[deviceId].online = true;
      state.devicesOnline = Object.keys(state.devices)
        .map((deviceId) => state.devices[deviceId].online)
        .filter((v) => v).length;
    },
    offline(state, action) {
      const deviceId = action.payload.deviceId;
      state.devices[deviceId].online = false;
      state.devicesOnline = Object.keys(state.devices)
        .map((deviceId) => state.devices[deviceId].online)
        .filter((v) => !v).length;
    },
    onMessage(state, action) {
      const deviceId = action.payload.deviceId;
      state.devices[deviceId].msgs++;
      state.devices[deviceId].data = action.payload.data;
      state.devices[deviceId].sent = action.payload.sent;
      state.devices[deviceId].recv = action.payload.recv;
      state.devices[deviceId].diff = action.payload.recv - action.payload.sent;
    },
    updateField(
      state,
      action: PayloadAction<{
        field: "noOfDevices" | "size" | "freq";
        value: number;
      }>
    ) {
      state.form[action.payload.field] = action.payload.value;
    },
    createDevices(state) {
      let arr = Array.from(Array(parseInt(`${state.form.noOfDevices}`)).keys());
      state.devices = {};
      for (let v of arr) {
        let deviceId = `DEVICE${v + 1}`;
        state.devices[deviceId] = {
          deviceId: deviceId,
          online: false,
          sent: "NA",
          recv: "NA",
          diff: "NA",
          size: "NA",
          msgs: 0,
          data: null,
        };
      }
      state.totalDevices = state.form.noOfDevices;
      state.devicesOffline = state.form.noOfDevices;
    },
  },
});

export const {
  createDevices,
  updateField,
  online,
  offline,
  connectAllDevices,
  disconnectAllDevices,
  onMessage,
} = deviceSlice.actions;
export default deviceSlice.reducer;
