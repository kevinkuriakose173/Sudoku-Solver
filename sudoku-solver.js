const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#js-solve-button');
const resultText = document.querySelector('#result-text');
const squares = 81;
const apiInput = [];


for(let i = 0; i < squares; i++){
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', '1');
    inputElement.setAttribute('max', '9');
    puzzleBoard.appendChild(inputElement);

    if (
        ((((i-3) % 9 == 0) || ((i-3) % 9 == 1) || ((i-3) % 9 == 2)) && (i < 30 || i > 56) || 
        ((i % 9 == 0) || (i % 9 == 1) || (i % 9 == 2)) && (i >= 27 && i < 54) || 
        (((i % 9 == 6) || (i % 9 == 7) || (i % 9 == 8)) && (i>=27 && i < 54)))
    ) {
        inputElement.classList.add('even-section');
    } else {
        inputElement.classList.add('odd-section');
    }
}

const gatherInputs = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if(input.value) {
            apiInput.push(input.value);
        } else {
            apiInput.push('.');
        }
    })
}

const displaySolution = (solvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (solvable) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
        resultText.innerHTML = 'Here is the answer';
    } else {
        resultText.innerHTML = 'Your puzzle is unsolvable';
    }
}


const solve = async () => {
    gatherInputs();
    const boardValues = apiInput.join('');

    const options = {
      method: 'POST',
      url: 'https://solve-sudoku.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '',   //insert API Key
        'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
      },
      data: {
        puzzle: boardValues
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        displaySolution(response.data.solvable, response.data.solution);
    } catch (error) {
        console.error(error);
    }
}

solveButton.addEventListener('click', solve);
