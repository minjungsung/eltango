import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    qualities: [75, 95],
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
