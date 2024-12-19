import usePostalRequests from "@/ApiRequests/postal";
import { ServiceCard } from "@/components/ServiceCard";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import SliderCrouserl from "react-slick";
import Loader from "../Loader";
import { useDebounce } from "@/hooks/useDebounce";

const Filters = ({ setFilter, filter, handleUpdate }: FilterPropsType) => {
  const [address, setAddress] = useState<any>("");
  const { userData } = useAuth();
  const user = userData[0];
  //console.log('===user==',user);
  const [search, setSearch] = useState(true);
  const [zipCode, setZipcode] = useState<any>(user?.address?.Postal_Code);
  const [distance, setDistance] = useState("");
  // const { GetPostalsBySearch } = usePostalRequests();
  // const { data, refetch, isLoading } = GetPostalsBySearch(zipCode);
  // const handleLocation = (address: any) => {
  // 	setSearch(false);
  // 	setFilter((p) => ({ ...p, address: address }));
  // 	setAddress(address);
  // };
  useEffect(() => {
    setDistance(filter.distance);
  }, [filter.distance]);

  const handleDistance = (e: any) => {
    const newFilter = { ...filter, distance: e.target.value };
    setDistance(e.target.value);
    handleDistanceChange(newFilter);
  };

  const handleDistanceChange = useDebounce((filter) => {
    setFilter(filter);
    handleUpdate && handleUpdate(filter);
  }, 500);

  return (
    <div className="flex gap-5 mt-3 flex-wrap md:relative">
      <div>
        <p className="font-semibold mb-4">Radio (km)</p>

        <div className="bg-white px-3 py-3 rounded-lg  shadow">
          <input
            type="number"
            className="w-full outline-none"
            id="filter_km"
            name="filter_km"
            placeholder="50 km"
            value={distance}
            min={1}
            onChange={handleDistance}
          />
        </div>
      </div>
      <div className="hidden sm:block"></div>
      {/* sort by service not needed for now */}
      {/* <div>
        {" "}
        <p className="font-semibold mb-4">Service</p>
        <div className="relative">
          <div
            className={`shadow bg-white  flex justify-center items-center rounded-md py-3 px-4 gap-4 ${
              isService && "text-orange"
            }`}
          >
            <button onClick={() => setIsService(!isService)}>
              {selectedServices}{" "}
            </button>
            <GoChevronDown className="mt-1 text-xl" />
          </div>
          {isService && (
            <div
              className={`h-60 overflow-auto bg-white shadow  p-3 rounded cursor-pointer  mt-1   absolute flex flex-col space-y-5 z-40`}
            >
              {ServiceCards?.map((item, idx) => {
                return (
                  <span
                    key={idx}
                    className={`hover:text-orange  cursor-pointer ${
                      selectCard?.includes(item?.shortText) && "text-orange"
                    }`}
                    onClick={() => {
                      setIsService(false);
                      setSelectedServices?.(item?.shortText);
                    }}
                  >
                    {item?.shortText}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div> */}
      {/* newest to older sorting function */}
      {/* <div>
        {" "}
        <p className="font-semibold mb-4">Sort by</p>
        <div className="relative">
          <div
            className={`shadow bg-white flex justify-center items-center rounded-md py-3 px-4 gap-4 ${
              orderNewOrOld && "text-orange"
            }`}
          >
            <button onClick={() => setOrderNewOrOld(!orderNewOrOld)}>
              {orderTime}
            </button>
            <GoChevronDown className="mt-1 text-xl" />
          </div>
          {orderNewOrOld && (
            <div
              className={`bg-white shadow  p-3 rounded cursor-pointer  mt-1   absolute flex flex-col space-y-5 z-40`}
            >
              <span
                className=" hover:text-orange  cursor-pointer"
                onClick={() => {
                  setOrderNewOrOld(false);
                  setOrderTime("Sort by New order");
                }}
              >
                Sort by New order
              </span>
              <span
                className=" hover:text-orange  cursor-pointer"
                onClick={() => {
                  setOrderNewOrOld(false);
                  setOrderTime("Sort by Older order");
                }}
              >
                Sort by Older order
              </span>
              <span
                className=" hover:text-orange  cursor-pointer"
                onClick={() => {
                  setOrderNewOrOld(false);
                  setOrderTime("Sort by newest or older");
                }}
              >
                Sort by newest or older
              </span>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default function Index({
  selectCard,
  setSelectCard,
  filter,
  setFilter,
  orderTime,
  setOrderTime,
  selectedServices,
  setSelectedServices,
  handleUpdate,
}: NewListedOrderPropsType) {
  const slider = useRef<SliderCrouserl>(null);
  return (
    <div className="px-[10px] my-4 lg:my-10">
      <div className="mx-5">
        <h2 className="font-semibold my-2">
          Find <span className="text-orange">Órdenes</span>
        </h2>

        <h2 className="font-semibold">Buscar por filtros</h2>
        <Filters
          setFilter={setFilter}
          filter={filter}
          orderTime={orderTime}
          setOrderTime={setOrderTime}
          selectCard={selectCard}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          handleUpdate={handleUpdate}
        />
      </div>

      <div className="relative">
        <div className="mt-3 sm:px-5 py-3">
          <h3 className="font-semibold">Filtrar por categoría</h3>
          <ServiceCard
            slider={slider}
            slidesToShowCustom={7}
            setSelectCard={setSelectCard}
            selectCard={selectCard}
            selectedServices={selectedServices}
            handleUpdate={handleUpdate}
          />
          <div
            className="text-4xl flex justify-between items-center top-[45%] absolute  -right-2 -left-2"
            aria-hidden="true"
          >
            <button
              onClick={() => slider.current?.slickPrev()}
              aria-label="Desplazamiento izquierdo"
            >
              <IoIosArrowBack className="lg:text-[48px] sm:text-[30px]" />
            </button>
            <button
              onClick={() => slider.current?.slickNext()}
              aria-label="cambio correcto"
            >
              <IoIosArrowForward className=" lg:text-[48px] sm:text-[30px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
