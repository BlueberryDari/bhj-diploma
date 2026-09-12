
class Entity {

  static URL = '';
  /*статическое свойство у всего класса, для всех экземпляров
   статические методы работают внутри класса, не у экземпляра*/

  static list(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'GET',
      callback: (err, response) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, response);
      }
    });
  }

  static create(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'PUT',
      callback: (err, response) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, response);
      }
    });
  }

  static remove(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'DELETE',
      callback: (err, response) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, response);
      }
    });
  }
}
