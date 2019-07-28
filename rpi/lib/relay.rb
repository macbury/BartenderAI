class Relay
  LOCATION_TO_BCM = {
    1 => 14,
    2 => 15,
    3 => 17,
    4 => 27,
    5 => 22,
    6 => 23,
    7 => 24,
    8 => 25
  }

  def initialize
    RPi::GPIO.reset
    RPi::GPIO.set_numbering :bcm

    LOCATION_TO_BCM.each do |_location, bcm|
      RPi::GPIO.setup bcm, as: :output
    end

    turn_all_off
  end

  # Start relay with location
  def turn_on(location)
    bcm_pin = LOCATION_TO_BCM[location]
    raise "Could not find pin for location #{location}" unless bcm_pin
    RPi::GPIO.set_high bcm_pin
  end

  # Stop relay with location
  def turn_off(location)
    bcm_pin = LOCATION_TO_BCM[location]
    raise "Could not find pin for location #{location}" unless bcm_pin
    RPi::GPIO.set_low bcm_pin
  end

  # Turn off all relays
  def turn_all_off
    LOCATION_TO_BCM.each do |_location, bcm|
      RPi::GPIO.set_low bcm
    end
  end

  def reset
    RPi::GPIO.reset
  end
end
