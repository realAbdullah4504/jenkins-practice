import { Header, Footer } from "@/components";
import React from "react";
import Head from "next/head";
export default function Impressum() {
  return (
    <React.Fragment>
      <Head>
        <title>Contact and Information - Max Mustermann Handcraft Portal</title>
        <meta name="description" content="Get in touch with Max Mustermann Handcraft Portal for all your inquiries and information needs. Find contact details, including phone and email, along with important details such as the owner's name and tax identification number. Stay informed and connected with our reliable handcraft portal" />{" "}
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/impressum`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="Container space-y-20">
          <Header />
        </div>
        <div className="bg-mainBackground pt-20 h-screen flex justify-center items-center">
          <div className="Container pt-10">
            <div className="bg-white py-5 rounded-md w-full lg:w-1/2 mx-auto">
              <section className="mx-10">
                <h1 className="text-3xl font-bold my-3">Impressum</h1>
                <div className="ml-2">
                  <p>Information according to § 5 TMG:</p>
                  <p>Max Mustermann Handcraft Portal</p>
                  <p>Sample Street 123</p>
                  <p>12345 Sample City</p>
                  <p className="font-bold my-2">Contact:</p>
                  <p>Phone: 01234/56789</p>
                  <p>Email: info@handcraftportal.com</p>
                  <p>Represented by:</p>
                  <p>Max Mustermann (Owner)</p>
                  <p className="font-bold my-2">Tax ID:</p>
                  <p>
                    Tax Identification Number according to §27a Value Added Tax
                    Act: DE123456789
                  </p>
                  <p>Supervisory Authority:</p>
                </div>
              </section>
              {/* Insert the information about the supervisory authority here */}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </React.Fragment>
  );
}
