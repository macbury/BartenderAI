from alexapy import AlexaAPI, AlexaLogin

class AlexaClient:
  def __init__(self, device, login):
    self._login = login
    self.alexa_api = AlexaAPI(self, login)
    self.auth = AlexaAPI.get_authentication(login)
    self.alexa_api_session = login.session
    self._device = device
    self._device_name = device['accountName']
    self._device_family = device['deviceFamily']
    self._device_type = device['deviceType']
    self._locale = None
    self.unique_id = device['serialNumber']
    self._device_serial_number = device['serialNumber']
    self._device_owner_customer_id = device['deviceOwnerCustomerId']
    self._customer_id = self.auth['customerId']

  def send_announcement(self, message, **kwargs):
    """Send announcement to the media player."""
    self.alexa_api.send_announcement(message,
                                      customer_id=self._customer_id,
                                      **kwargs)

class AlexaBridge:
  def __init__(self, email, password, device_name):
    self.login = AlexaLogin("amazon.com", email, password, self.outputpath, True)
    self.login.login_with_cookie()
    self.device_name = device_name
  
  def auth(self, handle_captcha):
    if not self.login.test_loggedin():
      self.login.login()
      if handle_captcha is None:
        raise Exception("You need to login!")
      captcha = handle_captcha(self.login.status['captcha_image_url'])
      self.login.login(captcha=str.strip(captcha))

    if not self.login.test_loggedin():
      raise Exception("Invalid credentials or captcha...")

    device = self.find_device()
    self.client = AlexaClient(device, self.login)

  def say(self, message):
    self.client.send_announcement(message)

  def outputpath(self, a):
    return "./{}".format(a)

  def find_device(self):
    devices = AlexaAPI.get_devices(self.login)
    for device in devices:
      if device['accountName'] == self.device_name:
        return device
    raise Exception("Could not find device with name: %s".format(name))