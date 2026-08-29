/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const {
    url = '',
    data = {
      //mail, password
    },
    method = 'GET',
    callback = ( err, response ) => {},
  } = options; //деструктуризация объекта, распаковывает св-ва в отдельные переменные

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let finalUrl = url;
  if (method === 'GET' && Object.keys(data).length > 0) {
    const loginPassword = Object.entries(data); //[ ["login","JohnA"], ["password","30sfd"] ]
    const keyValue = loginPassword.map(pair => `${encodeURIComponent(pair[0])}=${encodeURIComponent(pair[1])}`);
    const readyString = keyValue.join('&'); //склеиваем все ключи(name+value, password+value) data 
    finalUrl = `${url}${url.includes('?') ? '&' : '?'}${readyString}`;
  }

  xhr.open(method, finalUrl); 
  if (method!=='GET') {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    } 
    xhr.send(formData); //если метод не GET, отправляем formData
  } else {
      xhr.send();
  };


  xhr.onload = () => {
    if (xhr.status >= 200 && xhr < 300) { //статусы на 2 - успех
      callback (null, xhr.response); // без парсинга пока
    } else {
      callback ('ошибка запроса статус ' + xhr.status, null);
    }
  };

  xhr.onerror = () => {
    callback(new Error('нет связи с сервером'), null);
  }
};

// 'https://example.com?mail=ivan@biz.pro&password=odinodin'
