export type Quote = {
    text: string;
    author: string;
    id?: string;
    tags?: string[]
};

export const quotes: Quote[] = [
    {
        "text": "Try not to be a man of success, but rather try to become a man of value.",
        "author": "Albert Einstein"
    },
    {
        "text": "Stay hungry, stay foolish.",
        "author": "Steve Jobs"
    },
    {
        "text": "Blessings come in disguise",
        "author": "Chinese proverbs"
    },
    {
        "text": "If small holes aren't fixed, then big holes will bring hardship",
        "author": "Chinese proverbs"
    },
    {
        "text": "Ignorance is bliss.",
        "author": "General proverbs"
    },
    {
        "text": "All things are difficult at the start",
        "author": "General proverbs"
    },
    {
        "text": "Failure is the mother of success",
        "author": "General proverbs"
    },
    {
        "text": " A thousand-li journey starts with a footfall",
        "author": "General proverbs"
    },
    {
        "text": "Be the change that you wish to see in the world",
        "author": "Mahatma Gandhi"
    },
    {
        "text": "Live as if you were to die tomorrow. Learn as if you were to live forever",
        "author": "Mahatma Gandhi"
    },
    {
        "text": "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle",
        "author": "Albert Einstein"
    },
    {
        "text": "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present",
        "author": "Bill Keane"
    },
    {
        "text": "Everything you can imagine is real.",
        "author": "Pablo Picasso"
    },
    {
        "text": "To the well-organized mind, death is but the next great adventure.",
        "author": "J.K. Rowling, Harry Potter and the Sorcerer's Stone"
    },
    {
        "text": "Do what you can, with what you have, where you are.",
        "author": "Theodore Roosevelt"
    },
    {
        "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "author": "Winston S. Churchill"
    },
    {
        "text": "Empty your mind, be formless, shapeless, like water. You put water into a cup, it becomes the cup. You put it into a teapot, it becomes the teapot.",
        "author": "Bruce Lee"
    },
    {
        "text": "And, when you want something, all the universe conspires in helping you to achieve it.",
        "author": "Paulo Coelho, The Alchemist"
    },
    {
        "text": "It's the possibility of having a dream come true that makes life interesting.",
        "author": "Paulo Coelho, The Alchemist"
    },
    {
        "text": "You can't live your life for other people. You've got to do what's right for you, even if it hurts some people you love.",
        "author": "Nicholas Sparks, The Notebook"
    },
    {
        "text": "I can't give you a sure-fire formula for success, but I can give you a formula for failure: try to please everybody all the time.",
        "author": "Herbert Bayard Swope"
    },
    {
        "text": "Happiness is not something ready made. It comes from your own actions.",
        "author": "Dalai Lama XIV"
    },
    {
        "text": "Peace begins with a smile..",
        "author": "Mother Teresa"
    },
    {
        "text": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "author": "Ralph Waldo Emerson"
    },
    {
        "text": "I hope she'll be a fool -- that's the best thing a girl can be in this world, a beautiful little fool.",
        "author": "F. Scott Fitzgerald, The Great Gatsby"
    },
    {
        "text": "Two wrongs don't make a right, but they make a good excuse.",
        "author": "Thomas Szasz"
    },
    {
        "text": "First they ignore you. Then they ridicule you. And then they attack you and want to burn you. And then they build monuments to you.",
        "author": "Nicholas Klein"
    },
    {
        "text": "The master does nothing, yet leaves nothing undone. The ordinary person is always doing, yet much remains to be done.",
        "author": "Lao Tzu, Tao Te Ching"
    },
    {
        "text": "If my life is going to mean anything, I have to live it myself.",
        "author": "Rick Riordan, The Lightning Thief"
    },
    {
        "text": "You can't stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.",
        "author": "A.A. Milne, Winnie-the-Pooh"
    },
    {
        "text": "In the midst of chaos, there is also opportunity.",
        "author": "Sun Tzu, The Art of War"
    },
    {
        "text": "Pain is inevitable. Suffering is optional.",
        "author": "Haruki murakami, What I Talk About When I Talk About Running"
    },
    {
        "text": "Always do what you are afraid to do.",
        "author": "Ralph Waldo Emerson"
    },
    {
        "text": "Turn your wounds into wisdom.",
        "author": "Oprah Winfrey"
    },
    {
        "text": "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        "author": "Roy T. Bennett, The Light in the Heart"
    },
    {
        "text": "Fall seven times, stand up eight.",
        "author": "Japanese proverb"
    },
    {
        "text": "Your work is going to fill a large part of your life. The only way to be truly satisfied is to do what you believe is great work.",
        "author": "Steve Jobs"
    },
    {
        "text": "The way to get started is to quit talking and begin doing.",
        "author": "Walt Disney"
    },
    {
        "text": "It’s only after you’ve stepped outside your comfort zone that you begin to change, grow, and transform.",
        "author": "Roy T. Bennett"
    },
    {
        "text": "None but ourselves can free our minds.",
        "author": "Bob Marley"
    },
    {
        id: "quote-steve-jobs-focus",
        text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma—which is living with the results of other people's thinking.",
        author: "Steve Jobs",
        tags: ["focus", "life", "wisdom", "tech visionary"]
    },
    {
        id: "quote-thich-nhat-hanh-present",
        text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
        author: "Thich Nhat Hanh",
        tags: ["zen", "mindfulness", "present moment"]
    },
    {
        id: "quote-elon-musk-persistence",
        text: "When something is important enough, you do it even if the odds are not in your favor.",
        author: "Elon Musk",
        tags: ["persistence", "tech visionary", "founder"]
    },
    {
        id: "quote-lao-tzu-journey",
        text: "A journey of a thousand miles begins with a single step.",
        author: "Lao Tzu",
        tags: ["tao", "journey", "beginnings"]
    },
    {
        id: "quote-sadhguru-consciousness",
        text: "The only way to experience true wellbeing is to turn inward. This is what yoga means – not up, not out, but in.",
        author: "Sadhguru",
        tags: ["yoga", "consciousness", "inner peace", "isha"]
    },
    {
        id: "quote-churchill-perseverance",
        text: "If you're going through hell, keep going.",
        author: "Winston Churchill",
        tags: ["perseverance", "motivation", "resilience", "historical"]
    },
    {
        id: "quote-marcus-aurelius-mindfulness",
        text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        author: "Marcus Aurelius",
        tags: ["stoicism", "mindfulness", "inner control", "historical"]
    },
    {
        id: "quote-marie-curie-fearless",
        text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
        author: "Marie Curie",
        tags: ["wisdom", "historical", "fearlessness", "understanding"]
    },
    {
        id: "quote-lincoln-happiness",
        text: "Most folks are about as happy as they make up their minds to be.",
        author: "Abraham Lincoln",
        tags: ["mindset", "happiness", "historical", "wisdom"]
    },
    {
        id: "quote-dogen-zen-practice",
        text: "To study the Buddha Way is to study the self. To study the self is to forget the self.",
        author: "Dogen Zenji",
        tags: ["zen", "buddhism", "mindfulness", "self-knowledge"]
    },
    {
        id: "quote-lisa-su-innovation",
        text: "The best way to predict the future is to create it.",
        author: "Lisa Su",
        tags: ["tech visionary", "innovation", "founder", "leadership"]
    },
    {
        id: "quote-rumi-inner-light",
        text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
        author: "Rumi",
        tags: ["mindfulness", "inner peace", "wisdom", "spiritual"]
    },
    {
        id: "quote-sheryl-sandberg-leadership",
        text: "Done is better than perfect.",
        author: "Sheryl Sandberg",
        tags: ["tech leader", "productivity", "founder", "action"]
    },
    {
        id: "quote-buddha-peace",
        text: "Peace comes from within. Do not seek it without.",
        author: "Buddha",
        tags: ["zen", "inner peace", "mindfulness", "wisdom"]
    },
    {
        id: "quote-jack-ma-resilience",
        text: "Today is hard, tomorrow will be worse, but the day after tomorrow will be sunshine.",
        author: "Jack Ma",
        tags: ["resilience", "founder", "tech visionary", "perseverance"]
    },
    {
        id: "quote-epictetus-control",
        text: "Make the best use of what is in your power, and take the rest as it happens.",
        author: "Epictetus",
        tags: ["stoicism", "mindfulness", "wisdom", "historical"]
    },
    {
        id: "quote-einstein-curiosity",
        text: "I have no special talent. I am only passionately curious.",
        author: "Albert Einstein",
        tags: ["curiosity", "historical", "wisdom", "learning"]
    },
    {
        id: "quote-indra-nooyi-leadership",
        text: "Leadership is hard to define and good leadership even harder. But if you can get people to follow you to the ends of the earth, you are a great leader.",
        author: "Indra Nooyi",
        tags: ["leadership", "tech leader", "founder", "wisdom"]
    },
    {
        id: "quote-shunryu-suzuki-beginner",
        text: "In the beginner's mind there are many possibilities, in the expert's mind there are few.",
        author: "Shunryu Suzuki",
        tags: ["zen", "mindfulness", "beginner's mind", "wisdom"]
    },
    {
        id: "quote-grace-hopper-innovation",
        text: "The most dangerous phrase in the language is, 'We've always done it this way.'",
        author: "Grace Hopper",
        tags: ["innovation", "tech pioneer", "historical", "change"]
    },
    {
        id: "quote-seneca-time",
        text: "It is not that we have a short time to live, but that we waste a lot of it.",
        author: "Seneca",
        tags: ["stoicism", "time", "historical", "wisdom"]
    },
    {
        id: "quote-jensen-huang-courage",
        text: "The difference between vision and hallucination is others can see the vision too.",
        author: "Jensen Huang",
        tags: ["tech visionary", "founder", "leadership", "vision"]
    },
    {
        id: "quote-yogananda-awareness",
        text: "Live each moment completely and the future will take care of itself.",
        author: "Paramahansa Yogananda",
        tags: ["mindfulness", "present moment", "spiritual", "wisdom"]
    },
    {
        id: "quote-ada-lovelace-imagination",
        text: "Imagination is the Discovering Faculty, pre-eminently. It is that which penetrates into the unseen worlds around us.",
        author: "Ada Lovelace",
        tags: ["tech pioneer", "imagination", "historical", "innovation"]
    },
    {
        id: "quote-eckhart-tolle-presence",
        text: "Realize deeply that the present moment is all you ever have.",
        author: "Eckhart Tolle",
        tags: ["mindfulness", "present moment", "spiritual", "zen"]
    },
    {
        id: "quote-jeff-bezos-criticism",
        text: "If you never want to be criticized, for goodness' sake don't do anything new.",
        author: "Jeff Bezos",
        tags: ["tech visionary", "founder", "innovation", "criticism"]
    },
    {
        id: "quote-marcus-aurelius-obstacle",
        text: "The impediment to action advances action. What stands in the way becomes the way.",
        author: "Marcus Aurelius",
        tags: ["stoicism", "obstacles", "historical", "resilience"]
    },
    {
        id: "quote-ray-dalio-principles",
        text: "Pain + Reflection = Progress.",
        author: "Ray Dalio",
        tags: ["founder", "growth", "wisdom", "reflection"]
    },
    {
        id: "quote-thich-nhat-hanh-mindful",
        text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
        author: "Thich Nhat Hanh",
        tags: ["zen", "mindfulness", "present moment", "spiritual"]
    },
    {
        id: "quote-satya-nadella-empathy",
        text: "Empathy makes you a better innovator.",
        author: "Satya Nadella",
        tags: ["tech visionary", "empathy", "innovation", "tech leader"]
    },
    {
        id: "quote-lao-tzu-silence",
        text: "Silence is a source of great strength.",
        author: "Lao Tzu",
        tags: ["tao", "silence", "strength", "wisdom"]
    },
    {
        id: "quote-susan-wojcicki-creativity",
        text: "Creativity thrives best when constrained.",
        author: "Susan Wojcicki",
        tags: ["tech leader", "creativity", "innovation", "wisdom"]
    },
    {
        id: "quote-ramana-maharshi-self",
        text: "Your own Self-realization is the greatest service you can render the world.",
        author: "Ramana Maharshi",
        tags: ["spiritual", "self-knowledge", "wisdom", "service"]
    },
    {
        id: "quote-tim-cook-values",
        text: "Do what you love, and put your whole heart into it. Then just have fun and, above all else, remember that it's just a device. It's not meant to rule your life.",
        author: "Tim Cook",
        tags: ["tech visionary", "perspective", "tech leader", "balance"]
    },
    {
        id: "quote-naval-ravikant-knowledge",
        text: "Read what you love until you love to read.",
        author: "Naval Ravikant",
        tags: ["learning", "founder", "tech visionary", "wisdom"]
    },
    {
        id: "quote-james-clear-habits",
        text: "You do not rise to the level of your goals. You fall to the level of your systems.",
        author: "James Clear",
        tags: ["habits", "systems", "personal growth", "wisdom"]
    },
    {
        id: "quote-alan-watts-reality",
        text: "This is the real secret of life — to be completely engaged with what you are doing in the here and now.",
        author: "Alan Watts",
        tags: ["zen", "mindfulness", "present moment", "spiritual"]
    },
    {
        id: "quote-virginia-woolf-self",
        text: "I am rooted, but I flow.",
        author: "Virginia Woolf",
        tags: ["balance", "adaptability", "historical", "wisdom"]
    },
    {
        id: "quote-pema-chodron-courage",
        text: "The most fundamental aggression to ourselves, the most fundamental harm we can do to ourselves, is to remain ignorant by not having the courage to look at ourselves honestly.",
        author: "Pema Chödrön",
        tags: ["zen", "self-knowledge", "courage", "mindfulness"]
    },
    {
        id: "quote-reed-hastings-creativity",
        text: "Do not tolerate brilliant jerks. The cost to teamwork is too high.",
        author: "Reed Hastings",
        tags: ["tech leader", "teamwork", "founder", "leadership"]
    },
    {
        id: "quote-reid-hoffman-opportunity",
        text: "An entrepreneur is someone who jumps off a cliff and builds a plane on the way down.",
        author: "Reid Hoffman",
        tags: ["founder", "risk", "tech visionary", "entrepreneurship"]
    },
    {
        id: "quote-michelle-obama-growth",
        text: "For me, becoming isn't about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving.",
        author: "Michelle Obama",
        tags: ["growth", "progress", "wisdom", "perspective"]
    },
    {
        id: "quote-jiddu-krishnamurti-learning",
        text: "The ability to observe without evaluating is the highest form of intelligence.",
        author: "Jiddu Krishnamurti",
        tags: ["mindfulness", "observation", "spiritual", "wisdom"]
    },
    {
        id: "quote-brene-brown-vulnerability",
        text: "Vulnerability is not winning or losing; it's having the courage to show up and be seen when we have no control over the outcome.",
        author: "Brené Brown",
        tags: ["uncertainty", "courage", "fear", "vulnerability"]
    },
    {
        id: "quote-roosevelt-fear",
        text: "The only thing we have to fear is fear itself.",
        author: "Franklin D. Roosevelt",
        tags: ["fear", "courage", "historical", "wisdom"]
    },
    {
        id: "quote-rilke-uncertainty",
        text: "Be patient toward all that is unsolved in your heart and try to love the questions themselves.",
        author: "Rainer Maria Rilke",
        tags: ["uncertainty", "patience", "wisdom", "questions"]
    },
    {
        id: "quote-stoic-control",
        text: "Make the best use of what is in your power, and take the rest as it happens.",
        author: "Epictetus",
        tags: ["stoicism", "uncertainty", "control", "wisdom"]
    },
    {
        id: "quote-sartre-freedom",
        text: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
        author: "Jean-Paul Sartre",
        tags: ["existentialism", "freedom", "responsibility", "fear"]
    },
    {
        id: "quote-watts-worry",
        text: "The desire for security and the feeling of insecurity are the same thing. To hold your breath is to lose your breath.",
        author: "Alan Watts",
        tags: ["zen", "fear", "uncertainty", "paradox"]
    },
    {
        id: "quote-thich-nhat-hanh-fear",
        text: "Fear keeps us focused on the past or worried about the future. If we can acknowledge our fear, we can realize that right now we are okay.",
        author: "Thich Nhat Hanh",
        tags: ["zen", "fear", "present moment", "mindfulness"]
    },
    {
        id: "quote-camus-absurd",
        text: "In the midst of winter, I found there was, within me, an invincible summer.",
        author: "Albert Camus",
        tags: ["existentialism", "resilience", "uncertainty", "hope"]
    },
    {
        id: "quote-mandela-fear",
        text: "I learned that courage was not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear.",
        author: "Nelson Mandela",
        tags: ["fear", "courage", "wisdom", "resilience"]
    },
    {
        id: "quote-frankl-choice",
        text: "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances.",
        author: "Viktor E. Frankl",
        tags: ["attitude", "freedom", "uncertainty", "resilience"]
    },
    {
        id: "quote-zuckerberg-risk",
        text: "The biggest risk is not taking any risk... In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
        author: "Mark Zuckerberg",
        tags: ["risk", "action", "change", "uncertainty", "tech", "founder", "fear"]
    },
    {
        id: "quote-zen-notknowing",
        text: "Not knowing is most intimate.",
        author: "Zen saying (Charles Luk translation)",
        tags: ["uncertainty", "unknown", "mindfulness", "zen", "acceptance", "life"]
    },
    {
        id: "quote-twain-fear",
        text: "Courage is resistance to fear, mastery of fear - not absence of fear.",
        author: "Mark Twain",
        tags: ["fear", "courage", "historical figure", "uncertainty", "mastery"]
    },
    {
        id: "quote-watts-change",
        text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
        author: "Alan Watts",
        tags: ["change", "uncertainty", "acceptance", "flow", "philosophy", "life"]
    },
    {
        id: "quote-nin-blossom",
        text: "And the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom.",
        author: "Anaïs Nin",
        tags: ["risk", "growth", "uncertainty", "fear", "life", "literature"]
    },
    {
        id: "quote-musk-failure",
        text: "Failure is an option here. If things are not failing, you are not innovating enough.",
        author: "Elon Musk",
        tags: ["failure", "innovation", "risk", "uncertainty", "tech", "founder"]
    },
    {
        id: "quote-campbell-cave",
        text: "The cave you fear to enter holds the treasure you seek.",
        author: "Joseph Campbell",
        tags: ["fear", "unknown", "courage", "growth", "life", "mythology", "uncertainty"]
    },
    {
        id: "quote-frankl-space",
        text: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.",
        author: "Viktor Frankl",
        tags: ["response", "choice", "growth", "freedom", "uncertainty", "life", "philosophy"]
    },
    {
        id: "quote-chinese-slowly",
        text: "Be not afraid of growing slowly, be afraid only of standing still.",
        author: "Chinese Proverb",
        tags: ["growth", "change", "fear", "inaction", "life", "wisdom"]
    },
    {
        id: "quote-aurelius-impediment",
        text: "The impediment to action advances action. What stands in the way becomes the way.",
        author: "Marcus Aurelius",
        tags: ["action", "obstacle", "perspective", "uncertainty", "historical figure", "philosophy"]
    },
    {
        id: "quote-proverb-uncertainty",
        text: "The only certainty is uncertainty.",
        author: "Proverb",
        tags: ["uncertainty", "certainty", "philosophy", "life"]
    },
    {
        id: "quote-voltaire-doubt",
        text: "Doubt is not a pleasant condition, but certainty is absurd.",
        author: "Voltaire",
        tags: ["doubt", "certainty", "uncertainty", "philosophy", "historical figure"]
    },
    {
        id: "quote-waitley-risk",
        text: "Life is inherently risky. There is only one big risk you should avoid at all costs, and that is the risk of doing nothing.",
        author: "Denis Waitley",
        tags: ["risk", "inaction", "action", "fear", "life"]
    },
    {
        id: "quote-peale-action",
        text: "Action is a great restorer and builder of confidence. Inaction is not only the result, but the cause, of fear.",
        author: "Norman Vincent Peale",
        tags: ["action", "inaction", "fear", "confidence", "life"]
    },
    {
        id: "quote-shinseki-change",
        text: "If you don't like change, you're going to like irrelevance even less.",
        author: "General Eric Shinseki",
        tags: ["change", "irrelevance", "uncertainty", "historical figure", "leadership"]
    },
    {
        id: "quote-seneca-dare",
        text: "It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.",
        author: "Seneca",
        tags: ["dare", "difficulty", "fear", "action", "historical figure", "philosophy"]
    },
    {
        id: "quote-bach-caterpillar",
        text: "What the caterpillar calls the end of the world, the master calls a butterfly.",
        author: "Richard Bach",
        tags: ["change", "perspective", "transformation", "uncertainty", "life", "writer"]
    },
    {
        id: "quote-buddha-suffering",
        text: "Pain is inevitable. Suffering is optional.",
        author: "Buddha (Attributed)",
        tags: ["pain", "suffering", "choice", "buddhism", "life", "philosophy"]
    },
    {
        id: "quote-green-labyrinth",
        text: "The only way out of the labyrinth of suffering is to forgive.",
        author: "John Green",
        tags: ["suffering", "forgiveness", "healing", "life", "philosophy"]
    },
    {
        id: "quote-gibran-souls",
        text: "Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.",
        author: "Khalil Gibran",
        tags: ["suffering", "strength", "resilience", "growth", "historical figure", "life"]
    },
    {
        id: "quote-rumi-wound",
        text: "The wound is the place where the light enters you.",
        author: "Rumi",
        tags: ["pain", "suffering", "healing", "perspective", "spiritual", "historical figure", "life"]
    },
    {
        id: "quote-keller-overcoming",
        text: "Though the world is full of suffering, it is also full of the overcoming of it.",
        author: "Helen Keller",
        tags: ["suffering", "overcoming", "resilience", "perspective", "historical figure", "life"]
    },
    {
        id: "quote-emanuel-crisis",
        text: "Don't waste a good crisis.",
        author: "Rahm Emanuel (Attributed)",
        tags: ["crisis", "opportunity", "strategy", "political"]
    },
    {
        id: "quote-einstein-opportunity",
        text: "In the midst of every crisis, lies great opportunity.",
        author: "Albert Einstein",
        tags: ["crisis", "opportunity", "historical figure", "science"]
    },
    {
        id: "quote-proverb-sea",
        text: "A smooth sea never made a skillful sailor.",
        author: "English Proverb",
        tags: ["crisis", "challenge", "skill", "resilience", "life", "wisdom"]
    },
    {
        id: "quote-graham-basics",
        text: "When you're in a crisis, you have to get back to the basics.",
        author: "Paul Graham",
        tags: ["crisis", "strategy", "basics", "tech", "founder"]
    },
    {
        id: "quote-mlk-measure",
        text: "The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.",
        author: "Martin Luther King Jr.",
        tags: ["crisis", "challenge", "character", "leadership", "historical figure", "resilience"]
    },
    {
        id: "quote-keller-heart",
        text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
        author: "Helen Keller",
        tags: ["love", "heart", "feeling", "life", "historical figure"]
    },
    {
        id: "quote-laozi-loved",
        text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
        author: "Lao Tzu",
        tags: ["love", "strength", "courage", "taoism", "life"]
    },
    {
        id: "quote-dalailama-necessities",
        text: "Love and compassion are necessities, not luxuries. Without them, humanity cannot survive.",
        author: "Dalai Lama",
        tags: ["love", "compassion", "necessity", "life", "spiritual", "zen"]
    },
    {
        id: "quote-baldwin-masks",
        text: "Love takes off masks that we fear we cannot live without and know we cannot live within.",
        author: "James Baldwin",
        tags: ["love", "vulnerability", "authenticity", "fear", "historical figure", "life"]
    },
    {
        id: "quote-gandhi-wherethere",
        text: "Where there is love there is life.",
        author: "Mahatma Gandhi",
        tags: ["love", "life", "connection", "spiritual", "historical figure"]
    },
    {
        id: "quote-mlk-demanded",
        text: "Freedom is never voluntarily given by the oppressor; it must be demanded by the oppressed.",
        author: "Martin Luther King Jr.",
        tags: ["freedom", "justice", "demand", "historical figure", "political", "leadership"]
    },
    {
        id: "quote-sartre-condemned",
        text: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
        author: "Jean-Paul Sartre",
        tags: ["freedom", "responsibility", "choice", "existentialism", "philosophy", "life"]
    },
    {
        id: "quote-henry-liberty",
        text: "Give me liberty, or give me death!",
        author: "Patrick Henry",
        tags: ["freedom", "liberty", "demand", "historical figure", "political"]
    },
    {
        id: "quote-camus-unfree",
        text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
        author: "Albert Camus",
        tags: ["freedom", "existence", "rebellion", "philosophy", "historical figure", "life"]
    },
    {
        id: "quote-coelho-commitments",
        text: "Freedom is not the absence of commitments, but the ability to choose — and commit myself to — what is best for me.",
        author: "Paulo Coelho",
        tags: ["freedom", "choice", "commitment", "life", "spiritual"]
    },
    {
        id: "quote-rumi-wound-healing",
        text: "The wound is the place where the light enters you.",
        author: "Rumi",
        tags: ["healing", "pain", "perspective", "spiritual", "historical figure", "life"]
    },
    {
        id: "quote-various-feeltoheal",
        text: "The only way to heal is to feel.",
        author: "Various (Concept)",
        tags: ["healing", "feeling", "mindfulness", "emotional", "life"]
    },
    {
        id: "quote-hamilton-wounds",
        text: "There are wounds that never show on the body that are deeper and more hurtful than anything that bleeds.",
        author: "Laurell K. Hamilton",
        tags: ["healing", "pain", "emotional", "life"]
    },
    {
        id: "quote-amos-courage",
        text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.",
        author: "Tori Amos",
        tags: ["healing", "courage", "process", "life"]
    },
    {
        id: "quote-zukav-loveheals",
        text: "Eventually, you will come to understand that love heals everything, and love is all there is.",
        author: "Gary Zukav",
        tags: ["healing", "love", "spiritual", "life"]
    },
    {
        id: "quote-laozi-leader",
        text: "A leader is best when people barely know he exists, when his work is done, his aim fulfilled, they will say: we did it ourselves.",
        author: "Lao Tzu",
        tags: ["leadership", "authority", "subtlety", "taoism", "historical figure"]
    },
    {
        id: "quote-welch-growingothers",
        text: "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others.",
        author: "Jack Welch",
        tags: ["leadership", "growth", "others", "business", "historical figure"]
    },
    {
        id: "quote-godin-structure",
        text: "Structure is freedom. Not freedom from structure, but freedom within structure.",
        author: "Seth Godin",
        tags: ["structure", "freedom", "organization", "tech", "life"]
    },
    {
        id: "quote-tutu-default",
        text: "I am a leader by default, only because nature does not allow a vacuum.",
        author: "Desmond Tutu",
        tags: ["leadership", "authority", "service", "historical figure", "spiritual"]
    },
    {
        id: "quote-churchill-responsibility",
        text: "The price of greatness is responsibility.",
        author: "Winston Churchill",
        tags: ["leadership", "responsibility", "authority", "historical figure"]
    },
    {
        id: "quote-osho-surrender",
        text: "Surrender is not a weakness, it is strength. It is not to give up, but to let go.",
        author: "Osho",
        tags: ["surrender", "strength", "letting go", "acceptance", "spiritual", "osho"]
    },
    {
        id: "quote-zen-wave",
        text: "The wave knows it is the ocean.",
        author: "Zen Saying",
        tags: ["surrender", "unity", "acceptance", "zen", "spiritual", "life"]
    },
    {
        id: "quote-damasio-feeling",
        text: "We are not thinking machines that feel; rather, we are feeling machines that think.",
        author: "Antonio Damasio",
        tags: ["perspective", "feeling", "mind", "science", "historical figure", "life"]
    },
    {
        id: "quote-nazarian-hand",
        text: "Sometimes reaching out and taking someone's hand is the beginning of a journey. At other times it is the end of one.",
        author: "Vera Nazarian",
        tags: ["surrender", "letting go", "change", "journey", "perspective", "life"]
    },
    {
        id: "quote-gandhi-service",
        text: "The highest form of worship is the unselfish service of mankind.",
        author: "Mahatma Gandhi",
        tags: ["sacrifice", "service", "purpose", "spiritual", "historical figure", "life"]
    },
    {
        id: "quote-laozi-spontaneous",
        text: "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. Let reality be reality.",
        author: "Lao Tzu",
        tags: ["change", "resistance", "flow", "taoism", "life", "historical figure", "uncertainty"]
    },
    {
        id: "quote-yeats-chaos",
        text: "The best lack all conviction, while the worst are full of passionate intensity.",
        author: "W.B. Yeats",
        tags: ["chaos", "upheaval", "society", "character", "historical figure", "literature"]
    },
    {
        id: "quote-chopra-stillness",
        text: "In the midst of movement and chaos, keep stillness inside of you.",
        author: "Deepak Chopra",
        tags: ["chaos", "stillness", "mindfulness", "spiritual", "zen", "inner state"]
    },
    {
        id: "quote-darwin-responsive",
        text: "It's not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
        author: "Charles Darwin (Attributed)",
        tags: ["change", "adaptability", "survival", "life", "historical figure", "science"]
    },
    {
        id: "quote-jfk-crisis",
        text: "When written in Chinese the word 'crisis' is composed of two characters — one represents danger and the other represents opportunity.",
        author: "John F. Kennedy (Attributed)",
        tags: ["crisis", "danger", "opportunity", "upheaval", "historical figure", "political"]
    },
    {
        id: "quote-osho-aloneness",
        text: "Aloneness is positive, loneliness is negative. Loneliness is missing the other, aloneness is finding oneself.",
        author: "Osho",
        tags: ["aloneness", "loneliness", "self-discovery", "spiritual", "osho"]
    },
    {
        id: "quote-zen-sittingquietly",
        text: "Sitting quietly, doing nothing, spring comes, and the grass grows by itself.",
        author: "Zen Saying",
        tags: ["aloneness", "solitude", "peace", "zen", "life"]
    },
    {
        id: "quote-montaigne-oneself",
        text: "The greatest thing in the world is to know how to belong to oneself.",
        author: "Michel de Montaigne",
        tags: ["aloneness", "solitude", "self-reliance", "independence", "historical figure", "philosophy", "life"]
    },
    {
        id: "quote-thoreau-companion",
        text: "I love to be alone. I never found the companion that was so companionable as solitude.",
        author: "Henry David Thoreau",
        tags: ["aloneness", "solitude", "nature", "historical figure", "life", "philosophy"]
    },
    {
        id: "quote-washington-badcompany",
        text: "It is better to be alone than in bad company.",
        author: "George Washington",
        tags: ["aloneness", "solitude", "choice", "relationships", "historical figure", "leadership"]
    },
    {
        id: "quote-various-through",
        text: "The only way out is through.",
        author: "Various (Concept)",
        tags: ["overcoming", "difficulty", "healing", "life"]
    },
    {
        id: "quote-williamson-power",
        text: "Our greatest fear is not that we are inadequate; our greatest fear is that we are powerful beyond measure.",
        author: "Marianne Williamson",
        tags: ["fear", "limiting beliefs", "potential", "life", "spiritual"]
    },
    {
        id: "quote-johnson-habits",
        text: "The chains of habit are too weak to be felt until they are too strong to be broken.",
        author: "Samuel Johnson",
        tags: ["addiction", "habits", "bondage", "historical figure", "literature"]
    },
    {
        id: "quote-osho-mind",
        text: "The mind is a beautiful servant, but a dangerous master.",
        author: "Osho",
        tags: ["mind", "control", "limiting beliefs", "osho", "spiritual"]
    },
    {
        id: "quote-confucius-conquers",
        text: "He who conquers himself is the mightiest warrior.",
        author: "Confucius",
        tags: ["self-mastery", "overcoming", "inner struggle", "historical figure", "philosophy"]
    },
    {
        id: "quote-camus-summer",
        text: "In the midst of winter, I found there was, within me, an invincible summer.",
        author: "Albert Camus",
        tags: ["hope", "resilience", "renewal", "life", "historical figure", "philosophy"]
    },
    {
        id: "quote-roosevelt-believe",
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        tags: ["faith", "belief", "action", "historical figure", "leadership", "hope"]
    },
    {
        id: "quote-proverb-stars",
        text: "The darkest nights produce the brightest stars.",
        author: "Proverb",
        tags: ["renewal", "hope", "adversity", "perspective", "life", "nature"]
    },
    {
        id: "quote-watts-faith",
        text: "Have faith in the way things are.",
        author: "Alan Watts",
        tags: ["faith", "acceptance", "trust", "philosophy", "life", "spiritual"]
    },
    {
        id: "quote-common-newbeginning",
        text: "Every day is a new beginning.",
        author: "Common Saying",
        tags: ["renewal", "beginning", "hope", "life"]
    },
    {
        id: "quote-einstein-intuition",
        text: "The only valuable thing is intuition.",
        author: "Albert Einstein",
        tags: ["intuition", "value", "science", "historical figure"]
    },
    {
        id: "quote-ramdass-quieter",
        text: "The quieter you become, the more you can hear.",
        author: "Ram Dass",
        tags: ["inner voice", "wisdom", "stillness", "listening", "spiritual", "life"]
    },
    {
        id: "quote-koontz-soul",
        text: "Intuition is seeing with the soul.",
        author: "Dean Koontz",
        tags: ["intuition", "soul", "perception", "life", "literature"]
    },
    {
        id: "quote-osho-intuitionright",
        text: "Logic can be wrong, intuition is always right.",
        author: "Osho",
        tags: ["intuition", "truth", "logic", "osho", "spiritual"]
    },
    {
        id: "quote-socrates-wisdomknowing",
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
        tags: ["wisdom", "knowing", "ignorance", "philosophy", "historical figure"]
    },
    {
        id: "quote-bach-caterpillarb",
        text: "What the caterpillar calls the end of the world, the master calls a butterfly.",
        author: "Richard Bach",
        tags: ["transformation", "metamorphosis", "perspective", "life", "literature", "spiritual"]
    },
    {
        id: "quote-drucker-createfuture",
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
        tags: ["creation", "future", "action", "business", "life"]
    },
    {
        id: "quote-gandhi-bethechange",
        text: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi",
        tags: ["transformation", "change", "action", "spiritual", "historical figure", "life"]
    },
    {
        id: "quote-osho-acceptself",
        text: "The moment you accept yourself, you become beautiful.",
        author: "Osho",
        tags: ["transformation", "self-acceptance", "inner state", "osho", "spiritual"]
    },
    {
        id: "quote-aurelius-worldchange",
        text: "And all the world is change, and life itself is only perception.",
        author: "Marcus Aurelius",
        tags: ["transformation", "change", "life", "perspective", "historical figure", "philosophy"]
    },
    {
        id: "quote-laozi-mother",
        text: "The Tao is called the Great Mother: empty yet inexhaustible, it gives birth to the infinite worlds.",
        author: "Lao Tzu",
        tags: ["feminine principle", "creation", "taoism", "historical figure", "spiritual"]
    },
    {
        id: "quote-may-creativeprocess",
        text: "Creativity is the process of bringing something new into being. Creativity requires passion and commitment. It brings to our awareness what was previously hidden.",
        author: "Rollo May",
        tags: ["creativity", "process", "nurturing", "psychology", "life"]
    },
    {
        id: "quote-lee-formless",
        text: "Empty your mind, be formless, shapeless — like water.",
        author: "Bruce Lee",
        tags: ["feminine principle", "adaptability", "receptivity", "taoism", "zen", "philosophy"]
    },
    {
        id: "quote-nichols-gardening",
        text: "The best way to garden is to put on a wide-brimmed hat and some silly shoes, and then demand an obedience from nature that a mother demands.",
        author: "Beverly Nichols",
        tags: ["nurturing", "growth", "mother", "life", "literature"]
    },
    {
        id: "quote-angelou-creativity",
        text: "You can't use up creativity. The more you use, the more you have.",
        author: "Maya Angelou",
        tags: ["creativity", "abundance", "source", "historical figure", "life", "literature"]
    },
    {
        id: "quote-morrie-love",
        text: "The most important thing in life is to learn how to give out love, and to let it come in.",
        author: "Morrie Schwartz",
        tags: ["relationships", "connection", "love", "giving", "receiving", "life", "wisdom"]
    },
    {
        id: "quote-rowling-choices",
        text: "It is our choices, Harry, that show what we truly are, far more than our abilities.",
        author: "J.K. Rowling",
        tags: ["choices", "identity", "character", "life", "literature"]
    },
    {
        id: "quote-donne-island",
        text: "No man is an island entire of itself; every man is a piece of the continent.",
        author: "John Donne",
        tags: ["connection", "interdependence", "relationships", "historical figure", "literature"]
    },
    {
        id: "quote-various-buildrelationships",
        text: "Build relationships, not just networks.",
        author: "Various (Business wisdom)",
        tags: ["relationships", "connection", "networking", "business", "tech", "life"]
    },
    {
        id: "quote-philosophical-interdependence",
        text: "Interdependence is a fundamental law of nature.",
        author: "Philosophical Saying",
        tags: ["connection", "relationships", "interdependence", "nature", "philosophy", "life"]
    },
    {
        id: "quote-laozi-spontaneous-cycles",
        text: "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow.",
        author: "Lao Tzu",
        tags: ["change", "cycles", "resistance", "acceptance", "taoism", "life", "historical figure"]
    },
    {
        id: "quote-snicket-fate",
        text: "Fate is like a strange, unpopular restaurant, filled with odd waiters who bring you things you never asked for and don't like.",
        author: "Lemony Snicket",
        tags: ["fate", "perspective", "life", "literature"]
    },
    {
        id: "quote-heraclitus-constant",
        text: "The only constant is change.",
        author: "Heraclitus",
        tags: ["change", "impermanence", "cycles", "philosophy", "historical figure"]
    },
    {
        id: "quote-saying-sunrise",
        text: "And the sun rises. Every. Single. Day.",
        author: "Saying",
        tags: ["cycles", "renewal", "hope", "life", "nature"]
    },
    {
        id: "quote-heraclitus-destiny",
        text: "Character is destiny.",
        author: "Heraclitus",
        tags: ["fate", "destiny", "character", "philosophy", "historical figure"]
    },
    {
        id: "quote-nhat-hanh-birthdeath",
        text: "Birth and death are not opponents but rather conditions of the single process of change.",
        author: "Thich Nhat Hanh",
        tags: ["death", "transformation", "change", "cycle", "zen", "spiritual", "life"]
    },
    {
        id: "quote-osho-bridge",
        text: "Life is a bridge. Cross it, but don't build a house on it.",
        author: "Osho",
        tags: ["death", "letting go", "transience", "life", "osho", "spiritual"]
    },
    {
        id: "quote-murakami-partoflife",
        text: "Death is not the opposite of life, but a part of it.",
        author: "Haruki Murakami",
        tags: ["death", "life", "integration", "literature"]
    },
    {
        id: "quote-seneca-tomb",
        text: "Every moment of life is a step toward the tomb. The only death is the last.",
        author: "Seneca",
        tags: ["death", "letting go", "cycle", "life", "historical figure", "philosophy"]
    },
    {
        id: "quote-kublerross-cocoon",
        text: "Death is simply a shedding of the physical body, like the butterfly emerging from the cocoon. It is a transition to a higher state of consciousness.",
        author: "Elisabeth Kubler-Ross",
        tags: ["death", "transformation", "metamorphosis", "transition", "consciousness", "historical figure", "life", "psychology"]
    },
    {
        id: "quote-laozi-enough",
        text: "He who knows he has enough is rich.",
        author: "Lao Tzu",
        tags: ["temperance", "moderation", "contentment", "taoism", "historical figure"]
    },
    {
        id: "quote-aristotle-patience",
        text: "Patience is bitter, but its fruit is sweet.",
        author: "Aristotle",
        tags: ["patience", "value", "philosophy", "historical figure", "temperance"]
    },
    {
        id: "quote-saying-createbalance",
        text: "Balance is not something you find, it's something you create.",
        author: "Saying",
        tags: ["balance", "action", "life", "creation", "temperance"]
    },
    {
        id: "quote-rumi-holdinglettinggo",
        text: "Life is a balance between holding on and letting go.",
        author: "Rumi",
        tags: ["balance", "letting go", "life", "historical figure", "spiritual", "temperance"]
    },
    {
        id: "quote-greek-moderation",
        text: "Moderation in all things.",
        author: "Ancient Greek Wisdom (Attributed)",
        tags: ["temperance", "moderation", "philosophy", "historical figure"]
    },
    {
        id: "quote-dickinson-feathers",
        text: "Hope is the thing with feathers that perches in the soul...",
        author: "Emily Dickinson",
        tags: ["hope", "soul", "endurance", "historical figure", "literature"]
    },
    {
        id: "quote-saying-trustprocess",
        text: "Trust the process.",
        author: "Saying",
        tags: ["faith", "trust", "process", "life", "spiritual", "renewal"]
    },
    {
        id: "quote-hemingway-brokenplaces",
        text: "The world breaks everyone and afterward many are strong at the broken places.",
        author: "Ernest Hemingway",
        tags: ["renewal", "strength", "resilience", "hardship", "historical figure", "literature"]
    },
    {
        id: "quote-hugo-sunwillrise",
        text: "Even the darkest night will end and the sun will rise.",
        author: "Victor Hugo",
        tags: ["hope", "renewal", "darkness", "perspective", "historical figure", "literature"]
    },
    {
        id: "quote-bard-newending",
        text: "Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending.",
        author: "Carl Bard (Attributed)",
        tags: ["renewal", "beginning", "future", "choice", "life"]
    },
    {
        id: "quote-osho-dangerousmaster",
        text: "The mind is a beautiful servant, but a dangerous master.",
        author: "Osho",
        tags: ["ego", "master", "mind", "control", "spiritual", "osho"]
    },
    {
        id: "quote-heartsutra-emptiness",
        text: "Form is emptiness, emptiness is form.",
        author: "Heart Sutra",
        tags: ["ego", "emptiness", "illusion", "buddhism", "zen", "spiritual"]
    },
    {
        id: "quote-socrates-knowthyself",
        text: "Know thyself.",
        author: "Socrates",
        tags: ["self-knowledge", "wisdom", "philosophy", "historical figure", "ego"]
    },
    {
        id: "quote-levine-suffering",
        text: "Suffering is not wanting what is.",
        author: "Stephen Levine",
        tags: ["suffering", "ego", "resistance", "acceptance", "spiritual", "life"]
    },
    {
        id: "quote-muhammad-selfvictory",
        text: "The greatest victory is that which is won over the self.",
        author: "Prophet Muhammad",
        tags: ["self-mastery", "victory", "ego", "historical figure", "spiritual"]
    },
    {
        id: "quote-tyson-connected",
        text: "We are all connected. To each other, biologically. To the earth, chemically. To the rest of the universe, atomically.",
        author: "Neil deGrasse Tyson",
        tags: ["the world", "interconnectedness", "unity", "wholeness", "science", "life"]
    },
    {
        id: "quote-laozi-well",
        text: "The Tao is like a well: used but never used up. It is the eternal void. Filled with infinite possibilities.",
        author: "Lao Tzu",
        tags: ["the world", "wholeness", "creation", "taoism", "historical figure", "spiritual"]
    },
    {
        id: "quote-rumi-ocean",
        text: "You are not a drop in the ocean. You are the entire ocean in a drop.",
        author: "Rumi",
        tags: ["the world", "unity", "wholeness", "oneness", "spiritual", "historical figure", "life"]
    },
    {
        id: "quote-osho-fulfillment",
        text: "Fulfillment is not a goal, but a way of living.",
        author: "Osho",
        tags: ["fulfillment", "wholeness", "life", "process", "osho", "spiritual"]
    },
    {
        id: "quote-merton-happiness",
        text: "Happiness is not a matter of intensity but of balance, order, rhythm and harmony.",
        author: "Thomas Merton",
        tags: ["fulfillment", "wholeness", "balance", "harmony", "spiritual", "life"]
    },
    {
        id: "quote-osho-mysteryjoy",
        text: "Life is a mystery, a love story, a joy.",
        author: "Osho",
        tags: ["joy", "life", "essence", "spiritual", "osho"]
    },
    {
        id: "quote-keller-truehappiness",
        text: "True happiness is not attained through self-gratification, but through fidelity to a worthy purpose.",
        author: "Helen Keller",
        tags: ["happiness", "purpose", "internal", "historical figure", "life"]
    },
    {
        id: "quote-roosevelt-future",
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        tags: ["optimism", "future", "faith", "historical figure", "leadership"]
    },
    {
        id: "quote-muir-sunin us",
        text: "The sun shines not on us but in us.",
        author: "John Muir",
        tags: ["the sun", "joy", "optimism", "internal", "perspective", "historical figure", "life", "nature"]
    },
    {
        id: "quote-rumi-souljoy",
        text: "When you do things from your soul, you feel a river moving in you, a joy.",
        author: "Rumi",
        tags: ["joy", "soul", "action", "spiritual", "historical figure", "life"]
    },
    {
        id: "quote-buddha-anger",
        text: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.",
        author: "Buddha",
        tags: ["hatred", "anger", "letting go", "consequences", "buddhism", "spiritual", "historical figure"]
    },
    {
        id: "quote-confucius-graves",
        text: "Before you embark on a journey of revenge, dig two graves.",
        author: "Confucius",
        tags: ["revenge", "consequences", "destruction", "historical figure", "philosophy"]
    },
    {
        id: "quote-green-forgive",
        text: "The only way out of the labyrinth of suffering is to forgive.",
        author: "John Green",
        tags: ["suffering", "unable to let go", "forgiveness", "healing", "life", "literature"]
    },
    {
        id: "quote-osho-freemind",
        text: "Unless you are free from the mind, you are not free at all.",
        author: "Osho",
        tags: ["unable to let go", "mind", "freedom", "control", "osho", "spiritual"]
    },
    {
        id: "quote-powell-corrodes",
        text: "Hatred corrodes the container it is carried in.",
        author: "Colin Powell",
        tags: ["hatred", "consequences", "internal", "historical figure", "leadership"]
    },
    {
        id: "quote-saying-moments",
        text: "Life is just a series of moments. Every moment is a transition.",
        author: "Saying",
        tags: ["transitory", "life", "moments", "change"]
    },
    {
        id: "quote-osho-timelessness",
        text: "Only in the present is there timelessness.",
        author: "Osho",
        tags: ["timelessness", "present moment", "spiritual", "osho"]
    },
    {
        id: "quote-adage-thispass",
        text: "This too shall pass.",
        author: "Ancient Adage",
        tags: ["transitory", "impermanence", "perspective", "life", "wisdom"]
    },
    {
        id: "quote-lewis-humility",
        text: "Humility is not thinking less of yourself, it's thinking of yourself less.",
        author: "C.S. Lewis",
        tags: ["humble", "humility", "ego", "perspective", "historical figure", "literature", "spiritual"]
    },
    {
        id: "quote-laozi-lowest",
        text: "The highest dwells on the lowest.",
        author: "Lao Tzu",
        tags: ["humble", "humility", "taoism", "philosophy", "historical figure"]
    },
    {
        id: "quote-proverb-pridefall",
        text: "Pride goes before destruction, a haughty spirit before a fall.",
        author: "Proverbs 16:18",
        tags: ["arrogance", "pride", "consequences", "historical figure", "spiritual", "wisdom"]
    },
    {
        id: "quote-emerson-greatlittle",
        text: "A great man is always willing to be little.",
        author: "Ralph Waldo Emerson",
        tags: ["humble", "humility", "greatness", "historical figure", "philosophy", "literature"]
    },
    {
        id: "quote-gates-success",
        text: "Success is a lousy teacher. It seduces smart people into thinking they can't lose.",
        author: "Bill Gates",
        tags: ["arrogance", "pride", "success", "tech", "business", "historical figure"]
    },
    {
        id: "quote-buddha-attachment",
        text: "The root of suffering is attachment.",
        author: "Buddha",
        tags: ["greedy", "desire", "attachment", "suffering", "buddhism", "spiritual", "historical figure"]
    },
    {
        id: "quote-laozi-enough-greedy",
        text: "He who knows he has enough is rich.",
        author: "Lao Tzu",
        tags: ["greedy", "contentment", "wealth", "taoism", "historical figure"]
    },
    {
        id: "quote-osho-desire",
        text: "Desire is never fulfilled; it is only transferred from one object to another.",
        author: "Osho",
        tags: ["greedy", "desire", "fulfillment", "futility", "osho", "spiritual"]
    },
    {
        id: "quote-fromm-bottomlesspit",
        text: "Greed is a bottomless pit which exhausts the person in an endless effort to satisfy the need without ever reaching satisfaction.",
        author: "Erich Fromm",
        tags: ["greedy", "desire", "consequences", "psychology", "philosophy", "historical figure"]
    },
    {
        id: "quote-plato-contentlittle",
        text: "The greatest wealth is to live content with little.",
        author: "Plato",
        tags: ["greedy", "contentment", "wealth", "philosophy", "historical figure"]
    },
    {
        id: "quote-osho-destinycourage",
        text: "Destiny is not a fate, it is a courage.",
        author: "Osho",
        tags: ["fate", "destiny", "courage", "action", "spiritual", "osho"]
    },
    {
        id: "quote-kay-inventfuture-f",
        text: "The only way to predict the future is to invent it.",
        author: "Alan Kay",
        tags: ["fate", "destiny", "future", "action", "tech", "historical figure"]
    },
    {
        id: "quote-heraclitus-destiny-c",
        text: "Character is destiny.",
        author: "Heraclitus",
        tags: ["fate", "destiny", "character", "philosophy", "historical figure"]
    },
    {
        id: "quote-epictetus-circumstances",
        text: "Circumstances don't make the man, they only reveal him to himself.",
        author: "Epictetus",
        tags: ["fate", "circumstances", "character", "philosophy", "historical figure"]
    },
    {
        id: "quote-shaw-fearfate",
        text: "Man never yields to fate, but only to the fear of fate.",
        author: "George Bernard Shaw",
        tags: ["fate", "fear", "resistance", "historical figure", "literature"]
    },
    {
        id: "quote-osho-clock",
        text: "Don't become a slave to the clock or the calendar. Be free.",
        author: "Osho",
        tags: ["individual freedom", "society rigidness", "time", "constraints", "spiritual", "osho"]
    },
    {
        id: "quote-franklin-safety",
        text: "They who would give up essential Liberty, to purchase a little temporary Safety, deserve neither Liberty nor Safety.",
        author: "Benjamin Franklin",
        tags: ["individual freedom", "society rigidness", "liberty", "safety", "historical figure", "political"]
    },
    {
        id: "quote-emerson-beyourself",
        text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        author: "Ralph Waldo Emerson",
        tags: ["individual freedom", "society rigidness", "conformity", "authenticity", "historical figure", "life", "philosophy"]
    },
    {
        id: "quote-camus-rebellion",
        text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
        author: "Albert Camus",
        tags: ["individual freedom", "society rigidness", "rebellion", "philosophy", "historical figure", "life"]
    },
    {
        id: "quote-jobs-innovation",
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
        tags: ["individual freedom", "society rigidness", "innovation", "leadership", "tech", "historical figure"]
    },
    {
        id: "quote-jung-resist",
        text: "What you resist not only persists, but will grow in size.",
        author: "Carl Jung",
        tags: ["suppression", "resistance", "emotions", "psychology", "life", "historical figure"]
    },
    {
        id: "quote-augustine-truthlion",
        text: "The truth is like a lion. You don't have to defend it. Let it loose. It will defend itself.",
        author: "Augustine of Hippo",
        tags: ["suppression", "truth", "power", "philosophy", "historical figure", "spiritual"]
    },
    {
        id: "quote-saying-bottling",
        text: "Bottling up emotions is like stuffing a genie back into a bottle. It will eventually explode.",
        author: "Saying",
        tags: ["suppression", "emotions", "consequences", "life"]
    },
    {
        id: "quote-heine-books",
        text: "Where they burn books, they will, in the end, burn people.",
        author: "Heinrich Heine",
        tags: ["suppression", "ideas", "political", "consequences", "historical figure", "literature"]
    },
    {
        id: "quote-osho-available",
        text: "Do not control, do not try to change anything, just be available to whatsoever happens.",
        author: "Osho",
        tags: ["suppression", "control", "resistance", "acceptance", "spiritual", "osho"]
    },
    {
        id: "quote-saying-oweworstenemy",
        text: "We are our own worst enemy.",
        author: "Saying",
        tags: ["self-defeating", "internal obstacle", "life"]
    },
    {
        id: "quote-williamson-power-sd",
        text: "Our greatest fear is not that we are inadequate; our greatest fear is that we are powerful beyond measure.",
        author: "Marianne Williamson",
        tags: ["self-defeating", "fear", "limiting beliefs", "potential", "life", "spiritual"]
    },
    {
        id: "quote-osho-freemind-sd",
        text: "Unless you are free from the mind, you are not free at all.",
        author: "Osho",
        tags: ["self-defeating", "mind", "control", "freedom", "osho", "spiritual"]
    },
    {
        id: "quote-emerson-decidetobe",
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
        tags: ["self-defeating", "agency", "choice", "identity", "historical figure", "life", "philosophy"]
    },
    {
        id: "quote-confucius-conquers-sd",
        text: "He who conquers himself is the mightiest warrior.",
        author: "Confucius",
        tags: ["self-defeating", "overcoming", "self-mastery", "internal struggle", "historical figure", "philosophy"]
    },
    {
        id: "quote-buddha-peace",
        text: "Peace comes from within. Do not seek it without.",
        author: "Buddha",
        tags: ["inner conflicts", "peace", "mind", "buddhism", "spiritual", "historical figure"]
    },
    {
        id: "quote-osho-mystery",
        text: "Life is not a drama, it is a mystery. You are not a character, you are consciousness.",
        author: "Osho",
        tags: ["drama", "mystery", "consciousness", "osho", "spiritual"]
    },
    {
        id: "quote-buddha-mindcontrol",
        text: "The uncontrolled mind is like a monkey: jumping constantly from one thought to another.",
        author: "Buddha",
        tags: ["drama", "mind", "control", "peace", "buddhism", "spiritual", "historical figure"]
    },
    {
        id: "quote-shakespeare-stage",
        text: "All the world's a stage, and all the men and women merely players.",
        author: "William Shakespeare",
        tags: ["drama", "life", "world", "performance", "historical figure", "literature"]
    },
    {
        id: "quote-saying-rehearsal",
        text: "Stop acting as if life is a rehearsal. Live this day as if it were your last.",
        author: "Saying",
        tags: ["drama", "authenticity", "life", "performance"]
    },
    {
        id: "quote-ford-failure",
        text: "The only real failure is the one from which we learn nothing.",
        author: "Henry Ford",
        tags: ["loser mentality", "failure", "learning", "mindset", "historical figure", "business"]
    },
    {
        id: "quote-musk-failureoption",
        text: "Failure is an option here. If things are not failing, you are not innovating enough.",
        author: "Elon Musk",
        tags: ["loser mentality", "failure", "innovation", "risk", "tech", "founder"]
    },
    {
        id: "quote-churchill-stumbling",
        text: "Success is stumbling from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill",
        tags: ["loser mentality", "failure", "perseverance", "enthusiasm", "historical figure", "leadership"]
    },
    {
        id: "quote-osho-winners",
        text: "Winners look at the same stone that a loser avoids and find a way to make it a stepping stone.",
        author: "Osho",
        tags: ["loser mentality", "mindset", "perspective", "obstacle", "osho", "spiritual"]
    },
    {
        id: "quote-saying-believe",
        text: "If you believe in yourself, anything is possible.",
        author: "Saying",
        tags: ["loser mentality", "self-belief", "potential", "optimism", "life"]
    },
    {
        id: "quote-lasorda-determination",
        text: "The difference between the impossible and the possible lies in a man's determination.",
        author: "Tommy Lasorda",
        tags: ["determine", "determination", "will", "resolve", "impossible", "overcoming", "historical figure", "life"]
    },
    {
        id: "quote-saying-willway",
        text: "Where there is a will, there is a way.",
        author: "Saying",
        tags: ["will", "willpower", "determination", "solution", "life"]
    },
    {
        id: "quote-osho-willpower",
        text: "Will is freedom; will is power.",
        author: "Osho",
        tags: ["will", "willpower", "freedom", "power", "osho", "spiritual"]
    },
    {
        id: "quote-bonaparte-persevering",
        text: "Victory belongs to the most persevering.",
        author: "Napoleon Bonaparte",
        tags: ["resolve", "perseverance", "determination", "victory", "historical figure", "leadership"]
    },
    {
        id: "quote-jobs-perseverance",
        text: "I'm convinced that about half of what separates successful entrepreneurs from the non-successful ones is pure perseverance.",
        author: "Steve Jobs",
        tags: ["determination", "perseverance", "success", "tech", "historical figure", "business"]
    },
    {
        id: "quote-osho-nothing",
        text: "Attach yourself to nothing.",
        author: "Osho",
        tags: ["attachment", "non-attachment", "freedom", "osho", "spiritual"]
    },
    {
        id: "quote-saying-lettinggo",
        text: "Letting go is the lesson. Letting go is the practice.",
        author: "Saying",
        tags: ["attachment", "letting go", "practice", "spiritual", "zen"]
    },
    {
        id: "quote-thoreau-price",
        text: "The price of anything is the amount of life you exchange for it.",
        author: "Henry David Thoreau",
        tags: ["attachment", "cost", "material", "life", "historical figure"]
    },
    {
        id: "quote-buddhist-ignorancesuffering",
        text: "Ignorance is the root of suffering.",
        author: "Buddhist Teaching",
        tags: ["ignorance", "suffering", "buddhism", "spiritual"]
    },
    {
        id: "quote-mlk-dangerousignorance",
        text: "Nothing in the world is more dangerous than sincere ignorance and conscientious stupidity.",
        author: "Martin Luther King Jr.",
        tags: ["ignorance", "danger", "consequences", "historical figure", "leadership"]
    },
    {
        id: "quote-osho-notknowself",
        text: "The greatest ignorance is to not know yourself.",
        author: "Osho",
        tags: ["ignorance", "self-knowledge", "osho", "spiritual"]
    },
    {
        id: "quote-franklin-stupid",
        text: "We are born ignorant, but one must work hard to remain stupid.",
        author: "Benjamin Franklin",
        tags: ["ignorance", "stupidity", "choice", "historical figure", "life"]
    },
    {
        id: "quote-hugo-nightends",
        text: "Even the darkest night will end and the sun will rise.",
        author: "Victor Hugo",
        tags: ["light in the end of tunnel", "hope", "renewal", "darkness", "historical figure", "literature"]
    },
    {
        id: "quote-lasorda-determination-l",
        text: "The difference between the impossible and the possible lies in a man's determination.",
        author: "Tommy Lasorda",
        tags: ["light in the end of tunnel", "perseverance", "determination", "overcoming", "historical figure", "life"]
    },
    {
        id: "quote-fdr-hangon",
        text: "When you come to the end of your rope, tie a knot and hang on.",
        author: "Franklin D. Roosevelt",
        tags: ["light in the end of tunnel", "hope", "perseverance", "resilience", "historical figure", "leadership"]
    },
    {
        id: "quote-marsden-walkhope",
        text: "Walk on, walk on with hope in your heart, and you'll never walk alone.",
        author: "Gerry Marsden",
        tags: ["light in the end of tunnel", "hope", "perseverance", "support", "life", "art"]
    },
    {
        id: "quote-hugo-nightends-d",
        text: "Even the darkest night will end and the sun will rise.",
        author: "Victor Hugo",
        tags: ["darkness", "light", "hope", "renewal", "historical figure", "literature"]
    },
    {
        id: "quote-chinese-candle",
        text: "It is better to light a single candle than to curse the darkness.",
        author: "Chinese Proverb",
        tags: ["darkness", "light", "action", "wisdom", "life"]
    },
    {
        id: "quote-plato-fearlight",
        text: "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
        author: "Plato",
        tags: ["darkness", "light", "fear", "ignorance", "truth", "historical figure", "philosophy"]
    },
    {
        id: "quote-rumi-wound-d",
        text: "The wound is the place where the light enters you.",
        author: "Rumi",
        tags: ["darkness", "light", "healing", "perspective", "spiritual", "historical figure", "life"]
    },
    {
        id: "quote-osho-knowdarkness",
        text: "Unless you know the darkness, you will never know the light.",
        author: "Osho",
        tags: ["darkness", "light", "understanding", "perspective", "osho", "spiritual"]
    },
    {
        id: "quote-tolle-gratitude",
        text: "Acknowledging the good that you already have in your life is the foundation for all abundance.",
        author: "Eckhart Tolle",
        tags: ["gratitude", "abundance", "mindfulness", "present moment"]
    },
    {
        id: "quote-cicero-gratitude",
        text: "Gratitude is not only the greatest of virtues, but the parent of all the others.",
        author: "Cicero",
        tags: ["gratitude", "virtue", "character", "humanity"]
    },
    {
        id: "quote-jobs-gratitude",
        text: "You can't connect the dots looking forward; you can only connect them looking backward. So you have to trust that the dots will somehow connect in your future.",
        author: "Steve Jobs",
        tags: ["gratitude", "perspective", "trust", "future"]
    },
    {
        id: "quote-dalai-lama-gratitude",
        text: "The roots of all goodness lie in the soil of appreciation for goodness.",
        author: "Dalai Lama XIV",
        tags: ["gratitude", "goodness", "appreciation", "happiness"]
    },
    {
        id: "quote-emerson-gratitude",
        text: "Cultivate the habit of being grateful for every good thing that comes to you, and to give thanks continuously. And because all things have contributed to your advancement, you should include all things in your gratitude.",
        author: "Ralph Waldo Emerson",
        tags: ["gratitude", "habit", "thankfulness", "growth"]
    },
    {
        id: "quote-einstein-imagination",
        text: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.",
        author: "Albert Einstein",
        tags: ["creativity", "innovation", "imagination", "knowledge", "progress"]
    },
    {
        id: "quote-da-vinci-creativity",
        text: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci",
        tags: ["creativity", "learning", "innovation", "mindset"]
    },
    {
        id: "quote-gandhi-innovation",
        text: "You must be the change you wish to see in the world.",
        author: "Mahatma Gandhi",
        tags: ["innovation", "change", "action", "creativity"]
    },
    {
        id: "quote-lao-tzu-wu-wei",
        text: "The Way does nothing, yet nothing is left undone.",
        author: "Lao Tzu",
        tags: ["non-doing", "wu wei", "taoism", "effortlessness", "action"]
    },
    {
        id: "quote-chomei-hermitage",
        text: "The flowing river is ceaseless, and its water is never the same.",
        author: "Kamo no Chomei",
        tags: ["non-doing", "impermanence", "acceptance", "zen", "flow"]
    },
    {
        id: "quote-alan-watts-doing",
        text: "You don't *do* a wave, you *are* a wave.",
        author: "Alan Watts",
        tags: ["non-doing", "being", "existence", "identity", "zen"]
    },
    {
        id: "quote-marcus-aurelius-stillness",
        text: "The impediment to action advances action. What stands in the way becomes the way.",
        author: "Marcus Aurelius",
        tags: ["non-doing", "stoicism", "acceptance", "obstacle", "perspective"]
    },
    {
        id: "quote-steve-jobs-focus",
        text: "Innovation is saying no to 1,000 things.",
        author: "Steve Jobs",
        tags: ["non-doing", "focus", "simplicity", "innovation", "priority"]
    },
    {
        id: "quote-bruce-lee-effortless",
        text: "Empty your mind, be nameless, formless, like water.",
        author: "Bruce Lee",
        tags: ["effortlessness", "flow", "adaptability", "mastery", "zen"]
    },
    {
        id: "quote-miyamoto-musashi-effort",
        text: "The path of a warrior is to be without regret.",
        author: "Miyamoto Musashi",
        tags: ["effort", "discipline", "mastery", "focus", "mindset"]
    },
    {
        id: "quote-chogyam-trungpa-effort",
        text: "The bad news is you're falling through the air, nothing to hang on to, no parachute. The good news is, there's no ground.",
        author: "Chögyam Trungpa",
        tags: ["effortlessness", "letting go", "acceptance", "mindfulness", "zen"]
    },
    {
        id: "quote-steven-pressfield-resistance",
        text: "The more important a call or action is to our soul's evolution, the more Resistance we will feel toward pursuing it.",
        author: "Steven Pressfield",
        tags: ["effort", "resistance", "creativity", "discipline", "overcoming"]
    },
    {
        id: "quote-zen-master-effortless",
        text: "When walking, walk. When eating, eat.",
        author: "Zen Master",
        tags: ["effortlessness", "mindfulness", "presence", "simplicity", "zen"]
    },
    {
        id: "quote-lao-tzu-journey",
        text: "The journey of a thousand miles begins with a single step.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "perseverance", "beginnings", "action"]
    },
    {
        id: "quote-lao-tzu-self-knowledge",
        text: "Knowing others is intelligence; knowing yourself is true wisdom.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "self-awareness", "intelligence", "introspection"]
    },
    {
        id: "quote-lao-tzu-no-anger",
        text: "The best fighter is never angry.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "composure", "non-aggression", "peace"]
    },
    {
        id: "quote-lao-tzu-silence-strength",
        text: "Silence is a source of great strength.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "stillness", "power", "reflection"]
    },
    {
        id: "quote-lao-tzu-still-mind",
        text: "To the mind that is still, the whole universe surrenders.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "mindfulness", "peace", "power"]
    },
    {
        id: "quote-lao-tzu-nature-pace",
        text: "Nature does not hurry, yet everything is accomplished.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "patience", "nature", "effortlessness"]
    },
    {
        id: "quote-lao-tzu-contentment",
        text: "He who knows that enough is enough will always have enough.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "contentment", "simplicity", "gratitude"]
    },
    {
        id: "quote-lao-tzu-self-mastery",
        text: "Mastering others is strength. Mastering yourself is true power.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "self-control", "power", "discipline"]
    },
    {
        id: "quote-lao-tzu-letting-go",
        text: "When I let go of what I am, I become what I might be.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "transformation", "letting-go", "potential"]
    },
    {
        id: "quote-lao-tzu-treasures",
        text: "Simplicity, patience, compassion. These three are your greatest treasures.",
        author: "Lao Tzu",
        tags: ["taoism", "wisdom", "virtues", "simplicity", "patience", "compassion"]
    },
    {
        id: "quote-sun-tzu-deception",
        text: "All warfare is based on deception.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "deception", "tactics", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-subdue-no-fight",
        text: "The supreme art of war is to subdue the enemy without fighting.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "diplomacy", "peace", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-win-first",
        text: "Victorious warriors win first and then go to war.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "preparation", "planning", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-chaos-opportunity",
        text: "In the midst of chaos, there is also opportunity.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "resilience", "opportunity", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-know-enemy-self",
        text: "Know enemy, know self, win always.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "self-awareness", "knowledge", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-greatest-victory",
        text: "The greatest victory is that which requires no battle.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "peace", "efficiency", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-opportunities-multiply",
        text: "Opportunities multiply as they are seized.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "action", "initiative", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-appear-weak-strong",
        text: "Appear weak when you are strong, and strong when you are weak.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "deception", "tactics", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-plans-dark-night",
        text: "Let plans be dark as night; then fall like a thunderbolt.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "planning", "execution", "art-of-war"]
    },
    {
        id: "quote-sun-tzu-when-to-fight",
        text: "He will win who knows when to fight and when not to fight.",
        author: "Sun Tzu",
        tags: ["strategy", "wisdom", "judgment", "timing", "art-of-war"]
    },
    {
        id: "quote-sadhguru-life-play",
        text: "Don't be dead serious about your life. It's just a play.",
        author: "Sadhguru",
        tags: ["spirituality", "perspective", "joy", "life", "playfulness"]
    },
    {
        id: "quote-sadhguru-fear-mind",
        text: "The fear is simply because you are not living with life, you are living in your mind.",
        author: "Sadhguru",
        tags: ["spirituality", "mindfulness", "fear", "presence", "awareness"]
    },
    {
        id: "quote-sadhguru-resist-change",
        text: "If you resist change, you resist life.",
        author: "Sadhguru",
        tags: ["spirituality", "change", "acceptance", "growth", "life"]
    },
    {
        id: "quote-sadhguru-responsibility",
        text: "Responsibility is not a burden. It is a way of being.",
        author: "Sadhguru",
        tags: ["spirituality", "responsibility", "empowerment", "mindset", "action"]
    },
    {
        id: "quote-sadhguru-express-joy",
        text: "The most beautiful moments are when you express your joy, not seek it.",
        author: "Sadhguru",
        tags: ["spirituality", "joy", "expression", "happiness", "inner-peace"]
    },
    {
        id: "quote-sadhguru-joy-natural",
        text: "Joy is a natural phenomenon. Misery is your creation.",
        author: "Sadhguru",
        tags: ["spirituality", "joy", "happiness", "mindset", "creation"]
    },
    {
        id: "quote-sadhguru-intelligent-mind",
        text: "A truly intelligent mind is a wondering mind.",
        author: "Sadhguru",
        tags: ["spirituality", "intelligence", "curiosity", "learning", "wonder"]
    },
    {
        id: "quote-sadhguru-life-making",
        text: "Your life is your making. Make it wonderful.",
        author: "Sadhguru",
        tags: ["spirituality", "empowerment", "creation", "responsibility", "life-choice"]
    },
    {
        id: "quote-sadhguru-manage-self",
        text: "Manage your body, mind, emotion, and energy well for a quality life.",
        author: "Sadhguru",
        tags: ["spirituality", "well-being", "self-management", "energy", "mind-body"]
    },
    {
        id: "quote-sadhguru-total-involvement",
        text: "Whatever you do, do it with 100% involvement.",
        author: "Sadhguru",
        tags: ["spirituality", "involvement", "dedication", "presence", "action"]
    },
    {
        id: "quote-osho-miracle",
        text: "Be realistic: Plan for a miracle.",
        author: "Osho",
        tags: ["spirituality", "wisdom", "motivation", "miracles", "planning"]
    },
    {
        id: "quote-osho-life-fear-ends",
        text: "Life begins where fear ends.",
        author: "Osho",
        tags: ["spirituality", "wisdom", "motivation", "courage", "fearlessness"]
    },
    {
        id: "quote-osho-creativity-rebellion",
        text: "Creativity is the greatest rebellion in existence.",
        author: "Osho",
        tags: ["spirituality", "wisdom", "motivation", "creativity", "rebellion"]
    },
    {
        id: "quote-osho-relax",
        text: "Don't seek, don't search, don't ask, don't knock, don't demand – relax.",
        author: "Osho",
        tags: ["spirituality", "wisdom", "mindfulness", "relaxation", "letting-go"]
    },
    {
        id: "quote-osho-experience-life",
        text: "Experience life in all possible ways — good-bad, bitter-sweet, dark-light.",
        author: "Osho",
        tags: ["spirituality", "wisdom", "experience", "acceptance", "duality"]
    },
    {
        id: "quote-osho-masterpiece",
        text: "Drop the idea of becoming someone, because you are already a masterpiece.",
        author: "Osho",
        tags: ["spirituality", "wisdom", "motivation", "self-worth", "acceptance"]
    },
    {
        id: "quote-osho-creative-love-life",
        text: "To be creative means to be in love with life.",
        author: "Osho",
        tags: ["spirituality", "wisdom", "motivation", "creativity", "love-of-life"]
    },
    {
        id: "quote-tibetan-compassion",
        text: "སྙིང་རྗེ་ནི་དཔལ་འབྱོར་ཆེན་པོ་ཡིན། (Compassion is the greatest wealth)",
        author: "Tibetan Proverb",
        tags: ["tibetan", "compassion", "wisdom", "buddhism", "spiritual"]
    },
    {
        id: "quote-tibetan-patience",
        text: "བཟོད་པ་ནི་རྒྱན་མཆོག་ཡིན། (Patience is the supreme ornament)",
        author: "Tibetan Buddhist Teaching",
        tags: ["tibetan", "patience", "wisdom", "buddhism", "spiritual"]
    },
    {
        id: "quote-milarepa-mind",
        text: "The nature of mind is like the sky - vast, open, and unchanging.",
        author: "Milarepa",
        tags: ["tibetan", "mind", "buddhism", "meditation", "spiritual", "zen"]
    },
    {
        id: "quote-tibetan-happiness",
        text: "བདེ་སྐྱིད་སེམས་ཀྱི་རང་བཞིན་ཡིན། (Happiness is the nature of mind)",
        author: "Tibetan Saying",
        tags: ["tibetan", "happiness", "mind", "buddhism", "spiritual"]
    },
    {
        id: "quote-padmasambhava-fear",
        text: "Within the body there is no need to search elsewhere. The mind is the Buddha.",
        author: "Padmasambhava",
        tags: ["tibetan", "buddhism", "enlightenment", "mind", "spiritual"]
    },
    {
        id: "quote-tsongkhapa-wisdom",
        text: "If you wish to attain enlightenment, train in compassion.",
        author: "Je Tsongkhapa",
        tags: ["tibetan", "compassion", "enlightenment", "buddhism", "spiritual"]
    },
    {
        id: "quote-tibetan-present",
        text: "དུས་དེ་རིང་ལ་བརྩོན་འགྲུས་བྱེད། (Practice diligence in the present moment)",
        author: "Tibetan Wisdom",
        tags: ["tibetan", "mindfulness", "present", "wisdom", "spiritual"]
    },
    {
        id: "quote-rumi-love-wound",
        text: "The wound is the place where the Light enters you.",
        author: "Rumi",
        tags: ["rumi", "sufism", "poetry", "healing", "spiritual", "love"]
    },
    {
        id: "quote-rumi-persian-love",
        text: "عشق آمد و من بنده‌ی او شدم (Love came and I became a slave to it)",
        author: "Rumi",
        tags: ["rumi", "sufism", "persian", "love", "poetry", "spiritual"]
    },
    {
        id: "quote-rumi-soul",
        text: "You are not a drop in the ocean. You are the entire ocean in a drop.",
        author: "Rumi",
        tags: ["rumi", "sufism", "soul", "spirituality", "wisdom", "mysticism"]
    },
    {
        id: "quote-rumi-persian-seek",
        text: "آنچه می‌جویی تو را می‌جوید (What you seek is seeking you)",
        author: "Rumi",
        tags: ["rumi", "sufism", "persian", "destiny", "spiritual", "seeking"]
    },
    {
        id: "quote-rumi-silence",
        text: "Silence is the language of God, all else is poor translation.",
        author: "Rumi",
        tags: ["rumi", "sufism", "silence", "spirituality", "divine", "wisdom"]
    },
    {
        id: "quote-rumi-heart",
        text: "Let yourself be silently drawn by the strange pull of what you really love.",
        author: "Rumi",
        tags: ["rumi", "sufism", "love", "heart", "passion", "spiritual"]
    },
    {
        id: "quote-rumi-persian-dance",
        text: "برقص که زندگی کوتاه است (Dance, for life is short)",
        author: "Rumi",
        tags: ["rumi", "sufism", "persian", "dance", "joy", "life"]
    },
    {
        id: "quote-rumi-grief",
        text: "Don't grieve. Anything you lose comes round in another form.",
        author: "Rumi",
        tags: ["rumi", "sufism", "grief", "transformation", "wisdom", "acceptance"]
    },
    {
        id: "quote-rumi-persian-soul",
        text: "جان من را به جان تو ربودند (They stole my soul with your soul)",
        author: "Rumi",
        tags: ["rumi", "sufism", "persian", "soul", "love", "poetry"]
    },
    {
        id: "quote-rumi-become",
        text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
        author: "Rumi",
        tags: ["rumi", "sufism", "wisdom", "self-improvement", "transformation", "spiritual"]
    },
    {
        id: "quote-rumi-persian-wings",
        text: "پر بگشا و پرواز کن (Spread your wings and fly)",
        author: "Rumi",
        tags: ["rumi", "sufism", "persian", "freedom", "courage", "spiritual"]
    },
    {
        id: "quote-rumi-field",
        text: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.",
        author: "Rumi",
        tags: ["rumi", "sufism", "unity", "transcendence", "spirituality", "peace"]
    },
    {
        id: "quote-chief-seattle",
        text: "The Earth does not belong to us. We belong to the Earth.",
        author: "Chief Seattle",
        tags: ["native-american", "earth", "nature", "wisdom", "indigenous", "environment"]
    },
    {
        id: "quote-black-elk",
        text: "The Great Spirit is in all things: He is in the air we breathe. The Great Spirit is our Father, but the Earth is our Mother.",
        author: "Black Elk",
        tags: ["native-american", "great-spirit", "earth", "nature", "spiritual", "wisdom"]
    },
    {
        id: "quote-native-seven-generations",
        text: "In every deliberation, we must consider the impact on the seventh generation.",
        author: "Iroquois Wisdom",
        tags: ["native-american", "future", "generations", "responsibility", "wisdom", "stewardship"]
    },
    {
        id: "quote-sitting-bull",
        text: "Let us put our minds together and see what life we can make for our children.",
        author: "Sitting Bull",
        tags: ["native-american", "unity", "children", "future", "wisdom", "community"]
    },
    {
        id: "quote-native-walk-softly",
        text: "Walk softly on the Earth, for she is your mother and you are her child.",
        author: "Native American Proverb",
        tags: ["native-american", "earth", "respect", "nature", "mother", "wisdom"]
    },
    {
        id: "quote-native-wind",
        text: "Listen to the wind, it talks. Listen to the silence, it speaks. Listen to your heart, it knows.",
        author: "Native American Wisdom",
        tags: ["native-american", "nature", "listening", "heart", "wisdom", "silence"]
    },
    {
        id: "quote-celtic-oak",
        text: "The oak tree teaches us that true strength comes from deep roots.",
        author: "Celtic Wisdom",
        tags: ["celtic", "oak", "strength", "roots", "nature", "wisdom"]
    },
    {
        id: "quote-druid-triple",
        text: "Three things give wisdom: meditation, imitation, experience.",
        author: "Celtic Triads",
        tags: ["celtic", "wisdom", "meditation", "learning", "experience", "druid"]
    },
    {
        id: "quote-celtic-awen",
        text: "Awen - The flowing spirit of inspiration that connects all living things.",
        author: "Druidic Teaching",
        tags: ["celtic", "awen", "inspiration", "spirit", "druid", "connection"]
    },
    {
        id: "quote-celtic-forest",
        text: "In the sacred grove, we remember that we are part of the forest, not apart from it.",
        author: "Celtic Druid Wisdom",
        tags: ["celtic", "forest", "grove", "nature", "unity", "druid"]
    },
    {
        id: "quote-celtic-seasons",
        text: "The wheel turns, the seasons change, and we learn that all endings are also beginnings.",
        author: "Celtic Spirituality",
        tags: ["celtic", "seasons", "change", "cycles", "transformation", "nature"]
    },
    {
        id: "quote-celtic-ancestors",
        text: "We are the ancestors of future generations. Let us be worthy of their remembrance.",
        author: "Celtic Proverb",
        tags: ["celtic", "ancestors", "future", "legacy", "responsibility", "wisdom"]
    }
]
