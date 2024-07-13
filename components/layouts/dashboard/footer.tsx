import Link from 'next/link';

const DashboardFooter = () => {
  return (
    <>
      <div className=" gap-4 p-4 md:gap-8 md:p-8 md:mb-2 lg:mb-2">
        <div className="mt-2 border-gray-100">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <Link
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                ></Link>
              </li>
            </ul>

            <p className="mt-8 text-xs text-gray-500 sm:mt-0">
              &copy; {new Date().getFullYear()}.{' '}
              {process.env.NEXT_PUBLIC_NAME_SITE}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { DashboardFooter };
