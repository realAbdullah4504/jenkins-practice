import usePlanRequest from "@/ApiRequests/plan";
import Invoice from "@/components/Common/Invoice";
import ModalStruc from "@/components/Common/ModalStruc";
import PlanCards from "@/components/Common/PlanCards";
import Loader from "@/components/Loader";
import useScrollFetch from "@/hooks/useScrollFetchs";
import { useState } from "react";
import PaymentTable from "./components/table";

export default function SubscriptionManagement() {
  const [item, setItem] = useState<any>(null);
  const { GetSubscription } = usePlanRequest();
  const {
    data: subscription,
    isRefetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = GetSubscription({ pageSize: 10 }, {});
  useScrollFetch({ fetchNextPage, hasNextPage, isWindowScroll: true });

  return (
    <div className="my-2 w-full md:mx-32">
      <h1 className="text-3xl font-bold">
        <span className="text-orange">Tu centro de suscripción:</span> Gestiona
        tus preferencias
      </h1>
      <PlanCards />
      <div className="rounded-md flex flex-col gap-5">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <PaymentTable
              subscription={subscription}
              onView={(item: any) => setItem(item)}
            />
            {isRefetching && <Loader />}
          </>
        )}
      </div>

      <ModalStruc isOpen={item ? true : false} closeModal={() => setItem(null)}>
        <Invoice subscription={item} />
      </ModalStruc>
    </div>
  );
}
