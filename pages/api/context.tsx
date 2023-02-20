import React, { createContext, useContext, useState, useEffect } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
type ShoppingCartProviderProps = {
  children: React.ReactNode
}

export interface Product {
  id: string
  name: string
  price: string
  imageUrl: string
  defaultPriceId: string
  quantity?: number
}

export interface ProductDataContext {
  fetchData: () => void
  productsItens: Product[]
  cart: Product[]
  handleAddToCart: (product: Product) => void
  RemoveItens: (id: string) => void
  totalPrice: number
}

const ShoppingCartContext = createContext({} as ProductDataContext)

export const useProductContext = () => {
  return useContext(ShoppingCartContext)
}

export const ProductProvider = ({ children }: ShoppingCartProviderProps) => {
  const [productsItens, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])

  const fetchData = async () => {
    try {
      const response = await stripe.products.list({
        limit: 100,
        expand: ['data.default_price'],
      })
      const products = response.data.map((product) => {
        const price = product.default_price as Stripe.Price

        return {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price.unit_amount! / 100),
          defaultPriceId: price.id,
        }
      })

      setProducts(() =>
        products.map((item) => {
          return {
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            price: item.price,
            defaultPriceId: item.defaultPriceId,
          }
        }),
      )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddToCart = (product: Product) => {
    setCart([
      ...cart,
      {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        defaultPriceId: product.defaultPriceId,
      },
    ])
  }

  const RemoveItens = (id: string) => {
    const filteredCart = cart.filter((item) => item.id !== id)
    setCart(filteredCart)
  }

  const totalPrice = cart.reduce(
    (acc, product) => acc + Number(product.price.slice(2, 5)),
    0,
  )

  const productDataContext: ProductDataContext = {
    fetchData,
    productsItens,
    cart,
    handleAddToCart,
    RemoveItens,
    totalPrice,
  }

  return (
    <ShoppingCartContext.Provider value={productDataContext}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
