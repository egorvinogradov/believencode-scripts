/*

<div class="bc-webinar"></div>
<link rel="stylesheet" href="https://believencode.surge.sh/webinar.css"/>
<script src="https://believencode.surge.sh/webinar.js"></script>
<script src="https://www.youtube.com/iframe_api"></script>

*/


const BC = window.BC || {};
BC.params = getPageParams();
BC.youtubeAPILoaded = false;


if (BC.params.lead_id) {
  changeAmoStatus(BC.params.lead_id, 'opened_webinar');
}

setContactFormCourse(BC.params.course_type);

waitUntilWebinarIsReady(BC.params.course_type, (webinar) => {
  BC.webinar = webinar;
  BC.webinarDuration = BC.webinar.getDuration();
  console.log('Webinar ready');
  enableWebinarTracker();
});


// Youtube JS API 'onReady' event is unreliable
// therefore using intervals to readiness checking
function waitUntilWebinarIsReady(course_type, callback){
  renderVideo(course_type);

  let isYoutubeAPIReady = false;
  let isVideoReady = false;
  let webinar = null;

  const interval = setInterval(() => {
    if (!isYoutubeAPIReady && window.YT && window.YT.Player) {
      webinar = new YT.Player('bc-player');
      isYoutubeAPIReady = true;
    }
    if (!isVideoReady && webinar && webinar.getDuration) {
      isVideoReady = true;
    }
    console.log('Checking webinar status... API: ' + isYoutubeAPIReady + '; video: ' + isVideoReady);

    if (isYoutubeAPIReady && isVideoReady) {
      clearInterval(interval);
      callback(webinar);
    }
  }, 300);
}


function getYoutubeVideoId(course_type){
  // noinspection NonAsciiCharacters,JSNonASCIINames
  const ids = {
    'Фронтенд': '1bFieQsV5TM',
    'UI/UX-дизайн': '1bFieQsV5TM',
    'Графический дизайн': '1bFieQsV5TM',
  };
  return ids[course_type || 'Фронтенд'];
}


function getWebinarTitle(course_type){
  // noinspection NonAsciiCharacters,JSNonASCIINames
  const titles = {
    'Фронтенд': 'Вебинар курса по фронтенд-разработке (JavaScript/ReactJS)',
    'UI/UX-дизайн': 'Вебинар курса по UI/UX-дизайну в Figma',
    'Графический дизайн': 'Вебинар курса по графическому дизайну в Photoshop',
  };
  return titles[course_type || 'Фронтенд'];
}


function setContactFormCourse(course_type) {
  document.querySelector('.uc-contact-form-full select[name=course]').value = course_type;
}


function renderVideo(course_type){
  const videoId = getYoutubeVideoId(course_type);
  const title = getWebinarTitle(course_type);
  const container = document.querySelector('.bc-webinar');

  container.innerHTML = '<h1 class="bc-webinar-header t-section__title t-title t-title_xs">' + title + '</h1>'
    + '<iframe id="bc-player"'
    + '  src="https://www.youtube.com/embed/' + videoId + '?enablejsapi=1"'
    + '  allow="fullscreen;"'
    + '  allowfullscreen'
    + '  frameborder="0"></iframe>';
}


function enableWebinarTracker(){
  console.log('Enable webinar tracker', BC);
  const lead_id = BC.params.lead_id;
  const interval = setInterval(() => {
    trackWebinarCompletion(() => {
      clearInterval(interval);

      if (lead_id) {
        changeAmoStatus(lead_id, 'watched_webinar');
      }
      showOffer(lead_id);
    });
  }, 1000);
}


function trackWebinarCompletion(callback){
  const time = BC.webinar.getCurrentTime();
  const percentage = time / BC.webinarDuration;

  console.log('Webinar completion: ' + Math.floor(percentage * 100) + '%');

  if (percentage > 0.95) {
    callback(time);
  }
}


function showOffer(lead_id){
  alert(`SHOW OFFER - lead_id: ${lead_id}`);
}


function changeAmoStatus(lead_id, status){
  const webHookUrl = 'https://hook.eu1.make.com/xqdq4hhnhdca8ds1ranjgpgyxg9j68ey';
  const paramString = '?lead_id=' + lead_id + '&to_status=' + status;

  console.log('Amo status: triggering webhook: ' + paramString);

  return fetch(webHookUrl + paramString).then(() => {
    console.log('Amo status: successfully triggered webhook');
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


/**
 * @return {{ lead_id: string, course_type: string }}
 */
function getPageParams(){
  const keys = ['lead_id', 'course_type'];
  const getParams = parseGetParams();
  const params = {};

  keys.forEach(key => {
    params[key] = getParams[key] || localStorage.getItem(key);
  });

  return params;
}
