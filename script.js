var total_section = 0; //전체 원페이지 수
var current_idx = 0;
var screen_h = 0; // 화면 높이
var page_h = 0;
var last_y = 0; // 스크롤 마지막 하단 높이
var onpage_on = true;
var isScroll = false;

$(document).ready(function(){
	
	init();
	
		
	// Scroll Event
	$('body').on('scroll touchmove mousewheel', function(event) {	
		
		//console.log(current_idx);

		if(last_y > $("html").scrollTop() && !onpage_on){
			
			//원페이지 스크롤 진입
			console.log(":: 원페이지 시작 ::");
			onpage_on = true;
			isScroll = false;
		}
		
		if(!onpage_on) return;
		
		//스크롤 이벤트 막기
		event.preventDefault();
		event.stopPropagation();		
		if(isScroll) return; // 현재 스크롤이 동작중이면 종료
		
		
		isScroll = true;		
		var direction = event.originalEvent.wheelDelta; //마우스 휠 방향
		var y = 0;

		if(direction > 0){
			// up
			current_idx --;
			if(current_idx < 0){current_idx = -1;}
			y = current_idx * page_h;
		}
		else{
			// down
			current_idx ++;
			if(current_idx > total_section){
				current_idx = total_section;
				onpage_on = false;
				return;
			}
			
			y = current_idx * page_h;		
		}

		$('body').animate({scrollTop: y}, 500, function(){isScroll=false;});	
	});
});

$( window ).resize(function() {
	
	// 반응형
	setHeight();
});


function init(){
	
	setHeight();
	
	total_section = $('#onepage > section').length;
	last_y = page_h * total_section;
}	

function setHeight(){
	
	// 높이 설정
	screen_h = document.body.clientHeight;
	page_h = screen_h;
	$("#onepage > section").height(page_h);
}