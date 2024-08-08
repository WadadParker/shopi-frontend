import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import imageOne from "../assets/pendant.jpg"
import imageTwo from "../assets/surfboard.jpg"
import imageThree from "../assets/tshirt.jpg";

import Payment from '../components/payment/payment';
import waves from "../assets/waveslogo.png"


const Heading = ({number}) => {
  switch(number) {
    case 1:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-16'>We're a <span className=' font-bold'>wave</span>-themed store !</h1>

    case 2:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-16'>Waves Pendant <span className=' font-bold'>$20</span></h1>
    
    case 3:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-16'>Waves <span className=' font-bold'>Surfboard $50</span></h1>
      
    case 4:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-16'>Waves <span className=' font-bold'>Tee $10</span></h1>

    default:
      return <h1 className='text-text-light text-3xl transition-all ease-in-out italic font-light tracking-[-1.28px] mb-16'>We're a <span className=' font-bold'>wave</span>-themed store !</h1>
  }
}

const Home = () => {
  const [showModal,setShowModal] = useState(false);
  const [heading,setHeading] = useState(1);
  const [cart,setCart] = useState({pendant:0,surfboard:0,tshirt:0});
  const [showAnimation,setShowAnimation] = useState(false);

  const timeoutRef = useRef(null);
  const navigate = useNavigate();

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

  useEffect(()=>{

    const animation = 
      setInterval(()=>{
        setShowAnimation(prev=>!prev)
      },4000)

    return () => {
      clearInterval(animation)
    }

  },[])

  return (
    <>
    {showModal && <Payment setShowModal={setShowModal} />}
    <div className=' w-full h-full flex flex-col bg-[#F9F9F9]'>
      <div className='flex flex-col grow mx-[20%] mb-[6%] mt-20'>
        <header className='text-center text-2xl font-light tracking-[-0.96px] opacity-60 text-black mb-4 transition-all ease-linear'>
          {false
          ?<>
            <img src='waves' /> <p className=' text-2xl font-bold'>waves<span className='font-light'>giving</span></p>
          </>
          :"Click the product image to add to cart"
          }
        </header>
        <main className='grow flex flex-col justify-center bg-bg border-border rounded-[10px]'>
          <section className='text-center'>
            <button className={`p-2.5 border border-text-light rounded-sm text-text-light text-3xl font-light tracking-[-1.28px] mb-10 ${cart.pendant>0 || cart.surfboard>0 || cart.tshirt>0 ? "visible" : "invisible"}  `}
             onClick={()=>{setShowModal(true)}}>Checkout</button>
            <Heading number={heading} />
            <ul className='space-x-10 flex justify-center'>
              <li >
                <img onClick={()=>addToCart("pendant")} onMouseOver={()=>hoverHandler(2)} onMouseOut={()=>mouseOutHandler(2)} src={imageOne} alt='Pendant' className=' size-[200px] rounded-3xl border-2 border-transparent opacity-70 hover:opacity-100 hover:cursor-pointer hover:border-text-light transition-all ease-linear' />
                <aside className={`flex flex-col justify-center items-center gap-y-3 mt-3 ${cart.pendant>0?"visible":"invisible"} `}>
                  <button className='bg-text-light w-8 rounded py-1.5 px-3 text-white text-sm font-medium' onClick={()=>addToCart("pendant")}>{cart.pendant}</button>
                  <button className='border border-text-light rounded text-text-light py-1.5 px-3 text-sm font-medium' onClick={()=>addToCart("pendant",true)}>-</button>
                </aside>
              </li>
              <li >
                <img onClick={()=>addToCart("surfboard")} onMouseOver={()=>hoverHandler(3)} onMouseOut={()=>mouseOutHandler(3)} src={imageTwo} alt='Surfboard' className=' size-[200px] rounded-3xl border-2 border-transparent opacity-70 hover:opacity-100 hover:cursor-pointer hover:border-text-light transition-all ease-linear' />
                <aside className={`flex flex-col justify-center items-center gap-y-3 mt-3 ${cart.surfboard>0?"visible":"invisible"} `}>
                  <button className='bg-text-light w-8 rounded py-1.5 px-3 text-white text-sm font-medium' onClick={()=>addToCart("surfboard")}>{cart.surfboard}</button>
                  <button className='border border-text-light rounded text-text-light py-1.5 px-3 text-sm font-medium' onClick={()=>addToCart("surfboard",true)}>-</button>
                </aside>
              </li>
              <li >
                <img onClick={()=>addToCart("tshirt")} onMouseOver={()=>hoverHandler(4)} onMouseOut={()=>mouseOutHandler(4)} src={imageThree} alt='t-shirt' className=' size-[200px] rounded-3xl border-2 border-transparent opacity-70 hover:opacity-100 hover:cursor-pointer hover:border-text-light transition-all ease-linear' />
                <aside className={`flex flex-col justify-center items-center gap-y-3 mt-3 ${cart.tshirt>0?"visible":"invisible"} `}>
                  <button className='bg-text-light w-8 rounded py-1.5 px-3 text-white text-sm font-medium' onClick={()=>addToCart("tshirt")}>{cart.tshirt}</button>
                  <button className='border border-text-light rounded text-text-light py-1.5 px-3 text-sm font-medium' onClick={()=>addToCart("tshirt",true)}>-</button>
                </aside>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
    </>
  )
}

export default Home