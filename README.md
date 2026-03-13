# Bluetooth V2 — MakeCode Extension for micro:bit

Full Bluetooth custom blocks for micro:bit, giving you clean drag-and-drop blocks to init, name, advertise, send/receive data, and react to connection events — all without touching any code.

---

## Installation

1. Open [MakeCode for micro:bit](https://makecode.microbit.org)
2. Create or open a project
3. Click **Extensions** (gear icon → Extensions, or the "+" in the toolbox)
4. Paste this GitHub URL and press Enter:
   ```
   https://github.com/YOUR_USERNAME/bluetoothV2
   ```
5. The **"Bluetooth V2"** category will appear in the block palette.

> ⚠️ **Bluetooth and Radio cannot be used at the same time.** If your project uses Radio blocks, Bluetooth will not work.

---

## Blocks Reference

### 🔧 Setup

| Block | Description |
|-------|-------------|
| `init Bluetooth V2 with name [name]` | **Start here.** Initialises BLE UART, sets device name. Call once in "on start". |
| `set Bluetooth name to [name]` | Change the advertised device name (max 8 chars). |
| `Bluetooth device name` | Returns the current device name as a string. |
| `set Bluetooth TX power to [0–7]` | Sets transmit power. 7 = max range, 0 = minimum. |

### 📡 Advertising

| Block | Description |
|-------|-------------|
| `start Bluetooth advertising` | Make the micro:bit discoverable to nearby devices. |
| `stop Bluetooth advertising` | Stop advertising (hides device from scans). |
| `advertise URL [url]` | Broadcast a URL via Eddystone beacon. |

### 📨 Data

| Block | Description |
|-------|-------------|
| `send string [text] over Bluetooth` | Send a text string via UART (newline-terminated). |
| `send number [value] over Bluetooth` | Send a number via UART. |
| `send key [key] = [value] over Bluetooth` | Send a `key=value` pair (great for telemetry). |
| `last received Bluetooth string` | Returns the most recently received string. |

### ⚡ Events

| Block | Description |
|-------|-------------|
| `on Bluetooth connected` | Runs your code when a phone/computer connects. |
| `on Bluetooth disconnected` | Runs your code when the connection drops. |
| `on Bluetooth data received as [data]` | Runs your code when data arrives; `data` holds the string. |

### 📊 Status

| Block | Description |
|-------|-------------|
| `Bluetooth is connected` | Boolean — true if a device is connected. |
| `Bluetooth V2 is initialized` | Boolean — true if `initBluetoothV2` has been called. |
| `show Bluetooth status on display` | Shows ✓ if connected, ✗ if not, on the LED grid. |

---

## Quick-Start Example

```blocks
// on start
bluetoothV2.initBluetoothV2("myBit")
bluetoothV2.startAdvertising()

// show name on LEDs
basic.showString(bluetoothV2.getDeviceName())

// greet on connect
bluetoothV2.onConnected(function () {
    bluetoothV2.sendString("Hello!")
    basic.showIcon(IconNames.Yes)
})

// react to incoming data
bluetoothV2.onDataReceived(function (data) {
    basic.showString(data)
})

// button A: send temperature
input.onButtonPressed(Button.A, function () {
    bluetoothV2.sendKeyValue("temp", input.temperature())
})
```

---

## Recommended companion apps

- **Bluetooth Terminal** (Android / iOS) — simple UART terminal
- **nRF Connect** (Nordic) — inspect raw BLE services
- **micro:bit App** (official) — basic connectivity

---

## License

MIT — free to use, modify, and distribute.
