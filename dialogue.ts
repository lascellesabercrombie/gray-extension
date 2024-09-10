export const dialogue = [
    { message: "Now, where am I?"}, 
    { message: "Ahh, I see...", concatenate: "title"},
    { message: "...some sort of purgatory."},
    { message: "Not without its charms, but cold, icy cold."},
    { message: "Look, the sun is rising", action: {function: "execute_sunrise", delay: 1000}},
    { message: "Well, there are words, but are they worth saying?", answers: [
        {message: "No", next: "say_end"}, {message: "Yes", next: "say_yes"}
    ]},
    { label: "say_yes", message: "*clears throat*", next: "say_yes_1", action: {function: "execute_say_words", delay: 1000}},
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
    { label: "adulterate_end", message: "What's that?"}
  ]