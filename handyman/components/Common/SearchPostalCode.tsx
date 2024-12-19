import usePostalRequests from "@/ApiRequests/postal";
import { Fragment, useEffect, useState } from "react";
import Loader from "../Loader";

const useDebounce = (value:string, delay:number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
  
	useEffect(() => {
	  const handler = setTimeout(() => {
		setDebouncedValue(value);
	  }, delay);
  
	  return () => {
		clearTimeout(handler);
	  };
	}, [value, delay]);
  
	return debouncedValue;
  };


export default function SearchPostalCode({
  search,
  onSelect,
  position,
}: {
  search: string;
  onSelect: any;
  position: string;
}) {
  const { GetPostalsBySearch } = usePostalRequests();
  const debouncedSearch=useDebounce(search,500)
  const { data, refetch, isLoading } = GetPostalsBySearch(debouncedSearch);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (debouncedSearch) {
      refetch();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch, refetch]);

  return (
    <Fragment>
      {search && isOpen && (
        <div
          className={`absolute z-10 overflow-auto ${position} rounded shadow-lg bg-white flex flex-col gap-2 h-48  p-2`}
        >
          {isLoading ? (
            <Loader />
          ) : data?.length > 0 ? (
            data?.map((item: any, ind: number) => {
              return (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onSelect(item);
                  }}
                  key={ind}
                  className="border cursor-pointer text-left w-fit shadow border-gray-300 p-2 rounded"
                >
                  <span className="text-black ">
                    {item?.Place_Name}
                    {/* {item?.Admin_Name},{" "} */}
                    {/* {item?.Admin_Name2}, {item?.Admin_Name3} */}
                  </span>
                </button>
              );
            })
          ) : (
            <p className="w-full p-2 text-center">Ubicación no encontrada</p>
          )}
        </div>
      )}
    </Fragment>
  );
}
