# MagicMirror: architecture and scope

This is a historical Raspberry Pi mirror prototype. The repository demonstrates how a desktop display, mobile interface, and device experiments can be kept as separate parts. It is not a completed IoT product.

| Part | Location | Scope |
| --- | --- | --- |
| Desktop display | [windows](windows/) | Electron application and mirror modules. |
| Mobile interface | [application](application/) | Ionic / Angular companion application and its original UI flow. |
| Device experiment | [device_emulator](device_emulator/) | Device communication experiments and unfinished integration work. |

## Trying the historical snapshot

Use the component-specific manifests and README instructions. The desktop uses Electron 3; the mobile app uses Angular 5 and Ionic 3. Modern runtimes may need compatibility work. Demo media in the main README records the original behavior; it does not establish current hardware compatibility.

## What remains exploratory

The device/IoT integration contains notes for a later version. There is no automated end-to-end verification of the complete desktop/mobile/device flow in this snapshot. Keeping those boundaries visible is more useful than implying that every component was finished.
