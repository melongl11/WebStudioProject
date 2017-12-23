
function menuListButton_click(clicked_id) {
  var formDiv = document.getElementById("menuListFormDiv");
  var str = "";
  var info = document.location.href.split("/");
  var addedform = document.getElementById("addedForm");
  if(!$("#menuListFormDiv").empty()) $("#menuListFormDiv").removeChild();
  if(!$("#menuAddFormDiv").empty()) $("#menuAddFormDiv").removeChild();
  if(!$("#sublistFormDiv").empty()) $("#sublistFormDiv").removeChild();
  if(!$("#subMenuAddFormDiv").empty()) $("#subMenuAddFormDiv").removeChild
  var form = document.getElementById(clicked_id);
  var id = clicked_id.split("/");
  str += "<br>탭 메뉴 수정<br><form action='/manager/modify/tabmenu/" +id[0] + "' method='post'>";
  str += "<p><input type='text' name='item' placeholder='" + form.innerHTML + "'></p>";
  str += "<input type='submit' value='수정하기'>";
  str += "<input type='button' value='삭제하기' onclick='tabmenudelete(" + id[0] + ")'></form><br>";
  var addform = document.createElement("div");
  addform.id = "addedForm";
  addform.innerHTML = str;
  console.log(str);
  formDiv.appendChild(addform);
}

function tabmenudelete(clicked_id) {
  window.location.replace('http://localhost:3000/manager/modify/tabmenu/delete/' + clicked_id);
}

function horsedelete(clicked_id) {
  window.location.replace('http://localhost:3000/manager/horseroom/delete/' + clicked_id);
}

function menuAddButton_click() {
  var formDiv = document.getElementById("menuAddFormDiv");
  var str = "";
  var info = document.location.href.split("/");
  if(!$("#menuAddFormDiv").empty()) formDiv.removeChild();
  if(!$("#menuListFormDiv").empty()) $("#menuListFormDiv").removeChild();
  if(!$("#sublistFormDiv").empty()) $("#sublistFormDiv").removeChild();
  if(!$("#subMenuAddFormDiv").empty()) $("#subMenuAddFormDiv").removeChild
  str += "<br>탭 메뉴 추가 <br><form action='/manager/modify/tabmenu/add' method='post'>";
  str += "<p><input type='text' name='item'></p>";
  str += "<p><input type='submit' value='추가'></p></form><br>";
  var addform = document.createElement("div");
  addform.innerHTML = str;
  formDiv.appendChild(addform);
}

function informationList_click(clicked_id, clicked_value) {
  var informationInputForm = document.getElementById("informationInputForm");
  informationInputForm.style.visibility = "visible";
  informationInputForm.action = "/manager/modify/post/information/" +clicked_id;

}

function programList_click(clicked_id, clicked_value) {
  var programInputForm = document.getElementById("programInputForm");
  programInputForm.style.visibility = "visible";
  programInputForm.action = "/manager/modify/post/program/" +clicked_id;

}

var openFile = function(event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function(){
    var dataURL = reader.result;
    var output = document.getElementById('output');
    output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);
};
