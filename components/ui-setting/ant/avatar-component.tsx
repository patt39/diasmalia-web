import { cn } from '@/lib/utils';
import { oneImageToURL } from '@/utils';
import { capitalizeOneFirstLetter } from '@/utils/utils';
import { Avatar } from 'antd';
import { ScreenSizeMap } from 'antd/es/_util/responsiveObserver';

interface Props {
  profile: any;
  size?: number | ScreenSizeMap;
  className?: string;
}

export function AvatarComponent(props: Props) {
  const { profile, size, className } = props;
  return (
    <>
      {/* <Link href={`/${profile?.username}`}> */}
      <div className="relative sm:flex sm:items-center">
        <div className="relative inline-flex shrink-0">
          {profile?.image && (
            <>
              <Avatar
                className={cn(
                  `bg- object-cover${profile?.color}-600 rounded-full`,
                  className,
                )}
                size={size}
                src={oneImageToURL(profile?.image)}
                alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
              />
            </>
          )}

          {!profile?.image && (
            <>
              <Avatar
                className={cn(`rounded-full object-cover`, className)}
                size={size}
                alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
                src={`https://ui-avatars.com/api/?name=${capitalizeOneFirstLetter(
                  String(profile?.firstName ?? ''),
                  String(profile?.lastName ?? ''),
                )}&color=7F9CF5&background=EBF4FF`}
              />
            </>
          )}

          {/* <div className="absolute bottom-0 right-0">
            <div
              className={`inline-flex items-center justify-center size-2 text-white bg-indigo-600 rounded-full ring-2 ring-white`}
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div> */}
        </div>
      </div>

      {/* </Link> */}
    </>
  );
}
