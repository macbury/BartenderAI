require 'bundler/setup'
require 'rpi_gpio'

RPi::GPIO.set_numbering :bcm

TIMEOUT = 0.020
SONIC_PIN = 18

end_time = 0.0
start_time = 0.0
while true
  sleep 2
  RPi::GPIO.setup SONIC_PIN, as: :output

  #cleanup output
  RPi::GPIO.set_low SONIC_PIN
  sleep 0.000002

  #send signal
  RPi::GPIO.set_high SONIC_PIN
  sleep 0.000005

  RPi::GPIO.set_low SONIC_PIN

  RPi::GPIO.setup SONIC_PIN, as: :input

  good_read = true
  watch_time = Time.now.to_f

  while RPi::GPIO.low?(SONIC_PIN) && good_read
    start_time = Time.now.to_f
    good_read = false if start_time - watch_time > TIMEOUT
  end

  if good_read
    watch_time = Time.now.to_f
    while RPi::GPIO.high?(SONIC_PIN) && good_read
      end_time = Time.now.to_f
      good_read = false if end_time - watch_time > TIMEOUT
    end
  end

  if good_read
    duration = end_time - start_time
    distance = duration * 34000/2
    puts "Distance is: #{distance} cm"
  end
end