# About

This is simple service written in Ruby that listens throug GraphQL subscription for new pending orders. After receivng new order this service will trigger proper GPIO pins on RaspberryPI to turn on and off our liquid pumps.

## Configuring service

```bash
sudo cp systemd/bartender.service /lib/systemd/system/
sudo systemctl enable bartender
sudo systemctl start bartender
```

## Relay mappings

| Bottle location | BCM | Relay PIN |
| -------------  | ------------- | ------------- |
| 1 | [14](https://pinout.xyz/pinout/pin8_gpio14)  | IN1 |
| 2 | [15](https://pinout.xyz/pinout/pin10_gpio15) | IN2 |
| 3 | [17](https://pinout.xyz/pinout/pin11_gpio17) | IN3 |
| 4 | [27](https://pinout.xyz/pinout/pin13_gpio27) | IN4 |
| 5 | [22](https://pinout.xyz/pinout/pin15_gpio22) | IN5 |
| 6 | [23](https://pinout.xyz/pinout/pin16_gpio23) | IN6 |
| 7 | [24](https://pinout.xyz/pinout/pin18_gpio24) | IN7 |
| 8 | [25](https://pinout.xyz/pinout/pin22_gpio25) | IN8 |

## Other Pin mappings

| Device | BCM 
| -------------  | ------------- | 
| Sonic Sensor | [18](https://pinout.xyz/pinout/pin12_gpio18#) |
| Led Strip | [12](https://pinout.xyz/pinout/pin32_gpio12#) |
