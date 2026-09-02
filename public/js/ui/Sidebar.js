

class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {

    const sidebarBurger = document.querySelector('.sidebar-toggle');
    const body = document.body;


    if (!sidebarBurger || !body) return;

    sidebarBurger.addEventListener('click', (e) => {

      e.preventDefault(); //Отменяем стандартное поведение ссылки

      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  static initAuthLinks() {

    const menu = document.querySelector('.sidebar');
    if (!menu) return;

    const loginBtn = menu.querySelector('.menu-item_login');
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const loginModal = document.getElementById('modal-login');
      const modalWindow = App.getModal(loginModal);

      Modal.open(modalWindow);
    })

    const registerBtn = menu.getElementsByClassName('menu-item_register')[0];
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const registerModal = document.getElementById('modal-register');
      const modalWindow = App.getModal(registerModal);

      Modal.open(modalWindow);
    })

    const logoutBtn = menu.getElementsByClassName('menu-item_logout')[0];
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();

      User.logout((response => {
        if (response && response.success) {
          App.setState('init');
        }
      })
      )
    });
  };
}
