//const { response } = require("express");

class RegisterForm extends AsyncForm {
 
  onSubmit(data) {
    User.register(data, (response) => {
      if (response && response.success) {
        this.element.reset();
        App.setState('user-logged');

        const neededWindow = App.getModal(this.element.closest('.modal'));
        Modal.close(neededWindow);
      }
    });
  }
}