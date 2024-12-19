import {Footer,Steps,Craftsman,HowItsWork,Header} from '@/components';
import React from 'react';
import Head from 'next/head';
export default function How__its_work() {
  return (
    <React.Fragment>
      <Head>
        <title>Find and Hire Skilled Handymen | Easy Steps to Complete Your Project</title>
        <meta name="description" content="Discover how our platform simplifies the process of finding and hiring skilled handymen for your projects. Follow the easy steps of creating a job listing, receiving bids, and selecting the perfect handyman. Get your project executed efficiently with qualified professionals. Start your journey towards successful project completion today!" /> {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/howitworks`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='Container space-y-20'>
            <Header/>
        </div>
        <div className='bg-mainBackground'>
          <div className='Container px-5 py-3 pt-10'>
            <Steps isShowHeadingText={false}/>
            <HowItsWork/>
          </div>
          <Craftsman/>
        </div>
        <Footer/>
      </main>
    </React.Fragment>
  )
}
