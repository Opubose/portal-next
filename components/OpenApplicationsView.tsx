import { GetApplicationDataQuery } from 'lib/generated/graphql';
import ApplicationCard from './typeformApplicationSystem/ApplicationCard';
import Button from './Button';
import Link from 'next/link';

interface OpenApplicationsViewProps {
  applications: GetApplicationDataQuery['returnAllOpenApp'];
  typeformApplications: GetApplicationDataQuery['typeformApplications'];
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    major: string;
    netid: string;
    classStanding: string;
  };
}

export default function OpenApplicationsView({
  applications,
  typeformApplications,
}: OpenApplicationsViewProps) {
  return typeformApplications.length !== 0 || applications.length !== 0 ? (
    <div className="w-full flex flex-col items-center lg:flex-row flex-wrap gap-[30px]">
      {typeformApplications.map(
        ({ id, typeformName, description, externalResourceUrl, division, endpoint }) => (
          <ApplicationCard
            key={id}
            title={typeformName}
            description={description}
            buttons={[
              <div className="text-center cursor-pointer transition-all duration-75 w-fit bg-gradient-to-r from-pink-700 to-purple-700 hover:opacity-80 text-white font-Gilroy font-bold py-2 px-8">
                <Link href={`/typeform/${endpoint}`} passHref>
                  <a target="_blank">apply</a>
                </Link>
              </div>,
              // exclude 'learn more' button when external url is blank
              ...(externalResourceUrl && externalResourceUrl !== ''
                ? [
                    <Link href={externalResourceUrl} target="_blank">
                      <Button color="secondary">learn more</Button>
                    </Link>,
                  ]
                : []),
            ]}
            division={division}
          />
        ),
      )}
      {applications.map(({ id, name, externalResourceUrl, division, description }) => (
        <ApplicationCard
          buttons={[
            ...[
              <Link href={`/opportunities/${id}`}>
                <Button>apply</Button>
              </Link>,
            ],
            ...(externalResourceUrl && externalResourceUrl !== ''
              ? [
                  <Link href={externalResourceUrl} target="_blank">
                    <Button color="secondary">learn more</Button>
                  </Link>,
                ]
              : []),
          ]}
          key={id}
          title={name}
          description={description}
          division={division!.deptName}
        />
      ))}
    </div>
  ) : (
    <h3 className="px-4 text-xl text-left text-white mb-4">No applications found</h3>
  );
}
