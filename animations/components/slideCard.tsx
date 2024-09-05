'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {motion, useMotionValue, useTransform} from 'framer-motion'
type Props = {}

const SlideCard = (props: Props) => {
    const [cards, setCards] = useState<Card[]>(cardData);
   

  return (
    <main>
    <div
      className="grid min-h-screen w-full place-items-center "
      style={{
        backgroundImage: `url("https://pbs.twimg.com/media/EumvwauXUAAAkcp?format=jpg&name=large")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        zIndex: -1,
   
      }}
    >
      {cards.map((card:any) => {
        return (
          <Card key={card.id} cards={cards} setCards={setCards} {...card} />
        );
      })}
    </div>
    </main>
  )
}

type Card = {
  id: number,
  url:string

}
const Card = ({id, url, cards, setCards}: {id:number, url:string, cards: Card[],setCards: Dispatch<SetStateAction<Card[]>>}) =>{
  const x = useMotionValue(0);
  const opacity = useTransform(x,[-150, 0, 150], [0,1,0])
  const rotateRaw = useTransform(x, [-150,150], [-18,18])

  const isFront = id === cards[cards.length -1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;

    return `${rotateRaw.get() + offset}deg`
  })

  const handleDragEnd = () => {
    if(Math.abs(x.get())> 50 ){
      setCards((pv) => pv.filter((v) => v.id!== id))

    }
  }

    return (
        <motion.img
        
        className='h-96 z-10 w-72 rounded-lg object-cover hover:cursor-grab active:cursor-grabbing
        origin-bottom'
        src={url} alt='img'
        style={{
            gridColumn:1,
            gridRow:1,
            x,
            opacity,
            rotate,
            transition: '0.125s transform',
            boxShadow: isFront
            ? "0 20px 25px -5px rgb(0 0 0 /0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5": undefined,

          
        }}
        animate = {{
          scale: isFront ? 1 : 0.98,
        }}
        drag={"x"}
        dragConstraints={{
            left: 0,
            right:0
        }}
        onDragEnd={handleDragEnd}

        />
    )

}

export default SlideCard



const cardData = [
    {
      id: 1,
      url: "https://w0.peakpx.com/wallpaper/755/404/HD-wallpaper-charles-leclerc-f1-anthonie-charles-charles-leclerc-f1-ferrari-leclerc-scuderia.jpg",
    },
    {
      id: 2,
      url: "https://w0.peakpx.com/wallpaper/935/206/HD-wallpaper-charles16-charles-leclerc-ferrari-sf90-formula1.jpg",
    },
    {
      id: 3,
      url: "https://w0.peakpx.com/wallpaper/33/935/HD-wallpaper-ferrari-charles-leclerc-f1-formula-1-italia-monza-sebastian-vettel.jpg",
    },
    {
      id: 4,
      url: "https://w0.peakpx.com/wallpaper/752/197/HD-wallpaper-charles-leclerc-charles-leclerc-f1-ferrari-ferrari-f1-formula-1.jpg",
    },
    {
      id: 5,
      url: "https://pbs.twimg.com/media/GOjSs0TW4AA1Imz?format=jpg&name=large",
    },
    {
      id: 6,
      url: "https://c7.alamy.com/comp/2GHTHN4/race-winner-charles-leclerc-mon-ferrari-celebrates-on-the-podium-08092019-formula-1-world-championship-rd-14-italian-grand-prix-monza-italy-race-day-photo-credit-should-read-xpbpress-association-images-2GHTHN4.jpg",
    },
    {
      id: 7,
      url: "https://pbs.twimg.com/media/GOjSs0SW4AI8pRr?format=jpg&name=large ",
    },
    {
      id: 8,
      url: "https://pbs.twimg.com/media/EumyUwgWYAY7EOM?format=jpg&name=4096x4096",
    },
  ];
  