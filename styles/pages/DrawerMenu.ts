import { css, styled } from '@stitches/react'

const DrawerStyles = css({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '480px',
  backgroundColor: '#202024',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  zIndex: 9999,
  nav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0',
    gap: '24px',
  },
  li: {
    listStyleType: 'none',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: '24px',
    div: {
      marginLeft: '20px',
    },
  },
  h1: {
    marginTop: '72px',
    marginLeft: '48px',
    marginBottom: '32.5px',
  },
  img: {
    width: '100px',
    height: '100px',
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: '8px',
    marginLeft: '48px',
  },
  button: {
    marginTop: '8px',
    background: 'none',
    border: 'none',
    color: '#00875F',
    cursor: 'pointer',
  },
})
export const Drawer = styled('aside', DrawerStyles)
