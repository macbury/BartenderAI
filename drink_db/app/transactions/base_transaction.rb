class BaseTransaction
  include Dry::Transaction

  around :transaction do |input, &block|
    result = nil

    begin
      ActiveRecord::Base.transaction do
        result = block.(Success(input))
        raise ActiveRecord::Rollback if result.failure?
        result
      end
    rescue ActiveRecord::Rollback
      result
    end
  end

  def self.call(*args, &block)
    new.call(*args, &block)
  end
end
