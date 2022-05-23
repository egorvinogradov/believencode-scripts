/*

<script src="https://believencode.surge.sh/zenclass.js"></script>
<script src="https://believencode.surge.sh/zenclass.js"></script>

 */


window.BC = window.BC || {};


window.addEventListener('DOMContentLoaded', () => {
  /**
   * @property {string} BC.params.email
   */
  BC.params = parseGetParams();

  console.log('Initialize', BC);

  pageRouter({
    '/public/products': initializeMainPage,
    '/public/course': () => {
      initializeInvitationPage(BC.params.email);
    },
  });
});


function initializeInvitationPage(email) {
  console.log('Initialize invitation page');
  const input = document.querySelector('.v-main__wrap input[type=email]');
  fillOutVueInput(input, email);
}


function initializeMainPage() {
  console.log('Initialize main page');

  try {
    const headerRegisterButtonText = getElementsByText('зарегистрироваться', '.v-toolbar__content')[0];
    const headerRegisterButton = headerRegisterButtonText.parentNode;
    console.log('headerRegisterButton', headerRegisterButton);
    headerRegisterButton.style.display = 'none';
  }
  catch (e) {}

  try {
    const headerLoginButtonText = getElementsByText('войти', '.v-toolbar__content')[0];
    const headerLoginButton = headerLoginButtonText.parentNode;
    console.log('headerLoginButton', headerLoginButton);
    headerLoginButton.click();
  }
  catch (e) {}

  try {
    const dialogRegisterLink = getElementsByText('создать аккаунт', '.auth-panel')[0];
    console.log('dialogRegisterLink', dialogRegisterLink);
    dialogRegisterLink.style.display = 'none';
  }
  catch (e) {
  }
}


function pageRouter(config) {
  for (let path in config) {
    const callback = config[path];
    if (location.pathname.indexOf(path) === 0) {
      callback();
    }
  }
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


function fillOutVueInput(element, value) {
  if (!element) {
    return;
  }
  const event = new Event('input', {
    bubbles: true,
  });
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  nativeInputValueSetter.call(element, value);
  element.dispatchEvent(event);
}


function getElementsByText(text, parentSelector) {
  const parent = document.querySelector(parentSelector) || document.body;
  const list = [];
  const treeWalker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      return RegExp(text, 'i').test(node.data);
    }
  });

  let next;
  while (next = treeWalker.nextNode()) {
    list.push(next.parentElement);
  }
  return list;
}
