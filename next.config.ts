import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/', // Quando a rota for "/"
        destination: '/dashboard', // Redireciona para "/home"
        permanent: true, // Define como permanente (status 308)
      },
      {
        source: '/dashboard', // Quando a rota for "/dashboard"
        destination: '/home', // Redireciona para "/home"
        permanent: true, // Define como permanente (status 308)
      },
    ];
  },
};

export default nextConfig;
