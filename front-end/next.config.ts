// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'www.satoriahotel.com',
      'example.com',
      'images.unsplash.com',
      'asset.olympicfurniture.co.id',
      'victoriahotel.co.uk',
      'www.pearlhotelnyc.com',
      'www.momondo.com',
      's2.bukalapak.com',
      'unsplash.com',
      'media.istockphoto.com',
      'news.azanahotel.com',
    ], // Add the domains where you're fetching images from
  },
};

export default nextConfig;
