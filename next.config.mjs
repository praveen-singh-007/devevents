/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  images:{
    remotePatterns:[{
      protocol: "https",
      hostname: "res.cloudinary.com"
    }]
  },
    allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.1.9:3000",
  ],
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
