import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero 
          title='Track your fitness and reach your goals'
          subtitle='With our exercise tracking app, you can easily entry your exercises and stay motivated to reach your goals. Weather your a beginner or a seasoned pro, we have the tools to help you succeed.'
          btn1Text='Sign Up'
          btn1Link='/register'
          btn2Text='Learn More'
          btn2Link='/about'
        />
      </main>
    </>
  )
}