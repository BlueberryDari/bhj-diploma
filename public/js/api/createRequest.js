const createRequest = (options = {}) => {
  const {
    url = '',
    data = {
      //email, password
    },
    method = 'GET',
    callback = (err, response) => { },
  } = options; //деструктуризация объекта, распаковывает св-ва в отдельные переменные

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let finalUrl = url;
  let body = null;

  if (method === 'GET') {
    const params = new URLSearchParams(data); //класс, API, сам кодирует ключ, знач для ссылки
    finalUrl = `${url}${url.includes('?') ? '&' : '?'}${params}`;
  } else {
    body = new FormData();
    for (const [key, value] of Object.entries(data)) {
      body.append(key, value);
    }
  }

  try {
    xhr.open(method, finalUrl);
    xhr.send(body);
  } catch (e) {
    callback(e, null);
  } //пытаемся отправить запрос на сервер, перехватываем ошибку

  xhr.onload = () => {

    callback(null, xhr.response);
  };

  xhr.onerror = () => {
    callback(new Error('нет связи с сервером'), null);
  }
};

// 'https://example.com?mail=ivan@biz.pro&password=odinodin'
