import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import api from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationDeleteCardPopup from "./ConfirmationDeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);//
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);//
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);//
  const [isConfirmationDeleteCardPopup, setConfirmationDeleteCardPopup] = useState(false);//
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [cards, setCards] = useState([]);//
  const [deletedCard, setDeletedCard] = useState({ name: '', link: '' });//
  const [selectedCard, setSelectedCard] = useState({ bool: false, alt: '', src: '' });//
  const [currentUser, setCurrentUser] = useState({});//
  const [renderLoading, setRenderLoading] = useState(false)//

  //sign-in and sign-up
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShowUser, setIsShowUser] = useState(false);
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  //получаем данные пользователя и карточек
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserProfile(), api.getInitialCards()])
        .then(([userData, arrCards]) => {
          setCurrentUser(userData);
          setCards(arrCards);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
  }, [loggedIn]);

  // проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email)
            navigate('/', { replace: true })
          }
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
    }
  }, [])

  // функция для регистрации пользователя
  function handleRegisterClick(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsSuccess(true);
          // handlerInfoTooltip();
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((error) => {
        setIsSuccess(false);
        // handlerInfoTooltip();
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => handlerInfoTooltip());//после замечаний ревьюера
  }

  // функция для авторизаци пользователя
  function handleLoginClick(email, password) {
    auth.login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setEmail(email)
        setIsSuccess(true);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        setLoggedIn(false);
        handlerInfoTooltip();
        console.log(`Ошибка: ${error}`);
      })
  }

  //функции Header
  function openBurgerMenu(e) {
    e.preventDefault()
    setIsShowUser(!isShowUser);
  };

  function hideBurgerMenu(e) {
    e.preventDefault()
    setIsShowUser(isShowUser);
  };

  function signOut(e) {
    e.preventDefault();
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: false })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handlerInfoTooltip() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
  }

  //popup подтверждения удаления карточки и запоминаем карточку которую нужно удалять
  function handeleConfurmationDeleteCardPopup(card) {
    setConfirmationDeleteCardPopup(!isConfirmationDeleteCardPopup);
    setDeletedCard(card)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setConfirmationDeleteCardPopup(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ bool: false, alt: '', src: '' });
  }

  function handleCardClick(card) {
    setSelectedCard({ bool: true, alt: card.name, src: card.link });
  }

  function handleConfirmationDeletePopup() {
    handleCardDelete(deletedCard)
  }

  //добавляем лайки/дизлайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  //удаление карточки
  function handleCardDelete(card) {
    setRenderLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id === card._id ? null : c));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  //обновляем данные юзера
  function handleUpdateUser({ name, about }) {
    setRenderLoading(true);
    api.changeUserProfile({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  //обновляем аватарку юзера
  function handleUpdateUserAvatar({ avatar }) {
    setRenderLoading(true);
    api.changeAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  //добавляем новую карточку
  function handleAddPlace({ name, link }) {
    setRenderLoading(true);
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  //логика закрывания любого попапа с помощью нажатия клавиши Esc
  //Создаем переменную isOpen снаружи useEffect, в которой следим за всеми состояниями попапов. 
  //Если хоть одно состояние true или не null, то какой-то попап открыт, значит, навешивать нужно обработчик.
  //Объявляем функцию внутри useEffect, чтобы она не теряла свою ссылку при обновлении компонента.
  //И не забываем удалять обработчик в clean up функции через return
  //А также массив зависимостей c isOpen, чтобы отслеживать изменение этого показателя открытости. 
  //Как только он становится true, то навешивается обработчик, когда в false, тогда удаляется обработчик.*}

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isInfoTooltipPopupOpen || selectedCard.bool

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={email}
          onSinOut={signOut}
          onShowUser={isShowUser}
          onOpenBurgerMenu={openBurgerMenu}
          onHideBurgerMenu={hideBurgerMenu}
        />

        <Routes>
          <Route
            path='/'
            element={
              <>
                <ProtectedRoute
                  component={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onConfurmationDeleteCardPopup={handeleConfurmationDeleteCardPopup}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onClose={closeAllPopups} />

                <Footer />
              </>
            } />

          <Route
            path='/sign-up'
            element={<Register register={handleRegisterClick} />} />

          <Route
            path='/sign-in'
            element={<Login login={handleLoginClick} />} />

        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={renderLoading} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={renderLoading}
          onUpdateUser={handleUpdateUserAvatar} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={renderLoading}
          onAddPlace={handleAddPlace}
        />

        <ConfirmationDeleteCardPopup
          isOpen={isConfirmationDeleteCardPopup}
          onClose={closeAllPopups}
          isLoading={renderLoading}
          onCardDelete={handleConfirmationDeletePopup}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

      </div >

    </CurrentUserContext.Provider>
  )
}

export default App;
