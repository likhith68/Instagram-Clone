/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = {
    nextConfig,
    images: {
        domains: ['telanganatoday.com', 'upload.wikimedia.org', 'cdn-icons-png.flaticon.com', 'cdn.shopify.com'],
    },
}