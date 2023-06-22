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
      default:
        rows = 10;
        cols = 10;
        maxNum = 100;
    }
  
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
  }
  
  function handleClick(event) {
    const cell = event.target;
  
    // Aggiunta della classe 'clicked' alla cella cliccata:
    cell.classList.add('clicked');
  
    // Stampa del testo della cella cliccata nella console:
    console.log('Cella cliccata:', cell.innerText);
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
  