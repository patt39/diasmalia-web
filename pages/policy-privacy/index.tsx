import { GetBlogsAPI } from '@/api-site/blog';

import Head from 'next/head';

export function PolicyPrivacy() {
  const { data: dataBlogs } = GetBlogsAPI({
    take: 1,
    sort: 'desc',
    status: 'PUBLIC',
    sortBy: 'createdAt',
    type: 'POLICY_PRIVACY',
  });

  return (
    <>
      <Head>
        <title>Policy & privacy | {process.env.NEXT_PUBLIC_NAME_SITE}</title>
      </Head>
      <div>
        <p className="max-w-6xl mx-auto text-base items-center mt-4">
          {dataBlogs?.pages[0]?.data?.value?.[0]?.description}
        </p>
      </div>
    </>
  );
}
export default PolicyPrivacy;
