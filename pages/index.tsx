import { BlogComponent } from '@/components/site/blog';
import { Contact } from '@/components/site/contact';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { Members } from '@/components/site/members';
import { TestimonialsComponent } from '@/components/site/testimonials';
import {
  ClipboardList,
  Hospital,
  IdCard,
  ScanQrCode,
  ShieldPlus,
  Warehouse,
} from 'lucide-react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Live stock management app for complete monitoring |{' '}
          {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>
      <div className="overflow-x-hidden bg-gray-50">
        <Header />
        <section className="pt-10 overflow-hidden bg-white sm:py-16 lg:pb-20 xl:pb-48">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 lg:mt-8 max-w-7xl">
            <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-16">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl sm:tracking-tight">
                  Revolutionizing livestock management
                </h1>
                <p className="mt-6 text-lg text-gray-700 lg:leading-8 lg:text-xl">
                  Manage different kind of livestocks in your farm in long and
                  short distance following a cycle from birth to sale
                  monitoring;
                </p>

                <ul className="mt-6 space-y-4  text-black">
                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Birth & dead rate
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Animal identification & sale tracking
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Breeding history, farrowing, fecondity & weaning rate
                  </li>

                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Egg harvesting & incubation rate
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Animal Health & vaccination campaignes
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Feeding & feed stock management
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Finances & revenue
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tasks management & technical support
                  </li>
                </ul>
              </div>
              <Image
                width={200}
                height={100}
                className="relative object-cover lg:h-[400px] lg:w-[800px] max-w-xs mx-auto sm:max-w-sm rounded-2xl"
                src="https://diasmalia-buck.s3.eu-central-1.amazonaws.com/undefined/adobestock_835308344_preview.jpeg20241126-ca31.jpeg"
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="py-10 bg-slate-100 sm:py-16 lg:py-10 ">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:mb-20">
            <div className="text-center mb-20">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-4xl font-pj">
                Our Concept & Solution
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
              <div className="mt-8">
                <div className="relative flex items-center justify-center mx-auto">
                  <IdCard className="absolute text-orange-600 w-9 h-9 mb-8" />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                  Animal identification
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Identify your animals using ear tags with generated
                  identification numbers for easy following during production
                  phases anytime and any where
                </p>
              </div>
              <div className="mt-8">
                <div className="relative flex items-center justify-center mx-auto">
                  <ScanQrCode className="absolute text-amber-600 w-9 h-9 mb-8" />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                  Sale tracking
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Monitor and track animals even when sold using a generated
                  QRCode to enable your customers to know where thier products
                  are coming from
                </p>
              </div>
              <div className="mt-8">
                <div className="relative flex items-center justify-center mx-auto">
                  <Hospital className="absolute text-yellow-600 w-9 h-9 mb-8" />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                  Health & vaccination campaignes
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Monitor animals health and sanitary state to ensure well being
                  and anticipate on any unnecessary negative outcome
                </p>
              </div>
              <div className="mt-8">
                <div className="relative flex items-center justify-center mx-auto">
                  <Warehouse className="absolute text-lime-600 w-9 h-9 mb-8" />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                  Feed stock management
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Monitor feed stock according to type and composition to track
                  number of bags in the warehouse and daily animals intake
                </p>
              </div>
              <div className="mt-8">
                <div className="relative flex items-center justify-center mx-auto">
                  <ShieldPlus className="absolute text-green-600 w-9 h-9 mb-8" />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                  Biosecurity & prophylaxy
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Respect biosecurity mesures in your farm to increase
                  performance and avoid unnecessary deseases that may ruin your
                  production
                </p>
              </div>
              <div className="mt-8">
                <div className="relative flex items-center justify-center mx-auto">
                  <ClipboardList className="absolute text-emerald-600 w-9 h-9 mb-8" />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                  Tasks & employees management
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Manage tasks efficiently by assigning generic and specific
                  tasks to your employees and gain from the support of our
                  technicians
                </p>
              </div>
            </div>
          </div>
        </section>
        <TestimonialsComponent />
        <Members />
        <BlogComponent />
        <section className="relative py-12 overflow-hidden bg-black sm:py-16 lg:py-20 xl:py-24">
          <div className="absolute bottom-0 left-0 transform -translate-x-12 lg:translate-x-0 translate-y-96 lg:translate-y-80">
            <svg
              className="blur-3xl filter"
              width="612"
              height="396"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M225.569 296.184c-129.505-34.7-253.236 49.082-218.753-79.613C41.3 87.876 436.205-28.039 565.71 6.662c129.505 34.701-55.432 206.876-89.916 335.571-34.484 128.695-120.721-11.348-250.225-46.049Z"
                fill="url(#c)"
              />
              <defs>
                <linearGradient
                  id="c"
                  x1="623.268"
                  y1="22.085"
                  x2="453.193"
                  y2="459.449"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" />
                  <stop offset="100%" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto space-y-12 text-center lg:space-y-0 lg:flex lg:items-stretch lg:text-left lg:max-w-none lg:mx-0">
              <div className="lg:pr-20 xl:pr-24">
                <h2 className="text-xl font-normal text-white sm:text-2xl lg:text-4xl">
                  Try Diasmalia for 14 days, no credit card required.
                </h2>

                <div className="flex flex-col items-center justify-center mt-8 space-y-5 lg:justify-start sm:flex-row sm:space-y-0 sm:space-x-5 sm:mt-12">
                  <div className="relative inline-flex items-center justify-center group">
                    <div className="absolute transition-all duration-200 rounded-md -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <Link
                      href="/register"
                      className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-md"
                    >
                      Start Free Trial
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r shrink-0 lg:w-px lg:h-auto lg:bg-gradient-to-b from-cyan-500 to-purple-500"></div>

              <div className="text-left lg:pl-24 xl:pl-32">
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-4 text-gray-600 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg font-normal text-white">
                      14+ Premium tailwind UI kits. Start with unlimited product
                      downloads.{' '}
                    </span>
                  </li>

                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-4 text-gray-600 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg font-normal text-white">
                      Get unlimited design inspirations. Level up your design.{' '}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-4 text-gray-600 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg font-normal text-white">
                      Submit your design. Get extra exposure on works to grow
                      fast.{' '}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <Contact />
        <Footer />
      </div>
    </>
  );
}
