class RefillBottle < BaseTransaction
  step :locate_one
  try :pour_rest_of_the_liquid, catch: ActiveRecord::RecordInvalid

  def locate_one(content_or_id)
    bottle = Bottle.by_content_or_id(content_or_id).first
    if bottle
      Success(bottle)
    else
      Failure(["I don't have bottle with name #{content_or_id}"])
    end
  end

  def pour_rest_of_the_liquid(bottle)
    bottle.refill
    if bottle.save
      Success(bottle)
    else
      Failure(bottle.errors.full_messages)
    end
  end
end
