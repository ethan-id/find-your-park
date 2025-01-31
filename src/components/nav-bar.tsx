'use client';

import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@heroui/react';
import {SignInButton, SignedIn, SignedOut, UserButton, useUser} from '@clerk/nextjs';
import Link from 'next/link';

export const NavBar = () => {
    const {user} = useUser();

    return (
        <Navbar>
            <NavbarContent justify='end'>
                <NavbarBrand>
                    <Link href='/'>
                        <div className='flex items-center gap-3'>
                            <img
                                className='w-10 h-10'
                                src={'https://g9v4zenpq6.ufs.sh/f/vWKtdZl81f5UrT4qjo6nLMIxt1TywnjPu9HCBD7mA6OqEpXV'}
                                alt={'Tree Emoji'}
                            />
                            <p className='font-bold text-xl'>Find Your Park</p>
                        </div>
                    </Link>
                </NavbarBrand>
                <SignedOut>
                    <NavbarItem>
                        <SignInButton />
                    </NavbarItem>
                </SignedOut>
                <SignedIn>
                    <NavbarItem>
                        <Link href={`/${user?.id}`}>My Parks</Link>
                    </NavbarItem>

                    <NavbarItem>
                        <UserButton />
                    </NavbarItem>
                </SignedIn>
            </NavbarContent>
        </Navbar>
    );
};
