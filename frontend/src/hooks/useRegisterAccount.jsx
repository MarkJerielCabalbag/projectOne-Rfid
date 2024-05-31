import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

//register api
async function register(formData) {
  return await fetch("https://rest-api-jiei.onrender.com/rfid-ispsc/dean/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).then(async (res) => {
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "An error occured");
    }
    return responseData;
  });
}

//login api
async function login(formData) {
  return await fetch(
    "https://rest-api-jiei.onrender.com/rfid-ispsc/dean/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  ).then(async (res) => {
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "An error occured");
    }
    return responseData;
  });
}

//getcards api
// async function getCard() {
//   return await fetch("http://localhost:8000/rfid-ispsc/card/getCard").then(
//     (res) => res.json()
//   );
// }

async function getCard() {
  return await fetch(
    "https://rest-api-jiei.onrender.com/rfid-ispsc/card/getCard"
  ).then((res) => res.json());
}

//updateCard api
// async function updateCard({ _id, card_id, card_user }) {
//   return await fetch(
//     `http://localhost:8000/rfid-ispsc/card/updateCard/${_id}`,
//     {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ card_id, card_user }),
//     }
//   ).then(async (res) => {
//     const responseData = await res.json();
//     if (!res.ok) {
//       throw new Error(responseData.message || "An error occured");
//     }
//     return responseData;
//   });
// }

async function updateCard({ _id, card_id, card_user }) {
  return await fetch(
    `https://rest-api-jiei.onrender.com/rfid-ispsc/card/updateCard/${_id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ card_id, card_user }),
    }
  ).then(async (res) => {
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "An error occured");
    }
    return responseData;
  });
}

//createCard api
// async function createCard({ card_id, card_user }) {
//   return await fetch(`http://localhost:8000/rfid-ispsc/card/createCard`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ card_id, card_user }),
//   }).then(async (res) => {
//     const responseData = await res.json();
//     if (!res.ok) {
//       throw new Error(responseData.message || "An error occured");
//     }
//     return responseData;
//   });
// }

async function createCard({ card_id, card_user }) {
  return await fetch(
    `https://rest-api-jiei.onrender.com/rfid-ispsc/card/createCard`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ card_id, card_user }),
    }
  ).then(async (res) => {
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "An error occured");
    }
    return responseData;
  });
}

//deleteCard api
// async function deleteCard({ id }) {
//   return await fetch(`http://localhost:8000/rfid-ispsc/card/deleteCard/${id}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ id }),
//   }).then(async (res) => {
//     const responseData = await res.json();
//     if (!res.ok) {
//       throw new Error(responseData.message || "An error occured");
//     }
//     return responseData;
//   });
// }

async function deleteCard({ id }) {
  return await fetch(
    `https://rest-api-jiei.onrender.com/rfid-ispsc/card/deleteCard/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }
  ).then(async (res) => {
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.message || "An error occured");
    }
    return responseData;
  });
}

//@desc     mutate POST
//@api      register function
export const useRegisterAccount = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: register,
    onSuccess,
    onError,
  });
};

//@desc     mutate POST
//@api      login function
export const useLoginAccount = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};

//@desc   fetch GET
//@api    getCard function
export const useFetchCard = ({ onSuccess, onError, refetchInterval }) => {
  return useQuery({
    queryKey: ["card"],
    queryFn: getCard,
    onSuccess,
    onError,
    refetchInterval,
  });
};

//@desc   mutate PUT
//@api    updateCard function
export const useUpdateCard = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateCard,
    onSuccess,
    onError,
  });
};

//@desc mutate POST
//@api  createCard function
export const useCreateCard = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createCard,
    onSuccess,
    onError,
  });
};

//@desc mutate DELETE
//@api  deleteCard function
export const useDeleteCard = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: deleteCard,
    onSuccess,
    onError,
  });
};
