const chapterData = {
  "Chapter 1: Foundations of Psychology": [
    {
      question: "What is psychology?",
      answer: "Psychology is the scientific study of behavior and mental processes."
    },
    {
      question: "What is the difference between basic and applied psychology?",
      answer: "Basic psychology seeks knowledge for its own sake, while applied psychology uses findings to solve practical problems."
    },
    {
      question: "What is the biopsychosocial approach?",
      answer: "A perspective that behavior and mental processes are shaped by biological, psychological, and social factors."
    },
    {
      question: "Why is critical thinking important in psychology?",
      answer: "It helps evaluate evidence objectively, avoid bias, and distinguish scientific claims from opinion."
    },
    {
      question: "What is the scientific method in psychology?",
      answer: "A process of observing, creating hypotheses, testing them, analyzing data, and drawing evidence-based conclusions."
    }
  ],
  "Chapter 2: Research Methods": [
    {
      question: "What is an operational definition?",
      answer: "A precise explanation of how a variable is measured or manipulated in a study."
    },
    {
      question: "What is the difference between correlation and causation?",
      answer: "Correlation shows variables are related, but only controlled experiments can support causal conclusions."
    },
    {
      question: "What is random assignment?",
      answer: "Assigning participants to groups by chance so groups are similar and bias is reduced."
    },
    {
      question: "What is a confounding variable?",
      answer: "An outside factor that changes with the independent variable and may influence results."
    },
    {
      question: "What does peer review do?",
      answer: "It has experts evaluate research quality before publication, improving rigor and credibility."
    }
  ],
  "Chapter 3: Biological Bases of Behavior": [
    {
      question: "What is the role of neurons?",
      answer: "Neurons receive, process, and transmit information through electrochemical signals."
    },
    {
      question: "What is a neurotransmitter?",
      answer: "A chemical messenger released into synapses to communicate between neurons."
    },
    {
      question: "What does the frontal lobe primarily control?",
      answer: "Executive functions such as planning, decision making, impulse control, and voluntary movement."
    },
    {
      question: "How does the sympathetic nervous system affect the body?",
      answer: "It activates the fight-or-flight response by increasing alertness and physiological arousal."
    },
    {
      question: "What is neuroplasticity?",
      answer: "The brain's ability to reorganize and form new neural connections through experience and learning."
    }
  ],
  "Chapter 4: Learning and Memory": [
    {
      question: "What is classical conditioning?",
      answer: "Learning through association where a neutral stimulus comes to trigger a response."
    },
    {
      question: "What is operant conditioning?",
      answer: "Learning based on consequences, where behavior is shaped by reinforcement or punishment."
    },
    {
      question: "What is positive reinforcement?",
      answer: "Adding a desirable stimulus after a behavior to increase that behavior."
    },
    {
      question: "What is working memory?",
      answer: "A limited-capacity system for temporarily holding and manipulating information."
    },
    {
      question: "What improves long-term memory retention?",
      answer: "Strategies like spaced repetition, elaborative rehearsal, retrieval practice, and meaningful organization."
    }
  ],
  "Chapter 5: Cognition, Emotion, and Motivation": [
    {
      question: "What is cognition?",
      answer: "Cognition includes mental processes such as thinking, problem solving, language, and decision making."
    },
    {
      question: "What is confirmation bias?",
      answer: "A tendency to seek or interpret information in ways that support existing beliefs."
    },
    {
      question: "What is the James-Lange theory of emotion?",
      answer: "It proposes that physiological arousal comes first, and emotion is the interpretation of that arousal."
    },
    {
      question: "What is intrinsic motivation?",
      answer: "Motivation driven by internal satisfaction or interest rather than external rewards."
    },
    {
      question: "How does stress affect cognition?",
      answer: "Moderate stress can sharpen focus, but chronic or intense stress can impair memory, attention, and decision making."
    }
  ]
};

const chapterSelect = document.getElementById("chapterSelect");
const shuffleBtn = document.getElementById("shuffleBtn");
const progressText = document.getElementById("progressText");
const flashcardButton = document.getElementById("flashcard");
const cardSideLabel = document.getElementById("cardSideLabel");
const cardContent = document.getElementById("cardContent");
const prevBtn = document.getElementById("prevBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const nextBtn = document.getElementById("nextBtn");

let currentChapter = "";
let cards = [];
let currentIndex = 0;
let showingAnswer = false;

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function populateChapters() {
  const chapters = Object.keys(chapterData);
  chapters.forEach((chapter) => {
    const option = document.createElement("option");
    option.value = chapter;
    option.textContent = chapter;
    chapterSelect.append(option);
  });

  currentChapter = chapters[0];
  chapterSelect.value = currentChapter;
  cards = [...chapterData[currentChapter]];
}

function updateCard() {
  if (cards.length === 0) {
    progressText.textContent = "No cards available";
    cardSideLabel.textContent = "Info";
    cardContent.textContent = "Choose a chapter with available content.";
    showAnswerBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const currentCard = cards[currentIndex];
  cardSideLabel.textContent = showingAnswer ? "Answer" : "Question";
  cardContent.textContent = showingAnswer ? currentCard.answer : currentCard.question;
  progressText.textContent = `Card ${currentIndex + 1} of ${cards.length}`;
  showAnswerBtn.textContent = showingAnswer ? "Show Question" : "Show Answer";
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;
}

function resetDeck() {
  cards = [...chapterData[currentChapter]];
  currentIndex = 0;
  showingAnswer = false;
  updateCard();
}

chapterSelect.addEventListener("change", () => {
  currentChapter = chapterSelect.value;
  resetDeck();
});

shuffleBtn.addEventListener("click", () => {
  cards = shuffleArray(cards);
  currentIndex = 0;
  showingAnswer = false;
  updateCard();
});

flashcardButton.addEventListener("click", () => {
  showingAnswer = !showingAnswer;
  updateCard();
});

showAnswerBtn.addEventListener("click", () => {
  showingAnswer = !showingAnswer;
  updateCard();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    showingAnswer = false;
    updateCard();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex += 1;
    showingAnswer = false;
    updateCard();
  }
});

populateChapters();
updateCard();
