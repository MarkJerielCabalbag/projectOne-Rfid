import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { useFetchCard } from "../../hooks/useRegisterAccount";
import UpdateCard from "./UpdateCard";
import { useQueryClient } from "@tanstack/react-query";

import RegisterCard from "./RegisterCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUser } from "@fortawesome/free-solid-svg-icons";
function GetCard({ className, hideButtons, statusElement, width }) {
  const queryClient = useQueryClient();
  const onSuccess = (data) => {
    console.log(data);
    setShowModal(false);
    queryClient.invalidateQueries({ queryKey: ["card"] });
    toast.success(data.message);
  };

  const onError = (error) => {
    console.log(error);
    toast.error(error.message);
  };

  const {
    data: cardData,
    isLoading,
    isPending,
    isFetching,
  } = useFetchCard({
    onSuccess,
    onError,
  });

  return (
    <>
      {isFetching || isLoading ? (
        <>{statusElement}</>
      ) : (
        <>
          {cardData.length === 0 ? (
            <div className="d-flex align-items-center flex-column justify-content-center">
              <h1>No cards available :</h1>
              {
                <RegisterCard
                  registerCardButtonContent={"Register your first card :)"}
                />
              }
            </div>
          ) : (
            <>
              <RegisterCard
                registerCardButtonContent={"Register New Card"}
                className={"btn btn-warning mt-4"}
              />
              <div key={cardData.card_id} className={className}>
                {cardData?.map((card) => (
                  <div>
                    <div className="card my-2" key={card.card_id} style={width}>
                      <div className="card-body">
                        <h2>
                          {<FontAwesomeIcon icon={faUser} />} Card User:{" "}
                          {card.card_user}
                        </h2>
                        <p>
                          {<FontAwesomeIcon icon={faIdCard} />} Card ID:{" "}
                          {card.card_id}
                        </p>
                        <span
                          className={
                            card.card_status === "Offline"
                              ? "badge text-bg-danger"
                              : "badge text-bg-success"
                          }
                        >
                          {card.card_status}
                        </span>
                      </div>
                      <div className={hideButtons}>
                        {<UpdateCard card={card} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default GetCard;
