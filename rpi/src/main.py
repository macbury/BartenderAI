#!/usr/bin/env python3
import time
from threading import Thread
from rpi_ws281x import PixelStrip, Color
from effect import EffectManager

# LED strip configuration:
LED_COUNT = 30        # Number of LED pixels.
LED_PIN = 12          # GPIO pin connected to the pixels (18 uses PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10          # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
LED_INVERT = False    # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)

def main():
  try:
    strip.begin()
    for i in range(strip.numPixels()):
      strip.setPixelColor(i, Color(0, 0, 0))
    strip.show()

    EffectManager(strip)

    while True:
      try:
        state = input()
        if not state:
          continue
        print(state)
      except EOFError:
        time.sleep(1)
  except KeyboardInterrupt:
    pass
  finally:
    print("Exiting...")

if __name__ == '__main__':
  main()