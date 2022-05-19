/*

<div class="bc-payment"></div>
<link rel="stylesheet" href="https://believencode.surge.sh/common.css"/>
<link rel="stylesheet" href="https://believencode.surge.sh/payment.css"/>
<script src="https://believencode.surge.sh/common.js"></script>
<script src="https://believencode.surge.sh/payment.js"></script>

*/


const BC = window.BC || {};
BC.params = getPageParams();


renderMessage(BC.params.course_type);


function getCourseTitle(courseType){
  // noinspection NonAsciiCharacters,JSNonASCIINames
  const titles = {
    'Фронтенд': 'Курс по фронтенд-разработке (JavaScript/ReactJS)',
    'UI/UX-дизайн': 'Курс по UI/UX-дизайну в Figma',
    'Графический дизайн': 'Курс по графическому дизайну в Photoshop',
  };
  return titles[courseType || 'Фронтенд'];
}


function getPaymentLink(courseType) {
  const paths = {
    'Фронтенд': '1',
    'UI/UX-дизайн': '2',
    'Графический дизайн': '3',
  };
  const path = paths[courseType || 'Фронтенд'];
  return 'https://paybox.money/' + path;
}


function renderMessage(courseType) {
  const title = getCourseTitle(courseType);
  const paymentLink = getPaymentLink(courseType);
  const container = document.querySelector('.bc-webinar');

  container.innerHTML = '<h1>' + title + '</h1>'
    + '<div>9990 сомов</div>'
    + '<a href="' + paymentLink + '">Перейти к оплате</a>'
}

// TODO: paybox callback message
// TODO: changeAmoStatus(BC.params.lead_id, 'paid');
