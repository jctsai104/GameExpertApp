import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const bannerData = [
  {
    id: 1,
    title: "Trade Crypto Like a Pro",
    subtitle: "Join 10M+ users on GAME EXPERT",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
    buttonText: "Start Trading",
    link: "/trading"
  },
  {
    id: 2,
    title: "Earn 12% APY on Staking",
    subtitle: "Secure your crypto and earn rewards",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
    buttonText: "Learn More",
    link: "/staking"
  },
  {
    id: 3,
    title: "Gaming Tokens Available",
    subtitle: "Trade your favorite gaming cryptocurrencies",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
    buttonText: "Explore",
    link: "/gaming-tokens"
  }
];

export default function AdBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gaming-neon/20 to-gaming-purple/20 border border-gaming-neon/30">
        <div 
          className="relative h-48 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center"
          style={{
            backgroundImage: `url('${bannerData[currentSlide].image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon/10 to-gaming-purple/10"></div>
          <div className="relative z-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {bannerData[currentSlide].title}
            </h2>
            <p className="text-lg opacity-90 mb-4">
              {bannerData[currentSlide].subtitle}
            </p>
            <Button className="bg-gaming-neon hover:bg-gaming-neon/80 text-white">
              {bannerData[currentSlide].buttonText}
            </Button>
          </div>
        </div>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-opacity ${
                index === currentSlide ? 'bg-white opacity-100' : 'bg-white opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
