$(function(){
	var sessionMinute = 25,
			sessionSecond = '00',
			breakMinute = 5,
			breakSecond = '00',
			settedSessionMinute = 25,
			settedSessionSecond = '00',
			settedBreakMinute = 5,
			settedBreakSecond = '00',
			sessionTimingSet,
			breakTimingSet,
			startStopStatus = -1,
			sessionIsOn = false,
			breakIsOn = false,
			buttonVal,
			audio1 = new Audio('http://soundbible.com/mp3/Typing%20On%20Keyboard-SoundBible.com-1459197142.mp3'),
			audio2 = new Audio('http://freesound.org/data/previews/66/66951_634166-lq.mp3');
	
	audio1.volume = 0.2;
	audio2.volume = 0.2;
	
	//Start and Stop functions sessionTiming()
	function startSession(){
		breakIsOn = false;
		sessionIsOn = true;
		sessionTimingSet = setInterval(sessionTiming, 1000);	
	}

	function stopSession() {
		clearInterval(sessionTimingSet);
	}

	//Start and Stop functions breakTiming()
	function startBreak() {
		sessionIsOn = false;
		breakIsOn = true;
		breakTimingSet = setInterval(breakTiming, 1000);
	}

	function stopBreak() {
		clearInterval(breakTimingSet);
	}

	//Checks the length of the number and if is less the 1, concatenates '0'
	function checkBreakLength() {
		breakMinute = breakMinute.toString();
		breakSecond = breakSecond.toString();
		if(breakMinute.length == 1) {			
			breakMinute = '0' + breakMinute;
		}		
		if(breakSecond.length == 1) {			
			breakSecond = '0' + breakSecond;
		}
	}

	//Checks the length of the number and if is less the 1, concatenates '0'
	function checkSessionLength() {
		sessionMinute = sessionMinute.toString();
		sessionSecond = sessionSecond.toString();
		if(sessionMinute.length == 1) {			
			sessionMinute = '0' + sessionMinute;
		}		
		if(sessionSecond.length == 1) {			
			sessionSecond = '0' + sessionSecond;
		}
	}


	//BREAK TIME FUNCTION
	function breakTiming() {
		stopSession();
		//Decrease break time.
		if(breakSecond == 00){
			breakMinute--;
			breakSecond = 59;
		}else {
			breakSecond--;
		}
		checkBreakLength();
		//Update time and background-color on the screen.
		$('.time').text(breakMinute + ":" + breakSecond);
		$('.clock-tomato').css({'background-color': '#7a5959'});
		if(breakMinute == 0 && breakSecond == 0) {
			breakMinute = settedBreakMinute;
			breakSecond = settedBreakSecond;
			stopBreak();
			setTimeout(audio1.play(), 100);			
			startSession();
		}
	}


	//SESSION TIME FUNCTION
	function sessionTiming() {
		stopBreak();
		//Decrease session time.
		if(sessionSecond == 00){
			sessionMinute--;
			sessionSecond = 59;
		}else {
			sessionSecond--;
		}
		checkSessionLength();
		//Update time and background-color on the screen.
		$('.time').text(sessionMinute + ":" + sessionSecond);
		$('.clock-tomato').css({'background-color': '#b20303'});
		if(sessionMinute == 0 && sessionSecond == 0) {
			sessionMinute = settedSessionMinute;
			sessionSecond = settedSessionSecond;
			stopSession();
			setTimeout(audio2.play(), 100);
			startBreak();
		}
	}


	//STARTS or STOPS THE SESSION.
	function checkStatusStartStop() {
		startStopStatus = startStopStatus * -1;
		if(breakIsOn == false){		
			if(startStopStatus == 1){
				//Set these classes because the clock has been initialized.
				$('.start-stop-session-title').text('STOP');
				$('.start-stop').css({'background-color': '#444242'});
				audio1.play();				
				startSession();
			}
			if(startStopStatus == -1) {
				//Set these classes because the clock has been stoped.
				$('.start-stop-session-title').text('START');
				$('.start-stop').css({'background-color': '#b70000'});
				audio1.pause();
				audio1.currentTime = 0;
				stopSession();				
			}
		}else if(sessionIsOn == false) {
			if(startStopStatus == 1){
				//Set these classes because the clock has been initialized.
				$('.start-stop-session-title').text('STOP');
				$('.start-stop').css({'background-color': '#444242'});
				audio2.play();
				startBreak();
			}
			if(startStopStatus == -1) {
				//Set these classes because the clock has been stoped.
				$('.start-stop-session-title').text('START');
				$('.start-stop').css({'background-color': '#b70000'});
				audio2.pause();
				audio2.currentTime = 0;
				stopBreak();				
			}
		}
	}

	//LISTENS TO 'START SESSION' BUTTON. THE CLOCK STARTS HERE.
	$('.start-stop').on('click', checkStatusStartStop);

	//FUNCTION TO RESET EVERYTHING ON DEFAULT VALUES.
	function resetEverything() {
		stopSession();
		stopBreak();
		sessionMinute = '25',
			sessionSecond = '00',
			breakMinute = '05',
			breakSecond = '00',
			settedSessionMinute = '25',
			settedSessionSecond = '00',
			settedBreakMinute = '05',
			settedBreakSecond = '00',
			startStopStatus = -1;
		sessionIsOn = false;
		breakIsOn = false;
		$('.time').text(sessionMinute + ":" + sessionSecond);
		$('.clock-tomato').css({'background-color': '#b20303'});
		$('.sessionUpdated').text('SESSION TIME: ' + sessionMinute);
		$('.breakUpdated').text('BREAK TIME: ' + breakMinute);
		$('.start-stop-session-title').text('START');
		$('.start-stop').css({'background-color': '#b70000'});
	}

	//Calls resetEverything() if reset button was pressed.
	$('.reset').on('click', resetEverything);


	//BREAK BUTTONS FUNCTIONS
	function breakPlus() {
		if(breakIsOn){
			stopBreak();
			//RESET EVERYTHING BECAUSE THE CLOCK STOPPED
			startStopStatus = startStopStatus * -1;
			$('.start-stop-session-title').text('START');
			$('.start-stop').css({'background-color': '#b70000'});
		}		
		//Prevent from get the session length upper than 50 minutes
		if(breakMinute >= 100) {
			Continue;
		}		
		breakMinute++;
		settedBreakMinute = breakMinute;
		settedBreakSecond = breakSecond = 0;
		checkBreakLength();
		$('.breakUpdated').text('BREAK TIME: ' + breakMinute);
		$(this).animate({'background-color' : '#3d3a3a'},100)
			.animate({'background-color' : '#686363'},100);
		$('.time').text(breakMinute + ":" + breakSecond);
		$('.clock-tomato').css({'background-color': '#7a5959'});					
	}

	function breakMinus() {
		if(breakIsOn){
			stopBreak();
			//RESET EVERYTHING BECAUSE THE CLOCK STOPPED
			startStopStatus = startStopStatus * -1;
			$('.start-stop-session-title').text('START');
			$('.start-stop').css({'background-color': '#b70000'});
		}
		//Prevent from get the session length lower than 1 minute
		if(breakMinute <= 1) {
			Continue;
		}		
		breakMinute--;
		settedBreakMinute = breakMinute;
		settedBreakSecond = breakSecond = 0;
		checkBreakLength();
		$('.breakUpdated').text('BREAK TIME: ' + breakMinute);
		$(this).animate({'background-color' : '#3d3a3a'},100)
			.animate({'background-color' : '#686363'},100);
		$('.time').text(breakMinute + ":" + breakSecond);
		$('.clock-tomato').css({'background-color': '#7a5959'});
	}


	//SESSION BUTTONS FUNCTIONS
	function sessionPlus() {
		if(sessionIsOn) {
			stopSession();
			//RESET EVERYTHING BECAUSE THE CLOCK STOPPED
			startStopStatus = startStopStatus * -1;
			$('.start-stop-session-title').text('START');
			$('.start-stop').css({'background-color': '#b70000'});
		}			
		//Prevent from get the session length upper than 50 minutes
		if(sessionMinute >= 100) {
			Continue;
		}
		sessionMinute++;
		settedSessionMinute = sessionMinute;
		settedSessionSecond = sessionSecond = 0;
		checkSessionLength();
		$('.sessionUpdated').text('SESSION TIME: ' + sessionMinute);
		$(this).animate({'background-color' : '#8e0119'},100)
			.animate({'background-color' : '#ef0707'},100);
		$('.time').text(sessionMinute + ":" + sessionSecond);
		$('.clock-tomato').css({'background-color': '#b20303'});
	}

	function sessionMinus() {
		if(sessionIsOn) {
			stopSession();
			//RESET EVERYTHING BECAUSE THE CLOCK STOPPED
			startStopStatus = startStopStatus * -1;
			$('.start-stop-session-title').text('START');
			$('.start-stop').css({'background-color': '#b70000'});
		}	
		//Prevent from get the session length lower than 1 minute
		if(sessionMinute <= 1) {
			Continue;			
		}
		sessionMinute--;
		settedSessionMinute = sessionMinute;
		settedSessionSecond = sessionSecond = 0;
		checkSessionLength();
		$('.sessionUpdated').text('SESSION TIME: ' + sessionMinute);
		$(this).animate({'background-color' : '#8e0119'},100)
			.animate({'background-color' : '#ef0707'},100);
		$('.time').text(sessionMinute + ":" + sessionSecond);
		$('.clock-tomato').css({'background-color': '#b20303'});
	}

	/*BUTTON EVENTS HANDLERS  */
	$('.clock-break-plus').on('click', breakPlus);
	$('.clock-break-minus').on('click', breakMinus);
	$('.clock-session-plus').on('click', sessionPlus);
	$('.clock-session-minus').on('click', sessionMinus);
	
});