
var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var response = JSON.parse(jsonString);
  debugger;
};

var printResponse = function(response){
  for (item in response){
    var responseContainer = document.querySelector("#response-area")
    var responseItem = document.createElement("p");
    responseContainer.appendChild(responseItem);
  }
}

var app = function(){
  var url = "http://api.musixmatch.com/ws/1.1/";
  makeRequest(url, requestComplete);


}

window.addEventListener('load', app);
