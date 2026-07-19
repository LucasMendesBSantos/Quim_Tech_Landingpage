import About from './components/About'
import Admin from './components/Admin'
import ChatWidget from './components/ChatWidget'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Team from './components/Team'
import Testimonials from './components/Testimonials'

export default function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/adm') {
    return <Admin />
  }

  return (
    <div className="min-h-screen bg-void">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
