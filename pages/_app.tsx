import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'

import Image from 'next/image'
import { ProductProvider } from './api/context'
import DrawerMenu from './product/DrawerMenu'
import { useState } from 'react'

globalStyles()

function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => setIsOpen(!isOpen)
  return (
    <ProductProvider>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <DrawerMenu toggleDrawer={toggleDrawer} />
        </Header>
        <Component {...pageProps} />
      </Container>
    </ProductProvider>
  )
}

export default App
