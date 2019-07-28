class BaseTransaction
  include Dry::Transaction

  around :transaction do |input, &block|
    result = nil

    begin
      ActiveRecord::Base.transaction do
        result = block.(Success(input))
        raise MyDB::Rollback if result.failure?
        result
      end
    rescue MyDB::Rollback
      result
    end
  end

  def self.call(*args, &block)
    new.call(*args, &block)
  end
end
