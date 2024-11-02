import { LayoutDashboard } from '@/components/layouts/dashboard';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';

import { PrivateComponent } from '@/components/util/private-component';
import { useIntl } from 'react-intl';

export function Billing() {
  const t = useIntl();

  return (
    <>
      <LayoutDashboard title={'Billing'}>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-bold tracking-tight text-center sm:text-4xl lg:text-4xl">
                Pricing & Plans
              </h2>
              <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-8 sm:mt-16 sm:grid-cols-2">
              <div className="bg-white border-4 border-transparent rounded-md">
                <div className="p-6 md:py-10 md:px-9">
                  <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Standard
                    </h3>
                  </div>
                  <p className="mt-5 text-2xl font-bold text-black">$29</p>
                  <p className="mt-2 text-base text-gray-600">Per month</p>

                  <ul className="flex flex-col mt-8 space-y-4">
                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-900">
                        1 Domain License
                      </span>
                      <svg
                        className="w-4 h-4 ml-0.5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </li>

                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-900">
                        Full Celebration Library
                      </span>
                    </li>

                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-900">
                        120+ Coded Blocks
                      </span>
                    </li>

                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-400">
                        Design Files Included
                      </span>
                    </li>

                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-400">
                        Premium Support
                      </span>
                    </li>
                  </ul>
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-gray-800 rounded-md hover:bg-gray-600 focus:bg-gray-600"
                    role="button"
                  >
                    Get 14 Days Free Trial
                  </a>
                  <p className="mt-5 text-sm text-gray-500">
                    No Credit Card Required
                  </p>
                </div>
              </div>

              <div className="bg-white border-4 border-blue-600 rounded-md">
                <div className="p-6 md:py-10 md:px-9">
                  <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
                    <h3 className="text-sm font-semibold text-blue-600">
                      Premium
                    </h3>
                  </div>
                  <p className="mt-5 text-2xl font-bold text-black">$49</p>
                  <p className="mt-2 text-base text-gray-600">Per month</p>

                  <ul className="flex flex-col mt-8 space-y-4">
                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-900">
                        Unlimited Domain License
                      </span>
                      <svg
                        className="w-4 h-4 ml-0.5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </li>

                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-900">
                        Full Celebration Library
                      </span>
                    </li>

                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-900">
                        120+ Coded Blocks
                      </span>
                    </li>

                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-900">
                        Design Files Included
                      </span>
                    </li>

                    <li className="inline-flex items-center space-x-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="text-base font-medium text-gray-900">
                        Premium Support
                      </span>
                    </li>
                  </ul>

                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                    role="button"
                  >
                    Get 14 Days Free Trial
                  </a>

                  <p className="mt-5 text-sm text-gray-500">
                    No Credit Card Required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <DashboardFooter />
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Billing);
