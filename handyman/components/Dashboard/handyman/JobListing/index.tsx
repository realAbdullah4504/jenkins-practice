import { ServiceCard } from "@/components/ServiceCard";
import { useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "react-slick";

// Component for filters
const Filters = ({
  setFilter,
  filter,
  orderTime,
  setOrderTime,
}: FilterPropsType) => {
  const [orderNewOrOld, setOrderNewOrOld] = useState<boolean>(false);

  return (
    <div className="flex gap-5 mt-3 flex-wrap md:relative">
      <div className="bg-white px-3 py-3 rounded-lg shadow">
        <input
          type="number"
          className="w-full outline-none"
          id="filter_km"
          name="filter_km"
          placeholder="50 km"
          min={1}
          onChange={(e) => setFilter({ ...filter, distance: e.target.value })}
        />
      </div>
      <div className="bg-white px-3 py-3 rounded-lg shadow">
        <input
          type="text"
          className="w-full outline-none"
          id="filter_pin"
          name="filter_pin"
          placeholder="ej. 40210"
          onChange={(e) => setFilter({ ...filter, pin_code: e.target.value })}
        />
      </div>
      <div className="hidden sm:block"></div>
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
            className={`bg-white shadow p-3 rounded cursor-pointer mt-1 absolute flex flex-col space-y-5 z-40`}
          >
            <span
              className="hover:text-orange cursor-pointer"
              onClick={() => {
                setOrderNewOrOld(false);
                setOrderTime("Ordenar por Nuevo");
              }}
            >
              Ordenar por Nuevo
            </span>
            <span
              className="hover:text-orange cursor-pointer"
              onClick={() => {
                setOrderNewOrOld(false);
                setOrderTime("Ordenar por Más Antiguo");
              }}
            >
              Ordenar por Más Antiguo
            </span>
            <span
              className="hover:text-orange cursor-pointer"
              onClick={() => {
                setOrderNewOrOld(false);
                setOrderTime("Ordenar por Más Reciente o Más Antiguo");
              }}
            >
              Ordenar por Más Reciente o Más Antiguo
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component for index
export default function Index({
  selectCard,
  setSelectCard,
  filter,
  setFilter,
  orderTime,
  setOrderTime,
}: NewListedOrderPropsType) {
  const slider = useRef<SliderCrouserl>(null);

  return (
    <div className="Container my-10">
      <div className="mx-5">
        <h2 className="font-semibold">Buscar por filtros</h2>
        <Filters
          setFilter={setFilter}
          filter={filter}
          orderTime={orderTime}
          setOrderTime={setOrderTime}
          setSelectedServices={setSelectCard}
        />
      </div>
      <div className="relative">
        <div className="mt-3 sm:px-5 py-3">
          <h3 className="font-semibold">Filtrar por Categoría</h3>
          <ServiceCard
            slider={slider}
            slidesToShowCustom={7}
            setSelectCard={setSelectCard}
            selectCard={selectCard}
          />
          <div
            className="text-4xl sm:flex justify-between items-center top-[45%] absolute -right-2 -left-2 hidden"
            aria-hidden="true"
          >
            <button
              onClick={() => slider.current?.slickPrev()}
              aria-label="Desplazar a la izquierda"
            >
              <IoIosArrowBack className="text-[48px] sm:text-[30px]" />
            </button>
            <button
              onClick={() => slider.current?.slickNext()}
              aria-label="Desplazar a la derecha"
            >
              <IoIosArrowForward className="text-[48px] sm:text-[30px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
