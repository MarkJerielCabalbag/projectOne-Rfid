import React, { useEffect, useState } from "react";
import RegisterCard from "../content/RegisterCardsComponents/RegisterCard";
import Modal from "../components/Modal";

import { useFetchCard, useUpdateCard } from "../hooks/useRegisterAccount";
import GetCard from "../content/RegisterCardsComponents/GetCard";
import HomeCard from "../components/placeholders/HomeCard";
import RegisterCardPlaceholder from "../components/placeholders/RegisterCardPlaceholder";

function RegisteredCard() {
  return (
    <div className="container-fluid">
      <div className="container-sm">
        <div className="">
          <GetCard
            className={"mb-5"}
            hideButtons={"card-body d-flex flex-column gap-2"}
            statusElement={<RegisterCardPlaceholder />}
            width={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisteredCard;
