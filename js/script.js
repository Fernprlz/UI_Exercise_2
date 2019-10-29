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



function showMenu(){
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.hamburguer-icon')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
