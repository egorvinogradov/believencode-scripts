/*

<div class="bc-webinar"></div>
<link rel="stylesheet" href="https://believencode.surge.sh/common.css"/>
<link rel="stylesheet" href="https://believencode.surge.sh/webinar.css"/>
<script src="https://believencode.surge.sh/common.js"></script>
<script src="https://believencode.surge.sh/webinar.js"></script>
<script src="https://www.youtube.com/iframe_api"></script>

*/


window.BC = window.BC || {};
BC.params = getPageParams();
BC.youtubeAPILoaded = false;


if (BC.params.lead_id && BC.params.course_name) {
  changeAmoStatus(BC.params.lead_id, 'opened_webinar');
}

setContactFormCourse(BC.params.course_name);

waitUntilWebinarIsReady(BC.params.course_name, (webinar) => {
  BC.webinar = webinar;
  BC.webinarDuration = BC.webinar.getDuration();
  console.log('Webinar ready');
  enableWebinarTracker();
});


// Youtube JS API 'onReady' event is unreliable
// therefore using intervals to readiness checking
function waitUntilWebinarIsReady(courseName, callback){
  renderVideo(courseName);

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


function getYoutubeVideoId(courseName){
  return selectByCourse(courseName, {
    frontend: '1bFieQsV5TM',
    ui: '1bFieQsV5TM',
    graphic: '1bFieQsV5TM',
  });
}


function getWebinarTitle(courseName){
  return selectByCourse(courseName, {
    frontend: 'Вебинар курса по фронтенд-разработке (JavaScript/ReactJS)',
    ui: 'Вебинар курса по UI/UX-дизайну в Figma',
    graphic: 'Вебинар курса по графическому дизайну в Photoshop',
  });
}


function renderVideo(courseName){
  const videoId = getYoutubeVideoId(courseName);
  const title = getWebinarTitle(courseName);
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
  const leadId = BC.params.lead_id;
  const courseName = BC.params.course_name;
  const interval = setInterval(() => {
    trackWebinarCompletion(() => {
      clearInterval(interval);

      if (leadId && courseName) {
        changeAmoStatus(leadId, 'watched_webinar');
        showOffer(leadId, courseName);
      }
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


function generatePaymentLink(leadId, courseName) {
  return '/payment?course_name=' + courseName + '&lead_id=' + leadId;
}


function showOffer(leadId, courseName){
  const popupText = document.querySelector('.t756__descr');
  const paymentLink = document.querySelector('.t756__btn-wrapper a');
  const triggerButton = document.querySelector('.uc-webinar-trigger a');

  const firstLine = selectByCourse(courseName, {
    frontend: 'Разработка на JavaScript, ReactJS, HTML и CSS',
    ui: 'UI/UX-дизайн в Figma',
    graphic: 'Графический дизайн в Photoshop\n',
  });

  popupText.innerHTML = '<b>Онлайн видеокурс 3 в 1</b>'
    + '<br>' + firstLine
    + '<br>Деловой английский для работы за границей'
    + '<br>Поиск и получение удаленной работы';

  paymentLink.href = generatePaymentLink(leadId, courseName);

  triggerButton.click();
}
