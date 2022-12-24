import React from 'react'

export const Footer = () => {
  return (
    <footer class="relative text-center text-black-400 lg:text-center md:text-center sm:text-center">
        <div className="my-4">
          <h3 className="footer-content font-semibold text-gray-300">
            Made with{" "}
            <i className="fas fa-heart text-red-600" aria-hidden="true"></i>{" "}
            <a
              class="link"
              href="https://github.com/pavandeveloperr"
              className="hover:underline hover:text-gray-600"
            >
              Pavan Kulkarni{" "}
            </a>
          </h3>
        </div>
        <div className='flex absolute -mt-4 items-center'>
            <h3 className='text-[8px] text-gray-300'>Data Provided By CoinGeckoAPI</h3>
        </div>
      </footer>
  )
}
