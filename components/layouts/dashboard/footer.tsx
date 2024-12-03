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
                  href="/terms_conditions"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/policy_privacy"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <p className="mt-8 text-xs text-gray-500 sm:mt-0">
              &copy; {new Date().getFullYear()}.{' '}
              <Link href="/">
                {process.env.NEXT_PUBLIC_NAME_SITE}. All rights reserved.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { DashboardFooter };
