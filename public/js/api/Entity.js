
class Entity {

  static URL = ''; //статическое свойство у всего класса, для всех экземпляров
  // статические методы работают внутри класса, не у экземпляра

  static list(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'GET',
      callback
    });
  }


  static create(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'PUT',
      callback
    });
  }

  static remove(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'DELETE',
      callback
    });
  }
}
