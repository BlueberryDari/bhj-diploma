class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element)
    this.renderAccountsList();
  }


  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    Account.list((accounts) => {
      select.innerHTML = '';
      accounts.forEach((account) => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        select.appendChild(option);
      })
    })
  }

  onSubmit(data) {

    Transaction.create(data, (response) => {
      if (response && response.success) {
        const modalEl = this.element.closest('.modal');
        if (modalEl) {
          const modalWindow = App.getModal(modalEl.id);
          if (modalWindow) {
            Modal.close(modalWindow);
          }
        }
        this.reset();
        App.update();

      }
    });
  }
}