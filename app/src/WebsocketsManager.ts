import { offline, online, onMessage } from "./features/device/device-slice";
import { store } from "./store";

export const sockets: any = {};

export function createSocket(deviceId: string) {
  let ws = new WebSocket("ws://localhost:8080");
  const dispatch = store.dispatch;
  const state = store.getState().device;

  ws.onopen = () => {
    dispatch(
      online({
        deviceId: deviceId,
      })
    );

    ws.send(
      JSON.stringify({
        freq: state.form.freq,
        size: state.form.size
      })
    );
  };

  ws.onclose = () => {
    delete sockets[deviceId];
    dispatch(
      offline({
        deviceId: deviceId,
      })
    );
  };

  ws.onmessage = (evt) => {
    console.log(evt);
    let msg = JSON.parse(evt.data);
    dispatch(
      onMessage({
        deviceId: deviceId,
        data: msg.data,
        sent: msg.sent,
        recv: Date.now(),
      })
    );
  };

  sockets[deviceId] = ws;
}
