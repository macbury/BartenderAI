# use pir to sample distance
# if distance is 20% for center then glass is ok
# change status of glass on remote endpoint
# change status locally

class GlassDetector
  def start

  end

  def present?
    true
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
    #   sleep 1
    # end
  end
end
