
class CreateAccountForm extends AsyncForm {

  onSubmit(data) {
    Account.create(data, (response) => {
      if (response && response.success) {
        const modalEl = this.element.closest('.modal');
        if (modalEl) {
          const modalWindow = App.getModal(modalEl);
          if (modalWindow) {
            Modal.close(modalWindow);
          }
        }

        this.reset();
        App.update();
      }
    })
  }
}