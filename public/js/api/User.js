const { json, response } = require("express");

class User {

  static URL = '/user'

  static setCurrent(user) {

    /* localStorage хранит строки, юзер - объект.
    JSON.STRINGIFY - obj -> string */
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {

    const findUser = localStorage.getItem('user');
    if (findUser) {
      try {
return JSON.parse(findUser); //str-> obj
      }
      catch (e) {
return undefined;
      }
    } else {
      return undefined;
    }
  }

  static fetch(callback) {
    createRequest({
      url: `${this.URL}/current`,
      data: {},
      method: 'GET',
      callback: (err, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        } else if (response && !response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }

  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data: data,
      callback: (err, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static register(data, callback) {
    createRequest({
      url: `${this.URL}/register`,
      data: data,
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static logout(callback) {
    createRequest({
      url: `${this.URL}/logout`,
      data: {},
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}
