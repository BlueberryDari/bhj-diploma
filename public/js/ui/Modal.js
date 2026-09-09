class Modal {

  constructor(element){
    if (!element) {
      throw new Error('Пустой элемент в Modal');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
  const closeBtns = this.element.querySelectorAll('[data-dismiss = "modal"]')
  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', this.onClose.bind(this)); //привязываем контекст this, т.к. ф-я не стрелочная
  })
  }

  onClose(e) {
   e.preventDefault();
   this.close();
   }
  
  open() {
   this.element.style.display = 'block';
  }
 
  close(){
  this.element.style.removeProperty('display');
  }
};