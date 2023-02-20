import Stripe from 'stripe'
const key = process.env.STRIPE_SECRET_KEY!
export const stripe = new Stripe(key, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop',
  },
})
