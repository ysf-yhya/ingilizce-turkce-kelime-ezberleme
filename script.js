class Flashcard {
  constructor(englishWord, turkishWord) {
    this.englishWord = englishWord;
    this.turkishWord = turkishWord;
    this.isFlipped = false;
    this.element = this.createElement();
    this.element.addEventListener('click', () => this.toggle());
    this.deleteButton = this.element.querySelector('.delete-button');
    this.deleteButton.addEventListener('click', () => this.delete());
  }

  createElement() {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');

    const englishWordElement = document.createElement('h2');
    englishWordElement.classList.add('english-word');
    englishWordElement.textContent = this.englishWord;

    front.appendChild(englishWordElement);

    const back = document.createElement('div');
    back.classList.add('back');

    const turkishWordElement = document.createElement('h2');
    turkishWordElement.classList.add('turkish-word');
    turkishWordElement.textContent = this.turkishWord;

    back.appendChild(turkishWordElement);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Sil';

    card.appendChild(front);
    card.appendChild(back);
    card.appendChild(deleteButton);

    return card;
  }

  toggle() {
    this.isFlipped = !this.isFlipped;
    this.element.classList.toggle('is-flipped');
  }

  delete() {
    const index = flashcards.indexOf(this);
    if (index > -1) {
      flashcards.splice(index, 1);
    }
    this.element.remove();
  }
}

const cardContainer = document.querySelector('.card-container');
const wordListTextarea = document.getElementById('wordList');
const runButton = document.getElementById('runButton');
const clearButton = document.getElementById('clearButton');
const flashcards = [];

runButton.addEventListener('click', () => {
  const wordList = wordListTextarea.value.trim();
  if (wordList === '') {
    return;
  }

  const words = wordList.split('\n');
  words.forEach(word => {
    const parts = word.split(':');
    const englishWord = parts[0].trim();
    const turkishWord = parts[1].trim();
    const flashcard = new Flashcard(englishWord, turkishWord);
    flashcards.push(flashcard);
    cardContainer.appendChild(flashcard.element);
  });

  wordListTextarea.value = '';
});

clearButton.addEventListener('click', () => {
  cardContainer.innerHTML = '';
  flashcards.length = 0;
});
