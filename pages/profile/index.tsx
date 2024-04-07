/**
 * Profile Page
 *
 * Route: /profile
 *
 */

import ACMButton from '../../components/PortalButton';
import { useState, useEffect } from 'react';
import { setCookies } from 'cookies-next';
import ProfileEditView from 'components/profile/ProfileEditView';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Link from 'next/link';
import EmailToast from 'components/EmailToast';
import { GetServerSideProps } from 'next';
import ProfileView from 'components/profile/ProfileView';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import { GraphQLError } from 'graphql/error';
import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading';
import CameraIcon from '../../icons/CameraIcon';

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
      setCookies('profileVisited', true);
    }
  }, []);

  const [formEditMode, setFormEditMode] = useState(false);
  const { data, error, isLoading, refetch } = useQuery(
    ['profileData'],
    () =>
      gqlQueries.findProfile({
        where: {
          userId: session?.id || '',
        },
      }),
    { enabled: status === 'authenticated' },
  );

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
          <div className="m-3 border border-2">
            <ACMButton
              theme="dark"
              onClick={() => {
                setFormEditMode(!formEditMode);
              }}
            >
              {formEditMode
                ? 'cancel'
                : `${data && data.profile && data.profile.firstName ? 'edit' : 'setup profile'}`}
            </ACMButton>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse w-full md:w-[50%]">
          <div className="flex flex-col place-items-center">
            <img
              src="assets/acm/mrpeechi.png"
              alt="acm mascot"
              className={`${formEditMode ? 'hidden' : ''} md:block`}
            />
            <div className="border border-2 my-2">
              <Link href="/resume">
                <ACMButton theme="dark">
                  Resume
                  <div className="pt-2 flex justify-center text-white">
                    <CameraIcon fill={'#fff'} />
                  </div>
                </ACMButton>
              </Link>
            </div>
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
      <EmailToast open={open} setOpen={setOpen}></EmailToast>
    </>
  );
}
