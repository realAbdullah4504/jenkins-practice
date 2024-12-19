import useOfferRequests from "@/ApiRequests/offer";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import { formatTimeDifference } from "@/helper/formatTimeDifference";
import useApiCaller from "@/hooks/useApiCaller";
import useChat from "@/hooks/useChat";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsImage } from "react-icons/bs";
import { CiClock2, CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import ModalStruc from "../Common/ModalStruc";
import PlanCards from "../Common/PlanCards";
import Loader from "../Loader";

// Define the interface for the data of a single job
interface SingleJobData {
  _id: string;
  category: string;
  listingId: number;
  additional_details: {
    how_many_floors: string;
    how_many_rooms: string;
    square_meters: string;
  };
  additional_job_description: string;
  contactDetails: {
    email: string;
    name: string;
    phone: string;
  };
  location: any;
  images: string[];
  serviceTitle: {
    other_title: string;
    service_title: string;
    square_meters: string;
  };
  working_schedule: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  is_offer_sent?: boolean;
  offerId?: string;
  price?: number;
  distance: number;
}

const ICON = (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.893 11.2856C7.80557 11.2324 7.73335 11.1644 7.67635 11.0814C6.9968 10.0864 6.64844 9.00367 6.63128 7.83326C6.62298 7.27655 6.69188 6.72925 6.83797 6.19136C7.12905 5.11835 7.68797 4.2119 8.51473 3.47203C9.52632 2.56558 10.697 2.06919 12.0268 1.98287C13.2581 1.90262 14.4063 2.2009 15.4716 2.87769C16.3548 3.43882 17.0319 4.16735 17.5028 5.06329C17.7601 5.55359 17.9422 6.07404 18.049 6.62466C18.2637 7.73365 18.1525 8.83212 17.7153 9.92007C17.3501 10.8293 16.787 11.5924 16.0261 12.2094C15.9437 12.2758 15.8568 12.2822 15.7655 12.2285C15.5646 12.1095 15.5059 11.9701 15.5895 11.8102C15.6166 11.7581 15.7024 11.6649 15.8468 11.5304C16.7195 10.7197 17.2527 9.74244 17.4464 8.59859C17.5382 8.05406 17.5416 7.50316 17.4563 6.9459C17.246 5.56908 16.5654 4.45263 15.4143 3.59654C14.7785 3.12339 14.0699 2.81931 13.2885 2.68428C12.7462 2.59076 12.1953 2.5844 11.6358 2.66519C10.6198 2.81239 9.72803 3.22992 8.96048 3.91778C8.26931 4.53757 7.78454 5.29045 7.50619 6.17642C7.33962 6.70822 7.26021 7.25331 7.26795 7.81168C7.2829 8.86587 7.59943 9.83679 8.21756 10.7244C8.29836 10.8401 8.34152 10.9308 8.34706 10.9967C8.35757 11.119 8.29946 11.2164 8.17274 11.2889C8.07866 11.3426 7.98542 11.3414 7.893 11.2856Z"
      fill="#474747"
    />
    <path
      d="M14.8269 4.86831L9.51742 10.1592C9.39467 10.2816 9.39433 10.4802 9.51665 10.603L9.52016 10.6065C9.64248 10.7293 9.84115 10.7296 9.9639 10.6073L15.2733 5.31635C15.3961 5.19402 15.3964 4.99536 15.2741 4.87261L15.2706 4.86908C15.1483 4.74633 14.9496 4.74599 14.8269 4.86831Z"
      fill="#474747"
    />
    <path
      d="M11.3694 6.11998C11.3694 6.35444 11.2762 6.5793 11.1105 6.74509C10.9447 6.91087 10.7198 7.00401 10.4854 7.00401C10.2509 7.00401 10.026 6.91087 9.86025 6.74509C9.69446 6.5793 9.60132 6.35444 9.60132 6.11998C9.60132 6.00389 9.62418 5.88893 9.66861 5.78167C9.71304 5.67442 9.77816 5.57696 9.86025 5.49487C9.94234 5.41278 10.0398 5.34767 10.147 5.30324C10.2543 5.25881 10.3693 5.23595 10.4854 5.23595C10.6014 5.23595 10.7164 5.25881 10.8237 5.30324C10.9309 5.34767 11.0284 5.41278 11.1105 5.49487C11.1925 5.57696 11.2577 5.67442 11.3021 5.78167C11.3465 5.88893 11.3694 6.00389 11.3694 6.11998ZM10.7352 6.11998C10.7352 6.05371 10.7089 5.99016 10.662 5.94331C10.6152 5.89645 10.5516 5.87013 10.4854 5.87013C10.4191 5.87013 10.3555 5.89645 10.3087 5.94331C10.2618 5.99016 10.2355 6.05371 10.2355 6.11998C10.2355 6.18624 10.2618 6.2498 10.3087 6.29665C10.3555 6.34351 10.4191 6.36983 10.4854 6.36983C10.5516 6.36983 10.6152 6.34351 10.662 6.29665C10.7089 6.2498 10.7352 6.18624 10.7352 6.11998Z"
      fill="#474747"
    />
    <path
      d="M14.8225 9.55899C14.8225 9.79345 14.7294 10.0183 14.5636 10.1841C14.3978 10.3499 14.1729 10.443 13.9385 10.443C13.704 10.443 13.4792 10.3499 13.3134 10.1841C13.1476 10.0183 13.0544 9.79345 13.0544 9.55899C13.0544 9.32453 13.1476 9.09967 13.3134 8.93388C13.4792 8.7681 13.704 8.67496 13.9385 8.67496C14.1729 8.67496 14.3978 8.7681 14.5636 8.93388C14.7294 9.09967 14.8225 9.32453 14.8225 9.55899ZM14.19 9.55899C14.19 9.49272 14.1637 9.42917 14.1168 9.38232C14.07 9.33546 14.0064 9.30914 13.9401 9.30914C13.8739 9.30914 13.8103 9.33546 13.7635 9.38232C13.7166 9.42917 13.6903 9.49272 13.6903 9.55899C13.6903 9.62526 13.7166 9.68881 13.7635 9.73566C13.8103 9.78252 13.8739 9.80884 13.9401 9.80884C14.0064 9.80884 14.07 9.78252 14.1168 9.73566C14.1637 9.68881 14.19 9.62526 14.19 9.55899Z"
      fill="#474747"
    />
    <path
      d="M9.27836 17.2264C9.63364 16.8529 10.0725 16.6589 10.5949 16.6445C12.6219 16.5892 14.6487 16.5303 16.6752 16.4677C17.0509 16.4561 17.3428 16.3344 17.5509 16.1025C17.6013 16.0466 17.7465 15.7904 17.9867 15.3338C18.8406 13.7091 19.6917 12.0827 20.54 10.4546C20.6535 10.2377 20.6695 10.0446 20.5882 9.87525C20.5079 9.70702 20.3696 9.61073 20.1731 9.58639C19.9496 9.55816 19.7642 9.66441 19.617 9.90514C18.6851 11.4253 17.7535 12.9255 16.8221 14.4058C16.7668 14.4938 16.6871 14.5378 16.583 14.5378H10.7725C10.7382 14.5378 10.7042 14.5308 10.6728 14.5172C10.6414 14.5037 10.6132 14.4838 10.5899 14.4589C10.4377 14.2957 10.4266 14.1493 10.5567 14.0198C10.6264 13.9507 10.7327 13.9144 10.8754 13.9111C11.7758 13.8928 12.6764 13.8865 13.5773 13.892C13.8192 13.8937 13.9976 13.8652 14.1127 13.8065C14.3048 13.7086 14.4213 13.5517 14.4622 13.3358C14.5026 13.1256 14.4691 12.9385 14.3618 12.7747C14.2793 12.6491 14.1642 12.5603 14.0164 12.5083C13.929 12.4778 13.7904 12.4626 13.6006 12.4626C12.2736 12.4626 10.9465 12.4626 9.61953 12.4626C8.68707 12.4626 8.13507 12.4809 7.96352 12.5174C7.47709 12.622 7.06731 12.8591 6.73417 13.2288C6.6235 13.3516 6.3742 13.7351 5.98627 14.3793C4.77049 16.398 3.55525 18.417 2.34057 20.4363C2.22823 20.6239 2.13886 20.757 2.07246 20.8356C2.05523 20.8566 2.03133 20.8715 2.00439 20.8779C1.74983 20.9416 1.60983 20.871 1.58437 20.6663C1.57164 20.5633 1.60595 20.4435 1.6873 20.3068C3.05914 18.0003 4.43901 15.6985 5.8269 13.4014C6.45721 12.3588 7.37555 11.8348 8.58193 11.8293C10.0938 11.8232 11.6053 11.8198 13.1166 11.8193C13.5964 11.8193 13.8651 11.8237 13.9226 11.8326C14.1097 11.8619 14.2857 11.9242 14.4506 12.0193C14.6094 12.1112 14.7453 12.2335 14.8581 12.3862C15.1858 12.8289 15.2123 13.3209 14.9378 13.8621C14.935 13.8677 14.9337 13.8739 14.9341 13.8801C14.9345 13.8863 14.9365 13.8924 14.94 13.8977C14.9435 13.9031 14.9484 13.9075 14.9541 13.9105C14.9598 13.9136 14.9662 13.9152 14.9727 13.9152L16.3008 13.9128C16.3304 13.9128 16.3591 13.9059 16.3841 13.8928C16.4091 13.8798 16.4296 13.8609 16.4436 13.838C17.2859 12.4529 18.1339 11.0838 18.9878 9.73082C19.1909 9.4093 19.3713 9.20012 19.529 9.10328C19.7365 8.97545 19.9659 8.92426 20.2171 8.94972C20.4479 8.9724 20.6568 9.05514 20.8438 9.19791C21.2157 9.48124 21.348 9.89158 21.2406 10.4289C21.2185 10.5396 21.1288 10.7374 20.9717 11.0224C20.8112 11.3129 20.7074 11.5039 20.6604 11.5952C19.9155 13.0345 19.1638 14.4703 18.4051 15.9025C18.2031 16.2837 18.0285 16.5408 17.8813 16.6736C17.718 16.8202 17.5307 16.9315 17.3193 17.0073C17.1705 17.061 16.9588 17.092 16.6843 17.1003C14.7513 17.1611 12.8184 17.2165 10.8854 17.2663C10.5124 17.2762 10.2432 17.3233 10.0777 17.4074C9.88515 17.5053 9.72965 17.647 9.61123 17.8324C9.53928 17.9447 9.46651 18.1356 9.39291 18.4051C9.19812 19.1196 9.00388 19.8343 8.8102 20.5492C8.77146 20.6909 8.72802 20.7847 8.67988 20.8306C8.59466 20.9131 8.479 20.9322 8.3329 20.8879C8.16689 20.8375 8.10463 20.7338 8.14614 20.5766C8.37911 19.689 8.62316 18.8041 8.87827 17.922C8.95519 17.657 9.08855 17.4251 9.27836 17.2264Z"
      fill="#474747"
    />
  </svg>
);

export default function Job() {
  // State for toggling offer form visibility
  const [offer, setOffer] = useState<boolean>(false);

  // State for toggling phone number visibility
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

  // State for storing the price in the offer form
  const [price, setPrice] = useState<string>("");

  // State for storing the single job data
  const [getSingleJob, setGetSingleJob] = useState<SingleJobData | null>(null);

  //State for payment required
  const [isSubscribed, setIsSubscribed] = useState(false);

  // State for managing loading state
  const [isLoading, setIsLoading] = useState(true);

  // Get the user data from the authentication context
  const { userData } = useAuth();
  const user: any = userData[0];

  // Api caller hook
  const apiCaller = useApiCaller();

  // Get the router instance
  const router = useRouter();

  // Function to handle client errors
  const handleClientError = clientError();

  // Subscription Object
  const active_plan: any =
    user?.craftsman?.current_subscription?.status === "active";

  const [isUserActivated, setIsUserActivated] = useState(false);
  // Function to handle sending a message
  const { createCoversation, inputMessage, setInputMessage, isCreatingConv } =
    useChat();

  const handleMessageSent = async () => {
    if (user?.role === "handyman") {
      if (user?.craftsman?.status === "unverified") {
        return setIsUserActivated(true);
      }
      if (!active_plan) {
        return setIsSubscribed(true);
      }
      if (getSingleJob) createCoversation(getSingleJob?.userId as string);
    } else
      toast.error("Inicie sesión como Craftman antes de enviar un mensaje");
  };

  const handleUnSubscription = () => {
    localStorage.setItem("message", inputMessage);
    localStorage.setItem("receiverId", getSingleJob?.userId as string);
    const messageData = {
      message: inputMessage,
      receiverId: getSingleJob?.userId as string,
    };
    const jsonData = JSON.stringify(messageData);
    localStorage.setItem("messageData", jsonData);
    router.push("/dashboard/handyman/subscriptionmanagement");
  };

  // Function to handle making an offer
  const { CreateJobOffer } = useOfferRequests();
  const handleMakeOffer = async () => {
    try {
      if (user?.role === "handyman") {
        if (user?.craftsman?.status === "unverified") {
          return setIsUserActivated(true);
        }
        if (!active_plan) {
          return setIsSubscribed(true);
        }
        const offerData = {
          client: getSingleJob?.userId,
          job: getSingleJob?._id,
          price,
          handymanName: user?.craftsman?.company_name as string,
        };

        await CreateJobOffer.mutateAsync(offerData, {
          async onSuccess(data) {
            toast.success(data.message);
            getSingelJob();
            setPrice("");
          },
        });
      } else
        toast.error("Inicie sesión como Craftman antes de enviar una oferta");
    } catch (error) {
      handleClientError(error);
    }
  };

  const getSingelJob = async () => {
    try {
      const response = await apiCaller.get(
        `/getsinglejob?id=${router.query.slug}`
      );
      if (response.status === 200) {
        setGetSingleJob(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      handleClientError(error);
      setIsLoading(false);
    }
  };

  // Effect to fetch single job data
  useEffect(() => {
    if (Object.entries(router.query).length === 0) {
      return;
    } else {
      getSingelJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  // Render loading spinner if data is still loading
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="w-full mt-10">
        {user?.craftsman?.status === "unverified" && (
          <p className="text-center bg-orange text-white rounded w-full p-4 text-2xl mb-5">
            Tu perfil aún no está activado
          </p>
        )}
        {/* Job details section */}
        {getSingleJob && (
          <div className="flex justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0">
            {/* Left side containing job details */}
            <div className="space-y-10 w-full lg:basis-2/5">
              {/* Image display */}
              <div className="bg-white rounded-lg shadow-md w-full">
                {/* Render job image or default image if no image is available */}
                {getSingleJob?.images[0] ? (
                  <Image
                    src={getSingleJob?.images[0] || "/default-image.jpg"}
                    className="w-full object-cover h-auto rounded-t-lg"
                    alt="New job post"
                    width={500}
                    height={500}
                    priority
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center w-full max-h-[240px] object-contain mx-auto bg-[#eaeaea] rounded-md p-3">
                    <BsImage size={160} color="#666666" />
                    <p className="text-base 2xl:text-lg font-bold opacity-60">
                      Sin imagen
                    </p>
                  </div>
                )}
                {/* Job details */}
                <section className="py-3 px-4">
                  <h1 className="font-bold text-xl text-orange">
                    {getSingleJob?.category}
                  </h1>
                  <h1 className="text-black">
                    {getSingleJob?.serviceTitle?.service_title}
                  </h1>
                  {/* Additional job details */}
                  <section className="w-5/5 flex justify-between">
                    {/* Left side of additional details */}
                    <section className="w-2/5 flex flex-col gap-3 pt-20">
                      <span>
                        Sq: {getSingleJob?.additional_details?.square_meters}
                        m2
                      </span>
                      <span>
                        Pisos:{" "}
                        {getSingleJob?.additional_details?.how_many_floors}
                      </span>
                      <span>
                        Alojamiento:{" "}
                        {getSingleJob?.additional_details?.how_many_rooms}
                      </span>
                    </section>
                    {/* Right side of additional details */}
                    <section className="space-y-2 mt-2 w-3/5">
                      <h2 className="font-bold text-xl">Descripción</h2>
                      <p>{getSingleJob?.additional_job_description}</p>
                    </section>
                  </section>
                  {/* Location and time details */}
                  <div className="flex gap-5 items-center justify-between py-2">
                    <div className="flex justify-center items-center gap-2">
                      <CiLocationOn />
                      <span className="mr-2">
                        {getSingleJob?.location?.place_name}
                      </span>
                      <span>
                        {" "}
                        {user &&
                          `Distancia: ${getSingleJob?.distance.toFixed(2)}
									km`}
                      </span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <CiClock2 />
                      <span>
                        Al corriente{" "}
                        {getSingleJob
                          ? formatTimeDifference(getSingleJob.createdAt)
                          : ""}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
              {/* Message input box */}
              {user?.role === "handyman" && (
                <div className="bg-white flex flex-col rounded-lg shadow">
                  <textarea
                    rows={7}
                    cols={10}
                    placeholder="Ingrese el mensaje"
                    name="enter_message"
                    className="p-2 rounded-t-lg outline-none border-b border-orange resize-none"
                    onChange={(e) => setInputMessage(e.target.value)}
                    value={inputMessage}
                  />
                  <div className="flex justify-end m-3">
                    <button
                      disabled={isCreatingConv}
                      onClick={() => handleMessageSent()}
                      className="bg-orange px-3 sm:px-4 py-2 sm:py-3 text-white rounded-lg hover:text-gray-200"
                    >
                      Enviar un mensaje
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right side containing offer form and phone number display */}
            <div className="basis-2/5">
              {/* Offer button */}
              {user?.role === "handyman" && (
                <div className="m-2">
                  <button
                    className="bg-orange px-7 py-3 md:px-14 md:py-4 flex justify-center items-center gap-4 rounded-lg text-white text-xl hover:text-gray-100 group w-full"
                    onClick={() => setOffer(!offer)}
                  >
                    <span className="bg-white p-1 rounded-full group-hover:bg-gray-200">
                      {ICON}
                    </span>
                    Hacer una oferta
                  </button>
                </div>
              )}

              {/* Offer form */}
              {offer && (
                <div className="bg-white py-3 rounded-lg shadow-md my-6">
                  {/* Offer details */}
                  <section className="mb-5 border-b-2 pb-5 px-4">
                    <h3 className="font-bold text-xl text-black">
                      Descripción
                    </h3>
                    <p>{getSingleJob?.additional_job_description}</p>
                  </section>
                  <section className="mb-5 border-b-2 pb-5 px-4">
                    <h4 className="font-bold text-xl text-black">
                      Título profesional
                    </h4>
                    <p>{getSingleJob?.serviceTitle?.service_title}</p>
                  </section>
                  <section className="mb-5 border-b-2 pb-5 px-4">
                    <h5 className="font-bold text-xl text-black">
                      Fijación de precios
                    </h5>
                    {getSingleJob?.is_offer_sent ? (
                      <span className="text-lg mt-2 px-1 font-semibold border border-2 border-black rounded">
                        ${getSingleJob?.price}
                      </span>
                    ) : (
                      <input
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="€"
                        min={1}
                        className="text-lg p-1 font-semibold w-20 border border-grey hover:border hover:border-gray-400 mt-1 rounded-md"
                      />
                    )}
                  </section>
                  <div className="flex justify-end items-center px-4">
                    {getSingleJob?.is_offer_sent ? (
                      <Link
                        className="globalbtn"
                        href={`/dashboard/handyman/orders/#${getSingleJob?.offerId}`}
                      >
                        Ver oferta
                      </Link>
                    ) : (
                      <button
                        disabled={CreateJobOffer.isPending}
                        onClick={handleMakeOffer}
                        className="bg-orange px-4 sm:py-3 py-2 text-white rounded-lg"
                      >
                        Enviar oferta
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Phone number display */}
              <div className="m-2">
                {user?.role === "handyman" && (
                  <button
                    onClick={() => {
                      if (user?.role === "handyman") {
                        if (user?.craftsman?.status === "unverified") {
                          return setIsUserActivated(true);
                        }
                        if (!active_plan) {
                          return setIsSubscribed(true);
                        }
                        setShowPhoneNumber(true);
                      } else
                        toast.error(
                          "Please Login as Craftman to view the number"
                        );
                    }}
                    className="bg-orange px-5 py-3 md:px-10 md:py-4 flex justify-center items-center gap-4 rounded-lg text-white text-xl hover:text-gray-100 group w-full"
                  >
                    <div className="bg-white p-1 rounded-full group-hover:bg-gray-200">
                      <IoCallOutline className="text-black" />
                    </div>
                    {showPhoneNumber
                      ? `${getSingleJob?.contactDetails?.phone}`
                      : "Mostrar número de teléfono"}
                  </button>
                )}
                <div className="mt-5 space-y-5">
                  {/* Listing ID */}
                  <div>
                    <span className="block mb-2 font-bold text-xl">
                      ID de listado:
                    </span>
                    <span className="bg-white shadow-md rounded-md py-3 px-5 inline-block">
                      {getSingleJob?.listingId}
                    </span>
                  </div>
                  {/* Project Start Date */}
                  <div>
                    <span className="block mb-2 font-bold text-xl">
                      Fecha de inicio del proyecto
                    </span>
                    <span className="bg-white shadow-md rounded-md py-3 px-5 inline-block">
                      {getSingleJob?.working_schedule}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back button */}
      <button
        className="bg-orange py-2 px-5 my-4 flex ml-auto justify-end rounded-lg text-white text-xl hover:text-gray-100"
        onClick={() => router.back()}
      >
        Atrás
      </button>

      <ModalStruc
        isOpen={isSubscribed}
        closeModal={() => setIsSubscribed(false)}
      >
        <div>
          <p className="mb-4 text-[20px] font-semibold">
            Se requiere una suscripción pagada para esta característica
          </p>

          <PlanCards />
          {/* <button
						className="globalbtn"
						onClick={handleUnSubscription}>
						Pay and Send
					</button> */}
        </div>
      </ModalStruc>

      <ModalStruc
        isOpen={isUserActivated}
        closeModal={() => setIsUserActivated(false)}
      >
        <div>
          <p className="mb-4 text-[20px] max-w-[300px] text-center bg-orange text-white rounded p-4 shadow">
            Su perfil aún no está activado.Puedes usar esto función tan pronto
            como se haya activado su perfil
          </p>
        </div>
      </ModalStruc>
    </>
  );
}
