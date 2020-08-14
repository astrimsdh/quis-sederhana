const startButton = document.getElementById('mulai-btn')
const nextButton = document.getElementById('lanjut-btn')
const questionContainerElement = document.getElementById('question-container')
let suffledQuestions, currentQuestionIndex
const questionElement = document.getElementById('pertanyaan')
const answerButtonsElement = document.getElementById('jawaban-button')
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
function startGame(){
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}
function setNextQuestion(){
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question){
  questionElement.innerHTML = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerHTML = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
function resetState(){
  nextButton.classList.add('hide')
  console.log(answerButtonsElement.firstChild)
  while(answerButtonsElement.firstChild){
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
function selectAnswer(e){
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  }else{
    startButton.innerHTML = 'Reset'
    startButton.classList.remove('hide')
  }
}
function setStatusClass(element, correct){
  clearStatusClass(element)
  if(correct){
     element.classList.add('correct')
   }else{
     element.classList.add('wrong')
   }
}
function clearStatusClass(element){
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Berapakah hasil dari 2 + 2?',
    answers: [
      {text: '4', correct: true},
      {text: '22', correct: false}
    ]
  },
  {
    question: 'Siapa calon imammu?',
    answers: [
      {text: 'a', correct: false},
      {text: 'b', correct: false},
      {text: 'c', correct: true},
      {text: 'd', correct: false}
    ]
  }
]
