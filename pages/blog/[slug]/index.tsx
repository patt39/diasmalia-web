import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { ViewBlogAPI } from '@/api-site/blog';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput } from '@/components/ui-setting';
import { CardHeader } from '@/components/ui/card';
import { PrivateComponent } from '@/components/util/private-component';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';

export function ViewPrivateBlog() {
  const { t } = useInputState();
  const { query, back } = useRouter();
  const slug = String(query?.slug);
  const { data: viewBlog } = ViewBlogAPI({
    slug: slug,
  });

  return (
    <LayoutDashboard title={`Blog - ${viewBlog?.title}`}>
      <CardHeader>
        <div className="flex items-center">
          <ButtonInput
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              back();
            }}
            icon={<MoveLeftIcon className="size-4" />}
          >
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t.formatMessage({ id: 'UTIL.COME_BACK' })}
            </span>
          </ButtonInput>
        </div>
      </CardHeader>
      <div className="flex min-h-screen w-full flex-col">
        <div className="grid w-full">
          <div className="flex flex-col items-center gap-1 text-center">
            <h4 className="sm:text-xl lg:text-3xl font-bold tracking-tight text-center">
              {viewBlog?.title}
            </h4>
          </div>
        </div>
        <div>
          <p className="max-w-6xl mx-auto text-base items-center mt-4">
            {viewBlog?.description}
          </p>
        </div>
      </div>
      <DashboardFooter />
    </LayoutDashboard>
  );
}
export default PrivateComponent(ViewPrivateBlog);
