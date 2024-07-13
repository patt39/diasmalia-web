import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { PrivateComponent } from '@/components/util/private-component';

export function SitePlan() {
  return (
    <>
      <LayoutDashboard title={'Site-plan'}>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <section className="px-6 py-12 sm:p-12">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="mt-6 text-3xl font-semibold">
                  How do we create success
                </h2>
                <p className="text-sm text-muted-foreground">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis.
                </p>
              </div>

              <ul className="max-w-md mx-auto mt-16 space-y-12">
                <li className="relative flex items-start">
                  <div
                    className="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 h-full"
                    aria-hidden="true"
                  ></div>

                  <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow">
                    <svg
                      className="w-10 h-10 text-fuchsia-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold">
                      Create a free account
                    </h3>
                    <p className="mt-4 text-base text-gray-400">
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit.
                    </p>
                  </div>
                </li>

                <li className="relative flex items-start">
                  <div
                    className="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 h-full"
                    aria-hidden="true"
                  ></div>

                  <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow">
                    <svg
                      className="w-10 h-10 text-fuchsia-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold">
                      Build your website
                    </h3>
                    <p className="mt-4 text-base text-gray-400">
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit.
                    </p>
                  </div>
                </li>

                <li className="relative flex items-start">
                  <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow">
                    <svg
                      className="w-10 h-10 text-fuchsia-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold">Release & launch</h3>
                    <p className="mt-4 text-base text-gray-400">
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </main>
        <DashboardFooter />
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(SitePlan);
