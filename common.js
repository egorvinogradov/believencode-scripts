window.BC = window.BC || {};


$(function () {
  fixCourseSectionLinks();
});


function fixCourseSectionLinks() {
  $('.t608__col').each((i, col) => {
    const url = $('.t608__btn', col).attr('href');
    $('.t608__bgimg, .t608__title, .t608__subtitle, .t608__descr', col)
      .css({ cursor: 'pointer' })
      .on('click', () => {
        location.pathname = url;
      });
  });
}


function changeAmoStatus(leadId, status){
  const webHookUrl = 'https://hook.eu1.make.com/xqdq4hhnhdca8ds1ranjgpgyxg9j68ey';
  const paramString = '?lead_id=' + leadId + '&to_status=' + status;

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
 * @return {{ lead_id: string, course_name: string, pg_payment_id: string }}
 */
function getPageParams(){
  const keys = [
    'lead_id',
    'course_name',
    'pg_payment_id',
    'pg_salt',
    'pg_sig',
  ];
  const getParams = parseGetParams();
  const params = {};

  keys.forEach(key => {
    params[key] = getParams[key];
  });

  if (params.lead_id) {
    localStorage.setItem('lead_id', params.lead_id);
  }
  else {
    params.lead_id = localStorage.getItem('lead_id');
  }
  return params;
}


function setContactFormCourse(courseName) {
  const container = document.querySelector('.uc-contact-form-full select[name=course]');
  if (container) {
    container.value = courseName;
  }
}


/**
 * @param rawCourseName {string}
 * @param options {{ frontend: *, ui: *, graphic: * }}
 */
function selectByCourse(rawCourseName, options) {
  // noinspection NonAsciiCharacters,JSNonASCIINames
  const typeDict = {
    'фронтенд': 'frontend',
    'ui_ux_дизайн': 'ui',
    'графический_дизайн': 'graphic',
  };
  const normalizedValue = (rawCourseName || '').toLowerCase().replace(/[^a-zа-я0-9]/ig, '_');
  const type = typeDict[normalizedValue];
  return options[type];
}
