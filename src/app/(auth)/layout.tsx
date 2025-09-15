import Logo from '@/components/logo';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const authBgImage = PlaceHolderImages.find(img => img.id === 'auth-background');

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="absolute top-8 left-8">
            <Logo />
        </div>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
        {authBgImage && (
            <Image
                src={authBgImage.imageUrl}
                alt={authBgImage.description}
                layout="fill"
                objectFit="cover"
                data-ai-hint={authBgImage.imageHint}
            />
        )}
      </div>
    </div>
  );
}
