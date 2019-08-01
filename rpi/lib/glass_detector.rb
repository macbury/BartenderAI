# use pir to sample distance
# if distance is 20% for center then glass is ok
# change status of glass on remote endpoint
# change status locally
SLEEP_BETWEEN_SCANS = 0.5
class GlassDetector
  def initialize(sensor_pin:, distance_to_glass:, logger:)
    @sensor_pin = sensor_pin
    @distance_to_glass = distance_to_glass
    @current_distance = 100000
    @logger = logger
  end

  def start
    @running = true
    Thread.new { main_loop }
  end

  def present?
    @current_distance <= @distance_to_glass
  end

  def wait_for_it(seconds = 60)
    seconds.times do
      return true if present?
      sleep 1
    end

    return false
  end

  def wait_for_removal
    while present?
      sleep 1
    end
  end

  def reset
    @running = false
  end

  private

  def main_loop
    @end_time = 0.0
    @start_time = 0.0
    while @running
      scan
      sleep SLEEP_BETWEEN_SCANS
    end
  end

  def scan
    RPi::GPIO.setup @sensor_pin, as: :output

    #cleanup output
    RPi::GPIO.set_low @sensor_pin
    sleep 0.000002

    #send signal
    RPi::GPIO.set_high @sensor_pin
    sleep 0.000005

    RPi::GPIO.set_low @sensor_pin

    RPi::GPIO.setup @sensor_pin, as: :input

    good_read = true
    watch_time = Time.now.to_f

    while RPi::GPIO.low?(@sensor_pin) && good_read
      @start_time = Time.now.to_f
      good_read = false if @start_time - watch_time > TIMEOUT
    end
  
    if good_read
      watch_time = Time.now.to_f
      while RPi::GPIO.high?(@sensor_pin) && good_read
        @end_time = Time.now.to_f
        good_read = false if @end_time - watch_time > TIMEOUT
      end
    end
  
    if good_read
      duration = @end_time - @start_time
      @current_distance = duration * 34000/2
      @logger.debug "Current distance to glass is: #{@current_distance}"
    end
  end
end
