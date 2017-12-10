var API_KEY = "d15950aed68c4a24b3a6545c93c59780";

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var parseHeadlines = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var response = JSON.parse(jsonString);
  printHeadlines(response);
};

var parseSources = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var response = JSON.parse(jsonString);
  fillSourceDropper(response);
}

var generateLinkandListener = function(headlineTag, article){
  headlineTag.addEventListener('click', function(){
    goToLink(article.url);
  });
}

var changeSelectedSource = function(select, sources){
  select.addEventListener('change', function(){
    sourceName = select.value;
    var newSource;
    for (i = 0 ; i < sources.length ; i++){
      if (sourceName === sources[i].name){
        newSource = sources[i].id;
      }
    }
    removeCurrentSourceBoxes();
    generateSourceBox(newSource);
  })
}

var fillSourceDropper = function(response){
  var select = document.querySelector("#source-dropper");
  for (i = 0 ; i < response.sources.length ; i++){
    var thisSource = response.sources[i].name;
    var selectOption = document.createElement("option");
    selectOption.innerText = thisSource;
    select.appendChild(selectOption);
    }
    changeSelectedSource(select, response.sources);
}

var printHeadlines = function(response){
  var sourceRows = document.querySelector('#source-rows');
  var articleList = response.articles;
  sourceBox = document.createElement("div");
  sourceBox.className = "source-box";
  headlineList = document.createElement("ul")
  var boxHeader = document.createElement("h2");
  boxHeader.innerText = articleList[0].source.name;
  sourceBox.appendChild(boxHeader);
  for (i = 0 ; i < articleList.length ; i++){
      var headline = articleList[i].title;
      var headlineTag = document.createElement("li");
      headlineTag.innerText = headline;
      headlineList.appendChild(headlineTag);
      author = articleList[i].author;
      authorTag = document.createElement("p");
      authorTag.innerText = author;
      headlineTag.appendChild(authorTag);
      generateLinkandListener(headlineTag, articleList[i]);
    }
    sourceBox.appendChild(headlineList);
    sourceRows.appendChild(sourceBox);
}

var goToLink = function(link){
  window.open(link, "_blank");
}

var removeCurrentSourceBoxes = function(){
  var allBoxes = document.querySelector("#source-rows");
  while (allBoxes.firstChild){
    allBoxes.removeChild(allBoxes.firstChild);
  }
}

var generateSourceBox = function(source){
  var url = "https://newsapi.org/v2/top-headlines?sources="+source+"&apiKey=d15950aed68c4a24b3a6545c93c59780";
  makeRequest(url, parseHeadlines);
}

var getSources = function(){
  var url = "https://newsapi.org/v2/sources?apiKey=d15950aed68c4a24b3a6545c93c59780";
  makeRequest(url, parseSources);
}

var app = function(){
  generateSourceBox("techcrunch");
  generateSourceBox("bbc-news");
  generateSourceBox("el-mundo");
  getSources();
}



window.addEventListener('load', app);
