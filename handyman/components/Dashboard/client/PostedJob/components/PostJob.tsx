import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {TableTestDataType} from '../index'

export default function PostJob({tabelData,setTableData}:{tabelData: TableTestDataType[]; setTableData: React.Dispatch<React.SetStateAction<TableTestDataType[]>>}) {
  const [editTitle, setEditTitle] = useState<{job_title: string;listingID: string;}>({ job_title: "", listingID: "" });
  const handleRemove = (listingID: string) => {
    const removeItemFromTable_data = tabelData.filter((item) => item.listingID !== listingID);
    setTableData(removeItemFromTable_data);
  };
  const handleEdit = (job_title: string, listingID: string) => {
    const itemForEditTitle = tabelData.filter((item) => item.listingID === listingID);
    if (itemForEditTitle.length !== 0) {
      if (itemForEditTitle[0].listingID === listingID) {
        setEditTitle({ job_title, listingID });
      }
    }
  };
  const handleSubmitEdit = (listingID: string) => {
    const updatedItems = tabelData.map((item) =>item.listingID === listingID ? { ...item, job_title: editTitle.job_title }: item);
    setTableData(updatedItems);
    setEditTitle({ job_title: "", listingID: "" });
  };
  return (
    <div className="lg:w-[80%] mx-auto border-2 flex justify-center items-center rounded-md shadow-md">
      <div className="w-full overflow-x-scroll">
        <div className="flex justify-center items-center  bg-[#F0EAEA] px-8 py-4 w-[60rem] md:w-full">
          <div className="flex justify-start items-center w-[20rem] gap-2">
            {/* <input type="checkbox" name="checkBox" id="checkBox" className="cursor-pointer"/> */}
            <span className="ml-2 font-bold">Título profesional</span>
          </div>
          <span className="font-bold w-[20rem]">ID de listado:</span>
          <span className="font-bold w-[20rem]">Fecha de publicación</span>
          <span className="font-bold w-[7rem]">Comportamiento</span>
        </div>
        <div className=" bg-white rounded-b-md w-[60rem] md:w-full">
          {tabelData.length !== 0 ? (
            tabelData.map((item) => (
              <div key={item.id} className="flex justify-center items-center px-8 p-3">
                <div className="flex justify-start items-center w-[20rem] gap-2">
                  {editTitle.listingID == item.listingID ? (
                    <>
                      <input type="text" name="job_title" id="job_title" className="cursor-pointer border border-gray-500 outline-none p-1 rounded-md " value={editTitle.job_title} onChange={(e) =>editTitle.listingID == item.listingID && setEditTitle((pre) => ({...pre,job_title: e.target.value})) }/>
                      <button className="bg-orange p-1 rounded-md text-white px-3" onClick={() => handleSubmitEdit(item.listingID)}>
                        Agregar
                      </button>
                    </>
                  ) : (
                    <span>{item.job_title}</span>
                  )}
                </div>
                <span className="w-[20rem]">{item.listingID}</span>
                <span className="w-[20rem]">{item.date_of_post}</span>
                <div className="w-[7rem] flex justify-start items-center gap-3">
                  <MdDelete className="bg-orange bg-opacity-70 text-3xl text-white p-1 rounded-md cursor-pointer hover:bg-opacity-90" onClick={() => handleRemove(item.listingID)}/>
                  <BiEdit className="bg-orange bg-opacity-70 text-3xl text-white p-1 rounded-md cursor-pointer hover:bg-opacity-90" onClick={() => handleEdit(item.job_title, item.listingID)}/>
                </div>
              </div>
            ))
          ) : (
            <div className="py-3 text-center w-full">
              <span>No tienes ninguna publicación de trabajo.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
