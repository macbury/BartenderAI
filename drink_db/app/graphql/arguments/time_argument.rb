module Arguments
  TimeArgument = GraphQL::ScalarType.define do
    name 'TimeArgument'
    description <<-ENDBAR
      This argument can parse a huge variety of date and time formats. Following is a small sample of strings that will be properly parsed. Parsing is case insensitive and will handle common abbreviations and misspellings:
      Simple:
      - hursday
      - november
      - summer
      - friday 13:00
      - mon 2:35
      - 4pm
      - 10 to 8
      - 10 past 2
      - half past 2
      - 6 in the morning
      - friday 1pm
      - sat 7 in the evening
      - yesterday
      - today
      - tomorrow
      - last week
      - next week
      - this tuesday
      - next month
      - last winter
      - this morning
      - last night
      - this second
      - yesterday at 4:00
      - last friday at 20:00
      - last week tuesday
      - tomorrow at 6:45pm
      - afternoon yesterday
      - thursday last week
      Complex
      - 3 years ago
      - a year ago
      - 5 months before now
      - 7 hours ago
      - 7 days from now
      - 1 week hence
      - in 3 hours
      - 1 year ago tomorrow
      - 3 months ago saturday at 5:00 pm
      - 7 hours before tomorrow at noon
      - 3rd wednesday in november
      - 3rd month next year
      - 3rd thursday this september
      - 4th day last week
      - fourteenth of june 2010 at eleven o'clock in the evening
      - may seventh '97 at three in the morning
      Specific Dates
      - January 5
      - 22nd of june
      - 5th may 2017
      - February twenty first
      - dec 25
      - may 27th
      - October 2006
      - oct 06
      - jan 3 2010
      - february 14, 2004
      - february 14th, 2004
      - 3 jan 2000
      - 17 april 85
      - 5/27/1979
      - 27/5/1979
      - 05/06
      - 1979-05-27
      - Friday
      - 5
      - 4:00
      - 17:00
      - 0800
ENDBAR

    coerce_input -> (value, ctx) do
      time = Chronic.parse(value)
      raise GraphQL::CoercionError, "cannot coerce `#{value.inspect}` to Time" unless time
      time
    end

    coerce_result -> (value, ctx) { value.to_s }
  end
end
