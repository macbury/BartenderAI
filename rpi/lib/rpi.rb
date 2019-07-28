if RUBY_PLATFORM=~ /arm-linux-gnueabihf/
  require 'rpi_gpio'
else
  module RPi
    module GPIO
      def self.method_missing(*args)
        return true
      end
    end
  end
end