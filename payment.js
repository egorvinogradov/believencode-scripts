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


function getCourseTitle(courseName){
  return selectByCourse(courseName, {
    frontend: 'Курс по фронтенд-разработке (JavaScript/ReactJS)',
    ui: 'Курс по UI/UX-дизайну в&nbsp;Figma',
    graphic: 'Курс по графическому дизайну в&nbsp;Photoshop',
  });
}


function getPaymentLink(courseName) {
  return selectByCourse(courseName, {
    frontend: 'https://api.paybox.money/payment.php?pg_merchant_id=544891&pg_amount=9990&pg_currency=KGS&pg_description=Front-end+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0&pg_salt=qqyeL7eUaPvfnxAL&pg_language=ru&pg_sig=b82b062204e684ee3d123e941b4a59af',
    ui: 'https://api.paybox.money/payment.php?pg_merchant_id=544891&pg_amount=9990&pg_currency=KGS&pg_description=UI-Ux+%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD&pg_salt=A7zXDD4vwrE8qRaO&pg_language=ru&pg_sig=4ac74258d3ec34c0c4255371c30365ac',
    graphic: 'https://api.paybox.money/payment.php?pg_merchant_id=544891&pg_amount=9990&pg_currency=KGS&pg_description=%D0%93%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9+%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD&pg_salt=fJQOfLEo7LiIyxSP&pg_language=ru&pg_sig=c37b55c3fd32622f491ffb3563624b20',
  });
}


function renderPayButton(courseName) {
  const title = getCourseTitle(courseName);
  const paymentLink = getPaymentLink(courseName);
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
