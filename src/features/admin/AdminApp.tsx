import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Boxes,
  Tags,
  Layers,
  Inbox,
  Image as ImageIcon,
  Flag,
  RotateCcw,
  LogOut,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Eye,
  Clock,
  AlertTriangle,
} from 'lucide-react'
import {
  useProductsStore,
  useCategoriesStore,
  useFinishesStore,
  useInquiriesStore,
  useGalleryStore,
  useBannersStore,
  store,
} from '@/data/store'
import type { Category, GalleryCollectionId, Inquiry, InquiryStatus, Product, Banner } from '@/types'
import { cn } from '@/utils/format'

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'finishes'
  | 'inquiries'
  | 'gallery'
  | 'banners'

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && window.sessionStorage.getItem('sawariya_admin_auth') === 'true'
  })

  const [email, setEmail] = useState('admin@pushpnarayanstone.com')
  const [password, setPassword] = useState('demo1234')
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (email === 'admin@pushpnarayanstone.com' && password === 'demo1234') {
      setIsAuthenticated(true)
      window.sessionStorage.setItem('sawariya_admin_auth', 'true')
      setAuthError('')
    } else {
      setAuthError('Incorrect credentials. Please use the demo credentials.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    window.sessionStorage.removeItem('sawariya_admin_auth')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-ivory border border-champagne p-8 sm:p-10 shadow-lifted">
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <span className="grid h-12 w-12 place-items-center border border-bronze bg-bronze/10 text-bronze">
              <span className="font-display text-xl font-bold">PN</span>
            </span>
            <h1 className="font-display text-2xl text-obsidian">Pushp Narayan Stone</h1>
            <span className="eyebrow text-taupe-deep text-[0.625rem]">Administrative Control Suite</span>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="field">
              <label className="field-label text-taupe-deep">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input border-champagne"
                required
              />
            </div>

            <div className="field">
              <label className="field-label text-taupe-deep">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field-input border-champagne"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-900/10 border border-red-900/30 text-red-800 text-xs flex items-center gap-2">
                <AlertTriangle size={14} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-solid w-full py-3.5 tracking-widest text-[0.75rem]"
            >
              Sign In to Console
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail('admin@pushpnarayanstone.com')
                setPassword('demo1234')
                setIsAuthenticated(true)
                window.sessionStorage.setItem('sawariya_admin_auth', 'true')
              }}
              className="btn btn-outline w-full py-2.5 text-[0.6875rem] border-dashed border-bronze text-bronze hover:bg-bronze hover:text-ivory"
            >
              1-Click Demo Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-champagne/60 text-center">
            <Link
              to="/"
              className="text-[0.75rem] font-medium text-taupe-deep hover:text-bronze transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Sidebar */}
      <aside className="w-64 bg-obsidian text-ivory border-r border-champagne/20 flex flex-col shrink-0">
        <div className="p-6 border-b border-champagne/20 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-champagne/40 text-champagne bg-obsidian/60 text-sm font-semibold">
            PN
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg leading-tight text-ivory">Pushp Narayan</span>
            <span className="eyebrow text-[0.5625rem] text-champagne/70">Admin Panel</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1.5 overflow-y-auto">
          <SidebarTab
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarTab
            icon={<Boxes size={18} />}
            label="Products"
            active={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
          />
          <SidebarTab
            icon={<Tags size={18} />}
            label="Categories"
            active={activeTab === 'categories'}
            onClick={() => setActiveTab('categories')}
          />
          <SidebarTab
            icon={<Layers size={18} />}
            label="Finishes & Sizes"
            active={activeTab === 'finishes'}
            onClick={() => setActiveTab('finishes')}
          />
          <SidebarTab
            icon={<Inbox size={18} />}
            label="Inquiries"
            active={activeTab === 'inquiries'}
            onClick={() => setActiveTab('inquiries')}
          />
          <SidebarTab
            icon={<ImageIcon size={18} />}
            label="Gallery"
            active={activeTab === 'gallery'}
            onClick={() => setActiveTab('gallery')}
          />
          <SidebarTab
            icon={<Flag size={18} />}
            label="Website Banners"
            active={activeTab === 'banners'}
            onClick={() => setActiveTab('banners')}
          />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-champagne/20 flex flex-col gap-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs text-ivory/70 hover:text-ivory hover:bg-obsidian-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} />
              <span>Live Website</span>
            </span>
            <span className="eyebrow text-[0.5625rem] text-champagne">View</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all products, categories, gallery, and inquiries to default demo data?')) {
                store.resetAll()
                window.location.reload()
              }
            }}
            className="flex items-center gap-2 px-3 py-2 text-xs text-taupe hover:text-champagne transition-colors text-left"
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 transition-colors text-left"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar */}
        <header className="h-16 border-b border-champagne bg-ivory-deep/40 px-8 flex items-center justify-between shrink-0">
          <h2 className="font-display text-xl text-obsidian capitalize">
            {activeTab} Management
          </h2>
          <div className="flex items-center gap-4 text-xs text-taupe-deep">
            <span className="inline-flex items-center gap-1.5 border border-champagne px-3 py-1 bg-ivory">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span>Admin Demo Active</span>
            </span>
          </div>
        </header>

        {/* Content Views */}
        <div className="p-8">
          {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}
          {activeTab === 'products' && <ProductsCRUDView />}
          {activeTab === 'categories' && <CategoriesCRUDView />}
          {activeTab === 'finishes' && <FinishesView />}
          {activeTab === 'inquiries' && <InquiriesView />}
          {activeTab === 'gallery' && <GalleryCRUDView />}
          {activeTab === 'banners' && <BannersCRUDView />}
        </div>
      </main>
    </div>
  )
}

function SidebarTab({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3.5 py-2.5 text-[0.75rem] font-medium tracking-wider uppercase transition-colors text-left',
        active
          ? 'bg-bronze text-ivory font-semibold shadow-xs'
          : 'text-ivory/75 hover:bg-obsidian-800 hover:text-ivory',
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  )
}

/* ==========================================================================
   VIEW 1: Dashboard
   ========================================================================== */

function DashboardView({ onNavigate }: { onNavigate: (tab: AdminTab) => void }) {
  const { products } = useProductsStore()
  const { categories } = useCategoriesStore()
  const { inquiries, updateInquiryStatus } = useInquiriesStore()

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length
  const pendingQuotationsCount = inquiries.filter((i) => i.status === 'new' || i.status === 'contacted').length

  return (
    <div className="flex flex-col gap-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-champagne bg-ivory-deep/40 p-6 flex flex-col justify-between shadow-xs">
          <span className="eyebrow text-taupe-deep text-[0.625rem]">Total Products</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="font-display text-4xl text-obsidian">{products.length}</span>
            <Boxes size={22} className="text-bronze" />
          </div>
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="text-[0.6875rem] text-bronze hover:underline font-semibold tracking-wider uppercase mt-4 text-left"
          >
            Manage Products →
          </button>
        </div>

        <div className="border border-champagne bg-ivory-deep/40 p-6 flex flex-col justify-between shadow-xs">
          <span className="eyebrow text-taupe-deep text-[0.625rem]">Categories</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="font-display text-4xl text-obsidian">{categories.length}</span>
            <Tags size={22} className="text-bronze" />
          </div>
          <button
            type="button"
            onClick={() => onNavigate('categories')}
            className="text-[0.6875rem] text-bronze hover:underline font-semibold tracking-wider uppercase mt-4 text-left"
          >
            View Categories →
          </button>
        </div>

        <div className="border border-bronze/40 bg-bronze/10 p-6 flex flex-col justify-between shadow-xs">
          <span className="eyebrow text-bronze text-[0.625rem]">New Inquiries</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="font-display text-4xl text-bronze">{newInquiriesCount}</span>
            <Inbox size={22} className="text-bronze" />
          </div>
          <button
            type="button"
            onClick={() => onNavigate('inquiries')}
            className="text-[0.6875rem] text-bronze hover:underline font-semibold tracking-wider uppercase mt-4 text-left"
          >
            Review Inquiries →
          </button>
        </div>

        <div className="border border-champagne bg-ivory-deep/40 p-6 flex flex-col justify-between shadow-xs">
          <span className="eyebrow text-taupe-deep text-[0.625rem]">Pending Quotes</span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="font-display text-4xl text-obsidian">{pendingQuotationsCount}</span>
            <Clock size={22} className="text-taupe-deep" />
          </div>
          <span className="text-[0.6875rem] text-taupe-deep mt-4">Awaiting pricing calculation</span>
        </div>
      </div>

      {/* Recent Inquiries Quick Table */}
      <div className="border border-champagne bg-ivory shadow-xs">
        <div className="p-6 border-b border-champagne flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl text-obsidian">Recent Customer Inquiries</h3>
            <p className="text-xs text-taupe-deep mt-0.5">Live leads generated from website quotation requests</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('inquiries')}
            className="btn btn-outline btn-sm text-[0.6875rem]"
          >
            View All Inquiries
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-deep/60 border-b border-champagne eyebrow text-[0.625rem] text-taupe-deep">
              <tr>
                <th className="py-3 px-6">Customer / Company</th>
                <th className="py-3 px-6">Subject / Product</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne/40">
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id} className="hover:bg-ivory-deep/30 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-obsidian block">{inq.name}</span>
                    <span className="text-[0.6875rem] text-taupe-deep">{inq.company || inq.email}</span>
                  </td>
                  <td className="py-4 px-6 max-w-xs">
                    <span className="font-medium text-obsidian block truncate">{inq.subject}</span>
                    <span className="text-[0.6875rem] text-taupe-deep">{inq.productSlug || 'General'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="py-4 px-6 text-taupe-deep">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                      className="border border-champagne bg-ivory px-2 py-1 text-[0.6875rem] font-medium text-obsidian cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   VIEW 2: Products CRUD
   ========================================================================== */

function ProductsCRUDView() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductsStore()
  const { categories } = useCategoriesStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.categorySlug === selectedCategory
    const matchesSearch =
      !searchTerm ||
      p.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shade.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCat && matchesSearch
  })

  const openCreateModal = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      slug: '',
      categorySlug: categories[0]?.slug || 'kota-stone',
      name: { en: '', hi: '' },
      shade: '',
      summary: { en: '', hi: '' },
      description: { en: '', hi: '' },
      applications: [{ en: 'Flooring' }, { en: 'Cladding' }],
      finishes: ['mirror-polish'],
      sizes: [{ label: '2 × 2 ft', metric: '600 × 600 mm', thickness: '18–25 mm' }],
      thickness: '18–25 mm',
      packaging: { en: 'Packed in wooden crates' },
      specifications: [
        { label: { en: 'Water Absorption' }, value: { en: '< 0.5%' } },
        { label: { en: 'Compressive Strength' }, value: { en: '140 MPa' } },
      ],
      images: ['/images/products/kota-blue.svg'],
      featured: false,
      inStock: true,
      createdAt: new Date().toISOString(),
    })
    setModalMode('create')
  }

  const openEditModal = (p: Product) => {
    setEditingProduct({ ...p })
    setModalMode('edit')
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    const slug = editingProduct.slug || editingProduct.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const finalProduct = { ...editingProduct, slug }

    if (modalMode === 'create') {
      addProduct(finalProduct)
    } else {
      updateProduct(finalProduct)
    }
    setModalMode(null)
    setEditingProduct(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-champagne pb-6">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stone variety or shade…"
              className="w-full bg-ivory border border-champagne pl-9 pr-4 py-2 text-xs text-obsidian focus:border-bronze focus:outline-none"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-champagne bg-ivory px-3 py-2 text-xs text-obsidian focus:border-bronze focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name.en}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="btn btn-solid btn-sm inline-flex items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Table */}
      <div className="border border-champagne bg-ivory shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-ivory-deep/60 border-b border-champagne eyebrow text-[0.625rem] text-taupe-deep">
            <tr>
              <th className="py-3 px-6">Thumbnail & Name</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Shade</th>
              <th className="py-3 px-6">Thickness</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-champagne/40">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-ivory-deep/20 transition-colors">
                <td className="py-3 px-6 flex items-center gap-3">
                  <img
                    src={prod.images[0]}
                    alt=""
                    className="h-10 w-10 object-cover border border-champagne shrink-0"
                  />
                  <div>
                    <span className="font-semibold text-obsidian block">{prod.name.en}</span>
                    <span className="text-[0.6875rem] text-taupe-deep">{prod.name.hi || prod.slug}</span>
                  </div>
                </td>
                <td className="py-3 px-6 font-medium text-obsidian capitalize">
                  {prod.categorySlug.replace('-', ' ')}
                </td>
                <td className="py-3 px-6 text-taupe-deep">{prod.shade}</td>
                <td className="py-3 px-6 text-obsidian">{prod.thickness}</td>
                <td className="py-3 px-6">
                  <span
                    className={cn(
                      'px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider',
                      prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800',
                    )}
                  >
                    {prod.inStock ? 'In Stock' : 'On Request'}
                  </span>
                </td>
                <td className="py-3 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 text-obsidian hover:text-bronze transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete product "${prod.name.en}"?`)) {
                          deleteProduct(prod.id)
                        }
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Add / Edit Modal */}
      {modalMode && editingProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-xs p-4 overflow-y-auto"
        >
          <div className="bg-ivory border border-champagne max-w-2xl w-full p-6 sm:p-8 shadow-lifted max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-champagne mb-6">
              <h3 className="font-display text-xl text-obsidian">
                {modalMode === 'create' ? 'Add New Product Variety' : 'Edit Product Details'}
              </h3>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="text-taupe hover:text-obsidian"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="field">
                  <label className="field-label">Name (English) *</label>
                  <input
                    type="text"
                    value={editingProduct.name.en}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: { ...editingProduct.name, en: e.target.value },
                      })
                    }
                    className="field-input"
                    required
                  />
                </div>
                <div className="field">
                  <label className="field-label">Name (Hindi)</label>
                  <input
                    type="text"
                    value={editingProduct.name.hi || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: { ...editingProduct.name, hi: e.target.value },
                      })
                    }
                    className="field-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="field">
                  <label className="field-label">Category *</label>
                  <select
                    value={editingProduct.categorySlug}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, categorySlug: e.target.value })
                    }
                    className="field-input cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="field-label">Shade Line *</label>
                  <input
                    type="text"
                    value={editingProduct.shade}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, shade: e.target.value })
                    }
                    placeholder="e.g. Kota Blue or Makrana White"
                    className="field-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="field">
                  <label className="field-label">Thickness Specification *</label>
                  <input
                    type="text"
                    value={editingProduct.thickness}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, thickness: e.target.value })
                    }
                    placeholder="e.g. 18–25 mm (calibrated)"
                    className="field-input"
                    required
                  />
                </div>
                <div className="field">
                  <label className="field-label">Image Path</label>
                  <input
                    type="text"
                    value={editingProduct.images[0] || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, images: [e.target.value] })
                    }
                    className="field-input"
                    placeholder="/images/products/..."
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Short Summary (English) *</label>
                <input
                  type="text"
                  value={editingProduct.summary.en}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      summary: { ...editingProduct.summary, en: e.target.value },
                    })
                  }
                  className="field-input"
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Detailed Description (English) *</label>
                <textarea
                  rows={3}
                  value={editingProduct.description.en}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: { ...editingProduct.description, en: e.target.value },
                    })
                  }
                  className="field-input"
                  required
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                    }
                  />
                  <span>Ready Stock Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, featured: e.target.checked })
                    }
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-champagne mt-4">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-solid btn-sm">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   VIEW 3: Categories CRUD
   ========================================================================== */

function CategoriesCRUDView() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategoriesStore()
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const openCreateModal = () => {
    setEditingCategory({
      id: `cat-${Date.now()}`,
      slug: '',
      name: { en: '', hi: '' },
      tagline: { en: '', hi: '' },
      description: { en: '', hi: '' },
      applications: [{ en: 'Commercial Flooring' }],
      image: '/images/categories/kota-stone.svg',
      bannerImage: '/images/categories/kota-stone.svg',
      sortOrder: categories.length + 1,
    })
    setModalMode('create')
  }

  const openEditModal = (c: Category) => {
    setEditingCategory({ ...c })
    setModalMode('edit')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCategory) return

    const slug = editingCategory.slug || editingCategory.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const finalCat = { ...editingCategory, slug }

    if (modalMode === 'create') {
      addCategory(finalCat)
    } else {
      updateCategory(finalCat)
    }
    setModalMode(null)
    setEditingCategory(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-champagne pb-6">
        <div>
          <p className="text-xs text-taupe-deep">Manage primary stone categories and application domains</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="btn btn-solid btn-sm inline-flex items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="border border-champagne bg-ivory p-6 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="index-num">Order: {cat.sortOrder}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(cat)}
                    className="p-1 text-obsidian hover:text-bronze"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.name.en}"?`)) {
                        deleteCategory(cat.id)
                      }
                    }}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-display text-xl text-obsidian">{cat.name.en}</h3>
              <p className="text-xs font-semibold text-bronze uppercase tracking-wider">{cat.tagline.en}</p>
              <p className="text-xs text-obsidian/75 leading-relaxed line-clamp-3 mt-1">{cat.description.en}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-champagne/40 text-[0.6875rem] text-taupe-deep">
              Slug: <code className="text-obsidian">{cat.slug}</code>
            </div>
          </div>
        ))}
      </div>

      {modalMode && editingCategory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-xs p-4"
        >
          <div className="bg-ivory border border-champagne max-w-lg w-full p-6 shadow-lifted">
            <h3 className="font-display text-xl text-obsidian mb-4">
              {modalMode === 'create' ? 'Add New Category' : 'Edit Category'}
            </h3>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="field">
                <label className="field-label">Category Name (English) *</label>
                <input
                  type="text"
                  value={editingCategory.name.en}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: { ...editingCategory.name, en: e.target.value },
                    })
                  }
                  className="field-input"
                  required
                />
              </div>
              <div className="field">
                <label className="field-label">Tagline (English) *</label>
                <input
                  type="text"
                  value={editingCategory.tagline.en}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      tagline: { ...editingCategory.tagline, en: e.target.value },
                    })
                  }
                  className="field-input"
                  required
                />
              </div>
              <div className="field">
                <label className="field-label">Description *</label>
                <textarea
                  rows={3}
                  value={editingCategory.description.en}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: { ...editingCategory.description, en: e.target.value },
                    })
                  }
                  className="field-input"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-solid btn-sm">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   VIEW 4: Finishes & Sizes View
   ========================================================================== */

function FinishesView() {
  const { finishes, updateFinish } = useFinishesStore()
  const [editingFinish, setEditingFinish] = useState<any>(null)

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-champagne pb-4">
        <p className="text-xs text-taupe-deep">
          Standard stone surface finishes calibrated across Rajasthan processing facilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finishes.map((fin) => (
          <div key={fin.id} className="border border-champagne bg-ivory p-6 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-bronze">{fin.id}</span>
                <button
                  type="button"
                  onClick={() => setEditingFinish({ ...fin })}
                  className="text-xs font-semibold text-bronze hover:underline"
                >
                  Edit
                </button>
              </div>
              <h3 className="font-display text-xl text-obsidian">{fin.name.en}</h3>
              <span className="text-[0.6875rem] text-taupe-deep">{fin.name.hi}</span>
              <p className="text-xs leading-relaxed text-obsidian/75 mt-2">{fin.description.en}</p>
            </div>
          </div>
        ))}
      </div>

      {editingFinish && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-xs p-4"
        >
          <div className="bg-ivory border border-champagne max-w-md w-full p-6 shadow-lifted">
            <h3 className="font-display text-xl text-obsidian mb-4">Edit Finish Specification</h3>
            <div className="flex flex-col gap-4">
              <div className="field">
                <label className="field-label">Name (English)</label>
                <input
                  type="text"
                  value={editingFinish.name.en}
                  onChange={(e) =>
                    setEditingFinish({
                      ...editingFinish,
                      name: { ...editingFinish.name, en: e.target.value },
                    })
                  }
                  className="field-input"
                />
              </div>
              <div className="field">
                <label className="field-label">Description</label>
                <textarea
                  rows={3}
                  value={editingFinish.description.en}
                  onChange={(e) =>
                    setEditingFinish({
                      ...editingFinish,
                      description: { ...editingFinish.description, en: e.target.value },
                    })
                  }
                  className="field-input"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingFinish(null)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateFinish(editingFinish)
                    setEditingFinish(null)
                  }}
                  className="btn btn-solid btn-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   VIEW 5: Inquiries Management
   ========================================================================== */

function InquiriesView() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useInquiriesStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter
    const matchesSearch =
      !searchTerm ||
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-champagne pb-6">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer name, email or requirement…"
              className="w-full bg-ivory border border-champagne pl-9 pr-4 py-2 text-xs text-obsidian focus:border-bronze focus:outline-none"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-champagne bg-ivory px-3 py-2 text-xs text-obsidian focus:border-bronze focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New Leads</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <span className="text-xs text-taupe-deep font-semibold tracking-wider uppercase">
          {filtered.length} Inquiries Recorded
        </span>
      </div>

      {/* Table */}
      <div className="border border-champagne bg-ivory shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-ivory-deep/60 border-b border-champagne eyebrow text-[0.625rem] text-taupe-deep">
            <tr>
              <th className="py-3 px-6">Customer</th>
              <th className="py-3 px-6">Contact Details</th>
              <th className="py-3 px-6">Subject / Variety</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-champagne/40">
            {filtered.map((inq) => (
              <tr key={inq.id} className="hover:bg-ivory-deep/20 transition-colors">
                <td className="py-3.5 px-6 font-semibold text-obsidian">
                  <span>{inq.name}</span>
                  {inq.company && (
                    <span className="block text-[0.6875rem] text-taupe font-normal">
                      {inq.company}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-6 text-taupe-deep">
                  <span className="block text-obsidian font-medium">{inq.phone}</span>
                  <span className="text-[0.6875rem]">{inq.email}</span>
                </td>
                <td className="py-3.5 px-6 max-w-xs">
                  <span className="font-medium text-obsidian block truncate">{inq.subject}</span>
                  <span className="text-[0.6875rem] text-taupe-deep truncate block">
                    {inq.message}
                  </span>
                </td>
                <td className="py-3.5 px-6">
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      updateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                    }
                    className="border border-champagne bg-ivory px-2 py-1 text-[0.6875rem] font-medium text-obsidian cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="py-3.5 px-6 text-taupe-deep">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3.5 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(inq)}
                      className="p-1.5 text-obsidian hover:text-bronze"
                      title="View Full Message"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Delete this inquiry record?')) {
                          deleteInquiry(inq.id)
                        }
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-xs p-4"
        >
          <div className="bg-ivory border border-champagne max-w-lg w-full p-8 shadow-lifted">
            <div className="flex items-center justify-between pb-4 border-b border-champagne mb-4">
              <div>
                <span className="eyebrow text-bronze">Inquiry ID: {selectedInquiry.id}</span>
                <h3 className="font-display text-xl text-obsidian mt-1">{selectedInquiry.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-taupe hover:text-obsidian"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-ivory-deep/40 p-3 border border-champagne/40">
                <div>
                  <span className="eyebrow text-taupe-deep block">Company</span>
                  <span className="text-obsidian font-medium">{selectedInquiry.company || 'Private'}</span>
                </div>
                <div>
                  <span className="eyebrow text-taupe-deep block">Phone</span>
                  <span className="text-obsidian font-medium">{selectedInquiry.phone}</span>
                </div>
                <div>
                  <span className="eyebrow text-taupe-deep block">Email</span>
                  <span className="text-obsidian font-medium">{selectedInquiry.email}</span>
                </div>
                <div>
                  <span className="eyebrow text-taupe-deep block">Product Interest</span>
                  <span className="text-obsidian font-medium">{selectedInquiry.productSlug || 'General'}</span>
                </div>
              </div>

              <div>
                <span className="eyebrow text-taupe-deep block mb-1">Subject</span>
                <p className="text-sm font-semibold text-obsidian">{selectedInquiry.subject}</p>
              </div>

              <div>
                <span className="eyebrow text-taupe-deep block mb-1">Customer Requirement</span>
                <p className="text-xs leading-relaxed text-obsidian/85 bg-ivory-deep/60 p-4 border border-champagne/60 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-champagne">
                <div className="flex items-center gap-2">
                  <span className="text-taupe-deep font-medium">Status:</span>
                  <StatusBadge status={selectedInquiry.status} />
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="btn btn-solid btn-sm"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   VIEW 6: Gallery CRUD
   ========================================================================== */

function GalleryCRUDView() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useGalleryStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    caption: '',
    collection: 'stone-collection' as GalleryCollectionId,
    image: '/images/hero/hero-main.svg',
  })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    addGalleryItem({
      id: `gal-${Date.now()}`,
      title: { en: newItem.title },
      caption: { en: newItem.caption },
      collection: newItem.collection,
      image: newItem.image,
    })
    setModalOpen(false)
    setNewItem({
      title: '',
      caption: '',
      collection: 'stone-collection',
      image: '/images/hero/hero-main.svg',
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-champagne pb-6">
        <p className="text-xs text-taupe-deep">Manage photo gallery items across stockyards and installations</p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="btn btn-solid btn-sm inline-flex items-center gap-1.5"
        >
          <Plus size={14} />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="border border-champagne bg-ivory p-3 shadow-xs flex flex-col justify-between">
            <div className="relative aspect-[4/3] bg-ivory-deep overflow-hidden border border-champagne/40">
              <img src={item.image} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Remove photo from gallery?')) {
                    deleteGalleryItem(item.id)
                  }
                }}
                className="absolute top-2 right-2 h-7 w-7 grid place-items-center bg-obsidian/80 text-red-300 hover:bg-red-900 transition-colors"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div className="pt-3">
              <span className="eyebrow text-[0.5625rem] text-bronze capitalize block">{item.collection}</span>
              <span className="font-display text-base text-obsidian block truncate mt-0.5">{item.title.en}</span>
              <p className="text-[0.6875rem] text-taupe-deep line-clamp-2 mt-1">{item.caption.en}</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-xs p-4"
        >
          <div className="bg-ivory border border-champagne max-w-md w-full p-6 shadow-lifted">
            <h3 className="font-display text-xl text-obsidian mb-4">Add Gallery Item</h3>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <div className="field">
                <label className="field-label">Title *</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="field-input"
                  required
                />
              </div>
              <div className="field">
                <label className="field-label">Collection</label>
                <select
                  value={newItem.collection}
                  onChange={(e) => setNewItem({ ...newItem, collection: e.target.value as GalleryCollectionId })}
                  className="field-input cursor-pointer"
                >
                  <option value="stone-collection">Stone Collection</option>
                  <option value="stockyard">Stockyard</option>
                  <option value="processing">Processing</option>
                  <option value="applications">Applications</option>
                  <option value="completed-projects">Completed Projects</option>
                </select>
              </div>
              <div className="field">
                <label className="field-label">Image Path</label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="field-input"
                  required
                />
              </div>
              <div className="field">
                <label className="field-label">Caption</label>
                <textarea
                  rows={2}
                  value={newItem.caption}
                  onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                  className="field-input"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-solid btn-sm">
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   VIEW 7: Website Banners CRUD
   ========================================================================== */

function BannersCRUDView() {
  const { banners, updateBanner } = useBannersStore()

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-champagne pb-4">
        <p className="text-xs text-taupe-deep">Manage featured promotional hero callouts and headlines</p>
      </div>

      <div className="flex flex-col gap-4">
        {banners.map((ban: Banner) => (
          <div key={ban.id} className="border border-champagne bg-ivory p-6 shadow-xs flex items-center justify-between">
            <div className="flex flex-col gap-1 max-w-xl">
              <span className="eyebrow text-[0.625rem] text-bronze">Banner #{ban.id}</span>
              <h4 className="font-display text-lg text-obsidian">{ban.title.en}</h4>
              <p className="text-xs text-obsidian/70">{ban.subtitle.en}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[0.625rem] text-taupe font-semibold tracking-wider uppercase">Link:</span>
                <code className="text-xs text-bronze">{ban.ctaHref}</code>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => updateBanner({ ...ban, active: !ban.active })}
                className={cn(
                  'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border',
                  ban.active
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-champagne bg-ivory-deep/60 text-taupe',
                )}
              >
                {ban.active ? 'Active' : 'Inactive'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------------
   Status Badge Helper
   -------------------------------------------------------------------------- */

function StatusBadge({ status }: { status: InquiryStatus }) {
  switch (status) {
    case 'new':
      return (
        <span className="px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
          New Lead
        </span>
      )
    case 'contacted':
      return (
        <span className="px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
          Contacted
        </span>
      )
    case 'quoted':
      return (
        <span className="px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
          Quoted
        </span>
      )
    case 'closed':
    default:
      return (
        <span className="px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
          Closed
        </span>
      )
  }
}
