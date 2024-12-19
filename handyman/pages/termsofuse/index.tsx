import { Header, Footer } from "@/components";
import React from "react";
import Head from "next/head";
export default function TermsOfUse() {
  return (
    <React.Fragment>
      <Head>
        <title>Hyandyman - Terms of use</title>
        <meta name="description" content="Access and use the Handcraft Portal website, agreeing to the Terms of Use. Create a user account for certain features. Post job listings, receive bids, and take responsibility for accurate information. Interact with service providers at your own discretion. Ownership of content and materials belongs to the website. Obtain written consent before modifying, distributing, or selling any information or services." />
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/termsofuse`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="Container space-y-20">
          <Header />
        </div>
        <div className="bg-mainBackground py-20 ">
          <div className="Container pt-10 ">
            <article>
              <section>
                <h1 className="text-3xl font-bold my-3">Terms of <span className="text-orange">Use</span></h1>
                <p className="font-bold my-3 text-xl">1. Acceptance of Terms</p>
                <p className="font-medium text-gray-600">
                  By accessing and using the Handcraft Portal website (the
                  Website), you agree to be bound by these Terms of Use and all
                  applicable laws and regulations. If you do not agree with any
                  of these terms, you are prohibited from using or accessing
                  this Website.
                </p>
              </section>
              <section>
                <h2 className="font-bold my-3 text-xl">2. User Accounts</h2>
                <p className="font-medium text-gray-600">
                  In order to use certain features or services on the Website,
                  you may be required to create a user account. You are
                  responsible for maintaining the confidentiality of your
                  account and password and for restricting access to your
                  computer or device. You agree to accept responsibility for all
                  activities that occur under your account or password.
                </p>
              </section>
              <section>
                <h3 className="font-bold my-3 text-xl">3. Job Postings and Bidding</h3>
                <p className="font-medium text-gray-600">
                  The Website allows users to post job listings and receive bids
                  from service providers. It is your responsibility to provide
                  accurate and complete information in your job postings.
                  Service providers may submit bids based on the information
                  provided. You acknowledge that the Website does not endorse or
                  guarantee the quality, reliability, or suitability of service
                  providers and you are solely responsible for your interactions
                  and transactions with them.
                </p>
              </section>
              <section>
              <h4 className="font-bold my-3 text-xl">4. Intellectual Property</h4>
              <p className="font-medium text-gray-600">
                The content and materials on this Website, including but not
                limited to text, graphics, logos, images, and software, are
                owned by or licensed to the Website. You may not modify, copy,
                distribute, transmit, display, perform, reproduce, publish,
                license, create derivative works from, transfer, or sell any
                information, products, or services obtained from this Website
                without the prior written consent of the Website.
              </p>
              </section>
            </article>
          </div>
        </div>
        <Footer />
      </main>
    </React.Fragment>
  );
}
