//const { response } = require("express");
class LoginForm extends AsyncForm {
 
  onSubmit(data) {
    User.login(data, (response) => {
      if (response && response.success) {
        this.reset();
        App.setState('user-logged')
        App.getModal('login').close();   
      }
    });
  }
}