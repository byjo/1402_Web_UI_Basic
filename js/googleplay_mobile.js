(function(){
	var touchStartX, touchStartY;
	var page = 2;
	var uBooks1 = document.getElementById('book1');
	var uBooks2 = document.getElementById('book2');

	var oDATA = {
		marginLeft : -346
	}

	uBooks1.style.marginLeft = oDATA.marginLeft + "px";
	uBooks2.style.marginLeft = oDATA.marginLeft + "px";

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

	function loadBooks(id){
		switch(id){
			case "left_move" :
				if (page === 1)
					return;
				uBooks1.style.marginLeft = parseInt(uBooks1.style.marginLeft) - oDATA.marginLeft + "px";
				uBooks2.style.marginLeft = parseInt(uBooks2.style.marginLeft) - oDATA.marginLeft + "px";
				page--;
				break;

			case "right_move" :
				if (page === 3)
					return;
				uBooks1.style.marginLeft = parseInt(uBooks1.style.marginLeft) + oDATA.marginLeft + "px";
				uBooks2.style.marginLeft = parseInt(uBooks2.style.marginLeft) + oDATA.marginLeft + "px";
				page++;
				break;
		}
	}

	document.addEventListener("touchstart", handleTouchEvent, false);
	document.addEventListener("touchend", handleTouchEvent, false);

})();