/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(response => {
      const data = response.data;
      data.forEach(el => {
        this.element.querySelector(`.accounts-select`).insertAdjacentHTML(`beforeEnd`, `<option value="${el.id}">${el.name}</option>`);
      });
    }))
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, response => {
      if(response.success && response) {
        App.update();
        App.getModal('new-expense').close();
        App.getModal('new-income').close();

      }
    })

  }
}