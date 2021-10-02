import '../styles/globals.css'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { AuthWrapper } from '../components/auth/AuthWrapper'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  )
}
export default MyApp
