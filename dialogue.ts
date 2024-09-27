export const dialogue = [
    { message: "Now, where am I?"}, 
    { message: "Ahh, I see...", action: {function: "execute_say_words", delay: 1000}},
    { message: "...some sort of purgatory, I suppose."},
    { message: "Not without its charms, but cold, icy cold."},
    { message: "Look, the sun is rising", action: {function: "execute_sunrise", delay: 1000}},
    { message: "There are words here, but are they worth saying?", answers: [
        {message: "No", next: "say_end"}, {message: "Yes", next: "say_yes"}
    ]},
    { label: "say_yes", message: "*clears throat*", next: "say_yes_1", action: {function: "execute_say_words_1"}},
    {label: "say_yes_1", next: "say_end", action: {function: "execute_say_words_2"}},
    {label: "say_end", message: "So..."},
    {message: "Are they, perhaps, worth eating?", answers: [
        {message: "No", next: "eat_no"}, {message: "Yes", next: "eat_yes"} 
    ]},
    { label: "eat_yes", message: "Excellent.", next: "eat_yes_1", action: {function: "execute_eat_words", delay: 1000}},
    {label: "eat_yes_1", message: "*belch*", next: "adulterate_end"},
    { label: "eat_no", message: "That's fair.", next: "eat_end"},
    {label: "eat_end", message: "Worth adulterating?", answers: [
        {message: "No", next: "adulterate_no"}, {message: "Yes", next: "adulterate_yes"}
    ]},
    { label: "adulterate_yes", message: "Good.", next: "adulterate_yes_1", action: {function: "execute_adulterate_words", delay: 1000}},
    { label: "adulterate_yes_1", message: "An improvement.", next: "adulterate_end"},
    { label: "adulterate_no", message: "Very well, very well, leave it be.", next: "adulterate_end"},
    { label: "adulterate_end", message: "What's that?", action: {function: "execute_zenith", delay: 1000}},
    { speaker: "sun", message: "Hello, toad.", answers: [
            {message: "Pride", next: "toad_no"}, {message: "Humility", next: "toad_yes"}
        ]},
    {label: "toad_no", message: "Toad? Blethers!", next: "toad_no_1"},
    {label: "toad_no_1", message: "I'm no toad. I am a human being, amphibian only in being composed of heaven and earth... ", next: "toad_no_2"},
    {label: "toad_no_2", message: "My heart rises beyond any material sun. My calloused hands knead the wordly dough.", next: "toad_no_3"},
    {label: "toad_no_3", message: "We work towards a better future tirelessly, in which all prosper and all are at peace.", next: "toad_no_4"},
    {speaker: "sun", label: "toad_no_4", message: "No, you are a toad.", next: "toad_no_5"},
    {speaker: "sun", label: "toad_no_5", message: "Nothing wrong with that.", next: "toad_no_6"},
    {speaker: "sun", label: "toad_no_6", message: "Bred out of the mud by my beneficient rays.", next: "toad_no_7"},
    {speaker: "sun", label: "toad_no_7", message: "Perhaps you have not recognised me?", next: "toad_end"},
    {label: "toad_yes", message: "Yes, Toad. That's me. And you are?", next: "toad_end"},
    {speaker: "sun", label: "toad_end", message: "I am the Sun."},
    {speaker: "sun", message: "Beacon of enlightenment... "},
    {speaker: "sun", message: "...or the murderous, dissecting eye..."},
    {speaker: "sun", message: "...I leave you to decide."},
    {speaker: "sun", message: "It doesn't matter to me..."},
    {speaker: "sun", message: "...you should be grateful to see me in any case.", answers: [
        {message: "Beacon", next: "beacon_yes"}, {message: "Eye", next: "beacon_no"}
    ]},
    {label: "beacon_yes", message: "You are the symbol of our bright future!", next: "beacon_end"},
    {label: "beacon_no", message: "You are the symbol of our threatened ruin!", next: "beacon_no_1"},
    {label: "beacon_no_1", message: "Not the promise of a new dawn...", next: "beacon_no_2"},
    {label: "beacon_no_2", message: "...but the rising flames.", next: "beacon_end"},
    {label: "beacon_end", speaker: "sun", message: "As I just said..."},
    {speaker: "sun", message: "...I don't care."},
    {speaker: "sun", message: "And, more to the purpose, toad..."},
    {speaker: "sun", message: "...your time is up.", action: {function: "execute_stage_2", delay: 1000}},
  ]