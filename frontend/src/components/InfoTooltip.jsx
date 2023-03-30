import iconSuccess from '../images/iconSuccess.svg';
import iconFaul from '../images/iconFaul.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {

  const infoTooltip = `${isSuccess ? 'Вы успешно зарегистрировались!' : (`Что-то пошло не так! Попробуйте ещё раз.`)}`

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      name='popupInfoTooltip'>

      <div className="popup__container popup__container_data_info-tooltip ">

        <button
          className="popup__button-close-info"
          name="buttonClosePopupInfoTooltip"
          type="button"
          aria-label="Закрыть"
          onClick={onClose} />

        <img
          className="popup__icon  popup__icon_data_info-tooltip"
          src={isSuccess ? iconSuccess : iconFaul}
          alt='Иконка статуса регистрации' />
        <h3 className="popup__title_data_info-tooltip">{infoTooltip}</h3>
      </div>
    </section>
  )
}

export default InfoTooltip;

