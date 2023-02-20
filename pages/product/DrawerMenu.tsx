import { Box, Button, ButtonBase } from '@mui/material'
import Image from 'next/image'
import { useProductContext } from 'pages/api/context'
import { useState } from 'react'
import { Drawer } from 'styles/pages/DrawerMenu'
import sacola from '../../assets/sacola.png'
import ButtonCheckout from './ButtonCheckout'

interface ToggleMenuProps {
  toggleDrawer: () => void
}
export default function DrawerMenu({ toggleDrawer }: ToggleMenuProps) {
  const { cart, RemoveItens, totalPrice } = useProductContext()
  const [isOpen, setIsOpen] = useState(false)
  toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <>
      <ButtonBase onClick={toggleDrawer}>
        <Image src={sacola} alt="" />
        <p>{cart.length}</p>
      </ButtonBase>
      {isOpen && (
        <Drawer>
          <Button onClick={toggleDrawer}>x</Button>
          <h1>Sacola de compras</h1>
          <nav>
            <ul>
              {cart.map((product) => (
                <>
                  <li key={product.id}>
                    <Image
                      src={product.imageUrl}
                      alt=""
                      width={100}
                      height={100}
                    />
                    <div>
                      <p>{product.name} </p>
                      <p>{product.price}</p>
                      <button onClick={() => RemoveItens(product.id)}>
                        Remover
                      </button>
                    </div>
                  </li>
                </>
              ))}
            </ul>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',

                color: '#E1E1E6',
                marginLeft: '48px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                  width: '100%',
                  gap: '248px',
                  paddingBottom: '7px',
                }}
              >
                <p style={{ fontWeight: '400', fontSize: '16px' }}>
                  Quantidade:
                </p>
                <p style={{ fontWeight: '400', fontSize: '18px' }}>
                  {cart.length} {''} item(s)
                </p>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                  width: '100%',
                  gap: '248px',
                }}
              >
                <p style={{ fontWeight: '700', fontSize: '18px' }}>
                  Valor total
                </p>
                <p style={{ fontWeight: '700', fontSize: '24px' }}>
                  R$ {totalPrice}
                </p>
              </Box>
            </Box>
            <ButtonCheckout />
          </nav>
        </Drawer>
      )}
    </>
  )
}
