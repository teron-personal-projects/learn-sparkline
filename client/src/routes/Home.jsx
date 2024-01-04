import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero 
          title='FitTrack'
          subtitle='Track your progress and set goals'
        />
      </main>
    </>
  )
}