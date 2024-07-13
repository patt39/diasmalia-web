import { cn } from '@/lib/utils';
import { LockKeyholeIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { ButtonInput } from './button-input';

interface Props {
  profile: { color: string; username: string };
}

export const WhoCanSeeItem = ({ profile }: Props) => {
  const { push } = useRouter();

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <button className="font-bold">
            <LockKeyholeIcon className="size-10" />
          </button>
          {/* <p className="text-sm font-bold text-white">
            {' '}
            This post is for members only.{' '}
          </p> */}

          {/* <RedirectToMembershipsButton username={profile?.username} /> */}
        </div>
      </div>
    </>
  );
};

export function RedirectToMembershipsButton(props: {
  className?: string;
  username: string;
}) {
  const { className, username } = props;
  const { push } = useRouter();

  return (
    <>
      <ButtonInput
        onClick={() => push(`/${username}/memberships`)}
        className={cn('mt-2', className)}
        type="button"
        variant="default"
        size="lg"
        icon={<LockKeyholeIcon className="mr-2 size-6" />}
      >
        Become a member
      </ButtonInput>
    </>
  );
}
