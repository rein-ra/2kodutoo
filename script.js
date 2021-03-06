let changeColorButton;
let changeFontButton, fontChanged;
let player;

class Entry{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
  }
}

class ToDo{
  constructor(){
    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];
    document.querySelector('#addButton').addEventListener('click', ()=> this.addEntry());
    this.render();
    document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
  }

  addEntry(){
    const titleValue = document.querySelector('#title').value;
    const descriptionValue = document.querySelector('#description').value;
    const dateValue = document.querySelector('#date').value;
    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
    this.saveLocal();
    this.render();
  }

  render(){
    if(document.querySelector('.todo-list')){
      document.body.removeChild(document.querySelector('.todo-list'));
    }

    const ul = document.createElement("ul");
    ul.setAttribute("id", "myUl");
    ul.className = "todo-list";
    this.entries.forEach((entry, entryIndex)=>{
      const li = document.createElement("li");
      li.innerHTML = `<b>${entry.title}</b> <br>  ${entry.description}   ${entry.date}`;
      
      let span = document.createElement("SPAN");
      let txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.addEventListener("click", ()=>{
        ul.removeChild(li);
        this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex + 1, this.entries.length));
        this.saveLocal();
      });

      li.addEventListener('click', (event)=> {
          event.target.classList.toggle('checked');
          if(entry.done){
            entry.done = false;
          }
          else{
            entry.done = true;
          }

          this.saveLocal();
          this.render();
      });

      if(entry.done){
        li.style.backgroundColor = "#8cff66";
        li.style.border = "none";
      }

      span.appendChild(txt);
      li.appendChild(span);
      ul.appendChild(li);
    });
    document.body.appendChild(ul);
  }

  saveLocal(){
    window.localStorage.setItem('entries', JSON.stringify(this.entries));
  }
  
}

const todo = new ToDo();

function search () {
  let input, filter, ul, li, i, txtValue;
  let entries = JSON.parse(window.localStorage.getItem('entries'));
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUl");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    txtValue = entries[i].title;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function sortWithNames(){
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("myUl");
    switching = true;
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("li");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
        break;
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }

let buttonContainer = document.querySelector('#buttonContainer');

window.onload = function() {
    changeBackgroundColor();
    changeColorButton = document.querySelector('#change-color');
    changeColorButton.addEventListener(
      'click',
      this.changeBackgroundColor,
      this.changeDivColor
    );
    changeFontButton = document.querySelector('#change-size');
    changeFontButton.addEventListener('click', changeFont);
    fontChanged = 0;

    changeFontSize = document.querySelector('#change-font');
    changeFontSize.addEventListener('click', changeTextSize);
    sizeChanged = 0;
  };

function changeBackgroundColor() {
    const red = Math.round(Math.random() * 255);
    const green = Math.round(Math.random() * 255);
    const blue = Math.round(Math.random() * 255);
    document.body.style.backgroundColor =
    'rgb(' + red + ',' + green + ',' + blue + ')';
  }

function changeColor(colorValue) {
    document.body.style.backgroundColor = colorValue;
  }

/*   FONDI MUUTMINE */ 

function changeFont() {
    if (fontChanged == 0) {
      document.body.style.fontFamily = 'Arial';
      fontChanged = 1;
    } else {
      document.body.style.fontFamily = 'Times New Roman';
      fontChanged = 0;
    }
  }

/*   TEKSTI SUURUSE MUUTMINE */ 

function changeTextSize() {
    if (sizeChanged == 0) {
      document.body.style.fontSize = 'large';
      sizeChanged = 1;
    } else {
      document.body.style.fontSize = 'small';
      sizeChanged = 0;
    }
  }


/*  MUUSIKAMÄNGIJA KOOD */

function startplayer() {
  player = document.getElementById('music_player');
  player.controls = false;
}
function play_aud() {
  player.play();
} 
function pause_aud(){
  player.pause();
}
function stop_aud(){
  player.pause();
  player.currentTime = 0;
}
function change_vol(){
  player.volume=document.getElementById("change_vol").value;
}