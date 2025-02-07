import {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import {Providers} from '@/components/providers';
import {ClerkProvider} from '@clerk/nextjs';
import {Analytics} from '@vercel/analytics/react';
import './globals.css';
import {NavBar} from '@/components/nav-bar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Find Your Park | Explore National Parks Near You',
    description:
        'Discover the best national parks near you with detailed information on locations, activities, and campgrounds. Plan your next adventure today!',
    keywords: [
        'national parks',
        'find a park',
        'hiking',
        'camping',
        'nature',
        'outdoors',
        'wildlife',
        'adventure',
        'travel',
        'explore',
        'park finder',
        'travel',
        'exploration',
        'park',
        'forest'
    ],
    authors: [{name: 'Ethan Hancock', url: 'https://ethanhancock.org'}],
    robots: 'index, follow',
    openGraph: {
        title: 'Find Your Park | Explore National Parks Near You',
        description:
            'Discover the best national parks near you with detailed information on locations, activities, and campgrounds. Plan your next adventure today!',
        url: 'https://find-your-park.com',
        siteName: 'Find Your Park',
        images: [
            {
                url: 'https://utfs.io/f/vWKtdZl81f5UrT4qjo6nLMIxt1TywnjPu9HCBD7mA6OqEpXV',
                width: 1200,
                height: 630,
                alt: 'Find Your Park - Explore National Parks'
            }
        ],
        type: 'website',
        locale: 'en_US'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <NavBar />
                    <Providers>{children}</Providers>
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}
