import { Empty } from 'antd';

interface Props {
  title: React.ReactNode;
  image?: React.ReactNode;
  description: React.ReactNode;
}

const EmptyData = ({
  title,
  image = Empty.PRESENTED_IMAGE_SIMPLE,
  description,
}: Props) => {
  return (
    <>
      <div className="relative">
        <div className="inset-x-0 top-0 grid place-items-center">
          <Empty
            image={image}
            imageStyle={{ height: 50 }}
            description={
              <>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {title}
                </div>
                <span className="font-medium text-gray-600">{description}</span>
              </>
            }
          ></Empty>
        </div>
      </div>
    </>
  );
};

export { EmptyData };
