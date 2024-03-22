const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
        forceSwcTransforms: true,
    },
    images: {
        unoptimized: true,
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
                hostname: 'cdn.communitydragon.org',
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

module.exports = withBundleAnalyzer(nextConfig)