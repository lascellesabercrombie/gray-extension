export const dialogue = [
    { message: "Now, where am I?"}, 
    { message: "Ahh, I see...", concatenate: "title"},
    { message: "...some sort of purgatory."},
    { message: "Not without its charms, but cold, icy cold."},
    { message: "But look, the sun is rising", action: [{function: "execute_sunrise", delay: 1000}]},
    { message: "Well, there are words, but are they worth saying?", answers: [
      {message: "Yes", next: "say_yes"}, {message: "No", next: "say_end"}
    ]},
    { label: "say_yes", message: "*clears throat*", next: "say_end", action: [{function: "execute_say_words", delay: 1000}]},
    { label: "say_end", message: "Are they, perhaps, worth eating?", answers: [
      {message: "Yes", next: "eat_yes"}, {message: "No", next: "eat_no"}
    ]},
    { label: "eat_yes", message: "Excellent.",  action: [{function: "execute_eat_words", delay: 1000}]},
    { message: "I see, I see"},
    { message: "Worth adulterating, then?"},
    { message: "Very well, very well, leave it be."}
  ]