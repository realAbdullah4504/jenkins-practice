"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";

const VerifyEmail = () => {
  const router = useRouter();
  const queryData = router.query;

  useEffect(() => {
    (async () => {
      try {
        const objectLength = Object.entries(queryData).length;
        console.log(objectLength, "object length");

        console.log(queryData, "router");
        if (objectLength !== 0) {
          const responseOfVerification = await axios.post("/api/verify_email", {
            queryData,
          });
          if (
            responseOfVerification.status === 200 &&
            responseOfVerification.data.matched
          ) {
            router.push("/dashboard/client");
          } else {
            router.push("/");
          }
          console.log(responseOfVerification, "response of verification");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [queryData]);

  return (
    <div className=" flex justify-center items-center w-full h-[60dvh]">
      <FadeLoader color="#000" />
    </div>
  );
};

export default VerifyEmail;
