var API_KEY = "d15950aed68c4a24b3a6545c93c59780";

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
  printHeadlines(response);
};

var printHeadlines = function(response){
  var sourceDiv = document.querySelector('#source-rows');
  var articleList = response.articles;
  var headline;
  var headlineTag;
  var sourceBox;
  for (i = 0 ; i < articleList.length ; i++){
    headline = articleList[i].title;
    sourceBox = document.createElement("div");
    sourceBox.className = "source-box";
    headlineList = document.createElement("ul")
    headlineTag = document.createElement("li");
    headlineList.appendChild(headlineTag);
    headlineTag.innerText = headline;

    sourceBox.appendChild(headlineList);
    sourceDiv.appendChild(sourceBox);
  }
}

var generateSourceBox = function(source){
  var url = "https://newsapi.org/v2/top-headlines?sources="+source+"&apiKey=d15950aed68c4a24b3a6545c93c59780";
  makeRequest(url, requestComplete);
}

var app = function(){
  generateSourceBox("techcrunch");
  generateSourceBox("bbc-news");
}

window.addEventListener('load', app);
