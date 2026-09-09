
class CreateAccountForm extends AsyncForm {

  onSubmit(data) {
    Account.create(data, (response) => {
      if (response && response.success) {
       App.getModal('createAccount').close();

        this.reset();
        App.update();
      }
    })
  }
}