
class TransactionsWidget {

  constructor(element) {
    if (!element) {
      throw new Error('эл-т не передан в виджет transaction');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const createIncomeBtn = this.element.querySelector('.create-income-button');
    createIncomeBtn.addEventListener('click', () => {
      const modalWindow = App.getModal('newIncome');
      Modal.open(modalWindow);
    });
    const createExpenseBtn = this.element.querySelector('.create-expense-button');
    createExpenseBtn.addEventListener('click', () => {
      const modalWindow = App.getModal('newExpense');
      Modal.open(modalWindow);
    });
  }
}
