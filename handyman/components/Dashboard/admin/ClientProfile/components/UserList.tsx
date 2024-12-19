import useUserRequests from "@/ApiRequests/user";
import User from "@/backend/controllers/user/interface";
import ModalStruc from "@/components/Common/ModalStruc";
import { NotFoundData } from "@/components/Dashboard/handyman/Orders";
import Loader from "@/components/Loader";
import clientError from "@/helper/clientError";
import useScrollFetch from "@/hooks/useScrollFetchs";
import moment from "moment";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChangeProfileStatus from "./ChangeStatus";
import { getStatusBadge } from "./ClientProfile";

type TableData = {
  page: {
    data: User[];
    total: number;
  };
  setEditData: React.Dispatch<React.SetStateAction<any>>;
};

const spanishMapping = {
  handyman: "artesano",
  client: "Cliente",
};

function TableData({ page,setEditData}: TableData) {
  return (
    <Fragment>
      {page?.data?.map((item: User) => {
        item.status = item.active_status === "active" ? true : false;
        console.log(item.role);
        const role=spanishMapping[item?.role as "handyman" | "client"];
        return (
          <Fragment key={item._id}>
            <tr className="mb-2">
              <td className="flex items-center justify-center">
                <Image
                  height={50}
                  width={50}
                  alt="perfil"
                  src={item.profile_photo as string}
                  className="rounded-full h-12 w-12"
                />
              </td>
              <td className="text-center ">{item.name}</td>
              <td className="text-center ">
                {item.craftsman?.company_name || "------"}
              </td>
              <td className="text-center ">{item.email}</td>
              <td className="text-center ">{item.ip || "------"}</td>
              <td className="text-center ">
                {moment(item.createdAt).format("L")}
              </td>
              <td className="text-center ">{item.phone}</td>
              <td className="text-center ">{role}</td>
              <td
                className="cursor-pointer"
                onClick={() => {
                  setEditData({
                    isOpen: true,
                    identifier: "active_status",
                    value: item.active_status || "inactive",
                    user: item._id as string,
                  });
                }}
              >
                {getStatusBadge(item.status)}
              </td>
            </tr>
          </Fragment>
        );
      })}
    </Fragment>
  );
}

const UserList = ({ search }: { search: string }) => {
  const [filter, setFilter] = useState({ search });
  const { GetUsers, UpdateCraftman, UpdateUser } = useUserRequests();
  const handleError = clientError();
  const handleEdit = async (
    newValue: string,
    identifier: string,
    user: string
  ) => {
    try {
      await UpdateUser.mutateAsync(
        { [identifier]: newValue, user: editData.user },
        {
          onSuccess(data) {
            toast.success("Datos actualizados correctamente");
            setEditData(initialEditInfo);
          },
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = GetUsers({ pageSize: 10, role: "handyman" }, { search });

  const { handleScroll } = useScrollFetch({ fetchNextPage, hasNextPage });
  const initialEditInfo = {
    isOpen: false,
    identifier: "",
    value: "",
    user: "",
  };
  const [editData, setEditData] = useState(initialEditInfo);

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  return (
    <section className="mt-10 shadow-md rounded-md">
      <div className="min-w-[1000px]">
        <div
          className={`" max-h-[30rem] ${
            data?.pages[0]?.data.length > 8
              ? "overflow-auto"
              : "overflow-hidden"
          } md:w-full"`}
          onScroll={handleScroll}
        >
          {!isRefetching && !isLoading && (
            <table className="min-w-full border border-grey">
              <thead
                className={`bg-[#F9B18B]  sticky -top-1 ${
                  !editData.isOpen && "z-10"
                }`}
              >
                <tr>
                  <th className="p-4">Imagen</th>
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Nombre de la empresa</th>
                  <th className="p-4">Correo electrónico</th>
                  <th className="p-4">Dirección IP</th>
                  <th className="p-4">Fecha de registro</th>
                  <th className="p-4">Número de teléfono</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Activo</th>
                </tr>

                <tr
                  className={`absolute border-t  ${
                    isFetchingNextPage ? "top-10 " : "top-0"
                  }  border-white  text-center mx-auto flex items-center justify-center w-full bg-[#F9B18B]`}
                  style={{
                    opacity: isFetchingNextPage ? "1" : "0",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <td colSpan={9} className="text-center font-semibold py-1">
                    Cargando ...
                  </td>
                </tr>
              </thead>

              <tbody className="relative">
                {data?.pages.map((page, index) => (
                  <TableData
                    key={index}
                    setEditData={setEditData}
                    page={page}
                  ></TableData>
                ))}
              </tbody>
            </table>
          )}

          {(isLoading || (isRefetching && !isFetchingNextPage)) && <Loader />}
          {data?.pages[0].data.length === 0 && !isRefetching && !isLoading && (
            <NotFoundData text="No se encontró ningún usuario" />
          )}
        </div>
      </div>

      <ModalStruc
        isOpen={editData.isOpen}
        closeModal={() => setEditData((p: any) => ({ ...p, isOpen: false }))}
      >
        <ChangeProfileStatus
          isUpdating={UpdateCraftman.isPending || UpdateUser.isPending}
          identifier={editData.identifier}
          value={editData.value}
          onSubmit={handleEdit}
        />
      </ModalStruc>
    </section>
  );
};

export default UserList;
