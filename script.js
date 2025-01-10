const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    // Fonction pour obtenir le tableau
    const getBoard = () => gameboard;

    // Fonction pour initialiser le tableau avec les boutons
    const init = () => {
        const cells = document.querySelectorAll(".cell");
        gameboard = Array.from(cells); // Met chaque bouton dans le tableau
        console.log("Tableau initialisé :", gameboard); // Vérifie le tableau dans la console

    };


    return { getBoard, init };
})();


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
            createPlayer(document.querySelector("#player2").value, "0")
        ]
        currentPlayerIndex = 0;
        gameOver = false;

        const starter = document.querySelector(".startPlayer");
        starter.textContent = document.querySelector("#player1").value + " starts!";

        Gameboard.init();
    }

    return {
        start
    }

})();