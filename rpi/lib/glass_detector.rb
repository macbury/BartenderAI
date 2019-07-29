# use pir to sample distance
# if distance is 20% for center then glass is ok
# change status of glass on remote endpoint
# change status locally
class GlassDetector
  def initialize(trigger_pin:, echo_pin:, distance_to_glass:)
    @trigger_pin = trigger_pin
    @echo_pin = echo_pin
    @distance_to_glass = distance_to_glass

    RPi::GPIO.setup @trigger_pin, as: :output, initialize: :low
    RPi::GPIO.setup @echo_pin, as: :input
  end

  def present?
    true
    #accurate_measure <= @distance_to_glass
  end

  def wait_for_it(seconds = 60)
    seconds.times do
      return true if present?
      sleep 1
    end

    return false
  end

  def wait_for_removal
    # while present?
    #   sleep 0.1
    # end
  end

  def reset
    RPi::GPIO.clean_up(@trigger_pin)
    RPi::GPIO.clean_up(@echo_pin)
  end

  private

  # @return [Integer] centimeters
  def accurate_measure
    Array.new(7){ sleep(50e-3); self.measure }.sort.slice(2..4).reduce(:+) / 3
  end 

  def measure
    return nil if @lock
    @lock = true

    Timeout::timeout(1) do
      RPi::GPIO.set_high @trigger_pin
      sleep 10e-6
      RPi::GPIO.set_low @trigger_pin

      {} while RPi::GPIO.low?(@echo_pin)
      start = Time.now
      {} while RPi::GPIO.high?(@echo_pin)
      stop  = Time.now

      (stop - start) * 34039 / 2
    end
  rescue
    nil
  ensure
    @lock = false
  end
end
