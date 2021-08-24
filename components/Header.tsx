// Header.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className={`font-bold text-black inline-block mr-4 ${isActive('/') ? 'text-gray-500' : ''}`} data-active={isActive('/')}>
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (loading) {
    left = (
      <div className="left">
        <Link href="/">
          <a className={`font-bold text-black inline-block mr-4 ${isActive('/') ? 'text-gray-500' : ''}`} data-active={isActive('/')}>
            Feed
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="ml-auto">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link href="/api/auth/signin">
          <a className="border border-black py-2 px-4 rounded-sm text-sm text-black inline-block" data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className={`font-bold inline-block text-black mr-4 ${isActive('/') ? 'text-gray-500' : ''}`}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a className={`inline-block text-black ${isActive('/drafts') ? 'text-gray-500' : ''}`}>My drafts</a>
        </Link>
      </div>
    );
    right = (
      <div className="ml-auto">
        <p className="inline-block pr-4 text-xs">
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <a className="border border-black text-sm py-2 px-4 rounded text-black inline-block mr-4">New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a className="border border-black text-sm py-2 px-4 rounded text-black inline-block">Log out</a>
        </button>
      </div>
    );
  }

  return (
    <nav className="flex p-8 items-center">
      {left}
      {right}
    </nav>
  );
};

export default Header;