$(document).ready(function() {
    var topmenu = document.getElementById("topmenu");
    topmenu.addEventListener('mouseover', function() {
      document.getElementById("menu").style.display="block";
    })
    topmenu.addEventListener('mouseout', function() {
      document.getElementById("menu").style.display="none";
    })
})

function showMenu(){
  document.getElementById("menu").style.display="block";
}
function hideMenu(){
  document.getElementById("menu").style.display="none";
}
