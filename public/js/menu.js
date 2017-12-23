$(document).ready(function() {
var topmenu = document.getElementsByClassName("topmenu");
var menuArray = new Array();

for(var i=0; i < topmenu.length; i++) {
  topmenu[i].addEventListener('mouseover', function() {
    subMenu = this.childNodes[2];
    //this.style.backgroundPosition="-200px top"
    subMenu.style.height="100%";
    subMenu.style.opacity="1";
    subMenu.style.overflow="visible";
  })
  topmenu[i].addEventListener('mouseout', function() {
    subMenu = this.childNodes[2];
    //this.style.backgroundPosition="left top"
    subMenu.style.height="0px";
    subMenu.style.opacity="0";
    subMenu.style.overflow="hidden";
  })
}
})
