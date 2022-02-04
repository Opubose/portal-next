import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// const TEST = gql`
//   query Users {
//     users {
//       email
//     }
//   }
// `;

const PROFILE_CHECK = gql`
  query Users($filter: UserFilter) {
    users(filter: $filter) {
      hasProfile
    }
  }
`;

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const { loading, error, data } = useQuery(PROFILE_CHECK, {
    variables: {
      filter: {
        _id: session.id,
      },
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!session) return <div />;
  if (data.users === [] || !data.users[0].hasProfile) router.push('/profile/update');

  return (
    <div>
      <h1 className="text-lg">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg">Email: {session.user?.email}</h1>
      <div className="flex gap-x-3">
        <button type="button" className="p-3 rounded-lg bg-green-400" onClick={() => signOut()}>
          Sign out
        </button>
        <Link href="/auth/signin">
          <button type="button" className="p-3 rounded-lg bg-green-400">
            Add another account
          </button>
        </Link>
      </div>
    </div>
  );
}
