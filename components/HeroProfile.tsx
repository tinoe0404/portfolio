import Image from 'next/image';

export default function HeroProfile() {
  return (
    <section className="relative flex items-center justify-center min-h-[70vh] bg-gradient-to-b from-black via-gray-900 to-gray-800">
      <div className="text-center px-4">
        {/* Profile Image */}
        <div className="mx-auto mb-6 w-36 h-36 sm:w-44 sm:h-44 rounded-full ring-4 ring-gray-700 overflow-hidden shadow-xl">
          <Image
            src="/profile.jpg" // 👈 replace with your image
            alt="Profile picture"
            width={176}
            height={176}
            className="object-cover"
            priority
          />
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          Tinotenda Chandengenda
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-400 text-lg sm:text-xl max-w-xl mx-auto">
          Full-Stack Software Engineer building scalable, modern web applications
        </p>
      </div>
    </section>
  );
}
