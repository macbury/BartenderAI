class AlexaSkill < BaseTransaction
  tee :reload_intents
  step :validate_app
  step :execute_intent

  def reload_intents(_)
    Ralyxa::RegisterIntents.run(Rails.root.join('intents')) if Rails.env.development?
  end

  def validate_app(request)
    app_id = request.params.dig(:session, :application, :applicationId)

    if app_id == ENV.fetch('ALEXA_SKILL_ID')
      Success(request)
    else
      Failure(['Invalid ALEXA_SKILL_ID'])
    end
  end

  def execute_intent(request)
    Success(Ralyxa::Skill.handle(request))
  end
end
