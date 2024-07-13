import { LayoutDashboard } from '@/components/layouts/dashboard';

import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PrivateComponent } from '@/components/util/private-component';
import Link from 'next/link';

export function Faq() {
  return (
    <>
      <LayoutDashboard title={'Faq'}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-col items-center gap-1 text-center">
            <h4 className="mt-8 text-2xl font-bold tracking-tight text-center">
              FAQ (Frequently asked questions)
            </h4>
            <p className="text-sm text-muted-foreground">
              Ask everything you need to know about our products and services.
            </p>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className=" mx-auto mt-8 text-center">
              <div className="px-6 py-12 sm:p-12">
                <div className="max-w-sm mx-auto">
                  <h3 className="mt-6 text-2xl font-semibold">
                    Still have questions?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cant find the answer youre looking for? Please chat with our
                    friendly team.
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/activity-logs`}
                      title=""
                      className="inline-flex items-center justify-center px-6 py-3 text-base font-light text-white bg-slate-400 rounded-full"
                      role="button"
                    >
                      Write us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Faq);
