/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Отключаем строгую проверку экспортов для проблемных пакетов
    config.resolve.fullySpecified = false;
    return config;
  },
};

export default nextConfig;