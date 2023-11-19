/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: true
    },
    images: {
        domains: [
            'localhost',
            'res.cloudinary.com',
            'images.unsplash.com',
            'cdn.pixabay.com',
            'cdn.dribbble.com',
            'cdn.fakercloud.com',
            'cdn.sanity.io',
            'loremflickr.com',
            'lh3.googleusercontent.com' ,
            'picsum.photos'
        ]
    },
    compiler: {
        styledComponents: true,
    }
}

module.exports = nextConfig
