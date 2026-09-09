
class TransactionsPage {

  constructor(element) {
    if (!element) {
      throw new Error('эл-т не передан в виджет transaction');
    }

    this.element = element;
    this.registerEvents();
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  registerEvents() {

    this.element.addEventListener('click', (e) => {
      const removeAcc = e.target.closest('.remove-account');

      if (removeAcc) {
        this.removeAccount();
        return;
      }

      const removeTrans = e.target.closest('.transaction__remove');
      if (removeTrans) {
        const id = removeTrans.dataset.id;
        this.removeTransaction(id);
      }
    });
  }

  removeAccount() {
    if (!this.lastOptions) {
      return;
    }

    if (!confirm('Вы действительно хотите удалить счёт?')) {
      return;
    }

    Account.remove({id: this.lastOptions.account_id }, (response) => {
      if (response && response.success) {
        this.clear();
        App.updateWidgets();
        App.updateForms();
      }
    });
  }

   removeTransaction(id) {
    if (!confirm('Вы действительно хотите удалить эту транзакцию?')) {
      return;
    }

    Transaction.remove({ id }, (response) => {
      if (response && response.success) {
        App.update();
      }
    });
  }

  render(options) {
    if (!options) {
      return;
    }
    this.lastOptions = options;
    const accountId = options.account_id;

    Account.get(accountId, (data) => {
      if (data) {
        this.renderTitle(data.name);
      }
    });

    Transaction.list(accountId, (transactions) => {
      this.renderTransactions(transactions);
    });

  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name) {
    const titleEl = this.element.querySelector('.content-title');
    if (titleEl) {
      titleEl.textContent = name;
    }
  }

  formatDate(date) {
 
    // "2019-03-10 03:20:41" → Date
    const parsed = new Date(date.replace(' ', 'T')); //приводим к стандарту записи
    const dateSettings = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const timeSettings = new Intl.DateTimeFormat('ru-RU', {
      hour:'2-digit',
      minute: '2-digit'
    })

    return `${dateSettings.format(parsed)} в ${timeSettings.format(parsed)}`;
  }

  getTransactionHTML(item) {
    const typeClass = item.type === 'expense' ? 'transaction_expense' : 'transaction_income';
    const formattedDate = this.formatDate(item.created_at);

    return `
      <div class="transaction ${typeClass} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${formattedDate}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  renderTransactions(data) {
    const contentEl = this.element.querySelector('.content');
    if (!contentEl) {
      return;
    }

    contentEl.innerHTML = '';

    if (data && data.length > 0) {
      data.forEach(item => {
        const html = this.getTransactionHTML(item);
        contentEl.insertAdjacentHTML('beforeend', html);
      });
    }
  }
}