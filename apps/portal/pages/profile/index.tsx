/**
 *
 * Profile Page
 *
 * Route: /profile
 *
 */
import { ACMButton } from '@acmutd/acm-ui';
import { useState } from 'react';
import type { ProfileWhereUniqueInput } from '@generated/type-graphql';
import { gql, useMutation, useQuery } from 'urql';
import ProfileField from 'components/ProfileField';
import { Profile } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

export default function ProfilePage() {
  const { data: session, status } = useSession({ required: true });

  const [formEditMode, setFormEditMode] = useState(false);

  const PROFILE_QUERY = gql`
    query Query($where: ProfileWhereUniqueInput!) {
      profile(where: $where) {
        firstName
        lastName
        email
        netid
        classStanding
        major
        utdStudent
      }
    }
  `;

  const [result, reexecuteQuery] = useQuery({
    query: PROFILE_QUERY,
    variables: {
      where: {
        userId: session ? session.id : '',
      },
    },
  });

  const { data, fetching, error } = result;
  if (fetching) return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;

  return (
    <div className="w-screen grid place-items-center gap-2">
      <div className="flex flex-col w-[25%] p-10 place-items-center">
        <div className="text-3xl font-semibold text-gray-100">my account</div>
        <div className="m-3">
          <ACMButton
            theme="dark"
            onClick={() => {
              setFormEditMode(!formEditMode);
            }}
          >
            edit
          </ACMButton>
        </div>
      </div>
      <div className="flex flex-col w-[75%] p-10">
        {formEditMode ? renderFormEdit() : renderFormView(data.profile)}
      </div>
    </div>
  );
}

function renderFormView(profile: Profile): JSX.Element {
  if (!profile) return <p className="text-gray-100">profile not set up yet</p>;
  return (
    // view mode
    <div className="flex w-1/2 flex-wrap mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <ProfileField label="first name" text={profile.firstName.toLowerCase()} />
      </div>
      <div className="w-full md:w-1/2 px-3">
        <ProfileField label="last name" text={profile.lastName.toLowerCase()} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="email" text={profile.email.toLowerCase()} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="netid" text={profile.netid.toLowerCase()} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="class standing" text={profile.classStanding.toLowerCase()} />
      </div>
      <div className="w-full px-3">
        <ProfileField label="major" text={profile.major.toLowerCase()} />
      </div>
    </div>
  );
}

function renderFormEdit(): JSX.Element {
  const UPDATE_PROFILE = gql`
    mutation UpsertProfile(
      $where: ProfileWhereUniqueInput!
      $create: ProfileCreateInput!
      $update: ProfileUpdateInput!
    ) {
      upsertProfile(where: $where, create: $create, update: $update) {
        firstName
        lastName
        email
        netid
        classStanding
        major
        utdStudent
      }
    }
  `;
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const { data: session } = useSession();
  // const [_, updateProfile] = useMutation<any, UpsertProfileArgs>(UPDATE_PROFILE);

  return (
    <>
      <div className=" flex flex-col ">
        <form
          className="w-full max-w-lg"
          // onSubmit={handleSubmit((vals) => {
          //   updateProfile({
          //     where: {
          //       userId: session.id as string,
          //     },
          //     create: {
          //       user: {
          //         connect: {
          //           id: session.id as string,
          //         },
          //       },
          //       firstName: vals.firstName,
          //       lastName: vals.lastName,
          //       email: session.user.email,
          //       netid: vals.netid,
          //       classStanding: vals.classStanding,
          //       major: vals.major,
          //       utdStudent: vals.utdStudent,
          //       membershipStatus: false,
          //       resume: false,
          //     },
          //     update: {
          //       firstName: {
          //         set: vals.firstName,
          //       },
          //       lastName: {
          //         set: vals.lastName,
          //       },
          //       netid: {
          //         set: vals.netid,
          //       },
          //       classStanding: {
          //         set: vals.classStanding,
          //       },
          //       major: {
          //         set: vals.major,
          //       },
          //       utdStudent: {
          //         set: vals.utdStudent,
          //       },
          //     },
          //   }).then(() => {
          //     Router.push('/');
          //   });
          // })}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 font-semibold mb-2">first name</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 font-semibold mb-2">last name</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block text-gray-700 font-semibold mb-2">email</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="temoc@utdallas.edu"
              />
            </div>

            <div className="w-full px-3">
              <label className="block text-gray-700 font-semibold mb-2">netID</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="SWG120200"
              />
            </div>
            <div className="w-full px-3">
              <label className="block text-gray-700 font-semibold mb-2">class standing</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="freshman"
              />
            </div>
            <div className="w-full px-3">
              <label className="block text-gray-700 font-semibold mb-2">major</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="computer science"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span className="text-sm">utd student</span>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
