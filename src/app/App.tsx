import { RouterProvider } from 'react-router-dom'
import { LanguageProvider } from '@/app/providers/LanguageProvider'
import { router } from '@/app/router'

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  )
}
