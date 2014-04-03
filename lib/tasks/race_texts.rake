require 'open-uri'

task get_race_texts: :environment do
  out_of_texts = false;
  n = 1;
  done_text = "Sorry, that text isn't yet in the system."

  until out_of_texts || n > 100
    p "Reading text #{n}"
    parsed = Nokogiri::HTML(open("http://www.seanwrona.com/typeracer/text.php?id=#{n}"))

    if parsed.children.text == done_text
      out_of_texts = true
    else
      passage = parsed.css("//p")[0].children.text[2..-1]
      source = parsed.css("//p")[1].text[2..-1]
      unless Race.find_by(passage: passage)
        Race.create(passage: passage, source: source)
      end

      n += 1
    end
  end
end