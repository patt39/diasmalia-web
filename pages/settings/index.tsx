import {
  GetAllCountiesAPI,
  GetAllCurrenciesAPI,
  GetOneProfileAPI,
} from '@/api-site/profile';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { AnimalTypeComponent } from '@/components/settings/animal-types';
import { CreateOrUpdateFormGalleryImage } from '@/components/settings/create-or-update-form-gallery-post';
import { DeleteOneUser } from '@/components/settings/delete-one-user';
import { Testimonial } from '@/components/settings/testimonial';
import { UpdateFormPassword } from '@/components/settings/update-form-password';
import { UpdateFormProfile } from '@/components/settings/update-form-profile';
import { UpdateOrganization } from '@/components/settings/update-organization';
import { ButtonInput } from '@/components/ui-setting';
import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PrivateComponent } from '@/components/util/private-component';
import { Fuel, Images, MoveLeftIcon, Tractor, UserPen } from 'lucide-react';
import { useRouter } from 'next/router';

export function Settings() {
  const { t, userStorage } = useInputState();
  const { back } = useRouter();

  const { data: profile } = GetOneProfileAPI({
    profileId: userStorage?.profile?.id,
  });
  const { data: currencies } = GetAllCurrenciesAPI({
    take: 10,
    status: false,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const { data: countries } = GetAllCountiesAPI({
    take: 10,
    status: true,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  return (
    <>
      <LayoutDashboard
        title={`${userStorage?.profile?.firstName} ${userStorage?.profile?.lastName} - Settings`}
      >
        <div>
          <div className="flex min-h-screen w-full flex-col">
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
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <div>
                <div className="mb-8 px-4 mx-auto sm:px-6 md:px-8">
                  <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                </div>
                <Tabs defaultValue="profile">
                  <div className="flex items-center justify-center">
                    <TabsList className="items-center">
                      <TabsTrigger value="profile">
                        <UserPen className="size-4 mr-1" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger value="organization">
                        <Images className="size-4 mr-1" />
                        Entreprise
                      </TabsTrigger>
                      <TabsTrigger value="farms">
                        <Tractor className="size-4 mr-1" />
                        Elevage
                      </TabsTrigger>
                      <TabsTrigger value="Billing">
                        <Fuel className="size-4 mr-1" />
                        Facturation
                      </TabsTrigger>
                      <TabsTrigger value="aves-treatments">
                        Messages
                      </TabsTrigger>
                      <TabsTrigger value="aves-sales">Billing</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="profile">
                    {profile?.id ? (
                      <UpdateFormProfile
                        profile={profile}
                        countries={countries}
                        currencies={currencies}
                      />
                    ) : null}

                    <UpdateFormPassword />
                    {profile?.id ? <Testimonial profile={profile} /> : null}

                    {userStorage?.id ? (
                      <DeleteOneUser user={userStorage} />
                    ) : null}
                  </TabsContent>
                  <TabsContent value="organization">
                    <CreateOrUpdateFormGalleryImage />
                    <UpdateOrganization />
                  </TabsContent>
                  <TabsContent value="farms">
                    <AnimalTypeComponent />
                  </TabsContent>
                  <TabsContent value="animals">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      {/* <TabAnimals /> */}
                    </Card>
                  </TabsContent>
                  <TabsContent value="profile-sales">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      {/* <TabFeedings animalTypeId={animalTypeId} /> */}
                    </Card>
                  </TabsContent>
                  <TabsContent value="aves-feedings">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      {/* <TabAvesFeedings animalTypeId={animalTypeId} /> */}
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </main>
            <DashboardFooter />
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Settings);
