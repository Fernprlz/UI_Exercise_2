var activityID
var currentModalID
var panelID
var numberOfVerticalBoxes = 3

function openModal(elem, modalID){
  setActivityID(elem)
  setPanelID(elem)
  currentModalID = modalID
  // Open Modal
  if (modalID == "modalShare"){
    prepareShare()
  }
  const modal = document.getElementById(currentModalID)
  modal.classList.add("active")
  const overlay = document.getElementById("overlay")
  overlay.classList.add("active")
}

function prepareShare(){
  const activityChild = document.querySelectorAll('#' + activityID + ' .activity-title')
  const activityTitle = activityChild[0].textContent

  const modal = document.getElementById(currentModalID)
  const modalChild = document.querySelectorAll('#modalShare .modal-title')
  modalChild[0].textContent = activityTitle
}

function setActivityID(elem){
  // While cicle to access the ID of the parent DIV
  while (elem && (elem.tagName != "DIV" || !elem.id))
  elem = elem.parentNode;
  if (elem) // Check we found a DIV with an ID
  // record the ID on the activityID variable so we can remove it
  activityID = elem.id
}

function setPanelID(elem){
  // While cicle to access the ID of the parent DIV
  var a = 0
  while (elem && !elem.id.includes("panel")){
    elem = elem.parentNode
  }
  if (elem) // Check we found a DIV with an ID
  // record the ID on the activityID variable so we can remove it
  panelID = elem.id

}

function closeModal(choice){
  const modal = document.getElementById(currentModalID)
  modal.classList.remove("active")
  const overlay = document.getElementById("overlay")
  overlay.classList.remove("active")
  if (currentModalID == "modalDelete" && choice.id == "yes")
  removeElementByID(activityID)
  else if (currentModalID == "modalArchive" && choice.id == "yes") {
    removeElementByID(panelID)
    --numberOfVerticalBoxes;
    resizeVerticalBoxes()
  }

  activityID = null
  currentModalID = null
}

function removeElementByID(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId)
  element.parentNode.removeChild(element)
}

function resizeVerticalBoxes(){
  // go inside each vertical box
  // set width to 100/numberOfVerticalBoxes
  const verticalBoxArray = document.querySelectorAll('.vertical-box')
  for(var ii = 0; ii < verticalBoxArray.length; ii++){
    var newWidth = (100/numberOfVerticalBoxes) - 0.3
    verticalBoxArray[ii].style.width = newWidth +"%";
  }
}

// TODO: explain
function like(elem){
  if (elem.src.indexOf("images/like0.png") != -1){
    elem.src = "images/like1.png"
  } else {
    elem.src = "images/like0.png"
  }
}

function showMenu(elem){
  // First toggle show on every open menu
  hideAllMenus()
  // Then toggle show on the clicked menu
  document.getElementById(elem).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.hamburguer-icon')) {
    hideAllMenus()
  }
}

function hideAllMenus(){
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

function validateForm(){
  var valid = true;
  var password = document.forms["registrationForm"]["password"].value;
  var email = document.forms["registrationForm"]["email"].value;
  var username = document.forms["registrationForm"]["username"].value;
  var rePassword = /^[a-zA-Z0-9]*$/;
  var reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(password.length > 8 || rePassword.test(String(password)) == false){
    alert("Password is invalid, please check that it satisfies:"+
    "\n - Maximum 8 characters."+
    "\n - Only contains letters (upper or underscore) or numbers [0-9].")
    valid = false;
  }

  if(reEmail.test(String(email).toLowerCase()) == false){
    alert("Please, insert a valid e-Mail address:\nexample@server.com")
    valid = false;
  }

  if(valid == true){
    if (emailExists(email)){
      alert("Email has already been used")
    } else {
      storeCookie(email, password, username)
      alert("Account created succesfully!")
      window.location.replace("loginPage.html")
      // Return false so that the redirection works insted of going to the page
      // that is generated after submitting the form.
      return false;
    }
  }
  return valid
}


function emailExists(email){
  return (document.cookie.indexOf(email) == -1) ? false : true;
}

function storeCookie(email, password, username){
  var d = new Date();
  // Set expiration date to 1 year
  d.setTime(d.getTime() + (365*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  // We store the email and password on the same cookie as:
  // example@email.com=password/username
  document.cookie = email + "=" + password + "/" + username + ";" + expires + ";path=/";
  return
}

function logIn(){

  var email = document.forms["loginForm"]["email"].value;
  var password = document.forms["loginForm"]["password"].value;


  if(correctLogIn(email, password)){
    // Load the page
    window.location.replace("index2.html")

    // Change the page title to the username
    // First save the username in a global variable
    titleUsername = getUsername(email)
    localStorage.setItem("titleUsername", titleUsername);
    return false

  }else{
    alert("This combination email/password doesn't exist.\nPlease, try again.")
    return false
  }

}

// The problem with this method is that
function correctLogIn(email, password){
  var cookiePassword = getPassword(email)
  if (cookiePassword == password){
    return true;
  } else {
    return false;
  }
}

function getPassword(email){
  var cookieValue = getCookie(email)
  return splitValue(cookieValue)[0]
}

function getUsername(email){
  var cookieValue = getCookie(email)
  return splitValue(cookieValue)[1]
}

function splitValue(value){
  var middleIndex = value.indexOf("/")

  var result = []
  result[0] = value.substring(0, middleIndex)
  result[1] = value.substring(middleIndex + 1, value.length)
  return result
}

// Retrieve value of a cookie from its "name"
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
window.onload = function(){
  var newTitle = localStorage.getItem("titleUsername");
  if (newTitle != 'null' && newTitle != null){
    var pageTitle = document.getElementById('username')
    pageTitle.innerHTML = newTitle
    localStorage.removeItem("titleUsername");
  }
}

function allowDrop(event){
  event.preventDefault();
}

function drag(event){
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event){
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function notAllowDrop(event){
  event.stopPropagation();
}
