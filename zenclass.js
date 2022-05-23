/*

<link rel="stylesheet" href="https://believencode.surge.sh/zenclass.css"/>
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
    '/public/products': () => {
      console.log('INITIALIZING MAIN PAGE...');
      waitForElementToAppear('.app-toolbar', element => {
        console.log('.product ready', element);
        initializeMainPage();
      });
    },
    '/public/course': () => {
      console.log('INITIALIZING INVITATION PAGE...');
      waitForElementToAppear('.product', element => {
        console.log('.app-toolbar ready', element);
        initializeInvitationPage(BC.params.email);
      });
    },
  });
});


function initializeInvitationPage(email) {
  const input = document.querySelector('.v-main__wrap input[type=email]');
  console.log('Invitation input', input);
  if (email) {
    fillOutVueInput(input, email);
  }
}


function initializeMainPage() {
  try {
    const headerRegisterButtonText = getElementsByText('зарегистрироваться', '.v-toolbar__content')[0];
    console.log('headerRegisterButtonText', headerRegisterButtonText);
    const headerRegisterButton = headerRegisterButtonText.parentNode;
    headerRegisterButton.style.display = 'none';
  }
  catch (e) {}

  try {
    const headerLoginButtonText = getElementsByText('войти', '.v-toolbar__content')[0];
    console.log('headerLoginButtonText', headerLoginButtonText);
    const headerLoginButton = headerLoginButtonText.parentNode;
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


function waitForElementToAppear(selector, callback) {
  const interval = setInterval(() => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(interval);
      callback(element);
    }
  }, 100);
}
