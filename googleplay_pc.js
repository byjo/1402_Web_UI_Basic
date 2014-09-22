

var sTemplate="<li><div class='cover'><a href='<%=src%>'><img src='<%=imgSrc%>' alt='<%=title%>'></a></div><ul class='content'><li class='title'><a href='#'><%=title%></a></li><li class='author'><a href='#'><%=author%></a></li><li class='price'><a href='#'><%=price%></a></li></ul></li>";

// var oVAR = {
// 	shelf1 : document.getElementById('shelf1').querySelector('.book'),
// 	shelf2 : document.getElementById('shelf1').querySelector('.book'),
// 	shelf3 : ....
// }

var shelf1 = document.getElementById('shelf1').querySelector('.book');
var shelf2 = document.getElementById('shelf2').querySelector('.book');

// 더보기
var seeMoreBest = document.getElementById('shelf1').querySelector('div.more');		
var seeMoreMovie = document.getElementById('shelf2').querySelector('div.more');

// 장르
var selectGenre = document.getElementById('select').querySelector('.genrelayer').querySelector('ul')

var overlay = document.getElementById('loading_overlay');
var shelf2_display = document.getElementById('shelf2');

seeMoreBest.addEventListener('click', loadBooks, false);
seeMoreMovie.addEventListener('click', loadBooks, false);
selectGenre.addEventListener('click', loadBooks,false);

window.addEventListener('load', function(){
// 		setVariables();
// 		attachEvents();
// 		setElementStyle();
// }
		var genrelayer = document.querySelector('.genrelayer');
		
		genrelayer.style.display="none";
		seeMoreBest.style.display="block";
		overlay.style.display="none"
		shelf2_display.style.display="block";

		shelf1.style.height="330px";
		shelf1.style.maxHeight="330px";
		shelf2.style.height="330px";
		shelf2.style.maxHeight="330px";

		document.body.addEventListener('click', function(e){

				if(genrelayer.style.display==="none"){
					if(e.target.className==="genre" || e.target.className==="genre_title" || e.target.className==="genre_icon")
						genrelayer.style.display="block"
				}
				else{
					if(e.target.className!=="genrelayer")
						genrelayer.style.display="none"
				}
		},false);
}, false);

function getBookList(url) {
	var request = new XMLHttpRequest();
	var shelf1_list = document.getElementById('shelf1').querySelector('ul');
	var shelf2_list = document.getElementById('shelf2').querySelector('ul');

	function none() {
		overlay.style.display="none";
	}

	request.open("GET" , url , true);
	request.send(null);

	request.onreadystatechange = function() {
		if(request.readyState === 4 && request.status === 200) {
			result = request.responseText;
			result = JSON.parse(result);
			shelf1_list.innerHTML=makeBookElement(sTemplate, result);
			shelf2_list.innerHTML=makeBookElement(sTemplate, result);
			setTimeout(none, 1000);
		}
	}
	overlay.style.display="block"
}

function makeBookElement(sTemplate, aBookList){
	var total="";
	aBookList.forEach(
		function(item){
			var result = sTemplate.replace("<%=src%>", item.src);
			result = result.replace("<%=imgSrc%>", item.imgSrc);
			result = result.replace("<%=title%>", item.title);
			result = result.replace("<%=title%>", item.title);
			result = result.replace("<%=author%>", item.author);
			result = result.replace("<%=price%>", item.price);
			total += result + "\n"; 
		}
	);
	return total;
}

function loadBooks(e){
	var ListBestUrl = "http://127.0.0.1:8000/listBestBooks.json";
	var ListMovieUrl = "http://127.0.0.1:8000/listMovieBooks.json";
	var ListGenreurl = "http://127.0.0.1:8000/listGenreBooks_";
	var id = e.target.id;
	var tag_name = e.target.tagName;
12
	(function handleHeading(id){

		var shelf1_title = document.getElementById('shelf1').querySelector('.heading').querySelector('h1');
		var shelf1_subtitle = document.getElementById('shelf1').querySelector('.heading').querySelector('span');
		var shelf1_more = document.getElementById('shelf1').querySelector('.heading').querySelector('div');

		var shelf2_title = document.getElementById('shelf2').querySelector('.heading').querySelector('h1');
		var shelf2_subtitle = document.getElementById('shelf2').querySelector('.heading').querySelector('span');
		var shelf2_more = document.getElementById('shelf2').querySelector('.heading').querySelector('div');

		switch(id){
			case "shlef1_more" :
				shelf1_subtitle.innerHTML = "";
				shelf1_more.style.display = "none";
				break;

			case "shlef2_more" :
				shelf1_title.innerHTML = shelf2_title.innerHTML;
				shelf1_subtitle.innerHTML = "";
				shelf1_more.style.display = "none";
				break;

			default :
				shelf1_title.innerHTML = "새로나온 도서";
				shelf1_subtitle.innerHTML = "";
				shelf1_more.style.display = "block";

				shelf2_title.innerHTML = "베스트셀러";
				shelf2_subtitle.innerHTML = "";
				shelf2_more.style.display = "block";
				break;
			}
	})();

	switch(id){
		case "shlef1_more" :
			getBookList(ListBestUrl);
			shelf2_display.style.display = "none";
			break;

		case "shlef2_more" :
			getBookList(ListMovieUrl);
			shelf2_display.style.display = "none";
			break;

		default :
			ListGenreurl += e.target.className + ".json";
			getBookList(ListGenreurl);
			if(shelf2_display.style.display = "none")
				shelf2_display.style.display = "block";
			break;
	}

			//alert(tag_name);

	(function setShelfoverflow(tag_name){
		switch(tag_name){
			case "DIV" :
				shelf1.style.height="auto";
				break;
			case "LI" :
				shelf1.style.height="330px";
				shelf2.style.height="330px";
				break;
		}
	})();
}
