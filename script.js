const createDiv = document.getElementById("main");
const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const form = document.querySelector('.inputs');
const submitButton = document.getElementById('submitButton');
const date = new Date();
let year = date.getFullYear();
const an = (document.getElementById("an").textContent = year + " @eduardbede ");
// variabila de stocare
let finalUser = JSON.parse(localStorage.getItem('userData'));
//daca variabila de stocare nu e array
   if(finalUser === null){
      finalUser = [];
   }
   //constructor pentru fiecare carte creata
class Books{
   constructor(author, title, pages, id, read){
      this.author = author,
      this.title = title,
      this.pages = pages,
      this.id = id;
      this.read = read;
   }
}
//sa nu isi dea refresh pagina cand dam submit la form
form.addEventListener('submit', (el)=>{
  el.preventDefault();
});
//cand apasam enter sa nu ia comanda
form.onkeypress = function(e) {
   let key = e.charCode || e.keyCode || 0;     
   if (key == 13) {
     e.preventDefault();
   }
 }
//functie pentru a afisa din input si a aduga cartile in array
function addBooks(){
   const books = new Books(author.value, title.value, pages.value, uniqueID(), toggleAddBook());
   let div = document.createElement('div');
   div.setAttribute('data-key', books.id);
   div.innerHTML = ` <div class="editAndDel">
                        <button id=${books.id} class="delButton" onClick="delBook(this.id)">
                        <i class="fa fa-remove" style="font-size:24px;color:red"></i></button>
                        <button id=${books.id} class="editButton" onClick="editBook(this.id)" >
                        <i class="fa fa-pencil" style="font-size:24px;color:blue"></i></button>
                     </div>
                     <p class="pDiv">Author: ${books.author}</p>
                     <p class="pDiv">Title: ${books.title}</p>
                     <p class="pDiv">Pages: ${books.pages}</p>
                     <div class= "toggleDiv">
                     <p class ="pDiv">Read?</p>
                        <label class="toggle">
                        <input id=${books.id} type="checkbox" onClick="toggleButton(this.id)" class="inputToggle" ${books.read}>
                           <span class="labels" data-on="YES" data-off="NO"></span>
                        </label>
                     </div>`
   createDiv.appendChild(div).className ='gridDiv';
   finalUser.push(books);
   localStorage.setItem("userData", JSON.stringify(finalUser));
   document.querySelector('.totalPages').innerHTML = totalNumbers();
   document.querySelector(".totalRead").innerHTML = totalRead();
   document.getElementById("toggleInputAdd").checked = false;
   
}
//functie ca sa afiseze ce este in localstorage cand se incarca pagina
function onLoad(){
   finalUser.forEach(el=>{
   let div = document.createElement('div');
   div.setAttribute('data-key', el.id);
   div.innerHTML = ` <div class="editAndDel">
                           <button id=${el.id} class="delButton" onClick="delBook(this.id)" >
                           <i class="fa fa-remove" style="font-size:24px;color:red"></i></button>
                           <button id=${el.id} class="editButton" onClick="editBook(this.id)" >
                           <i class="fa fa-pencil" style="font-size:24px;color:blue"></i></button>
                     </div>
                     <p class="pDiv">Author: ${el.author}</p>
                     <p class="pDiv">Title: ${el.title}</p>
                     <p class="pDiv">Pages: ${el.pages}</p>
                     <div class= "toggleDiv" >
                        <p class ="pDiv">Read?</p>
                        <label class="toggle" >
                        <input id=${el.id} type="checkbox" onClick="toggleButton(this.id)" class="inputToggle" ${el.read}>
                        <span class="labels" data-on="YES" data-off="NO"></span>
                        </label>
                     </div>`
  createDiv.appendChild(div).className ='gridDiv';
  document.querySelector('.totalPages').innerHTML = totalNumbers();
  document.querySelector(".totalBooks").innerHTML = finalUser.length;
  document.querySelector(".totalRead").innerHTML = totalRead()    
   });
}
//functie de update dupa Edit
function updateDisplay(){
   document.querySelectorAll('.gridDiv').forEach(el =>el.remove());
   finalUser.forEach(el=>{
   let div = document.createElement('div');
   div.setAttribute('data-key', el.id);
   div.innerHTML = `<div class="editAndDel">
                           <button id=${el.id} class="delButton" onClick="delBook(this.id)" >
                           <i class="fa fa-remove" style="font-size:24px;color:red"></i></button>
                           <button id=${el.id} class="editButton" onClick="editBook(this.id)" >
                           <i class="fa fa-pencil" style="font-size:24px;color:blue"></i></button>
                     </div>
                     <p class="pDiv">Author: ${el.author}</p>
                     <p class="pDiv">Title: ${el.title}</p>
                     <p class="pDiv">Pages: ${el.pages}</p>
                     <div class="toggleDiv">
                     <p class ="pDiv">Read?</p>
                        <label class="toggle">
                           <input id=${el.id} type="checkbox" onClick="toggleButton(this.id)" class="inputToggle" ${el.read}>
                           <span class="labels" data-on="YES" data-off="NO"></span>
                        </label>
                     </div>`
   createDiv.appendChild(div).className ='gridDiv';
   document.querySelector('.totalPages').innerHTML = totalNumbers();
   document.querySelector(".totalBooks").innerHTML = finalUser.length;
   });
}
 //functie de stergere carte si da updateze localstorage
function delBook(click){
  if(confirm("Are you sure you want to delete this book?") == false){
   return
  }
   if(finalUser.findIndex(i => i.id == click) !== -1){
      finalUser.splice(finalUser.findIndex(i => i.id == click), 1);
    const item = document.querySelector(`[data-key='${click}']`);
   item.remove();
} 
  localStorage.setItem("userData", JSON.stringify(finalUser));
  document.querySelector('.totalPages').innerHTML = totalNumbers();
  document.querySelector(".totalBooks").innerHTML = finalUser.length;
  document.querySelector(".totalRead").innerHTML = totalRead()
  document.querySelectorAll('input').forEach(e =>{
   if(e.value == ""){
      e.style.borderColor = "black";
   }
  })
}
//functie edit
function editBook(click){
   if(finalUser.findIndex(i => i.id == click) !== -1){
      author.value = finalUser[finalUser.findIndex(i => i.id == click)].author;
      title.value = finalUser[finalUser.findIndex(i => i.id == click)].title;
      pages.value = finalUser[finalUser.findIndex(i => i.id == click)].pages;
   }
    submitButton.style.display = "none";
    if(document.querySelector(".confirmButton") == null) {
         let editButt = document.createElement('button')
         editButt.id = click;
         editButt.className = "confirmButton buttonn-9"
         editButt.setAttribute("onclick"," finalEdit(this.id)");
         editButt.innerHTML = "Finish Edit"
         form.append(editButt);
}
   document.querySelector(".confirmButton").id = click;
   document.querySelector('.totalPages').innerHTML = totalNumbers();
   window.scrollTo(0, 0);
}
//functie pentru butonul edit final
function finalEdit(click){
   if(author.value == "" || title.value == '' || pages.value == ''){
      document.querySelectorAll('input').forEach(e =>{
       if(e.value == ""){
          e.style.borderColor = "red";
          e.style.borderWidth = "3px";
       }
      })
     return
    }
   if(finalUser.length === 0){
          document.querySelector(".confirmButton").remove();
          submitButton.style.display = "inline-block"
          author.value ='';
          title.value ='';
          pages.value ='';
          return;
}
      finalUser[finalUser.findIndex(i => i.id == click)].author = author.value;
      finalUser[finalUser.findIndex(i => i.id == click)].title = title.value;
      finalUser[finalUser.findIndex(i => i.id == click)].pages = pages.value;
      localStorage.setItem("userData", JSON.stringify(finalUser));
      document.querySelector(".confirmButton").remove();
      submitButton.style.display = "inline-block"
          author.value ='';
          title.value ='';
          pages.value ='';
          updateDisplay();
         document.querySelector('.totalPages').innerHTML = totalNumbers();
         document.querySelector(".totalBooks").innerHTML = finalUser.length;
         document.querySelector(`[data-key='${click}']`).scrollIntoView({
            behavior: 'smooth'
          });
}
//functie pentru ID unic
function uniqueID() {
   return Math.floor(Math.random() * Date.now())
}
//afiseaza ce este in localstorage cand se dschide pagina
document.addEventListener("DOMContentLoaded", onLoad());
//functie care sa caluleze numarul total de pagini
function totalNumbers(){
   let total = finalUser.map(el => el.pages)
   return total.reduce((a, b)=> parseFloat(a) + parseFloat(b), 0)
}
//functie pentru a arata cate carti ciite sunt
function totalRead(){
  return finalUser.filter((el) => el.read === "checked").length
}
   //cand dam click pe input sa se modifice bordura
   document.querySelectorAll('input').forEach(e =>{
      e.addEventListener("click", ()=>{
         e.style.borderColor = "black";
         e.style.borderWidth = "3px";
      });
   });
   //functie toggle button care sa ne arate daca am citit cartea sau nu
   function toggleButton(click){
           if(finalUser[finalUser.findIndex(i => i.id == click)].read == "") {
            finalUser[finalUser.findIndex(i => i.id == click)].read = "checked";
            localStorage.setItem("userData", JSON.stringify(finalUser));
            document.querySelector(".totalRead").innerHTML = totalRead();
         }  
            else if(finalUser[finalUser.findIndex(i => i.id == click)].read == "checked"){
               finalUser[finalUser.findIndex(i => i.id == click)].read = "";
                localStorage.setItem("userData", JSON.stringify(finalUser));
                document.querySelector(".totalRead").innerHTML = totalRead();
            }
      }
   //functie read book cand dam add
   function toggleAddBook(){
      const toggle = document.getElementById("toggleInputAdd");
      if(toggle.checked === true){
         return "checked" 
      } else {
        return ''
      }
   }
//buton submit dupa ce am introdus datele
submitButton.addEventListener("click", ()=>{
  if(author.value == "" || title.value == '' || pages.value == ''){
     document.querySelectorAll('input').forEach(e =>{
      if(e.value == ""){
         e.style.borderColor = "red";
         e.style.borderWidth = "3px";
      }
     })
    return
   }
   addBooks()
   author.value = '';
   title.value ='';
   pages.value ='';
   document.querySelector('.totalPages').innerHTML = totalNumbers();
   document.querySelector(".totalBooks").innerHTML = finalUser.length;
   document.querySelector(`[data-key='${finalUser[finalUser.length - 1].id}']`).scrollIntoView({
      behavior: 'smooth'
    });
   
});