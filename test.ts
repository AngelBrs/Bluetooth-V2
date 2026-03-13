// ---------------------------------------------------------------------------
// BluetoothV2 Extension — Test / Example program
// ---------------------------------------------------------------------------
// How to use this in the MakeCode editor:
//   1. Import the extension via "Extensions" > paste GitHub URL
//   2. The "Bluetooth V2" category will appear in the block palette
// ---------------------------------------------------------------------------

// ── on start ────────────────────────────────────────────────────────────────
bluetoothV2.initBluetoothV2("myBit");          // init with name "myBit"
bluetoothV2.setTxPower(7);                     // max range
bluetoothV2.startAdvertising();                // become discoverable
basic.showString(bluetoothV2.getDeviceName()); // scroll device name on LEDs

// ── connection events ────────────────────────────────────────────────────────
bluetoothV2.onConnected(function () {
    basic.showIcon(IconNames.Yes);
    bluetoothV2.sendString("Hello from micro:bit!");
});

bluetoothV2.onDisconnected(function () {
    basic.showIcon(IconNames.No);
});

// ── receive data ─────────────────────────────────────────────────────────────
bluetoothV2.onDataReceived(function (data) {
    basic.showString(data);
    if (data == "LED_ON") {
        led.plot(2, 2);
    } else if (data == "LED_OFF") {
        led.unplot(2, 2);
    }
});

// ── button A: send a number ──────────────────────────────────────────────────
input.onButtonPressed(Button.A, function () {
    bluetoothV2.sendNumber(input.temperature());
});

// ── button B: change name ────────────────────────────────────────────────────
input.onButtonPressed(Button.B, function () {
    bluetoothV2.setDeviceName("newBit");
    basic.showString("Name changed!");
});

// ── button A+B: show status ──────────────────────────────────────────────────
input.onButtonPressed(Button.AB, function () {
    bluetoothV2.showStatus();
});

// ── forever: send key=value telemetry ────────────────────────────────────────
basic.forever(function () {
    if (bluetoothV2.isConnected()) {
        bluetoothV2.sendKeyValue("temp", input.temperature());
        bluetoothV2.sendKeyValue("light", input.lightLevel());
    }
    basic.pause(2000);
});
