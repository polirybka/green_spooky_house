const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;  //отвечают за состояние переворота карточек
let lockBoard = false;          // если true - запретит переворот карточек
let firstCard, secondCard; // номера карточек в группе
console.log

function flipCard() { //Функция получает доступ к списку классов элемента и активирует класс flip
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip'); //добавляет класс flip при нажатии

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() { //проверка совпадения карточек с помощью размещения data-img в html разметке на каждой карточке
  let isMatch = firstCard.dataset.img === secondCard.dataset.img;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() { // блокировка карточек если нашлись 2 одинакове
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() { //перевернет карточки обратно если выбраны разные карточки
  lockBoard = true;

  setTimeout(() => { //указывает время до возврата неподходящих карточек
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() { // позволяет обновлять переменные
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() { // рандомизация карточек
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 10);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard)); // событие при клике на каточку
