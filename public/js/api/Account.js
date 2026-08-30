
class Account extends Entity {

  static URL = '/account';

  static get(id, callback) {
    if (!id) {
      const err = new Error('Нет id счета');
      callback(err, null);
      return;
    }

    const url = `${this.URL}/${id}`;

    createRequest({
      url: url,
      data: {},
      method: 'GET',
      callback: callback
    })
  };
}
