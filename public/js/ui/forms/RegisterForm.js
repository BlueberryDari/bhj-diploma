const { response } = require("express");

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
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