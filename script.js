// Метод every() проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции.
let currentPlayer = 'X';
let gameEnd = false;
let board = ['','','','','','','','',''];
let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];
let restart = document.getElementById('reset');
let mesg = document.getElementById('mesg');
let playerDisplay = document.querySelector('.display-player');

function cellClicked(cellIndex) {
    if (!gameEnd && board[cellIndex] === '') {
        const cell = document.getElementById(`cell${cellIndex}`);
        cell.textContent = currentPlayer;
        cell.setAttribute('data-value', currentPlayer);
        board[cellIndex] = currentPlayer;

        if (checkWinner(currentPlayer)) {
            document.getElementById('mesg').textContent = `Игрок ${currentPlayer} победил!`;
            mesg.classList.add(`player${currentPlayer}`);
            gameEnd = true;
        } else if (boardFull()) {
            document.getElementById('mesg').textContent = 'Ничья!';
            gameEnd = true;
        } else {
            playerDisplay.classList.remove(`player${currentPlayer}`);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerDisplay.innerText = currentPlayer;
            playerDisplay.classList.add(`player${currentPlayer}`);
        }
    }
}

function checkWinner(player) {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function boardFull() {
    return board.every(cell => cell !== '');
}

function refresh() {
    window.location.reload();
}
restart.addEventListener("click", refresh);