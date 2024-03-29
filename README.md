[![Tests](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml/badge.svg)](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml)
<h1 align="center">Учебный проект: "Место"</h1>

<div align="center">
    <img width="550" alt="Основной экран приложения" src="https://user-images.githubusercontent.com/108838349/229297730-3056638e-dfcb-4844-9332-5792f7390e7b.png">
 </div>

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Описание проекта</a></li>
      <li><a href="#technologies">Стек технологий</a></li>
      <li><a href="#installation">Установка и запуск приложения в локальном репозитории, эксплуатация</a></li>
      <li><a href="#establishing">Процесс создания</a></li>
      <ul>
        <li><a href="#tasks-and-problems">Основные задачи, проблемы и их решение</a></li>
      </ul>
      <li><a href="#functionality">Функционал</a></li>
      <li><a href="#enhancement">Планы по улучшению</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Описание проекта</h2></a>
Данная проектная работа - итоговая в рамках образовательной программы <a href="https://practicum.yandex.ru/">Яндекс Практикума</a>. Проект представляет собой адаптивное приложение (SPA), написанное на "React" (часть frontend) и "Node" (часть backend), с возможностью регистрации личного кабинета пользователя, редактированием данных и добавлением фотокарточек в общую галерею.

<a href="https://github.com/Are-new-ta/mesto">Изначально</a> приложение было написано на нативных технологиях: JavaScript, CSS3 и HTML5. <a href="https://github.com/Are-new-ta/react-mesto-auth">Затем</a> проект был перенесен на "React" с добавлением функционала регистрации и авторизации пользователей, <a href="https://github.com/Are-new-ta/express-mesto-gha">отдельно</a> написана логика серверной части с фреймворком "Express" и в завершение обе части объединены и сохранены на виртуальной машине, размещенной на <a href="https://cloud.yandex.ru/">Яндекс Облаке</a>.

<b>Адрес репозитория:</b> https://github.com/Are-new-ta/react-mesto-api-full-gha

<b>Ссылки на макет:</b>
<br>
https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1
<br>
https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1
<br>
https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1
<br>
https://www.figma.com/file/PSdQFRHoxXJFs2FH8IXViF/JavaScript-9-sprint?node-id=0%3A1
<br>
https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/Sprint-14-RU?node-id=0%3A1
<br>

<b>Ссылка на чек-лист</b>
<br>
https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_15.pdf

<i>* - проект прошел код-ревью</i>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="technologies"><h2>2. Стек технологий</h2></a>
<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Иконка React">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="Иконка React Router">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="Иконка 'JavaScript'">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="Иконка CSS3">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Иконка HTML5">
  <a href=""><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Иконка 'Express'"></a>
  <a href=""><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Иконка 'Node JS'"></a>
  <a href=""><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="Иконка 'MongoDB'"></a>
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Иконка 'NGINX'">
</span>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="installation"><h2>3. Установка и запуск приложения в локальном репозитории, эксплуатация</h2></a>
1. `git clone https://github.com/Are-new-ta/react-mesto-api-full-gha.git` - клонировать репозиторий (HTTPS) на свое устройство
2. `npm i` - установить зависимости (отдельно - в папке `frontend` и `backend`)
3. `npm run dev` - запустить приложение в режиме разработчика в папке `backend` (можно предварительно настроить `порт 3001`)
4. `npm run start` - запустить приложение в режиме разработчика в папке `frontend`

<p>
  <b>NB!</b> На данном этапе не настроена отрисовка ошибок при попытке регистрации пользователя с ранее зарегистрированным электронным адресом, неправильном вводе электронного адреса и/или пароля и т.п. Эти ошибки можно проверить самостоятельно в <b>консоли разработчика</b> во вкладке <b>&laquo;Network&raquo;</b> (ответ с сервера будет выделен красным цветом)
</p>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="establishing"><h2>4. Процесс создания</h2></a>
Работа выполнена в <b>1 этап</b>:
<br>
* Реализовано логирование запросов и ошибок
* Объединены frontend и backend части приложения
* Создан облачный сервер и развернут API
* Создан .env-файл
* Создан домен и прикреплен к серверу
* Выпущены и подключены SSL-сертификаты

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="functionality"><h2>5. Функционал</h2></a>
<details>
  <summary>Адаптивный интерфейс <b><i>(в т. ч. новых компонентов и элементов)</i></b></summary>
     <img width="500" src="https://user-images.githubusercontent.com/108838349/216848219-0d443e1e-a711-4803-a78c-6c998a1786f9.gif" alt="Гиф с демонстрацией адаптивного интерфейса приложения">
  </details>

<details>
  <summary>Регистрация и авторизация пользователей</summary>
     <img width="500" src="https://user-images.githubusercontent.com/108838349/216912837-de6a7d00-24fb-49b9-8e65-7982180eb2c5.gif" alt="Гиф с демонстрацией регистрации и авторизации пользователей">
 </details>

<details>
  <summary>Редактирование данных пользователя</summary>
     <img width="500" src="https://user-images.githubusercontent.com/108838349/216848508-481840e7-176a-466e-9a5f-f73f71c051e2.gif" alt="Гиф с демонстрацией редактирования данных пользователя в личном кабинете">
  </details>

<details>
  <summary>Обновление аватара</summary>
    <img width="500" src="https://user-images.githubusercontent.com/108838349/216848611-c9f96a5e-e87f-4755-8fe9-50592c0a62b1.gif" alt="Гиф с демонстрацией обновления аватара пользователя">
 </details>

<details>
  <summary>Добавление новой карточки</summary>
     <img width="500" src="https://user-images.githubusercontent.com/108838349/216848713-6efd8c14-089b-476f-b6f4-cbaa213beba3.gif" alt="Гиф с демонстрацией добавления новой карточки">
  </details>

<details>
  <summary>Добавление и снятие лайка (включая счетчик лайков)</summary>
     <img width="500" src="https://user-images.githubusercontent.com/108838349/216848788-786b5957-8e4b-4a1e-9b9a-be82d7475c73.gif" alt="Гиф с демонстрацией добавления и снятия лайка (включая счетчик лайков)">
  </details>

<details>
  <summary>Удаление карточки <b><i>с модальным окном подтверждения действия</i></b></summary>
      <img width="500" src="https://user-images.githubusercontent.com/108838349/216848877-b47233a0-0bde-4311-a266-326809dc6941.gif" alt="Гиф с демонстрацией удаления карточки">
  </details>

<details>
  <summary>Модальное окно успешной/неудачной регистрации на сайте</summary>
      <img width="500" src="https://user-images.githubusercontent.com/108838349/216910166-40745d73-2086-45ec-a348-306336499426.gif" alt="Гиф с демонстрацией модального окна успешной/неудачной регистрации на сайте">
  </details>

<details>
  <summary>Модальное окно с увеличенной фотографией карточки</summary>
      <img width="500" src="https://user-images.githubusercontent.com/108838349/216910652-a8a9272c-1e87-49e0-b983-93c3952b88e8.gif" alt="Гиф с демонстрацией модального окна с увеличенной фотографией карточки">
 </details>

<details>
  <summary>Открытие и закрытие модальных окон (по кнопке, <b><i>оверлею</i></b> и <b><i>клавише "Escape"</i></b>)</summary>
     <img width="500" src="https://user-images.githubusercontent.com/108838349/216910652-a8a9272c-1e87-49e0-b983-93c3952b88e8.gif" alt="Гиф с демонстрацией открытия и закрытия модального окна">
 </details>

<details>
  <summary><b><i>Спиннеры загрузки</i></b></summary>
    <img width="500" src="https://user-images.githubusercontent.com/108838349/216848611-c9f96a5e-e87f-4755-8fe9-50592c0a62b1.gif" alt="Гиф с демонстрацией спиннера загрузки на примере модального окна с обновлением аватара">
 </details>

<details>
  <summary><b><i>Валидация форм</i></b></summary>
    <img width="500" src="https://user-images.githubusercontent.com/108838349/216848611-c9f96a5e-e87f-4755-8fe9-50592c0a62b1.gif" alt="Гиф с демонстрацией валидации формы на примере модального окна с обновлением аватара">
  </details>

<details>
  <summary><b><i><b><i>Окно предварительной загрузки страницы</i></b></i></b></summary>
     <img width="500" src="https://user-images.githubusercontent.com/108838349/216913189-b1a3c13c-1f28-4291-856e-a43fa92ce29f.gif" alt="Гиф с демонстрацией окна предварительной загрузки страницы">
 </details>

<details><summary><b><i>Страница 404</i></b></summary>
      <img width="500" src="https://user-images.githubusercontent.com/108838349/215304244-bd854ae2-0066-416d-a516-3b29f4028363.gif">
  </details>

<br>
<b><i>* - жирным курсивом выделен дополнительный функционал, не входящий в обязательный перечень требований для получения зачета по проектной работе</i></b>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

