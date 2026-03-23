import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CursorTrail from './CursorTrail'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <CursorTrail />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />

      {/* Background decorative blurs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </div>
  )
}
