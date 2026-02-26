/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    // Esta opção permite que o Next busque imagens no localhost
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
    // Se o seu terminal reclamar de IP privado, adicione isso:
    unoptimized: true, 
  },
};
export default nextConfig;