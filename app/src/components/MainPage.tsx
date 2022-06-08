import { Box, Paper, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  createDevices,
  updateField,
  connectAllDevices,
  disconnectAllDevices,
} from "../features/device/device-slice";
import { Device } from "./Device";
import { createSocket, sockets } from "../WebsocketsManager";

export default function MainPage() {
  const state = useAppSelector((state) => state.device);
  const dispatch = useAppDispatch();

  function onChange(e: any, field: any) {
    dispatch(
      updateField({
        field: field,
        value: e.target.value,
      })
    );
  }

  return (
    <Box sx={{ padding: "1rem" }}>
      <Paper component="form" noValidate autoComplete="off" sx={{
        padding: 2,
        marginBottom: 1,

      }}>
        <Typography sx={{ fontWeight: "bold" }}>Configuration</Typography>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "18ch" },
          }}
        >
          <TextField
            onChange={(e) => onChange(e, "noOfDevices")}
            value={state.form.noOfDevices}
            size="small"
            label="Number of devices"
          />
          <TextField
            onChange={(e) => onChange(e, "size")}
            value={state.form.size}
            size="small"
            type="number"
            label="Data size in KB"
          />
          <TextField
            onChange={(e) => onChange(e, "freq")}
            value={state.form.freq}
            size="small"
            label="Frequency (msgs/sec)"
          />
        </Box>

        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
            marginBottom: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={(e) => {
              dispatch(createDevices());
            }}
          >
            Create Devices
          </Button>

          <Button
            variant="contained"
            onClick={(e) => {
              dispatch(connectAllDevices());
              for (let deviceId in state.devices) {
                createSocket(deviceId);
              }
            }}
          >
            Connect All
          </Button>

          <Button
            variant="contained"
            onClick={(e) => {
              dispatch(disconnectAllDevices());
              for (let deviceId in state.devices) {
                sockets[deviceId].close();
              }
            }}
          >
            Disconnect All
          </Button>
        </Box>

        <div>
          Devices online: {state.devicesOnline}/{state.totalDevices}
        </div>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 0.75,
            width: 150,
            // height: 128,
          },
        }}
      >
        {Object.keys(state.devices).map((deviceId) => (
          <Device
            key={deviceId}
            deviceId={deviceId}
            intent={state.devices[deviceId].intent}
            online={state.devices[deviceId].online}
            sent={state.devices[deviceId].sent}
            recv={state.devices[deviceId].recv}
            diff={state.devices[deviceId].diff}
            size={state.devices[deviceId].size}
            msgs={state.devices[deviceId].msgs}
            data={state.devices[deviceId].data}
          />
        ))}
      </Box>
    </Box>
  );
}

export function Status(props: any) {
  if (props.online) {
    return (
      <b
        style={{
          color: "green",
        }}
      >
        ONLINE
      </b>
    );
  } else {
    return (
      <b
        style={{
          color: "red",
        }}
      >
        OFFLINE
      </b>
    );
  }
}
