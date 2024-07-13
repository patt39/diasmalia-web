import { Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';

interface Props {
  status?: ResultStatusType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

const ErrorFile: React.FC<Props> = ({
  status = '404',
  title,
  description,
  className = 'relative mx-auto justify-center',
}) => {
  return (
    <>
      <div className={className}>
        <div className="inset-x-0 top-0 grid place-items-center">
          <Result
            status={status}
            title={
              <p className="text-8xl font-bold dark:text-white">{title}</p>
            }
            subTitle={
              <>
                <div className="mx-auto max-w-xl text-center">
                  {/* <Link href={'/'}>
                    <ButtonInput size="default" variant="primary" type="button">
                      Back To Home
                    </ButtonInput>
                  </Link> */}
                  <ul className="mt-2 flex items-center justify-center space-x-6 sm:space-x-8">
                    <li className="flex items-center">
                      <span className="text-xl font-bold dark:text-gray-500">
                        {description}
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            }
          />
        </div>
      </div>
    </>
  );
};

export { ErrorFile };
