import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import {
  faIdBadge,
  faIdCardAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateCardFormContent = ({ card, setCard }) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    setCard({
      ...card,
      [name]: value,
    });
  };
  return (
    <>
      <label className="form-label w-100 fw-bold d-flex align-items-center gap-2">
        <FontAwesomeIcon icon={faIdCardAlt} size={"1x"} />
        {""} New Card ID{" "}
      </label>
      <input
        type="text"
        name="card_id"
        value={card.card_id}
        className="form-control my-2"
        onChange={handleChange}
        placeholder="Input new user id"
      />
      <label className="form-label w-100 fw-bold d-flex align-items-center gap-2">
        <FontAwesomeIcon icon={faUser} size={"1x"} />
        {""}New Card User{" "}
      </label>
      <input
        type="text"
        name="card_user"
        value={card.card_user}
        className="form-control my-2"
        onChange={handleChange}
        placeholder="Input new user"
      />
    </>
  );
};

export default CreateCardFormContent;
