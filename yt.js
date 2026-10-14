
(function(){var player=null,first=true;
window.CANSPEAK=function(){var p=window.YTP||player;if(!p||!p.getPlayerState)return true;try{var s=p.getPlayerState();return !((s===1||s===3)&&!p.isMuted())}catch(e){return true}};
setInterval(function(){if(!window.CANSPEAK()&&window.__a&&!window.__a.paused)window.__a.pause()},300);
if(window.VIDID){var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s);
window.onYouTubeIframeAPIReady=function(){player=window.YTPREAL=new YT.Player('yt',{videoId:VIDID,playerVars:{rel:0,playsinline:1,modestbranding:1},events:{onStateChange:function(e){if(e.data===1){if(first){first=false;try{player.unMute();player.setVolume(100)}catch(x){}}if(window.__a)window.__a.pause()}}}})}}
})();
