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
