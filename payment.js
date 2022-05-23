/*

<div class="bc-payment"></div>
<link rel="stylesheet" href="https://believencode.surge.sh/common.css"/>
<link rel="stylesheet" href="https://believencode.surge.sh/payment.css"/>
<script src="https://believencode.surge.sh/common.js"></script>
<script src="https://believencode.surge.sh/payment.js"></script>

*/


window.BC = window.BC || {};
BC.params = getPageParams();



if (BC.params.pg_payment_id) {
  renderSuccessfulPaymentMessage(BC.params.pg_payment_id);
  changeAmoStatus(BC.params.lead_id, 'paid');
}
else {
  renderPayButton(BC.params.course_name);
}


function getCourseTitle(courseType){
  return selectByCourse(courseType, {
    frontend: 'Курс по фронтенд-разработке (JavaScript/ReactJS)',
    ui: 'Курс по UI/UX-дизайну в&nbsp;Figma',
    graphic: 'Курс по графическому дизайну в&nbsp;Photoshop',
  });
}


function getPaymentLink(courseType) {
  return selectByCourse(courseType, {
    frontend: 'https://api.paybox.money/payment.php?pg_merchant_id=544219&pg_amount=9990&pg_currency=KGS&pg_description=%D0%9A%D1%83%D1%80%D1%81+%D0%BF%D0%BE+%D1%84%D1%80%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D0%B4-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B5+%28JavaScript%2FReactJS%29&pg_salt=70pIEodhftL0zq7I&pg_language=ru&pg_sig=314231f1f12a3d1adedeee97e20e216c',
    ui: 'https://api.paybox.money/payment.php?pg_merchant_id=544219&pg_amount=9990&pg_currency=KGS&pg_description=%D0%9A%D1%83%D1%80%D1%81+%D0%BF%D0%BE+UI%2FUX-%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%D1%83+%D0%B2+Figma&pg_salt=2o529l5EwIcCFlZc&pg_language=ru&pg_sig=f6aed5f89bbb32d25791f47cf8fd8476',
    graphic: 'https://api.paybox.money/payment.php?pg_merchant_id=544219&pg_amount=9990&pg_currency=KGS&pg_description=%D0%9A%D1%83%D1%80%D1%81+%D0%BF%D0%BE+%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%BC%D1%83+%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%D1%83+%D0%B2+Photoshop&pg_salt=uXMkRJnymD8J0NxU&pg_language=ru&pg_sig=7e787a873a83a295c20d24bc46eb714d',
  });
}


function renderPayButton(courseType) {
  const title = getCourseTitle(courseType);
  const paymentLink = getPaymentLink(courseType);
  const container = document.querySelector('.bc-payment');

  container.innerHTML = '<h1 class="bc-payment-header t-section__title t-title t-title_xs">' + title + '</h1>'
    + '<a class="bc-payment-button t-btn" href="' + paymentLink + '">Оплатить доступ</a>'
    + '<div class="bc-payment-warning t-title">После оплаты дождитесь переадресации обратно на наш сайт!</div>'
}


function renderSuccessfulPaymentMessage(paymentId) {
  const container = document.querySelector('.bc-payment');
  container.innerHTML = '<h1 class="bc-payment-header t-section__title t-title t-title_xs">✅</h1>'
    + '<h1 class="bc-payment-header t-section__title t-title t-title_xs">Успешная оплата</h1>'
    + '<div class="bc-payment-info t-title">Номер платежа: ' + paymentId + '</div>'
    + '<div class="bc-payment-info t-title">Ожидайте email с приглашением на курс в течение нескольких минут.</div>';
}
