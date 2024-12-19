import {Header,Footer,Services,Steps,NewListedOrder,Craftsman,RegisterNowForFree,HeroSearchAndText} from '@/components';
import React from 'react';
import Head from 'next/head';
export default function PostJOB() {
  return (
    <React.Fragment>
      <Head>
        <title>Post Job for Craftsman Work</title>
        <meta name="description" content="Looking to hire skilled craftsmen for your projects? Post your job on our platform and connect with talented professionals. Get quality workmanship for your craft-related tasks. Start your search for reliable craftsmen today!" /> {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/postjob`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='Container space-y-20'>
            <Header/>
            <HeroSearchAndText homePageOrNOt={false}/>
        </div>
        <div className='bg-mainBackground mt-36'>
          <div className='Container px-5 py-3 lg:my-10'>
            <Services/>
            <Steps isShowHeadingText={true}/>
          </div>
          <Craftsman/>
        </div>
        <Footer/>
      </main>
    </React.Fragment>
  )
}
