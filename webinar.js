/*

<div class="bc-webinar">
  <iframe id="bc-player"
    src="https://www.youtube.com/embed/1bFieQsV5TM?enablejsapi=1"
    allow="fullscreen;"
    allowfullscreen
    frameborder="0"></iframe>
</div>

<link rel="stylesheet" href="https://believencode.surge.sh/webinar.css"/>
<script src="https://www.youtube.com/iframe_api"></script>
<script src="https://believencode.surge.sh/webinar.js"></script>

*/


window.BC = window.BC || {};
window.BC.client = getClientData();
window.BC.youtubeAPILoaded = false;


if (window.BC.client.lead_id) {
  changeAmoStatus(window.BC.client.lead_id, 'opened_webinar');
}



// onYouTubeIframeAPIReady() is supposed to be fired by Youtube JS API
// but it is not working reliably
// therefore it could either be fired by a timeout (below)

function onYouTubeIframeAPIReady(){
  console.log('onYouTubeIframeAPIReady fired');
  window.BC.youtubeAPILoaded = true;
  let isOnReadyFired = false;

  window.BC.webinar = new YT.Player('bc-player', {
    events: {
      onReady: () => {
        if (!isOnReadyFired) {
          isOnReadyFired = true;
          console.log('onWebinarReady fired');
          onWebinarReady();
        }
      },
    },
  });

  setTimeout(() => {
    if (!isOnReadyFired) {
      isOnReadyFired = true;
      console.warned('(!) onWebinarReady fired by timeout');
      onWebinarReady();
    }
  }, 10 * 1000);
}



setTimeout(() => {
  if (!window.BC.youtubeAPILoaded) {
    console.warn('(!) onYouTubeIframeAPIReady fired by timeout');
    onYouTubeIframeAPIReady();
  }
}, 15 * 1000);



function onWebinarReady(){
  console.log('Webinar ready', window.BC);
  window.BC.webinarDuration = BC.webinar.getDuration();
  enableWebinarTracker();
}


function enableWebinarTracker(){
  console.log('Enable webinar tracker', window.BC);
  const lead_id = window.BC.client.lead_id;

  window.BC.webinarTracker = setInterval(() => {
    trackWebinarCompletion(() => {
      clearInterval(window.BC.webinarTracker);
      showOffer(lead_id);

      if (lead_id) {
        changeAmoStatus(lead_id, 'watched_webinar');
      }
    });
  }, 1000);
}


function trackWebinarCompletion(callback){
  const time = window.BC.webinar.getCurrentTime();
  const percentage = time / window.BC.webinarDuration;

  console.log('Webinar completion: ' + Math.floor(percentage * 100) + '%');

  if (percentage > 0.95) {
    callback(time);
  }
}


function showOffer(lead_id){
  alert(`SHOW OFFER - lead_id: ${lead_id}`);
}


function changeAmoStatus(lead_id, status){
  const webhookUrl = 'https://hook.eu1.make.com/xqdq4hhnhdca8ds1ranjgpgyxg9j68ey';
  const paramString = '?lead_id=' + lead_id + '&to_status=' + status;

  console.log('Amo status: triggering webhook: ' + paramString);

  return fetch(webhookUrl + paramString).then(() => {
    console.log('Amo status: succesfully triggered webhook');
  });
}


function parseGetParams(){
  const obj = {};
  decodeURIComponent(location.search)
    .replace(/^\?/, '')
    .split('&')
    .forEach(val => {
      const pair = val.split('=');
      obj[pair[0]] = pair[1];
    });
  return obj;
}


function getClientData(){
  let params = parseGetParams();
  let lead_id = params.lead_id || localStorage.getItem('lead_id');

  if (lead_id) {
    localStorage.setItem('lead_id', lead_id);
  }

  return {
    lead_id: lead_id,
  };
}
