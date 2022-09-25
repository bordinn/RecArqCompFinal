




var questions = [
    {
        question: "O que é o npm start?",
        choices: {
            a: "Inicia os servidores Node",
            b: "Instala depêndencias",
            c: "Atualiza e desinstala depêndencias "
        },
        answer: "a"
    },
    {
        question: "Por que abrir o Git Bash no local da API?",
        choices: {
            a: "1975",
            b: "1972",
            c: "1969"
        },
        answer: "c"
    },
    {
        question: "Onde está a API na sua máquina e por quê?",
        choices: {
            a: "6",
            b: "7",
            c: "8"
        },
        answer: "b"
    },
    {
        question: "Qual a porta, é utilizada pelo index.html?",
        choices: {
            a: "Pronghorn",
            b: "Cheeta",
            c: "Springbokgit"
        },
        answer: "b"
    },
    {
        question: "Onde no código o gráfico é gerado?",
        choices: {
            a: "California",
            b: "New York",
            c: "Texas"
        },
        answer: "a"
    },
    {
        question: "Onde no código é feita a média das leituras de temp?",
        choices: {
            a: "California",
            b: "New York",
            c: "Texas"
        },
        answer: "a"
    },
    {
        question: "Onde no código é feita a alteração de tamanho, tipo e cor do gráfico?",
        choices: {
            a: "California",
            b: "New York",
            c: "Texas"
        },
        answer: "a"
    },
    {
        question: "O que causa erro de inicialização da API?",
        choices: {
            a: "California",
            b: "New York",
            c: "Texas"
        },
        answer: "a"
    },
    {
        question: "Qual PID está associado a porta tomada pelo index.html?",
        choices: {
            a: "California",
            b: "New York",
            c: "Texas"
        },
        answer: "a"
    },
    {
        question: "Quais os passos para configurar variável de ambiente do Windows para que você acesse o mysql no terminal direto em qualquer local?",
        choices: {
            a: "California",
            b: "New York",
            c: "Texas"
        },
        answer: "a"
    },
    {
        question: "Qual o comando para acessar o banco via CMD?",
        choices: {
            a: "California",
            b: "New York",
            c: "Texas"
        },
        answer: "a"
    }



];

function quiz(){
    //Armazena a saída do HTML
    var output = [];

    // Constrói o HTML para cada pergunta
    questions.forEach((currentQuestion, questionNumber) => {
        // Armazena a resposta de cada questão
        var choices = [];

        // para cada questão
        for(letter in currentQuestion.choices) {

            // adiciona o botão
            choices.push(
                // modelo
                `<label><input type="radio" name="question${questionNumber}" value="${letter}">
                    <span class="customRadio"></span>
                        ${letter} :
                        ${currentQuestion.choices[letter]}
                </label>`
            );
        }

        // adiciona a pergunta e a resposta no output
        output.push(
            `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="choices">${choices.join("")}</div>
            </div>`
             // join pega as respostas e coloca em uma string
        );
    });
    // combina a lista da string e coloca no HTML
    quizContainer.innerHTML = output.join("");
}

function results(){

    //reune as respostas (choices)
    var answerContainers = quizContainer.querySelectorAll(".choices");

    // acompanha as respostas do usuário
    var numCorrect = 0;

    // para cada questão
    questions.forEach((currentQuestion, questionNumber) => {
        // encontra a resposta escolhida
        var answerContainer = answerContainers[questionNumber];
        // seleciona qual botão foi escolhido
        var selector = `input[name=question${questionNumber}]:checked`;
        // userAnswer é qual botão foi escolhido
        // {} vazio caso o usuário não tenha selecionado a resposta
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // caso a resposta esteja correta
        if(userAnswer === currentQuestion.answer) {
            // add to number of correct answers
            numCorrect++;

            // verde caso esteja correto
            answerContainers[questionNumber].style.color = "rgb(0, 88, 4)";
        } else {   
            // vermelho caso esteja incorreto
            answerContainers[questionNumber].style.color = "rgb(141, 0, 0)";
        }
    });

    // mostra quantas respostas foram corretas do total
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
}

function showSlide(n) {
    // esconde a tela
    slides[currentSlide].classList.remove("active-slide");
    // mostra a próxima pergunta
    slides[n].classList.add("active-slide");
    // atualiza o número da pergunta
    currentSlide = n;

    // Primeira pergunta- esconde o botão de voltar - mostra o botão de próxima pergunta
    if(currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }

    // Última pergunta - esconde o botão de próxima pergunta - mostra o botão de enviar as respostas
    if(currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
    progressPercent += 25;
    progressBar.style.width = progressPercent +  "%";
}

function previousSlide() {
    showSlide(currentSlide - 1);
    progressPercent -= 25;
    progressBar.style.width = progressPercent + "%";
}

var progressBar = document.getElementById("progress-bar");
var progressPercent = 0;

var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");

//display quiz 
quiz();

var previousButton = document.getElementById("previous");
var nextButton = document.getElementById("next");
var slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Display Slides
showSlide(0);

// click envia as respostas e mostra os resultados 
submitButton.addEventListener("click", results);

// Click para mostrar a próxima pergunta ou a anterior
previousButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);

