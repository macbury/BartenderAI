class Led
  def self.set(status)
    IO.write('/tmp/status-led', status.to_s)
  end

  def self.put_glass!
    set("put_glass")
  end

  def self.take_glass!
    set("take_glass")
  end

  def self.idle!
    set("idle")
  end

  def self.offline!
    set("offline")
  end

  def self.error!
    set("error")
  end

  def self.success!
    set("success")
  end

  def self.preparing!(progress)
    set("preparing:#{progress.round}")
  end
end