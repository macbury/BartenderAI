from dotenv import load_dotenv
import os
from alexa_say import AlexaBridge
load_dotenv()

bridge = AlexaBridge(os.getenv('ALEXA_EMAIL'), os.getenv('ALEXA_PASSWORD'), os.getenv('ALEXA_DEVICE_NAME'))
def handle_captcha(captcha_image_url):
  print("Load captcha:")
  print(captcha_image_url)
  captcha = input("Enter captcha:")
  return captcha

bridge.auth(handle_captcha)