import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Status } from "./MainPage";

export function Device2(props: any) {
  const [state, setState] = useState({
    deviceId: props.deviceId,
    online: props.online,
    sent: props.sent,
    recv: props.recv,
    diff: props.diff,
    size: props.size,
    msgs: props.msgs,
    data: props.data,
    freq: props.freq,
  });

  useEffect(() => {
    let ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      setState({
        ...state,
        online: true,
      })

      ws.send(
        JSON.stringify({
          freq: state.freq,
          size: state.size,
        })
      );
    };

    ws.onclose = () => {
      setState({
        ...state,
        online: false,
      })
    };

    ws.onmessage = (evt) => {
      console.log(evt);
      let msg = JSON.parse(evt.data);
      setState(state => {
        let recv = Date.now();
        return {
          ...state,
        msgs: state.msgs + 1,
        data: msg.data,
        sent: msg.sent,
        recv: recv,
        diff: recv - msg.sent,
        }
      })
    };

    return () => {
      ws.close();
    }
  }, []);

  return (
    <Paper>
      <Paper
        sx={{
          background: "#337ab7",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          padding: "2px 8px",
          color: "white",
          fontSize: "12px",
        }}
      >
        {props.deviceId}
      </Paper>
      <Paper
        sx={{
          padding: "0 0.5rem 0.5rem",
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        <div>
          status: <Status online={state.online} />
        </div>
        <div>sent: {state.sent}</div>
        <div>recv: {state.recv}</div>
        <div>diff:&nbsp; {state.diff}</div>
        <div>size: {(state.data?.length / 1024).toFixed(2)} KB</div>
        <div>msgs received: {state.msgs}</div>
      </Paper>
    </Paper>
  );
}
