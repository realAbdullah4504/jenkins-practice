/* eslint-disable @next/next/no-img-element */
import Craftsman from "@/backend/models/CrafstmanModel";
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";
import { AdminDashBoard } from "@/components/Dashboard";
import CompareDocs from "@/components/Dashboard/admin/HandymanVerification/components/compareDocs";
import VerificationCard from "@/components/Dashboard/admin/HandymanVerification/components/verificationCard";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { craftsman_verification } = params;

  try {
    // Assuming Craftsman.findOne returns a Promise
    const result = await Craftsman.findOne({
      company_name: craftsman_verification,
    })
      .populate({
        path: "user",
        model: userDb,
        populate: {
          path: "address",
          model: PostalCode,
          select: "Place_Name",
        },
      })
      .exec();

    if (result) {
      return {
        props: {
          data: JSON.parse(JSON.stringify(result)), // Convert Mongoose document to JSON
          craftsman_verification,
        },
      };
    } else {
      // Data not found, redirect to error page
      return {
        redirect: {
          destination: "/not_found", // Error page path
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      redirect: {
        destination: "/not_found", // Error page path
        permanent: false,
      },
    };
  }
}

const supportedExtensions = ["jpg", "jpeg", "png", "gif", "pdf"];
const getFileExtension = (url: string = ""): string | "" => {
  const extension = url.split(".").pop()?.toLowerCase() || "";
  return supportedExtensions.includes(extension) ? extension : "";
};

export default function CraftsmanVerificationDetails({
  data,
  craftsman_verification,
}: {
  data: any;
  craftsman_verification: string;
}) {
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState<number>(0);
  // const [isCompare, setIsCompare] = useState(false);
  const documentUrls = data?.documents || [];

  const handleNext = () => {
    if (currentDocumentIndex < documentUrls.length - 1) {
      setCurrentDocumentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentDocumentIndex > 0) {
      setCurrentDocumentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentDocumentUrl: any = documentUrls[currentDocumentIndex];
  const fileExtension = getFileExtension(currentDocumentUrl?.document_link);
  return (
    <React.Fragment>
      <Head>
        <title>Handyman Verification | Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/handymanverification/${craftsman_verification}`}
        />
      </Head>
      <AdminDashBoard>
        <main>
          <div className="max-w-[700px]">
            <VerificationCard
              name={""}
              time={data?.createdAt}
              isViewing={true}
              message={data.message}
              documents={[]}
              user={data.user}
              status={data.status}
            />
          </div>

          <div className="Container flex gap-2">
            <div className="bg-white p-4 mt-10">
              <p className="text-semibold py-2 ">
                Document Name:{" "}
                <Link
                  href={currentDocumentUrl.document_link}
                  target="_blank"
                  className=" text-blue-500 capitalize "
                >
                  {currentDocumentUrl.document_type.split("_").join(" ")}
                </Link>
              </p>
              <div className="w-full h-full flex flex-col justify-center items-center">
                {fileExtension === "pdf" ? (
                  <iframe
                    title="Document Viewer"
                    src={currentDocumentUrl.document_link}
                    width="100%"
                    height="80%"
                    className="border-none mb-4"
                  />
                ) : (
                  <img
                    src={currentDocumentUrl.document_link}
                    alt="Document Viewer"
                    className="w-full h-96 mb-4"
                  />
                )}
                <div className="flex justify-between w-full">
                  <button
                    onClick={handlePrev}
                    className=" globalbtn text-white "
                    disabled={currentDocumentIndex === 0}
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleNext}
                    className=" globalbtn text-white "
                    disabled={currentDocumentIndex === documentUrls.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <CompareDocs data={data.user} company_name={data.company_name} />
          </div>
        </main>
      </AdminDashBoard>
    </React.Fragment>
  );
}
