import { GetBlogsAPI } from '@/api-site/blog';

import Head from 'next/head';

export function TermsAndConditions() {
  const { data: dataBlogs } = GetBlogsAPI({
    take: 9,
    sort: 'desc',
    status: 'PUBLIC',
    sortBy: 'createdAt',
    type: 'TERM_CONDITIONS',
  });

  return (
    <>
      <Head>
        <title>Terms & conditions | {process.env.NEXT_PUBLIC_NAME_SITE}</title>
      </Head>
      <div>
        <p className="max-w-6xl mx-auto text-base items-center mt-4">
          {dataBlogs?.pages[0]?.data?.value?.[0]?.description}
        </p>
      </div>
    </>
  );
}
export default TermsAndConditions;
