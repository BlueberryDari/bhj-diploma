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
        const modalNeeded = Object.keys(App.modals).find(key => App.modals[key].element === modalEl);
        App.getModal(modalNeeded).close(); 
        /*т. к. у нас 2 типа операций - расход и доход, нужно найти нужную   */

        this.reset();
        App.update();
      }
    });
  }
}