(function(){
	// X, Y touch 했을 때의 좌표값
	var touchStartX, touchStartY;
	// 현재 페이지는 2페이지로
	var page = 2;
	var uBooks1 = document.getElementById('book1');
	var uBooks2 = document.getElementById('book2');

	var oDATA = {
		marginLeft : -346
	}

	// 기본 스타일 지정
	uBooks1.style.marginLeft = oDATA.marginLeft + "px";
	uBooks2.style.marginLeft = oDATA.marginLeft + "px";

	// 터치 이벤트 등록
	document.addEventListener("touchstart", handleTouchEvent, false);
	document.addEventListener("touchend", handleTouchEvent, false);

	/* 
	 * handleTouchEvent
	 * 터치 이벤트에서의 행동
	 * case "touchstart" : <, > 터치시 touchStartX, Y의 값을 <, > 아이콘의 중심 좌표로 설정한다
	 * case "touchend" : 마지막 터치의 좌표 값을 touchEndX, Y에 넣고, 터치 시작의 좌표값과의 거리를 계산,
	 *					이 거리의 제곱이 800 이하 일 때 새로운 책들을 불러온다.
	 */
	function handleTouchEvent(e){
		switch(e.type){
			case "touchstart" :
				if(e.target.className === 'move'){
					console.log('touchstart');
					touchStartX = e.target.offsetLeft + e.target.offsetWidth/2
					touchStartY = e.target.offsetTop + e.target.offsetHeight/2
				}
				break;

			case "touchend" :
				if(e.target.className === 'move'){
					console.log('touchend');
					var touchEndX = e.changedTouches[0].clientX;
					var touchEndY = e.changedTouches[0].clientY;

					var touchOffSetX = touchEndX - touchStartX;
					var touchOffSetY = touchEndY - touchStartY;

					if(Math.pow(touchOffSetX,2)+Math.pow(touchOffSetY,2) < 800){
						loadBooks(e.target.id);
					}
				}
				break;
		}
	}

	/* 
	 * loadBooks
	 * 터치 이벤트에서
	 * < 터치 : margin-left값을 증가시켜 현재 페이지의 왼쪽에 있는 책들을 나타내고, 페이지 값을 줄인다
	 * > 터치 : margin-left값을 감소시켜 현재 페이지의 오른쪽에 있는 책들을 나타내고, 페이지 값을 늘린다
	 */
	function loadBooks(id){
		switch(id){
			case "left_move" :
				if (page === 1)
				// 1페이지일 때는 이동 없음
					return;
				uBooks1.style.marginLeft = parseInt(uBooks1.style.marginLeft) - oDATA.marginLeft + "px";
				uBooks2.style.marginLeft = parseInt(uBooks2.style.marginLeft) - oDATA.marginLeft + "px";
				page--;
				break;

			case "right_move" :
				if (page === 3)
				// 3페이지일 때는 이동 없음
					return;
				uBooks1.style.marginLeft = parseInt(uBooks1.style.marginLeft) + oDATA.marginLeft + "px";
				uBooks2.style.marginLeft = parseInt(uBooks2.style.marginLeft) + oDATA.marginLeft + "px";
				page++;
				break;
		}
	}



})();