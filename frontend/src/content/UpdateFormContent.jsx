import { faIdCard, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faIdCardAlt } from "@fortawesome/free-solid-svg-icons/faIdCardAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateFormContent = ({ cardData, setCard }) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    setCard({
      ...cardData,
      [name]: value,
    });
  };
  return (
    <>
      <label className="form-label w-100 fw-bold d-flex align-items-center gap-2">
        <FontAwesomeIcon icon={faIdCardAlt} size={"1x"} />
        {""} Card ID{" "}
      </label>
      <input
        type="text"
        name="card_id"
        value={cardData.card_id}
        className="form-control my-2"
        onChange={handleChange}
        placeholder="Input new user id"
      />
      <label className="form-label w-100 fw-bold d-flex align-items-center gap-2">
        <FontAwesomeIcon icon={faUserCheck} size={"1x"} />
        {""} Card User{" "}
      </label>
      <input
        type="text"
        name="card_user"
        value={cardData.card_user}
        className="form-control my-2"
        onChange={handleChange}
        placeholder="Input new user"
      />
    </>
  );
};

export default UpdateFormContent;
