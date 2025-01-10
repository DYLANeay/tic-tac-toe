const displayEndMessage = (() => {
    const renderMessage = (message) => {
        document.querySelector(".resultDisplay").innerHTML = message;
    }

    return {
        renderMessage,
    }
})();

const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    // fonction pour obtenir le tableau, mais pas le reset
    const getBoard = () => gameboard;

    //fonction update le gameboard pour afficher les X et O
    const update = (index, value) => {
        gameboard[index] = value;
    }

    return { getBoard, /* init, */ update };
})();

const checkForTie = (board) => {
    return board.every(cell => cell !== "")
}


const checkForWin = (board) => {
    const winningCombinations = [
        [0, 1, 2], // Ligne 1
        [3, 4, 5], // Ligne 2
        [6, 7, 8], // Ligne 3
        [0, 3, 6], // Colonne 1
        [1, 4, 7], // Colonne 2
        [2, 5, 8], // Colonne 3
        [0, 4, 8], // Diagonale 1
        [2, 4, 6]  // Diagonale 2
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true; // Retourne le symbole du gagnant
        }
    }
    return false;

}

const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", () => {
    Game.restart();
})

const startButton = document.querySelector("#start");
startButton.addEventListener("click", () => {
    Game.start();
})

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ];
        gameOver = false;

        // Randomiser le joueur qui commence
        currentPlayerIndex = Math.floor(Math.random() * 2);

        // Mettre à jour le texte pour indiquer qui commence
        const starter = document.querySelector(".startPlayer");
        starter.textContent = `${players[currentPlayerIndex].name} starts!`;

        // Initialiser le tableau de jeu
        Gameboard.getBoard();

        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", handleClick);
        });


    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "")
            const cell = document.querySelector(`#num${i + 1}`);
            cell.textContent = ""; // Vide le texte du bouton pour réinitialiser l'affichage
        }

        document.querySelector(".resultDisplay").innerHTML = "";
        gameOver = false;

        currentPlayerIndex = Math.floor(Math.random() * 2);

        const starter = document.querySelector(".startPlayer");
        starter.textContent = `${players[currentPlayerIndex].name} starts!`;

    }

    const handleClick = (event) => {

        if (gameOver) {
            return;
        }

        let index = parseInt(event.target.id.match(/\d+/)[0]);
        index = index - 1;

        if (Gameboard.getBoard()[index] !== "") {
            alert("Cette cellule est déjà prise !");
            return;
        }

        Gameboard.update(index, players[currentPlayerIndex].mark);
        /*         console.log(Gameboard.getBoard()); */

        if (checkForWin(Gameboard.getBoard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            displayEndMessage.renderMessage(`${players[currentPlayerIndex].name} wins!`)
        } else if (checkForTie(Gameboard.getBoard())) {
            gameOver = true;
            displayEndMessage.renderMessage("C'est une égalité")
        }
        event.target.textContent = players[currentPlayerIndex].mark;

        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }

    return {
        start,
        handleClick,
        restart
    }

})();