document.addEventListener('click', async (event) => {
    const id = event.target.dataset.id;
  
    if (event.target.dataset.type === 'remove') {
      remove(id).then(() => {
        event.target.closest('li').remove();
      });
    }
  
    if (event.target.dataset.type === 'edit') {
      const title = event.target.dataset.title;
      const newTitle = prompt('Введите новое название:', title); // вызываем диалоговое окно
      if (newTitle !== null) { // если пользователь нажал Отмена, то ничего не делаем
        edit(id, newTitle).then(() => { // если пользователь ввел название, то отправляем запрос на сервер
          const listItem = event.target.closest('li'); // получаем родительский элемент кнопки
          listItem.firstChild.textContent = newTitle; // изменяем текст в элементе
          event.target.dataset.title = newTitle; // изменяем значение атрибута data-title, чтобы при следующем нажатии на кнопку, в диалоговом окне было новое значение
        });
      }
    }
  });
  
  async function remove(id) {
    await fetch(`/${id}`, {
      method: 'DELETE',
    });
  }
  
  async function edit(id, title) { // функция для отправки запроса на сервер
    await fetch(`/${id}/edit`, { // отправляем запрос на сервер
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8', // указываем тип контента
      },
      body: JSON.stringify({ title }), // преобразуем объект в JSON и отправляем в теле запроса
    });
  }