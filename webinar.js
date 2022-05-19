/*

<div class="bc-webinar">
  <iframe id="bc-player"
    src="https://www.youtube.com/embed/1bFieQsV5TM?enablejsapi=1"
    allow="fullscreen;"
    allowfullscreen
    frameborder="0"></iframe>
</div>

<link rel="stylesheet" href="https://belivencode.surge.sh/webinar.css"/>
<script src="https://www.youtube.com/iframe_api"></script>
<script src="https://belivencode.surge.sh/webinar.js"></script>

*/


window.BC = window.BC || {};
window.BC.youtubeAPILoaded = false;


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

  const client = getClientData();

  if (client.lead_id && client.email) {
    window.BC.client = client;
    enableWebinarTracker(client.lead_id, client.email);
  }
}


function enableWebinarTracker(lead_id, email){
  console.log('Enable webinar tracker', window.BC);

  window.BC.webinarTracker = setInterval(() => {
    trackWebinar(() => {
      clearInterval(window.BC.webinarTracker);
      changeAmoStatus(lead_id, email);
      showOffer(lead_id, email);
    });
  }, 1000);
}


function trackWebinar(callback){
  const time = window.BC.webinar.getCurrentTime();
  const percentage = time / window.BC.webinarDuration;

  console.log(`Webinar completion: ${Math.floor(percentage * 100)}%`);

  if (percentage > 0.95) {
    callback(time);
  }
}


function showOffer(lead_id, email){
  alert(`SHOW OFFER - lead_id: ${lead_id}, email: ${email}`);
}


function changeAmoStatus(lead_id, email){
  alert(`CHANGE AMO STATUS - lead_id: ${lead_id}, email: ${email}`);
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
  let email = params.email || localStorage.getItem('email');

  if (lead_id && email) {
    localStorage.setItem('lead_id', lead_id);
    localStorage.setItem('email', email);
  }

  return {
    lead_id: lead_id,
    email: email
  };
}
