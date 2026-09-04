//const { response } = require("express");
class LoginForm extends AsyncForm {
 
  onSubmit(data) {
    User.login(data, (response) => {
      if (response && response.success) {
        this.reset();
        App.setState('user-logged')

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