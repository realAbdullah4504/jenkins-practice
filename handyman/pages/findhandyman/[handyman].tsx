import { Footer, Header, Search } from "@/components";
import { changeServiceFormat } from "@/helper/changeServiceFormat";
import Head from "next/head";
import { useRouter } from "next/router";
import { ImArrowLeft2 } from "react-icons/im";
export const getServerSideProps = ({ params, query }: any) => {
  return {
    props: {
      params: { ...params,city: query.city,search: query.search || "" },
    },
  };
};
export default function Handyman({ params }: any) {
  const router = useRouter();
  const { handyman, city,search} = params;
  console.log(handyman, city);
  return (
    <div className="w-full">
      <Head>
        <title className="capitalize">
          {`Find Verified ${handyman} in ${city} - Compare Reviews & Hire
					the Right Professional`}
        </title>
        <meta
          name="description"
          content={`In search of a ${handyman} in ${city}? Our service allows you to effortlessly discover verified ${handyman} in your area. Compare customer reviews and select the ideal professional for your ${handyman} requirements. Get reliable and high-quality ${handyman} services with ease.`}
        />{" "}
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/findhandyman/${handyman}?${search && `search=${search}&`}city=${city}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-between items-center bg-white shadow-lg px-5 py-6 w-full fixed z-50 left-0 right-0 top-0">
        <div className="Container">
          <div className="flex items-center gap-3">
            <ImArrowLeft2
              className="text-2xl cursor-pointer"
              onClick={() => router.push("/")}
            />
            <span className="font-bold text-xl">Find Handyman</span>
          </div>
        </div>
        <div />
      </header>
      <header className="Container">
        <Header />
      </header>
      <div className="pt-32 bg-mainBackground">
        <section className="Container space-y-10 text-center mb-10">
          <h1 className="text-3xl capitalize md:text-4xl font-bold">
            Find {changeServiceFormat(handyman)} in{" "}
            <span className="text-orange">{city}</span> - Get Free Offers{" "}
          </h1>
          <p className="w-full lg:w-1/2 text-gray-600 text-left font-medium mx-auto">
            Are you looking for {changeServiceFormat(handyman)} in {city}? With
            our service, you can quickly and freely find verified{" "}
            {changeServiceFormat(handyman)} in your area. Compare reviews from
            other customers and choose the right professional for your{" "}
            {changeServiceFormat(handyman)} needs.
          </p>
        </section>
        <Search params={params} />
      </div>
      <Footer />
    </div>
  );
}
