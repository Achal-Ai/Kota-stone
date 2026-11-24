import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { WebsiteLayout, BareLayout } from '@/layouts/WebsiteLayout'
import { LoadingState, ErrorState } from '@/components/ui'
import { NotFoundPage } from '@/components/common/NotFoundPage'

/* Route-based code splitting — every page is its own chunk. */
const HomePage = lazy(() => import('@/features/home/pages/HomePage'))
const AboutPage = lazy(() => import('@/features/about/pages/AboutPage'))
const ProductsPage = lazy(() => import('@/features/products/pages/ProductsPage'))
const ProductDetailPage = lazy(
  () => import('@/features/products/pages/ProductDetailPage'),
)
const ServicesPage = lazy(() => import('@/features/services/pages/ServicesPage'))
const GalleryPage = lazy(() => import('@/features/gallery/pages/GalleryPage'))
const ContactPage = lazy(() => import('@/features/contact/pages/ContactPage'))
const AdminApp = lazy(() => import('@/features/admin/AdminApp'))

function PageFallback() {
  return (
    <div className="pt-[7.5rem]">
      <LoadingState />
    </div>
  )
}

function RouteError() {
  return (
    <div className="container-page section-y">
      <ErrorState />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <Suspense fallback={<PageFallback />}><HomePage /></Suspense> },
      { path: '/about', element: <Suspense fallback={<PageFallback />}><AboutPage /></Suspense> },
      {
        path: '/products',
        element: <Suspense fallback={<PageFallback />}><ProductsPage /></Suspense>,
      },
      {
        path: '/products/:slug',
        element: <Suspense fallback={<PageFallback />}><ProductDetailPage /></Suspense>,
      },
      {
        path: '/services',
        element: <Suspense fallback={<PageFallback />}><ServicesPage /></Suspense>,
      },
      {
        path: '/gallery',
        element: <Suspense fallback={<PageFallback />}><GalleryPage /></Suspense>,
      },
      {
        path: '/contact',
        element: <Suspense fallback={<PageFallback />}><ContactPage /></Suspense>,
      },
      { path: '/home', element: <Navigate to="/" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/admin/*',
    element: <BareLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Suspense fallback={<LoadingState />}><AdminApp /></Suspense> },
      { path: '*', element: <Suspense fallback={<LoadingState />}><AdminApp /></Suspense> },
    ],
  },
])
