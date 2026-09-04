//const { response } = require("express");

class RegisterForm extends AsyncForm {

  onSubmit(data) {
    User.register(data, (response) => {
      if (response && response.success) {
        this.element.reset();
        App.setState('user-logged');

        const modalEl = this.element.closest('.modal');
        if (modalEl) {
          const neededWindow = App.getModal(modalEl);
          if (neededWindow) {
            Modal.close(neededWindow);
          }
        }
      }
    });
  }
}