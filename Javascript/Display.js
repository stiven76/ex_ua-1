﻿var Display =
{
            status_timer : null,
            statusDiv : null,
            status1_timer : null,
            status1Div : null,
            index : 1, 
            run: 0,
            totalTime : 0,
            time : 0,

};


Display.init = function()
{
    var success = true;
     this.status1Div = document.getElementById("status1");
     this.statusDiv = document.getElementById("status");

    if (!this.statusDiv&&!this.status1Div)
    {
        success = false;
    }
    
    return success;
};
  

Display.setVolume = function()
{
	var volume = Audio.getVolume();
	Display.status("<span>ГРОМКОСТЬ " + volume + "</span>");
};

Display.hidemenu = function()
{
	document.getElementById("main").style.display="none";
};

Display.showmenu = function()
{
	document.getElementById("main").style.display="block";
};


Display.hideplayer = function()
{
	document.getElementById("player").style.display="none";
	
	if(Player.state == Player.PLAYING)
	{
		
		document.getElementById("help_navi_l_player").style.display="none";
		document.getElementById("help_navi_player").style.display="block";
	}
};


Display.showplayer = function()
{
                    
                  
    if(Player.state == Player.PLAYING || Player.state == Player.PAUSA)
	{
		document.getElementById("help_navi_l_player").style.display="none";
		document.getElementById("help_navi_player").style.display="block";
		document.getElementById("infoMovi").style.display="block";
              }                  
     if(Player.state == Player.PAUSA)
	{
		document.getElementById("but_pause").style.display="none";
		document.getElementById("but_play").style.display="block";
		document.getElementById("statusbar").style.display="";
		                       
              }      
    if(Player.state == Player.PLAYING_LIVE)
	{
		document.getElementById("help_navi_l_player").style.display="block";
		document.getElementById("help_navi_player").style.display="none";
		document.getElementById("infoMovi").style.display="none";
		
	}
	clearTimeout(this.infobar_timer);
	document.getElementById("player").style.display="block";
       	
	if(Player.state != Player.PAUSA && Main.StreamMode != "http.mp3")
	     Display.infobarTimer();
	
};
	
Display.infobarTimer = function()
{
	this.infobar_timer=setTimeout("Display.hideplayer()",5000);
};
Display.status = function(status)
{             document.getElementById("version").style.display="none";
	document.getElementById("statusbar").style.display="block";
              widgetAPI.putInnerHTML(this.statusDiv, status);
	clearTimeout(this.status_timer);
	Display.statusTimer();
};


Display.status1 = function(status1)
{
	document.getElementById("statusbar1").style.display="block";
              widgetAPI.putInnerHTML(this.status1Div, status1);
	clearTimeout(this.status1_timer);
	Display.status1Timer();
};

Display.hidestatus = function()
{
	document.getElementById("statusbar").style.display="none";
	document.getElementById("version").style.display="";
	
	if (Audio.mute==0 && Player.state != Player.STOPPED)
		{
                            Audio.plugin.SetSystemMute(true);
		document.getElementById("statusbar").style.display="block";
		widgetAPI.putInnerHTML(Display.statusDiv, 'Звук выключен !');
                            }
	
};

Display.hidestatus1 = function()
{
	document.getElementById("statusbar1").style.display="none";
};

Display.statusTimer = function()
{
	this.status_timer=setTimeout("Display.hidestatus()",2000);
};

Display.status1Timer = function()
{
	this.status1_timer=setTimeout("Display.hidestatus1()",2000);
};

Display.setTotalTime = function(total) {this.totalTime = total;};
Display.setTime = function(time)
{
	var timePercent =(100 * time) / this.totalTime;
	var Barwidth = Math.floor(timePercent*6.4);
	var timeHTML = "";
	var timeHour = 0;
	var timeMinute = 0;
	var timeSecond = 0;
	var totalTimeHour = 0; 
	var totalTimeMinute = 0; 
	var totalTimeSecond = 0;
	document.getElementById("progressBar").style.width = Barwidth + "px";
	if(Player.state == Player.PLAYING || Player.state == Player.PAUSA )
	{
		totalTimeHour = Math.floor(this.totalTime/3600000);
		timeHour = Math.floor(time/3600000);
		totalTimeMinute = Math.floor((this.totalTime%3600000)/60000);
		timeMinute = Math.floor((time%3600000)/60000);
		totalTimeSecond = Math.floor((this.totalTime%60000)/1000);
		timeSecond = Math.floor((time%60000)/1000);
		timeHTML = timeHour + ":";
		if(timeMinute == 0)
			timeHTML += "00:";
		else if(timeMinute <10)
			timeHTML += "0" + timeMinute + ":";
		else
			timeHTML += timeMinute + ":";
		if(timeSecond == 0)
			timeHTML += "00/";
		else if(timeSecond <10)
			timeHTML += "0" + timeSecond + "/";
		else
			timeHTML += timeSecond + "/";

		timeHTML += totalTimeHour + ":";
		if(totalTimeMinute == 0)
			timeHTML += "00:";
		else if(totalTimeMinute <10)
			timeHTML += "0" + totalTimeMinute+":";
		else
			timeHTML += totalTimeMinute+":";
		if(totalTimeSecond == 0)
			timeHTML += "00";
		else if(totalTimeSecond <10)
			timeHTML += "0" + totalTimeSecond;
		else
			timeHTML += totalTimeSecond;
		
		if (totalTimeMinute != 0) {
			if (timeSecond >= totalTimeSecond && timeMinute >= totalTimeMinute
					&& timeHour >= totalTimeHour) {
				Player.stopVideo();
				timeHTML = "0:00:00 / 0:00:00";
				setTimeout("Display.Timeout()", 3000);

			}
		}
	}
	else {
		timeHTML = "0:00:00/0:00:00";	
	}
	
	document.getElementById("timeInfo").innerHTML=timeHTML;
};

Display.Timeout = function() {
	Main.selectNextVideo(); // переключение на след. трек
	url = URLtoXML.pUrlSt[b];
	Main.handlePlayKey(url); // играть
};
