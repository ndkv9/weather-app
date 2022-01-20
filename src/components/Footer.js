import React from 'react'

const Footer = () => {
  return (
    <footer className='footer'>
      <p>
        © {new Date().getFullYear()} - Copyright by{' '}
        <a href='https://github.com/ndkv101' target='_blank' rel="noreferrer">
          Erik Nguyen
        </a>
      </p>
    </footer>
  )
}

export default Footer
