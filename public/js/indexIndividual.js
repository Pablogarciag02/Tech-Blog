//Defining variables for the comment logic individual.handlebars 

//Button that opens up the comment modal
const newcommentBtn = document.getElementById("newCommentBtn");

//Comment Modal Variables
const addCommentModal = document.getElementById("addCommentModal");
const comment = document.getElementById("comment");
const addCommentBtn = document.getElementById("addCommentBtn");
const cancelCommentBtn = document.getElementById("cancelCommentBtn");

//When the newcommentBtn is pressed, modal will appear:
newcommentBtn.onclick = function() {
    addCommentModal.style.display = "flex";
}

//When cancel button is pressed, modal will be closed
cancelCommentBtn.onclick = function () {
    addCommentModal.style.display = "none";
}

