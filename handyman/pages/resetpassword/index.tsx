"use client";

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  // navigate
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [isResettingPassword, setIsResettingPassword] =
    useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email || !formData.oldPassword || !formData.newPassword) {
      toast.error("All fields is required");
    }

    try {
      setIsResettingPassword(true);

      const resetPasswordResponse = await axios.post(
        "/api/reset-password",
        formData
      );

      if (resetPasswordResponse.status === 200) {
        setIsResettingPassword(false);
        toast.success(resetPasswordResponse.data.message);
        setFormData({
          email: "",
          oldPassword: "",
          newPassword: "",
        });
        router.push("/");
      }
    } catch (error: any) {
      setIsResettingPassword(false);
      if (
        error.response.status === 401 ||
        error.response.status === 500 ||
        error.response.status === 400
      ) {
        toast.error(error.response.data.message);
        setFormData({
          email: "",
          oldPassword: "",
          newPassword: "",
        });
      } else {
        toast.error("Something went wrong! Try again");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta
          name="description"
          content="Forget your password ? Don't worry reset your password on the go and retreive your password via email"
        />
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-8 md:py-12 lg:py-16 xl:py-20">
        <section className="flex flex-col gap-5 md:gap-8 lg:gap-10 2xl:gap-12 justify-center items-center max-w-xs md:max-w-sm lg:max-w-md 2xl:max-w-lg h-[70vh] mx-auto">
          <h3 className="text-base md:text-lg lg:text-xl 2xl:text-2xl text-center font-semibold">
            Handyman
          </h3>
          <form
            onSubmit={handleFormSubmit}
            className="w-full flex flex-col justify-center items-stretch gap-5"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs md:text-sm 2xl:text-base pl-1 text-gray-600">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="w-full border-[1.5px] border-gray-400 rounded-lg h-12 px-4"
                placeholder="Email"
                value={formData.email ? formData.email : ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs md:text-sm 2xl:text-base pl-1 text-gray-600">
                Old password
              </span>
              <input
                type="password"
                name="oldPassword"
                className="w-full border-[1.5px] border-gray-400 rounded-lg h-12 px-4"
                placeholder="Old password"
                value={formData.oldPassword ? formData.oldPassword : ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs md:text-sm 2xl:text-base pl-1 text-gray-600">
                New password
              </span>
              <input
                type="password"
                name="newPassword"
                className="w-full border-[1.5px] border-gray-400 rounded-lg h-12 px-4"
                placeholder="New password"
                value={formData.newPassword ? formData.newPassword : ""}
                onChange={handleInputChange}
              />
            </div>

            {/* submit */}
            <button
              className="w-fit px-5 py-2 border border-orange hover:border-transparent hover:bg-orange transition duration-200 ease-in hover:text-white rounded-md font-medium disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent disabled:cursor-not-allowed"
              disabled={isResettingPassword}
            >
              {isResettingPassword ? "Loading..." : "Submit"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
