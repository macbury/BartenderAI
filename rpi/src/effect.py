import time
from threading import Thread
from rpi_ws281x import Color

class Effect:
  def __init__(self, strip):
    self.strip = strip
  
  def update(self):
    pass

class EffectManager:
  def __init__(self, strip):
    self.strip = strip
    self.arg = 0
    self.states = {
      'idle': IdleEffect(strip),
      'preparing': PreparingEffect(strip)
    }
    self.currentState = 'idle'

    thread = Thread(target=self.update)
    thread.start()
  
  def change_state(self, rawState):
    parts = rawState.split(':')
    state = parts[0]
    if len(parts) > 1:
      self.arg = parts[1]
    if state in self.states:
      self.currentState = state.split(':')

  def update(self):
    while True:
      self.states[self.currentState].update(self.arg)
      time.sleep(0.016)

class IdleEffect(Effect):
  def update(self, _progress):
    for i in range(self.strip.numPixels()):
      self.strip.setPixelColor(i, Color(255, 215, 0))
    self.strip.show()

class PreparingEffect(Effect):
  def update(self, progress):
    pixelCount = int(self.strip.numPixels() * (progress/100.0))
    for i in range(pixelCount):
      self.strip.setPixelColor(i, Color(0, 255, 255))
    self.strip.show()