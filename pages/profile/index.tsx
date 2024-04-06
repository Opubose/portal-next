/**
 * Profile Page
 *
 * Route: /profile
 *
 */

import { useState, useEffect } from 'react';
import { setCookie } from 'cookies-next';
import ProfileEditView from 'components/profile/ProfileEditView';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Link from 'next/link';
import EmailToast from 'components/EmailToast';
import { GetServerSideProps } from 'next';
import ProfileView from 'components/profile/ProfileView';
import { gqlQueries } from 'src/api';
import { useQuery } from '@tanstack/react-query';
import { GraphQLError } from 'graphql/error';
import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { profileVisited } = ctx.req.cookies;
  return {
    props: {
      profileVisited: profileVisited ?? null,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function ProfilePage({ profileVisited }: { profileVisited: boolean }) {
  const { data: session, status } = useSession({ required: true });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<GraphQLError | null>(null);

  useEffect(() => {
    if (!profileVisited) {
      // set visited cookie to true so that the user is not redirected to the profile page on login anymore
      setCookie('profileVisited', true);
    }
  }, []);

  const [formEditMode, setFormEditMode] = useState(false);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      return await gqlQueries.findProfile({
        where: {
          userId: session?.id || '',
        },
      });
    },
    enabled: status === 'authenticated',
  });

  if (isLoading || status == 'loading') return <Loading />;
  if (error) return <p className="text-gray-100">whoops... {error as any}</p>;
  return (
    <>
      {errors && (
        <ErrorComponent
          errorCode={errors.extensions.code as string}
          errorMessage={errors.message}
        />
      )}
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-[36px] font-semibold text-gray-100">my account</div>
          <div className="m-3">
            <button
              onClick={() => {
                setFormEditMode(!formEditMode);
              }}
              className="bg-none dark:text-white text-black text-2xl hover:scale-105 transition-all ease-in-out hover:shadow-[inset_13rem_0_0_0] hover:shadow-violet-400 duration-[300ms,600ms] w-52 py-2"
            >
              {formEditMode ? 'cancel' : 'edit'}
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse w-full md:w-[50%]">
          <div className="flex flex-col place-items-center">
            <img src="assets/acm/mrpeechi.png" alt="acm mascot" />
            {formEditMode && (
              <button
                type="submit"
                className="bg-purple-600 text-gray-100 font-semibold p-2 rounded-lg"
                form="profile-form"
              >
                save
              </button>
            )}
          </div>
          {formEditMode ? (
            <ProfileEditView
              profile={data!.profile}
              onErrorEncounter={(error) => {
                setErrors(error);
              }}
              onUpdateFormCompleted={() => {
                // TODO: add typed errors, see: check-netid.ts
                // if (error && error.message.includes('[VALIDATION_ERROR]')) {
                //   alert('NetID has already been linked to an account');
                // }
                setOpen(true);
                setFormEditMode(false);
                refetch();
                Router.push('/profile');
              }}
            />
          ) : (
            <ProfileView profile={data!.profile} />
          )}
        </div>
        {formEditMode && (
          <Link href="/auth/signin">
            <span className="bg-gray-600 text-gray-200 font-semibold p-2 rounded-lg cursor-pointer">
              connect another account
            </span>
          </Link>
        )}
      </div>
      <EmailToast open={open} setOpen={setOpen} />
    </>
  );
}
