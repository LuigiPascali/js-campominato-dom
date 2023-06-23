function generateBoard(difficulty) {
    const board = document.getElementById('board');
    board.innerHTML = '';
  
    let rows, cols, maxNum;
    switch (difficulty) {
      case 1:
        rows = 10;
        cols = 10;
        maxNum = 100;
        break;  
      case 2:
        rows = 9;
        cols = 9;
        maxNum = 81;
        break;
      case 3:
        rows = 7;
        cols = 7;
        maxNum = 49;
        break;
    }
  
    // Generazione delle bombe:
    const bombs = generateBombs(difficulty, maxNum);
    const maxScore = rows * cols - bombs.length;
    let score = 0;
    let gameOver = false;
  
    // Seleziona la card dei game stats:
    const gameStatsCard = document.querySelector('.card');
  
    // Aggiorna i contatori nella card:
    const bombCounter = gameStatsCard.querySelector('#bomb-counter');
    const pointCounter = gameStatsCard.querySelector('#point-counter');
    
    bombCounter.textContent = bombs.length;
    pointCounter.textContent = score;
    
  
    for (let row = 1; row <= rows; row++) {
      // Creazione di un elemento div per rappresentare una riga:
      const rowElem = document.createElement('div');
      rowElem.className = 'row';
  
      for (let col = 1; col <= cols; col++) {
        // Creazione di un elemento div per rappresentare una cella:
        const cell = document.createElement('div');
        cell.className = 'col-1 cell';
  
        // Assegnazione del testo alla cella corrente basato sulla posizione nella griglia:
        cell.innerText = (row - 1) * cols + col;
  
        // Aggiunta dell'evento di click alla cella
        cell.addEventListener('click', handleClick);
  
        // Aggiunta della cella alla riga corrente:
        rowElem.appendChild(cell);
      }
  
      // Aggiunta della riga al contenitore della griglia:
      board.appendChild(rowElem);
    }
  
    // Mostra il bottone di reset:
    document.getElementById('reset-button').style.display = 'block';
  
    function generateBombs(difficulty, maxNum) {
      const bombs = [];
      const maxBombs = 16;
      let i = 0;
  
      while (i < maxBombs) {
        const bomb = Math.floor(Math.random() * maxNum) + 1;
        if (!bombs.includes(bomb)) {
          bombs.push(bomb);
          i++;
        }
      }
  
      return bombs;
    }
  
    function handleClick(event) {
      if (gameOver) {
        return;
      }
  
      const cell = event.target;
      const cellNum = parseInt(cell.innerText);
      const lossCounter = document.getElementById('loss-counter');
 
      if (bombs.includes(cellNum)) {
        // Se clicco su una bomba il gioco finisce:
        cell.classList.add('bomb');
        alert('Game over! Your score is ' + score);
        gameOver = true;
        removeClickEvent();
        
        // Mostra tutte le bombe:
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
          const cellNum = parseInt(cell.innerText);
          if (bombs.includes(cellNum)) {
            cell.classList.add('bomb');
          }
        });
        lossCounter.textContent = parseInt(lossCounter.textContent) + 1;
      } else {
        // Altrimenti aumento il punteggio:
        cell.classList.add('clicked');
        score++;
  
        if (score === maxScore) {
          // Se non clicco su nessuna bomba ho vinto:
          alert('Congratulations! You won! Your score is ' + score);
          gameOver = true;
          removeClickEvent();
        }
      }
  
      // Aggiorna i contatori nella card:
      bombCounter.textContent = bombs.length;
      pointCounter.textContent = score;
      lossCounter.textContent = gameOver ? 1 : 0;
    }
  
    function removeClickEvent() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
      });
    }
  }
  
  // Seleziona i bottoni di difficoltà:
  const easyButton = document.getElementById('easy-button');
  const mediumButton = document.getElementById('medium-button');
  const hardButton = document.getElementById('hard-button');
  
  // Aggiungi un evento di click al bottone di difficoltà facile:
  easyButton.addEventListener('click', function() {
    generateBoard(1);
  
    // Disabilita gli altri bottoni di difficoltà:
    mediumButton.disabled = true;
    hardButton.disabled = true;
  });
  
  // Aggiungi un evento di click al bottone di difficoltà media:
  mediumButton.addEventListener('click', function() {
    generateBoard(2);
  
    // Disabilita gli altri bottoni di difficoltà:
    easyButton.disabled = true;
    hardButton.disabled = true;
  });
  
  // Aggiungi un evento di click al bottone di difficoltà difficile:
  hardButton.addEventListener('click', function() {
    generateBoard(3);
  
    // Disabilita gli altri bottoni di difficoltà
    easyButton.disabled = true;
    mediumButton.disabled = true;
  });
  
  // Seleziona il bottone di reset:
  const resetButton = document.getElementById('reset-button');
  
  // Aggiungi un evento di click al bottone di reset:
  resetButton.addEventListener('click', function() {
    // Abilita tutti i bottoni di difficoltà
    easyButton.disabled = false;
    mediumButton.disabled = false;
    hardButton.disabled = false;
      
    // Nascondi il bottone di reset:
    resetButton.style.display = 'none';
  
    // Resetta la griglia:
    generateBoard(1);
  });