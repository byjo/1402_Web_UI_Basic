// self invoking
(function(){

	/* 
	 * DOM Tree가 생성 된 이후 
	 * 변수 생성, 스타일 지정, 이벤트 등록을 한다 
	 */
	window.addEventListener('load', function(){
			//setVariables();
			var dShelf1 = document.getElementById('shelf1');
			var dShelf2 = document.getElementById('shelf2');
			var uSelectGenre = document.getElementById('select').querySelector('.genrelayer').querySelector('ul');
			var dOverlay = document.getElementById('loading_overlay');
			var uGenrelayer = document.querySelector('.genrelayer');
			var uBooks1 = dShelf1.querySelector('.book');
			var uBooks2 = dShelf2.querySelector('.book');
			var dSeeMoreShelf1 = dShelf1.querySelector('div.more');
			var dSeeMoreShelf2 = dShelf2.querySelector('div.more');

			var oDATA = {
				sShelfHeight : "330px",
				hTitleShelf1 : "새로나온 도서",
				hTitleShelf2 : "베스트셀러"
			}

			setElementStyle();
			attachEvents();
	}, false);

	// function setVariables(){
	// 	var dShelf1 = document.getElementById('shelf1');
	// 	var dShelf2 = document.getElementById('shelf2');
	// 	var uSelectGenre = document.getElementById('select').querySelector('.genrelayer').querySelector('ul');
	// 	var dOverlay = document.getElementById('loading_overlay');
	// 	var uGenrelayer = document.querySelector('.genrelayer');
	// 	var uBooks1 = dShelf1.querySelector('.book');
	// 	var uBooks2 = dShelf2.querySelector('.book');
	// 	var dSeeMoreShelf1 = dShelf1.querySelector('div.more');
	// 	var dSeeMoreShelf2 = dShelf2.querySelector('div.more');

	// 	var oDATA = {
	// 		sShelfHeight : "330px",
	// 		hTitleShelf1 : "새로나온 도서",
	// 		hTitleShelf2 : "베스트셀러"
	// 	}
	// }


	/* 
	 * setElementStyle
	 * 세부 장르 선택 레이어, 화면 전환 사이의 로딩 이미지 숨김
	 * 첫 번째 서재의 더보기, 두 번째 서재의 display를 나타냄
	 * 첫 번째, 두 번째 서재의 높이 값 설정 sShelfHeight === 330px
	 */
	function setElementStyle(){
		uGenrelayer.style.display = "none";
		dOverlay.style.display = "none"
		dSeeMoreShelf1.style.display = "block";
		dShelf2.style.display = "block";

		uBooks1.style.height = oDATA.sShelfHeight;
		uBooks2.style.height = oDATA.sShelfHeight;
	}

	/* 
	 * attachEvents
	 * 첫 번째, 두 번째 서재의 더보기 버튼(div) 클릭 시 loadBooks 이벤트 등록
	 * 장르 레이어의 li 클릭 시 loadBooks 이벤트 등록(event delegate)
	 * body영역 전체에 displayGenre 이벤트 등록
	 */
	function attachEvents(){
		dSeeMoreShelf1.addEventListener('click', loadBooks, false);
		dSeeMoreShelf2.addEventListener('click', loadBooks, false);
		uSelectGenre.addEventListener('click', loadBooks, false);
		document.body.addEventListener('click', displayGenre, false);
	}

	/* 
	 * loadBooks
	 * 서재의 Heading 부분 수정 - handleHeading
	 * 서재의 책 list 내용 수정 - changeBookContents
	 * 서재의 높이 수정 - setShelfOverflow
	 */
	function loadBooks(e){
		handleHeading(e.target.id);
		changeBookContents(e.target.id, e.target.className);
		setShelfOverflow(e.target.tagName);
	}

	/* 
	 * handleHeading
	 * 
	 */
	function handleHeading(id){
		var dHeadShelf1 = dShelf1.querySelector('.heading');
		var hTitleShelf1 = dHeadShelf1.querySelector('h1');
		var sSubTitleShelf1 = dHeadShelf1.querySelector('span');

		var dHeadShelf2 = dShelf2.querySelector('.heading');
		var hTitleShelf2 = dHeadShelf2.querySelector('h1');
		var sSubTitleShelf2 = dHeadShelf2.querySelector('span');


		switch(id){
			case "shlef1_more" :
				sSubTitleShelf1.innerHTML = "";
				dSeeMoreShelf1.style.display = "none";
				break;

			case "shlef2_more" :
				hTitleShelf1.innerHTML = hTitleShelf2.innerHTML;
				sSubTitleShelf1.innerHTML = "";
				dSeeMoreShelf1.style.display = "none";
				break;

			default :
				hTitleShelf1.innerHTML = oDATA.hTitleShelf1;
				sSubTitleShelf1.innerHTML = "";
				dSeeMoreShelf1.style.display = "block";

				hTitleShelf2.innerHTML = oDATA.hTitleShelf2;
				sSubTitleShelf2.innerHTML = "";
				dSeeMoreShelf2.style.display = "block";
				break;
			}
	}

	/* 
	 * changeBookContents
	 * 서재의 책 list update를 위한 분기점
	 */
	function changeBookContents(id, className){
		var sListBestUrl = "http://127.0.0.1:8000/data/listBestBooks.json";
		var sListMovieUrl = "http://127.0.0.1:8000/data/listMovieBooks.json";
		var sListGenreurl = "http://127.0.0.1:8000/data/listGenreBooks_";

		switch(id){
			case "shlef1_more" :
			// 첫 번째 서재의 더보기 클릭
				getBookList(sListBestUrl);
				dShelf2.style.display = "none";
				// 두 번째 서재는 보여주지 않는다
				break;

			case "shlef2_more" :
			// 두 번째 서재의 더보기 클릭
				getBookList(sListMovieUrl);
				dShelf2.style.display = "none";
				break;

			default :
			// 장르 클릭
				sListGenreurl += className + ".json";
				// 선택 된 장르에 맞는 데이터가 있는 url 주소 생성
				getBookList(sListGenreurl);
				if(dShelf2.style.display = "none")
					dShelf2.style.display = "block";
				break;
		}
	}

	/* 
	 * setShelfOverflow 
	 * 서재의 높이 설정
	 */
	function setShelfOverflow(tag){
		switch(tag){
			case "DIV" :
			// 더보기 클릭 시 모든 책의 list를 볼 수 있게 높이값 auto로 설정
				uBooks1.style.height = "auto";
				break;

			case "LI" :
			// 장르 클릭 시 각 서재가 1줄로 보여지도록 높이값을 330px로 설정
				uBooks1.style.height = oDATA.sShelfHeight;
				uBooks2.style.height = oDATA.sShelfHeight;
				break;
		}
	}

	/* 
	 * getBookList
	 * Ajax 통신을 통해 서재의 책 list data를 받아온다
	 */
	function getBookList(url) {
		var request = new XMLHttpRequest();

		request.open("GET" , url , true);
		request.send(null);

		request.onreadystatechange = function() {		
			if(request.readyState === 4 && request.status === 200) {
				var result = request.responseText;
				result = JSON.parse(result);
				uBooks1.innerHTML = makeBookElement(result);
				uBooks2.innerHTML = makeBookElement(result);
				// 로딩 이미지 표시 시간이 너무 짧아 1초 후 없어지도록 설정
				setTimeout(removeOveraly, 1000);
			}
		}

		// Ajax 통신을 통해 data를 받아오는 동안 로딩 이미지를 표시한다
		dOverlay.style.display = "block"

		function removeOveraly() {
			dOverlay.style.display = "none";
		}
	}

	/* 
	 * makeBookElement
	 * sTemplate와 통신을 통해 불러온 list data를 이용해 html 생성
	 */
	function makeBookElement(aBookList){
		var sTotal="";
		var sTemplate="<li><div class='cover'><a href='<%=src%>'><img src='<%=imgSrc%>' alt='<%=title%>'></a></div><ul class='content'><li class='title'><a href='#'><%=title%></a></li><li class='author'><a href='#'><%=author%></a></li><li class='price'><a href='#'><%=price%></a></li></ul></li>";

		aBookList.forEach(
			function(item){
				var sResult = sTemplate.replace("<%=src%>", item.src);
				sResult = sResult.replace("<%=imgSrc%>", item.imgSrc);
				sResult = sResult.replace("<%=title%>", item.title);
				sResult = sResult.replace("<%=title%>", item.title);
				sResult = sResult.replace("<%=author%>", item.author);
				sResult = sResult.replace("<%=price%>", item.price);
				sTotal += sResult + "\n"; 
			}
		);
		return sTotal;
	}

	/* 
	 * displayGenre
	 * 장르 레이어를 보여주고 숨긴다
	 */
	function displayGenre(e){
		// 장르 레이어가 숨겨져 있을 때
		if(uGenrelayer.style.display === "none"){
			if(e.target.className === "genre" || e.target.className === "genre_title" || e.target.className === "genre_icon")
				uGenrelayer.style.display = "block"
		}

		// 장르 레이어가 보일 때
		else{
			// 장르 레이어와 장르가 아닌 부분을 클릭하면 장르 레이러를 숨긴다
			if(e.target.className !== "genrelayer")
				uGenrelayer.style.display = "none"
		}
	}
	
})();