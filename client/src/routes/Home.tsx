import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Btn from '../components/btn/Btn';
import { Columns, Column } from '../components/Columns/Columns';


export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero 
          title='Track your fitness and reach your goals'
          subtitle='With our exercise tracking app, you can easily entry your exercises and stay motivated to reach your goals. Weather your a beginner or a seasoned pro, we have the tools to help you succeed.'
          cta={
            <div className='flex'>
              <Btn 
                btnclass='mr-8 bg-red-600 text-white py-4 px-8 hover:text-black hover:bg-transparent hover:border-red-600 hover:border-2'
                text='Sign Up'
                link='/register' />
              <Btn 
                text='Learn More'
                link='/about' 
                btnclass='bg-gray-900 text-white py-4 px-8 hover:text-black hover:bg-transparent hover:border-gray-900 hover:border-2'
              />
            </div>
          }
        />
        <Columns 
          direction='row'
        >
          <Column
            context={
              <>
                <p className='text-center text-5xl '>
                  “Work hard in silence, let your success be your noise.”
                </p>
                <p className='text-center text-2xl mt-8'>
                  Anonymous
                </p>
              </>
            }
          />
          <Column
            context='Hello World'
          />
           <Column
            context='Hello World'
          />
           <Column
            context='Hello World'
          />
           <Column
            context='Hello World'
          />
           <Column
            context='Hello World'
          />

        </Columns>
      </main>
    </>
  )
}