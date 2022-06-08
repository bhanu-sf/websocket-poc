import { Paper } from "@mui/material";
import { Status } from "./MainPage";

export function Device(props: any) {
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
          status: <Status online={props.online} />
        </div>
        <div>sent: {props.sent}</div>
        <div>recv: {props.recv}</div>
        <div>diff:&nbsp; {props.diff}</div>
        <div>size: {(props.data?.length / 1024).toFixed(2)} KB</div>
        <div>msgs received: {props.msgs}</div>
      </Paper>
    </Paper>
  );
}
