import React from "react";
import ButtonSpinner from "../../components/ButtonSpinner";
import { useDeleteCard } from "../../hooks/useRegisterAccount";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
function DeleteCard({ card }) {
  const queryClient = useQueryClient();
  const onSuccess = (data) => {
    console.log(data.message);
    toast.success(data.message);
    queryClient.invalidateQueries(["card"]);
  };
  const onError = (error) => {
    toast.error(error.message);
    console.log(error.message);
  };
  const { mutateAsync, isLoading, isPending } = useDeleteCard({
    onError,
    onSuccess,
  });
  return (
    <>
      <ButtonSpinner
        btnClassname={"btn btn-danger"}
        className={` ${
          isLoading || isPending ? "spinner-border spinner-border-sm " : ""
        } ms-2`}
        buttonContent={isLoading || isPending ? "Deleting...." : "Delete Card"}
        onClick={async () => {
          try {
            await mutateAsync({
              id: card._id,
            });
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </>
  );
}

export default DeleteCard;
