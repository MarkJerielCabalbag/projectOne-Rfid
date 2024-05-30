import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import UpdateFormContent from "../UpdateFormContent";
import { useUpdateCard } from "../../hooks/useRegisterAccount";
import DeleteCard from "./DeleteCard";
import ButtonSpinner from "../../components/ButtonSpinner";
import Banner from "../../components/Banner";

function UpdateCard({ card }) {
  const [showModal, setShowModal] = useState(false);

  const [cardData, setCard] = useState({
    _id: "",
    card_id: "",
    card_user: "",
  });

  console.log(card);

  const dean = JSON.parse(localStorage.getItem("dean"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSuccess = (data) => {
    console.log(data);
    queryClient.invalidateQueries({ queryKey: ["card"] });
    setShowModal(false);
    toast.success(data.message);
  };

  const onError = (error) => {
    console.log(error);
    toast.error(error.message);
  };

  const { mutateAsync, isPending, isError, error, isLoading, data } =
    useUpdateCard({
      onSuccess,
      onError,
    });

  useEffect(() => {
    if (!dean) navigate("/auth");
    if (isError) toast.error(`${error.message}`);
  }, [navigate, dean, isError, error, isLoading, data]);

  const handleSaveChanges = async () => {
    try {
      await mutateAsync({
        _id: cardData._id,
        card_id: cardData.card_id,
        card_user: cardData.card_user,
      });
      navigate("/dashboard/registered-card");
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <>
        <>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              setCard(card);
              setShowModal(true);
            }}
          >
            Update Card: {card.card_id}
          </button>
          {<DeleteCard card={card} />}
        </>
      </>

      {showModal && (
        <Modal
          modalTitle={"Update Card User"}
          modalButton={
            <Link to={`/dashboard/registered-card/updateCard/${card._id}`}>
              <ButtonSpinner
                onClick={handleSaveChanges}
                btnClassname={"btn btn-primary"}
                className={`${
                  isLoading || isPending
                    ? "spinner-border spinner-border-sm"
                    : ""
                } ms-2`}
                buttonContent={
                  isLoading || isPending ? "Updating..." : "Update Id"
                }
              />
            </Link>
          }
          modalBody={
            <>
              <Banner />
              <p className="fst-italic my-3">
                <b>Note:</b> Updating a card, the user ID must need to be a
                uniqued id to the existing card.
              </p>
              <Form
                formContent={
                  <UpdateFormContent cardData={cardData} setCard={setCard} />
                }
              />
            </>
          }
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </>
  );
}

export default UpdateCard;
