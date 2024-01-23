/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
        forceSwcTransforms: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ddragon.leagueoflegends.com',
                port: '',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'raw.communitydragon.org',
                port: '',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '**'
            }
        ]
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig