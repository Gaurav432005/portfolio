/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.31.163'],
  reactCompiler: true,
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    
  },
  
};

export default nextConfig;
