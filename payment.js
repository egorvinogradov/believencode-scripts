/*

<div class="bc-payment"></div>
<link rel="stylesheet" href="https://believencode.surge.sh/common.css"/>
<link rel="stylesheet" href="https://believencode.surge.sh/payment.css"/>
<script src="https://believencode.surge.sh/common.js"></script>
<script src="https://believencode.surge.sh/payment.js"></script>

*/


window.BC = window.BC || {};
BC.params = getPageParams();


renderMessage(BC.params.course_type);

if (BC.params.pg_payment_id) {
  alert('УСПЕШНАЯ ОПЛАТА: ' + BC.params.pg_payment_id);
}


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
  const urls = {
    'Фронтенд': 'https://api.paybox.money/payment.php?pg_merchant_id=544219&pg_amount=9990&pg_currency=KGS&pg_description=%D0%9A%D1%83%D1%80%D1%81+%D0%BF%D0%BE+%D1%84%D1%80%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D0%B4-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B5+%28JavaScript%2FReactJS%29&pg_salt=70pIEodhftL0zq7I&pg_language=ru&pg_sig=314231f1f12a3d1adedeee97e20e216c',
    'UI/UX-дизайн': '2',
    'Графический дизайн': '3',
  };
  const path = urls[courseType || 'Фронтенд'];
  return path;
}


function renderMessage(courseType) {
  const title = getCourseTitle(courseType);
  const paymentLink = getPaymentLink(courseType);
  const container = document.querySelector('.bc-payment');

  container.innerHTML = '<h1 class="bc-payment-header t-section__title t-title t-title_xs">' + title + '</h1>'
    + '<div class="bc-payment-price t-title">9990 сомов</div>'
    + '<a class="bc-payment-button t-btn" href="' + paymentLink + '">Перейти к оплате</a>'
}

// TODO: paybox callback message
// TODO: changeAmoStatus(BC.params.lead_id, 'paid');
