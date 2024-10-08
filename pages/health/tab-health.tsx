import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { useInputState } from '@/components/hooks';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  BriefcaseMedical,
  Eye,
  MoreHorizontal,
  ShieldPlus,
  Stethoscope,
} from 'lucide-react';
import { useState } from 'react';
import { CreateHealth } from './create-health';
import { ViewEquipment } from './view-equipment';
import { ViewHygiene } from './view-hygiene';
import { ViewMedication } from './view-medication';

const Health = () => {
  const {
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const { t, isOpen, setIsOpen } = useInputState();
  const [isView, setIsView] = useState(false);
  const [isViewEquipment, setIsViewEquipment] = useState(false);
  const [isViewHygiene, setIsViewHygiene] = useState(false);

  return (
    <>
      <Tabs
        defaultValue={
          dataAssignedTypes?.pages[0]?.data?.value[0].animalType?.name
        }
      >
        {isLoadingAssignedTypes ? (
          <LoadingFile />
        ) : isErrorAssignedTypes ? (
          <ErrorFile description="Error finding data please try again..." />
        ) : Number(dataAssignedTypes?.pages[0]?.data?.total) <= 0 ? (
          ''
        ) : (
          dataAssignedTypes?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item, index) => (
              <>
                <TabsContent value={item?.animalType?.name} key={index}>
                  <Card
                    x-chunk="dashboard-05-chunk-3"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader>
                      <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                          <Button
                            size="sm"
                            className="h-8 gap-1"
                            onClick={() => setIsOpen(true)}
                          >
                            <BriefcaseMedical className="h-3.5 w-3.5  hover:shadow-xxl" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              {t.formatMessage({ id: 'ADD.MEDECINE' })}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <section className="mt-8 mb-20">
                      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
                          <>
                            <div className="relative overflow-hidden transition-allduration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
                              <div className="p-6 lg:px-8 lg:py-8">
                                <div className="flex items-center justify-center space-x-6 mt-4">
                                  <div>
                                    <h2 className="my-8 items-center flex text-xl font-bold text-green-600 h-10">
                                      <BriefcaseMedical className="h-6 w-6 hover:shadow-xxl" />
                                      {t.formatMessage({ id: 'MEDICATION' })}
                                    </h2>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 mt-6 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                        className="ml-40"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="dark:border-gray-800"
                                    >
                                      <DropdownMenuItem
                                        onClick={() => setIsView(true)}
                                      >
                                        <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                                        <span className="ml-2 cursor-pointer hover:text-indigo-600">
                                          {t.formatMessage({
                                            id: 'TABANIMAL.VIEW',
                                          })}
                                        </span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                            <div className="relative overflow-hidden transition-allduration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
                              <div className="p-6 lg:px-8 lg:py-8">
                                <div className="flex items-center justify-center space-x-6 mt-4">
                                  <div>
                                    <h2 className="my-8 text-xl items-center flex font-bold text-blue-600 h-10">
                                      <Stethoscope className="h-6 w-6 hover:shadow-xxl" />
                                      {t.formatMessage({ id: 'EQUIPMENT' })}
                                    </h2>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 mt-6 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                        className="ml-40"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="dark:border-gray-800"
                                    >
                                      <DropdownMenuItem
                                        onClick={() => setIsViewEquipment(true)}
                                      >
                                        <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                                        <span className="ml-2 cursor-pointer hover:text-indigo-600">
                                          {t.formatMessage({
                                            id: 'TABANIMAL.VIEW',
                                          })}
                                        </span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                            <div className="relative overflow-hidden transition-allduration-200 bg-gray-100 rounded-xl hover:bg-gray-200">
                              <div className="p-6 lg:px-8 lg:py-8">
                                <div className="flex items-center justify-center space-x-6 mt-4">
                                  <div>
                                    <h2 className="my-8 items-center flex text-xl font-bold text-primary h-10">
                                      <ShieldPlus className="h-6 w-6 hover:shadow-xxl" />
                                      {t.formatMessage({ id: 'HYGIENE' })}
                                    </h2>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 mt-6 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                        className="ml-40"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="dark:border-gray-800"
                                    >
                                      <DropdownMenuItem
                                        onClick={() => setIsViewHygiene(true)}
                                      >
                                        <Eye className="size-4 text-gray-600 hover:text-indigo-600" />
                                        <span className="ml-2 cursor-pointer hover:text-indigo-600">
                                          {t.formatMessage({
                                            id: 'TABANIMAL.VIEW',
                                          })}
                                        </span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </section>
                  </Card>
                </TabsContent>
              </>
            ))
        )}
        <ViewMedication showModal={isView} setShowModal={setIsView} />
        <ViewEquipment
          showModal={isViewEquipment}
          setShowModal={setIsViewEquipment}
        />
        <ViewHygiene
          showModal={isViewHygiene}
          setShowModal={setIsViewHygiene}
        />
        <CreateHealth showModal={isOpen} setShowModal={setIsOpen} />
      </Tabs>
    </>
  );
};
export { Health };
