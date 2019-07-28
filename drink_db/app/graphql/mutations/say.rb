module Mutations
  class Say < GraphQL::Schema::RelayClassicMutation
    null true
    argument :message, String, required: false
    argument :translation_key, Boolean, required: false
    field :success, Boolean, null: false

    def resolve(message:, translation_key: false)
      message = translation_key ? get_translation(message) : message
      HTTParty.get('http://localhost:7123?message=' + message)
      { success: true }
    end

    private

    def get_translation(message)
      translations = I18n.t(message)
      if translations.is_a?(Array)
        translations.sample
      else
        translations
      end
    end
  end
end
