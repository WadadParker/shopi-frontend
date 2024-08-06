import React, { useRef, useState } from 'react'
import imageOne from "../assets/pendant.jpg"
import imageTwo from "../assets/surfboard.jpg"
import imageThree from "../assets/tshirt.jpg";

const Heading = ({number}) => {
  switch(number) {
    case 1:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-20'>We're a <span className=' font-bold'>wave</span>-themed store !</h1>

    case 2:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-20'>Waves Pendant <span className=' font-bold'>$20</span></h1>
    
    case 3:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-20'>Waves <span className=' font-bold'>Surfboard $50</span></h1>
      
    case 4:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-20'>Waves <span className=' font-bold'>Tee $10</span></h1>

    default:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-20'>We're a <span className=' font-bold'>wave</span>-themed store !</h1>
  }
}

const Home = () => {
  const [heading,setHeading] = useState(1);
  const [cart,setCart] = useState({pendant:0,surfboard:0,tshirt:0});
  const timeoutRef = useRef(null);

  const hoverHandler = (number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHeading(number)
  }

  const mouseOutHandler = (number) => {

    timeoutRef.current = setTimeout(()=>{
      if(number==heading)
      setHeading(1)
    },4000)
  }

  const addToCart = (product,subtract) => {
    subtract
    ? setCart(prev=>({...prev,[product]:prev[product] - 1}))
    : setCart(prev=>({...prev,[product]:prev[product] + 1}))
  }

  return (
    <div className=' w-full h-full flex flex-col bg-bg-dark'>
      <div className='flex flex-col grow mx-[9%] mb-[3%] mt-28'>
        <h1 className='text-center text-2xl font-light tracking-[-0.96px] opacity-60 text-black mb-4'>Click the product image to add to cart</h1>
        <main className='grow flex flex-col justify-center bg-bg border-border rounded-[10px]'>
          <section className='text-center'>
            <Heading number={heading} />
            <ul className='space-x-10 flex justify-center'>
              <li >
                <img onClick={()=>addToCart("pendant")} onMouseOver={()=>hoverHandler(2)} onMouseOut={()=>mouseOutHandler(2)} src={imageOne} alt='Pendant' className=' size-[200px] rounded-3xl border-2 border-transparent opacity-70 hover:opacity-100 hover:cursor-pointer hover:border-text-light transition-all ease-linear' />
                <aside className='flex flex-col justify-center items-center gap-y-3 mt-3'>
                  <button className='bg-text-light w-8 rounded py-1.5 px-3 text-white text-sm font-medium'>{cart.pendant}</button>
                  <button className='border border-text-light rounded text-text-light py-1.5 px-3 text-sm font-medium' onClick={()=>addToCart("pendant",true)}>-</button>
                </aside>
              </li>
              <li >
                <img onClick={()=>addToCart("surfboard")} onMouseOver={()=>hoverHandler(3)} onMouseOut={()=>mouseOutHandler(3)} src={imageTwo} alt='Surfboard' className=' size-[200px] rounded-3xl border-2 border-transparent opacity-70 hover:opacity-100 hover:cursor-pointer hover:border-text-light transition-all ease-linear' />
                <aside className='flex flex-col justify-center items-center gap-y-3 mt-3'>
                  <button className='bg-text-light w-8 rounded py-1.5 px-3 text-white text-sm font-medium'>{cart.surfboard}</button>
                  <button className='border border-text-light rounded text-text-light py-1.5 px-3 text-sm font-medium' onClick={()=>addToCart("surfboard",true)}>-</button>
                </aside>
              </li>
              <li >
                <img onClick={()=>addToCart("tshirt")} onMouseOver={()=>hoverHandler(4)} onMouseOut={()=>mouseOutHandler(4)} src={imageThree} alt='t-shirt' className=' size-[200px] rounded-3xl border-2 border-transparent opacity-70 hover:opacity-100 hover:cursor-pointer hover:border-text-light transition-all ease-linear' />
                <aside className='flex flex-col justify-center items-center gap-y-3 mt-3'>
                  <button className='bg-text-light w-8 rounded py-1.5 px-3 text-white text-sm font-medium'>{cart.tshirt}</button>
                  <button className='border border-text-light rounded text-text-light py-1.5 px-3 text-sm font-medium' onClick={()=>addToCart("tshirt",true)}>-</button>
                </aside>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Home