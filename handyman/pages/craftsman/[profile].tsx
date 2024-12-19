import Craftsman from "@/backend/models/CrafstmanModel";
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";
import { CraftsmanProfile, Footer, Header } from "@/components";
import NavBar from "@/components/Common/NavBar";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import useApiCaller from "@/hooks/useApiCaller";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { profile } = params;
  const errorResponse = {
    redirect: {
      destination: "/not_found", // Error page path
      permanent: false,
    },
  };

  const response = await axios.get(
    `${process.env.BASE_URL}/api/user/craftman/${profile}`
  );

  try {
    return {
      props: {
        profile: profile,
        profileData: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error); // Add error logging
    return errorResponse;
  }
}

export default function Profile({
  profile,
  profileData,
}: {
  profile: any;
  profileData: any;
}) {
  // const profileData = JSON.parse(data);
  // const [profileData, setProfileData] = useState();
  const { userData, isAuthUserLoading } = useAuth();
  // const [pageLoading, setPageLoading] = useState(true);
  const apiCaller = useApiCaller();
  const address=profileData?.user?.address.Place_Name;
  // console.log(profileData, "data");
  const router = useRouter();
  // useEffect(() => {
  //   apiCaller
  //     .get(`/user/craftman/${profile}`)
  //     .then((res: any) => {
  //       if (res.data) {
  //         setProfileData(res.data);
  //         setPageLoading(false);
  //       }
  //     })
  //     .catch((err: any) => {
  //       router.push("/non-exited");
  //     });
  // }, [apiCaller, profile, router]);

  return (
    <>
      <Head>
        <title>
          {`Profile of ${profile} in ${address} - Quality Handyman Services`}
        </title>
        <meta
          name="description"
          content={`Looking for a reliable handyman? Discover ${profile} profile in ${address}. Read reviews, learn about its services, and get in touch directly. Your satisfaction is ${profile}s priority!`}
        />{" "}
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/craftsman/${profile}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {false ? (
        <Loader />
      ) : (
        <ChatProvider>
          <div className="bg-mainBackground">
            {!isAuthUserLoading && (
              <header className="Container">
                {userData[0]?.role === "handyman" ? (
                  <NavBar setSlideNav={() => {}} isCheckingProfile={true} />
                ) : (
                  <Header />
                )}
              </header>
            )}
            <div className="Container">
              <CraftsmanProfile profileData={profileData} />
            </div>
            <Footer />
          </div>
        </ChatProvider>
      )}
    </>
  );
}
