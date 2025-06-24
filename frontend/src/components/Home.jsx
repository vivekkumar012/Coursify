import React from 'react'

function Home() {
  return (
    <div className='bg-gradient-to-r from-black to-blue-950 h-screen'>
      <div className='h-screen text-white'>
         {/* Navbar */}
         <header className='flex items-center justify-between container mx-auto'>
            <div>left</div>
            <div>right</div>
         </header>

         {/* Main Section */}
         <section>Section1</section>
         <section>Section2</section>

         {/* Footer Section */}
         <footer>Footer</footer>
      </div>
    </div>
  )
}

export default Home
