
//Defining variables for the homepage.handlebars

//Button that opens up the modal
const newPostBtn = document.getElementById("newPostBtn");

//Modal Variables
const createPostmodal = document.getElementById("createPostmodal");
const title = document.getElementById("title");
const content = document.getElementById("content");
const createPostBtn = document.getElementById("createPostBtn");
const cancelNewPostBtn = document.getElementById("cancelNewPostBtn");

//When new post button is pressed, modal will be shown
newPostBtn.onclick = function() {
    createPostmodal.style.display = "flex";
}
//When cancel button is pressed, modal will be closed
cancelNewPostBtn.onclick = function () {
    createPostmodal.style.display = "none";
}






