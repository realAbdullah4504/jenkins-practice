import useUpdateJobpost from "@/hooks/useUpdateJob";
import React from "react";
import { FaCheck, FaTimesCircle, FaTrash } from "react-icons/fa";

interface StatusButtonProps {
  status: string;
  jobId?: string;
  getUserPostedJobFN?: () => Promise<void>;
  showIcons?: boolean;
  showEditIcon?: boolean;
  setIsEdit?: any;
  onEditClick?: () => void; // Define the onEditClick prop function
}

const StatusButton: React.FC<StatusButtonProps> = ({
  showIcons = true,
  showEditIcon = true,
  jobId,
  status,
  setIsEdit,
  // onEditClick,
  // getUserPostedJobFN,
}) => {
  const getStatusStyles = () => {
    let styles =
      "rounded px-3 py-1 cursor-pointer flex gap-2 items-center capitalize";

    if (status === "terminada") {
      styles += " bg-[#ff691880]";
    } else if (["cerca", "rechazada"].includes(status)) {
      styles += " bg-[#FA4017] text-white";
    } else if (["pendiente", "abierta"].includes(status)) {
      styles += " bg-[#67B554]";
    } else if (status === "aceptada") {
      styles += " bg-[#fff61880]";
    } else if (status === "retirada") {
      styles += " bg-gray-500 text-white";
    }
    return styles;
  };

  const getStatusIcon = () => {
    if (status === "terminada" || ["pendiente", "abierta"].includes(status)) {
      return <FaCheck className="mr-1" />;
    } else if (["cerca", "rechazada"].includes(status)) {
      return <FaTimesCircle className="mr-1" />;
    }
  };

  const { handleUpdateJobPost, isLoading } = useUpdateJobpost(() => {});

  const handleClose = () => {
    try {
      setIsEdit("status");
    } catch (error) {
      console.log(error);
    }
  };

  const isClientSide = typeof window !== "undefined";

  return (
    <div className="flex items-center gap-2">
      {((showEditIcon && showIcons) ||
        (["pendiente", "abierta"].includes(status) && showIcons)) && (
        <span className="flex gap-1">
          {status === "abierta" && (
            <FaTrash
              style={{ cursor: "pointer" }}
              fontSize={20}
              onClick={handleClose}
            />
          )}

          {/* <FaEdit
						style={{ cursor: "pointer" }}
						fontSize={20}
						// onClick={handleEditClick}
					/> */}
        </span>
      )}
        <div className={getStatusStyles()}>
          {/* {["pendiente", "abiertaen"].includes(status) &&
          isClientSide &&
          !window.location.pathname.includes("/client")
            ? "Solicitud abierta"
            : status} */}
			{status}
          {getStatusIcon()}
        </div>
    </div>
  );
};

export default StatusButton;
