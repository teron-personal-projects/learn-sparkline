import './hero.scss'
import Btn from '../btn/Btn'

export default function Hero({title, subtitle, btn1Text, btn1Link, btn2Text, btn2Link }) {

  return (
    <div className='et-hero block relative'>
      <div className='et-hero__img' aria-label="Hero Section with background image. Image of a person working out. This person's back is facing the camera, while they hold a bar with weights above their head. Photo by John Arano on Unsplash.">
      </div>
      <div className='et-hero-context container mx-auto 2xl flex'>
        { title ? (
          <div className='w-6/12 pt-8'>
            <h1 className='text-6xl'>{title}</h1>
          </div>
        ) : null }
        { subtitle ? (
          <div className='w-6/12 pt-8'>
            <p className='text-2xl mb-8'>{subtitle}</p>
            <div className='flex'>
              {btn1Text ? (
                <Btn 
                  btnclass='mr-8 bg-red-600 text-white py-4 px-8 hover:text-black hover:bg-transparent hover:border-red-600 hover:border-2'
                  text={btn1Text}
                  link={btn1Link} />
              ) : null}
              {btn2Text ? (
                <Btn 
                  text={btn2Text} 
                  link={btn2Link} 
                  btnclass='bg-gray-900 text-white py-4 px-8 hover:text-black hover:bg-transparent hover:border-gray-900 hover:border-2'
                />
              ) : null}
            </div>
          </div>
        ) : null }
      </div>
    </div>
  )
}