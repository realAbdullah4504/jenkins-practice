import React from "react";
import Head from "next/head";
import { NavBarRegistrationForm, RegisterPage } from "@/components";
import {Header} from '@/components';
export default function index() {
  return (
    <React.Fragment>
      <Head>
        <title>Hyandyman - register</title>
        <meta name="description" content="Sign up and register now to unlock the full potential of our handyman platform. Reach local customers, showcase your skills, and expand your business opportunities. Join our community of skilled craftsmen and take your career to new heights. Don't miss out, create your account today!" />
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/register`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="Container">
        {/* <NavBarRegistrationForm/> */}
        <Header/>
      </header>
      <main>
        <div>
            <RegisterPage/>
        </div>
      </main>
    </React.Fragment>
  );
}
