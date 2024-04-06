import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Background from './Background';
import ACMDesktopNavbar from './PortalNavbar';
import ACMMobileNavbar, { MobileNavPlaceholder } from './PortalMobileNavbar';
import ACMDesktopNavbarItem from './PortalNavbarItem';
import ACMMobileNavbarItem from './PortalMobileNavbarItem';
import WhiteACMLogo from '../public/assets/acm/logo_white.svg';

import EventIcon from '../icons/EventIcon';
import ProfileIcon from '../icons/ProfileIcon';
import ApplyIcon from '../icons/ApplyIcon';
import CameraIcon from '../icons/CameraIcon';
import { useSession } from 'next-auth/react';
import HomeIcon from '../icons/HomeIcon';
import SignOutIcon from '../icons/SignOutIcon';
import AdminIcon from 'icons/AdminIcon';
import { gqlQueries } from 'src/api';
import { useQuery } from '@tanstack/react-query';
import { OfficerStatusContext } from './context/OfficerStatus';

const navBarPages = [
  {
    uri: '/',
    name: 'home',
    svg: HomeIcon,
  },
  {
    uri: '/events',
    name: 'events',
    svg: EventIcon,
  },
  {
    uri: '/opportunities',
    name: 'apply',
    svg: ApplyIcon,
  },
  {
    uri: '/profile',
    name: 'profile',
    svg: ProfileIcon,
  },
  {
    uri: '/resume',
    name: 'resume',
    svg: CameraIcon,
  },
  {
    uri: '/auth/signout',
    name: 'sign out',
    svg: SignOutIcon,
  },
];

const officerOnlyPages = [
  ...navBarPages,
  {
    uri: '/admin',
    name: 'admin',
    svg: AdminIcon,
  },
];

type Props = {
  children: React.ReactNode;
};

const Skeleton = ({ children }: Props) => {
  const mobile = useMediaQuery({ maxWidth: 900 });
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data: officerStatusData, isLoading } = useQuery({
    queryKey: ['officerStatus'],
    queryFn: () => gqlQueries.getOfficerStatus(),
    enabled: status === 'authenticated',
  });
  if (isLoading || status === 'loading') return <></>;

  if (!session)
    return (
      <>
        <Background splotches={3} />
        <div className="h-screen w-screen overflow-x-hidden flex">
          <div className="w-full relative">{children}</div>
        </div>
      </>
    );

  // Examples:
  // /profile -> /profile
  // /profile/* -> /profile
  // /opportunities -> /opportunities
  // /opportunities/* -> /opportunities
  function mostMatchingNavBarPath(path: string): string | undefined {
    if (path === '/' || path === '/auth/signout') return path;
    const split = path.split('/');
    if (split.length < 2) return undefined;
    return `/${split[1]}`; // for example /opportunities/admin -> /opportunities
  }

  return (
    <>
      <OfficerStatusContext.Provider
        value={{
          isDirector: !!officerStatusData?.me.isDirector,
          isOfficer: !!officerStatusData?.me.isOfficer,
        }}
      >
        <Background splotches={3} />
        <div className="h-screen w-screen overflow-x-hidden flex">
          {!mobile && (
            <ACMDesktopNavbar>
              <ACMDesktopNavbarItem isLogo href="/">
                <Image src={WhiteACMLogo} alt="ACM Logo" />
              </ACMDesktopNavbarItem>
              {(officerStatusData?.me.isOfficer ? officerOnlyPages : navBarPages).map((page) => (
                <ACMDesktopNavbarItem
                  $active={page.uri === mostMatchingNavBarPath(router.asPath)}
                  key={page.uri}
                  href={page.uri}
                >
                  {page.name}
                </ACMDesktopNavbarItem>
              ))}
            </ACMDesktopNavbar>
          )}
          <div className="w-full h-full">
            <div className="w-full relative">{children}</div>
            {mobile && (
              <div id="portal-navbar-mobile">
                <MobileNavPlaceholder />
                <ACMMobileNavbar>
                  {(officerStatusData?.me.isOfficer ? officerOnlyPages : navBarPages).map(
                    (page) => {
                      const active = mostMatchingNavBarPath(router.asPath) === page.uri;
                      return (
                        <ACMMobileNavbarItem $active={active} href={page.uri} key={page.uri}>
                          {page.svg && <page.svg fill={active ? '#fff' : '#000'} />}
                          <span className="text-center whitespace-nowrap">{page.name}</span>
                        </ACMMobileNavbarItem>
                      );
                    },
                  )}
                </ACMMobileNavbar>
              </div>
            )}
          </div>
        </div>
      </OfficerStatusContext.Provider>
    </>
  );
};

export default Skeleton;
