import './hero.scss'


export default function Hero({title, subtitle, cta }) {

  return (
    <div className='et-hero block relative'>
      <div className='et-hero__img' aria-label="Hero Section with background image. Image of a person working out. This person's back is facing the camera, while they hold a bar with weights above their head. Photo by John Arano on Unsplash.">
      </div>
      <div className='et-hero__context container mx-auto 2xl flex py-16'>
        { title ? (
          <div className='w-6/12 pe-4'>
            <h1 className='text-6xl font-black '>{title}</h1>
          </div>
        ) : null }
        { subtitle ? (
          <div className='w-6/12 pl-4'>
            <p className='text-3xl mb-8'>{subtitle}</p>
            {cta ? cta : null}
          </div>
        ) : null }
      </div>
    </div>
  )
}