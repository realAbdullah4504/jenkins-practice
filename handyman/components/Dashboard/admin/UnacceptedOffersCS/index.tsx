import { Context } from "@/components/Common/DashboardLayout";
import { useContext } from "react";
import UnacceptedOffersCS from './components/UnacceptedOffersCS';
const TestData = [
    {
      id:1,
      job_title:'Demolición completa de edificios y estructuras',
      listing_ID:'32918465',
      price:'$250',
      status:'ONU aceptado',
      posted_on:{
        date:'23/05/2023',
        time:'9:45 AM'
      }
    },
    {
      id:2,
      job_title:'Demolición completa de edificios y estructuras',
      listing_ID:'32918465',
      price:'$250',
      status:'ONU aceptado',
      posted_on:{
        date:'23/05/2023',
        time:'9:45 AM'
      }
    },
  ];
export default function Index() {
  const { toggleSideBar } = useContext(Context);

  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "md:mx-10"} my-12`}>
     <h1 className="text-2xl font-bold mb-7 lg:px-[9.5rem]">Ofertas aceptadas de la ONU</h1>
      <div className="flex justify-center items-center gap-14 flex-wrap">
        {TestData.map((item)=>(
          <UnacceptedOffersCS key={item.id} job_title={item.job_title} listing_ID={item.listing_ID} price={item.price} posted_on={item.posted_on} status={item.status}/>
        ))}
      </div>
    </div>
  );
}
