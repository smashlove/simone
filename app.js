let store = {apps: []}
let id = 0
class App {
  constructor(){
  this.score = 0
  this.name = ''

  this.addEventListeners()
  this.onStart()

  }

  addEventListeners(){

  }

  onStart() {
    let pattern = []
    this.generateAnswer(pattern)
    let bar = document.querySelector('div.container')
    let el = document.createElement('div')
    el.id = "scoreboard"
    el.innerHTML = `Scoreboard: ${this.score}`
    el.style.color = 'white'
    bar.prepend(el)
  }


  generateAnswer(pattern){
    let arr = ['green','red','yellow','blue']
    let index = Math.floor(Math.random() * 4)
    let choice = arr[index]
    pattern.push(choice)
    console.log(pattern)
    function showPattern(i){
      if (i < pattern.length){
       setTimeout(function(){
         change(pattern[i])
         play(pattern[i])
       },500);
        setTimeout(function(){
         changeBack(pattern[i])
         i++;
         showPattern(i);
       },1000);
     }else {
       document.getElementById('center').removeAttribute('class', 'active')
     }
    }
    document.getElementById('center').setAttribute('class', 'active')
    showPattern(0)

    function change(element){
      document.getElementById(element).className = 'choice selected'
    }

    function changeBack(element){
      document.getElementById(element).className = 'choice'
    }



    Promise.resolve().then(this.generateResponse(pattern))

  }

  generateResponse(pattern){
    let int = (3000+(pattern.length * 1700))
    let response = []
    let string = ''
    document.addEventListener('keydown', (ev) => {
      if (response.length < pattern.length){
        let color = checkColor(ev.key)
        ev.preventDefault()
        response.push(ev.key)
        if (color === "x"){
          string += `<span class='x' style='color: red;'></span>`
        } else {
        string += `<span class='circle' style='color: ${color};'></span>`
        play(color)
        }
        document.getElementById('header').innerHTML = string
      }
  })

  let self = this
  setTimeout(function(){ self.checkResponse(pattern,response); }, int);
  }


  checkResponse(pattern, response) {
    document.getElementById('header').innerHTML = ''
    let decodedPattern = []

    pattern.forEach((choice) => {
      if(choice === 'red'){
        decodedPattern.push('ArrowLeft')
      }
      if(choice === 'blue'){
        decodedPattern.push('ArrowDown')
      }
      if(choice === 'yellow'){
        decodedPattern.push('ArrowRight')
      }
      if(choice === 'green'){
        decodedPattern.push('ArrowUp')
      }
    })

    if (decodedPattern.join() === response.join()){
      // debugger
      this.score += 10
      let el = document.getElementById('scoreboard')
      el.innerHTML = `Scoreboard: ${this.score}`
      this.generateAnswer(pattern)

      // let levelUpAudio = document.getElementById('levelUpAudio');
      // levelUpAudio.play();

    } else {
      this.gameOver()
    }
  }

  gameOver(){
    document.getElementById('header').innerHTML = `<h1 class="large">YOU LOSE!</h1>`
    let gameOverAudio = document.getElementById('gameOverAudio');
    gameOverAudio.play();
    let table = document.getElementById('board')
    this.name = 'nick'
    this.config = 'easy'
    store.apps.push(this)
    this.sendData()
  }

  sendData(){
    let data = this
    fetch('http://localhost:3000/api/v1/apps',
  {
    method: 'POST',
    // mode: 'no-cors',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    }
  })
  .then(res => console.log(res));
    // this.fetchLeaderboard()

  }


  fetchLeaderboard(){
    // fetch('http://localhost:3000/api/v1/apps')
    // .then(res => res.json())
    // .then(json => console.log(json))
    // this.displayLeaderboard()
  }

  displayLeaderboard(){
    //displaying the leaderboard
  }

}

function play(color) {
  if(color === 'red'){
    let redAudio = document.getElementById('redAudio');
    redAudio.play();
  }

  if(color === 'blue'){
    let blueAudio = document.getElementById('blueAudio');
    blueAudio.play();
  }

  if(color === 'yellow'){
    let yellowAudio = document.getElementById('greenAudio');
    yellowAudio.play();
  }

  if(color === 'green'){
    let greenAudio = document.getElementById('yellowAudio');
    greenAudio.play();
  }
}
