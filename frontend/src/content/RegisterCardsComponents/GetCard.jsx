import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFetchCard } from "../../hooks/useRegisterAccount";
import UpdateCard from "./UpdateCard";
import { useQueryClient } from "@tanstack/react-query";
import ButtonSpinner from "../../components/ButtonSpinner";
import RegisterCard from "./RegisterCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal";
import Banner from "../../components/Banner";
function GetCard({ className, hideButtons, statusElement, width }) {
  const [showModal, setShowModal] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(0);
  const [isActivateClick, setActivateClick] = useState(true);
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

  const handleDeactivate = () => {
    setRefreshInterval(0);
    setActivateClick(false);
    console.log("1min automatic refresh deactivated");
  };

  const handleActivate = () => {
    setShowModal(false);
    setRefreshInterval(60000);
    setActivateClick(false);
    console.log("1min automatic refresh activated");
  };

  const {
    data: cardData,
    isLoading,
    isPending,
    isFetching,
  } = useFetchCard({
    onSuccess,
    onError,
    refetchInterval: refreshInterval,
  });

  return (
    <>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          modalTitle={"Activate Refresh Every 1min"}
          modalBody={
            <>
              <Banner />
              <p className="fst-italic mt-3">
                <b>Note:</b> After activating this feature, you will experince
                automatic refresh every one minute. Are you sure to activate
                this feature?
              </p>
            </>
          }
          modalButton={
            <ButtonSpinner
              buttonContent={"Activate"}
              btnClassname={"btn btn-warning"}
              onClick={handleActivate}
            />
          }
        />
      )}
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
              <div className="d-flex gap-2 align-items-center">
                <RegisterCard
                  registerCardButtonContent={"Register New Card"}
                  className={"btn btn-warning mt-4"}
                />
                <ButtonSpinner
                  buttonContent={
                    isActivateClick
                      ? "Activate automatic refresh for every 1min"
                      : "Cancel Automatic Refresh"
                  }
                  btnClassname={
                    isActivateClick
                      ? "btn btn-primary mt-4"
                      : "btn btn-info mt-4"
                  }
                  onClick={() => {
                    if (isActivateClick) {
                      setShowModal(true);
                      setActivateClick(true);
                      setRefreshInterval(6000);
                      console.log("1min automatic refresh activated");
                    } else {
                      setActivateClick(true);
                      setRefreshInterval(0);
                      console.log("1min automatic refresh deactivated");
                    }
                  }}
                />
              </div>

              <div key={cardData.card_id} className={className}>
                {cardData?.map((card) => (
                  <div key={card.card_id}>
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
