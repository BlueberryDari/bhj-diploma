class AsyncForm {

  constructor(element) {

    if (!element) {
      throw new Error('передан пустой элемент в конструктор');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {

    const form = this.element; // сама форма
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    })
  }

  getData() {

    let obj = {}
    const formData = new FormData(this.element);
    for (const [key, value] of formData.entries()) {
      obj[key] = value;
    }

    return obj;
  }

  onSubmit(options) {


  }

  submit() {

    const data = this.getData();
    this.onSubmit(data);
  }
}
