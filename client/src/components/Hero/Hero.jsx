import './hero.scss'

export default function Hero({title, subtitle}) {

  return (
    <>
      <hero className='et-hero block'>
        <div className='container 2xl mx-auto h-inherit relative'>
          <div className='flex flex-col content-center text-white absolute mx-auto'>
            <h2 className='text-center text-4xl'>{title}</h2>
            <p className='text-center text-2xl'>{subtitle}</p>
          </div>
        </div>
      </hero>
    </>
  )
}