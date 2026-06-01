import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
