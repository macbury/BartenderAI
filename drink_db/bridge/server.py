import tornado.ioloop
import tornado.web
import os
from dotenv import load_dotenv
from alexa_say import AlexaBridge

load_dotenv()
bridge = AlexaBridge(os.getenv('ALEXA_EMAIL'), os.getenv('ALEXA_PASSWORD'), os.getenv('ALEXA_DEVICE_NAME'))
bridge.auth(None)

class MainHandler(tornado.web.RequestHandler):
  def get(self):
    bridge.say(self.get_argument("message", None, True))
    self.write("ok")

def make_app():
  return tornado.web.Application([
    (r"/", MainHandler),
  ])

if __name__ == "__main__":
  app = make_app()
  app.listen(7123)
  tornado.ioloop.IOLoop.current().start()