import os
import redis
import time
from dotenv import load_dotenv
from alexa_say import AlexaBridge

load_dotenv()
redis = redis.from_url(os.getenv('REDIS_URL'))

channel = redis.pubsub(ignore_subscribe_messages=True)
channel.subscribe('alexa:say')

bridge = AlexaBridge(os.getenv('ALEXA_EMAIL'), os.getenv('ALEXA_PASSWORD'), os.getenv('ALEXA_DEVICE_NAME'))
bridge.auth(None)

while True:
  message = channel.get_message()
  if message:
    bridge.say(message['data'].decode('utf-8'))
  time.sleep(0.001)