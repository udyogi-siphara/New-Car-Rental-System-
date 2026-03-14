import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {

const cardsData = [
        {
            image: assets.testimonial_image_1,
            name: 'Briar Martin',
            Location: 'Galle',
            description:' "I have used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides." '
        },
        {
            image: assets.testimonial_image_2,
            name: 'Avery Johnson',
            Location: 'Bibile',
            description:' "I have used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides." '
        },
        {
            image: assets.testimonial_image_1,
            name: 'Jordan Lee',
            Location: 'Badulla',
            description:' "I have used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides." '
        },
        {
            image: assets.testimonial_image_2,
            name: 'Avery Johnson',
            Location: 'Colombo',
            description:' "I have used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides." '
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-6 rounded-2xl mx-4 bg-white border border-gray-100
          shadow-sm hover:shadow-xl hover:shadow-primary/5
          transition-all duration-300 w-80 shrink-0 group">
            <div className="flex gap-3 items-center">
                <img className="size-12 rounded-full ring-2 ring-primary/10 object-cover" src={card.image} alt="User Image" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-dark">{card.name}</p>
                        <svg className="mt-0.5 fill-primary" width="14" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
                        </svg>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{card.Location}</span>
                </div>
            </div>
            {/* Stars */}
            <div className='flex gap-1 mt-3'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={assets.star_icon} alt="" className='w-4 h-4' />
              ))}
            </div>
            <p className="text-sm py-4 text-gray-600 leading-relaxed italic">{card.description}</p>
        </div>
    );

  return (
    <>
            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

            <div className="pt-28 marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">

                   <Title title='What Our Customers Say' subTitle="Discover why discerning travelers choose CarRental
                   for their premium vehicle experiences across Sri Lanka." />

                <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-12 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-24 md:w-44 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-24 md:w-44 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </>
  )
}

export default Testimonial
