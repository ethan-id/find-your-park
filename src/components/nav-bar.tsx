'use client';

import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@nextui-org/react';
import {SignInButton, SignedIn, SignedOut, UserButton} from '@clerk/nextjs';

export const NavBar = () => {
    return (
        <Navbar>
            <NavbarContent justify='end'>
                <NavbarBrand>
                    <img
                        className='w-10 h-10'
                        src={'https://g9v4zenpq6.ufs.sh/f/vWKtdZl81f5UrT4qjo6nLMIxt1TywnjPu9HCBD7mA6OqEpXV'}
                        alt={'Tree Emoji'}
                    />
                    <p className='pl-2 font-bold text-xl'>Find Your Park</p>
                </NavbarBrand>
                <SignedOut>
                    <NavbarItem>
                        <SignInButton/>
                    </NavbarItem>
                </SignedOut>
                <SignedIn>
                    <NavbarItem>
                        <UserButton/>
                    </NavbarItem>
                </SignedIn>
            </NavbarContent>
        </Navbar>
    );
};
