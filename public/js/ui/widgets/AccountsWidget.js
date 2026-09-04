
class AccountsWidget {

  constructor(element) {
    if (!element) {
      throw new Error("эл-т не передан");
    }
    this.element = element;
    this.registerEvents();
    this.update();

  }

  registerEvents() {
    const createAccBtn = this.element.querySelector('.create-account');
    createAccBtn.addEventListener('click', () => {
      const modalWindow = App.getModal('modal-new-account');
      Modal.open(modalWindow);
    })

    this.element.addEventListener('click', (e) => {
      const accountEl = e.target.closest('.account');
      if (accountEl && this.element.contains(accountEl)) {
        this.onSelectAccount(accountEl);
      }
    });
  }

  update() {
    if (User.current()) {
      Account.list((data) => {
        this.clear();
        this.renderItems(data);
      });
    }
  }

  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(account => account.remove());
  }

  onSelectAccount(element) {
    const previousActiveEl = this.element.querySelector('.account.active');
    if (previousActiveEl) {
      previousActiveEl.classList.remove('active');
    }

    element.classList.Add('active');
    const accountId = element.dataset.id;
    App.showPage('transactions', { account_id: accountId });
  }

  getAccountHTML(item) {
    return `<li class="active account" data-id="${item.id}">
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum}</span>
    </a>
</li>`

  }

  renderItems(data) {
    data.forEach(acc => {
      const html = this.getAccountHTML(acc);
      this.element.insertAdjacentHTML('beforeEnd', html);
    });
  }
}
