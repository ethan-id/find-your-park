import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '**',
                search: ''
            },
            {
                protocol: 'https',
                hostname: 'www.nps.gov',
                port: '',
                pathname: '**',
                search: ''
            },
            {
                protocol: 'https',
                hostname: 'g9v4zenpq6.ufs.sh',
                port: '',
                pathname: '**',
                search: ''
            }
        ]
    }
};

export default nextConfig;
