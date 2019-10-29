var activityID
var currentModalID
var numberOfVerticalBoxes = 3

function openModal(elem, modalID){
  setActivityID(elem)
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

function closeModal(choice){
  const modal = document.getElementById(currentModalID)
  modal.classList.remove("active")
  const overlay = document.getElementById("overlay")
  overlay.classList.remove("active")
  if (currentModalID == "modalDelete" && choice.id == "yes")
    removeElementByID(activityID)
  else if (currentModalID == "modalArchive") {
    removeElementByID()
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
}

// TODO: explain
function like(elem){
  if (elem.src.indexOf("images/like0.png") != -1){
    elem.src = "images/like1.png"
  } else {
    elem.src = "images/like0.png"
  }
}
