import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import CreateCardFormContent from "../CreateCardFormContent";
import { useCreateCard } from "../../hooks/useRegisterAccount";
import ButtonSpinner from "../../components/ButtonSpinner";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Banner from "../../components/Banner";
function RegisterCard({ registerCardButtonContent, className }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [card, setCard] = useState({
    _id: "",
    card_id: "",
    card_user: "",
  });
  const onSuccess = (data) => {
    toast.success(data.message);
    queryClient.invalidateQueries({ queryKey: ["card"] });
    console.log(data);
  };
  const onError = (error) => {
    toast.error(error.message);
    console.log(error);
  };
  const { mutateAsync, isLoading, isError, isPending } = useCreateCard({
    onSuccess,
    onError,
  });
  return (
    <>
      <button
        className={className}
        onClick={() => {
          console.log(showModal);
          setShowModal(true);
        }}
      >
        {registerCardButtonContent}
      </button>
      {showModal && (
        <Modal
          modalTitle={"Register New Card"}
          modalButton={
            <>
              <ButtonSpinner
                btnClassname={"btn btn-primary"}
                className={`${
                  isLoading || isPending
                    ? "spinner-border spinner-border-sm"
                    : ""
                } ms-2`}
                onClick={async () => {
                  try {
                    await mutateAsync({
                      card_id: card.card_id,
                      card_user: card.card_user,
                    });
                    setCard({ card_id: "", card_user: "" });
                    setShowModal(false);
                  } catch (error) {
                    console.log(error);
                    setCard({ card_id: "", card_user: "" });
                    setShowModal(false);
                  }
                }}
                buttonContent={
                  isLoading || isPending ? "Adding New Card" : "Add New Card"
                }
              />
            </>
          }
          modalBody={
            <>
              <Banner />
              <p className="fst-italic my-3">
                <b>Note:</b> Registering a new card, the user ID must need to be
                uniqued to the existing card.
              </p>
              <CreateCardFormContent card={card} setCard={setCard} />
            </>
          }
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </>
  );
}

export default RegisterCard;
