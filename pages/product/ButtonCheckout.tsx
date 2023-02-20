import { useState } from 'react'
import axios from 'axios'
import { useProductContext } from 'pages/api/context'

// explicação: pega o objeto que vem do  productsItens e compara o id dele com o id dos itens do carrinho fazendo um filtro.Cria um array vazio e colocar os itens que foram filtrados dentro do array idpreco.
// pra colocar os ids dos preços
export default function ButtonCheckout() {
  const { productsItens, cart } = useProductContext()
  const idpreco: string[] = []

  const cartProductIds = cart.map((item) => item.id)
  const cartPriceIds = productsItens.filter((priceId) =>
    cartProductIds.includes(priceId.id),
  )

  for (const i in cartPriceIds) {
    idpreco.push(String(cartPriceIds[i].defaultPriceId))
  }

  // eslint-disable-next-line no-unused-vars
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceIds: idpreco,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <button
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 32px',
        gap: '10px',
        background: '#00B37E',
        borderRadius: '10px',
        color: '#FFFFFF',
        width: '90%',
        margin: '0 auto',
      }}
      onClick={handleBuyButton}
    >
      Finalizar Compra
    </button>
  )
}
