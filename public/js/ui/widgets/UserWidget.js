class UserWidget {

  constructor(element) {
    if (!element) {
      throw new Error('передан пустой элемент в конструктор');
    }

    this.element = element;
  }

  update() {
    const user = User.current();
    if (user) {
      const nameEl = this.element.querySelector('.user-name');
      nameEl.textContent = user.name;
    }
  }
}
