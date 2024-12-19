import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
  const [selectCard, setSelectCard] = useState<string[]>([]);
  const [orderTime, setOrderTime] = useState<orderTimeType>(
    "Sort by newest or older"
  );
  const [selectedService, setSelectedService] =
    useState<string>("Select Service");
  const [filter, setFilter] = useState<FilterType>({
    categories:[],
    distance: "",
    pin_code: "",
  });

  // Job posts state Data
  const [getAllJobs, setGetAllJobs] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // api calls for sorting based on multiple categories
  useEffect(() => {
    // if no category selected return
    if (selectCard === undefined) return;

    if (selectCard !== undefined) {
      // 👇 if category selected get the data form backend and refetch

      setIsLoading(true);

      // make api calls
      try {
        let newSortingData = {
          sortedData: selectCard,
        };
        (async () => {
          if (selectCard.length === 0) {
            const response = await axios.get("/api/get_jobs");

            if (response.status === 200) {
              setGetAllJobs(response.data.data);
            }
            setIsLoading(false);
          } else {
            const response = await axios.post("/api/get_jobs", newSortingData);

            if (response.status === 200) {
              setGetAllJobs(response.data.data);
            }
            setIsLoading(false);
          }
        })();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }, [selectCard]);

  const router = useRouter()
  useEffect(()=>{router.push('/notexistence')},[])
  return (
    <div></div>
    // <div className="bg-[#F2F8FF]">
    //   <Head>
    //     <title>New Job Listing | Exciting Opportunity for Craftsmen Work</title>
    //     <meta
    //       name="description"
    //       content="Discover a new job opportunity in the world of craftsmen work. Post your job listing and attract skilled professionals to bring your project to life. Find the right craftsmen to deliver exceptional results. Don't miss out on this exciting opportunity, post your job now!"
    //     />{" "}
    //     {/*Short description more effective for SEO*/}
    //     <meta name="viewport" content="width=device-width, initial-scale=1" />
    //     <meta name="robots" content="index, follow" />
    //     <link rel="canonical" href="#" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   {/* <header className="white flex justify-between items-center bg-white shadow-lg px-5 py-6 fixed w-full top-0 z-50">
    //     <div className="container flex justify-between mx-auto">
    //       <div className="flex items-center gap-3">
    //         <ImArrowLeft2 className="text-2xl cursor-pointer"/>
    //         <Link href='/' className="font-bold text-xl">Job Details</Link>
    //       </div>
    //       <div>
    //       <button type="button" className="bg-orange  px-3 py-2 text-white rounded-lg sm:text-lg text-sm">
    //           Handyman Dashboard
    //       </button>
    //       </div>
    //     </div>
    //     <div />
    //   </header> */}
    //   <header className="Container">
    //     <Header />
    //   </header>
    //   <div className="pt-36">
    //     <div className="text-center text-3xl font-bold mb-11">
    //       <h1 className="font-bold text-3xl sm:text-4xl text-Heading">
    //         Discover new jobs :{" "}
    //         <span className="text-orange">Search and filter options</span>
    //       </h1>
    //     </div>
    //     <NewListedOrderPage
    //       selectCard={selectCard}
    //       setSelectCard={setSelectCard}
    //       setFilter={setFilter}
    //       filter={filter}
    //       orderTime={orderTime}
    //       setOrderTime={setOrderTime}
    //       selectedServices={selectedService}
    //       setSelectedServices={setSelectedService}
    //     />
    //   </div>
    //   {
    //     // if loading
    //     isLoading ? (
    //       <div className=" flex justify-center items-center w-full h-[60dvh]">
    //         <FadeLoader color="#000" />
    //       </div>
    //     ) : (
    //       // otherwise show jobs data
    //       <div className="container mx-auto h-screen">
    //         {getAllJobs?.map((jobs: any) => (
    //           <JOB key={jobs._id} jobs={jobs} />
    //         ))}
    //       </div>
    //     )
    //   }
    // </div>
  );
}
