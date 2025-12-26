import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Order, Product, Category } from '../../types';
import { LogOut, Package, ShoppingBag, BarChart3, Edit, Trash2, X, Tag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- Components for Admin Sections ---

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCat, setNewCat] = useState({ name: '', slug: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
    if (data) setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name || !newCat.slug) return;
    const { error } = await supabase.from('categories').insert(newCat);
    if (error) {
      alert('Error creando categoría: ' + error.message);
    } else {
      setNewCat({ name: '', slug: '' });
      fetchCategories();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Eliminar categoría? Los productos con esta categoría quedarán sin categoría asignada.')) {
      try {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) {
          alert('Error al eliminar: ' + error.message);
        } else {
          alert('Categoría eliminada correctamente');
          fetchCategories();
        }
      } catch (err) {
        alert('Error inesperado al eliminar categoría');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gestión de Categorías</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-2">Nombre</label>
          <input
            className="border p-2 w-full"
            placeholder="Ej. Barras"
            value={newCat.name}
            onChange={e => setNewCat({ ...newCat, name: e.target.value })}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold mb-2">Slug (URL)</label>
          <input
            className="border p-2 w-full"
            placeholder="Ej. bar"
            value={newCat.slug}
            onChange={e => setNewCat({ ...newCat, slug: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="bg-cacao-900 text-white p-2 rounded hover:bg-cacao-800 h-10 px-6">
          Agregar
        </button>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Nombre</th>
              <th className="p-4">Slug</th>
              <th className="p-4">ID</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-bold">{c.name}</td>
                <td className="p-4 bg-gray-50 font-mono text-xs">{c.slug}</td>
                <td className="p-4 text-xs text-gray-400">{c.id}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(c.id)} className="text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({ category: '', images: [] });
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    if (data) {
      setCategories(data);
      // Set default category if creating new
      if (data.length > 0 && !form.category) {
        setForm(f => ({ ...f, category: data[0].slug }));
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Selecciona una imagen.');
      }
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('products').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('products').getPublicUrl(filePath);
      setForm({ ...form, images: [data.publicUrl, ...(form.images || [])] });

    } catch (error) {
      alert('Error subiendo imagen: ' + (error as any).message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let result;
      if (editing) {
        result = await supabase.from('products').update(form).eq('id', editing.id);
      } else {
        result = await supabase.from('products').insert(form);
      }

      if (result.error) {
        alert('Error al guardar: ' + result.error.message);
        return;
      }

      alert(editing ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
      setEditing(null);
      setForm({ category: categories[0]?.slug || '', images: [] });
      fetchProducts();
    } catch (err) {
      alert('Error inesperado al guardar producto');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
      try {
        // First check if product has orders
        const { data: orderItems } = await supabase
          .from('order_items')
          .select('id')
          .eq('product_id', id)
          .limit(1);

        if (orderItems && orderItems.length > 0) {
          alert('⚠️ No se puede eliminar este producto porque tiene pedidos asociados.\n\nEn su lugar, puedes:\n1. Poner el stock en 0 para que no se pueda comprar\n2. Editar el nombre para marcarlo como "DESCONTINUADO"');
          return;
        }

        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          alert('Error al eliminar: ' + error.message);
        } else {
          alert('Producto eliminado correctamente');
          fetchProducts();
        }
      } catch (err) {
        alert('Error inesperado al eliminar producto');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gestión de Productos</h2>

      {/* Simple Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 grid grid-cols-2 gap-4">
        <input placeholder="Nombre" className="border p-2" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Slug (único)" className="border p-2" value={form.slug || ''} onChange={e => setForm({ ...form, slug: e.target.value })} required />

        {/* Category Selector */}
        <select
          className="border p-2"
          value={form.category || ''}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="" disabled>Seleccionar Categoría</option>
          {categories.map(c => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <input placeholder="Precio" type="number" step="0.01" className="border p-2" value={form.price || ''} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required />
        <input placeholder="Stock" type="number" className="border p-2 col-span-2" value={form.stock || ''} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })} required />

        {/* Image Upload */}
        <div className="col-span-2 border p-2 border-dashed bg-gray-50">
          <label className="block text-sm font-bold mb-2">Imágenes del Producto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100"
          />
          {uploading && <p className="text-sm text-blue-500 mt-2">Subiendo...</p>}

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {form.images?.map((img, i) => (
              <div key={i} className="relative group">
                <img src={img} alt="Preview" className="h-20 w-20 object-cover rounded border" />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, images: form.images?.filter((_, idx) => idx !== i) })}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <textarea placeholder="Descripción" className="border p-2 col-span-2 h-24" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit" disabled={uploading} className="bg-cacao-900 text-white p-2 rounded col-span-2 hover:bg-cacao-800 transition-colors">
          {editing ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ category: categories[0]?.slug || '', images: [] }) }} className="text-red-500 underline text-center col-span-2">Cancelar Edición</button>}
      </form>

      {/* List */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Nombre</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{p.name}</td>
                <td className="p-4">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs uppercase font-bold text-gray-600">
                    {categories.find(c => c.slug === p.category)?.name || p.category}
                  </span>
                </td>
                <td className="p-4">S/ {p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => { setEditing(p); setForm(p) }} className="text-blue-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    let q = supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (statusFilter !== 'ALL') q = q.eq('status', statusFilter);
    const { data } = await q;
    if (data) setOrders(data);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id);
      if (error) {
        alert('Error al actualizar estado: ' + error.message);
        console.error('Update error:', error);
      } else {
        alert(`Estado actualizado a: ${status}`);
        fetchOrders();
      }
    } catch (err) {
      alert('Error inesperado al actualizar pedido');
      console.error('Unexpected error:', err);
    }
  };

  const deleteOrder = async (id: string) => {
    if (window.confirm('¿Eliminar este pedido permanentemente? Esta acción no se puede deshacer.')) {
      try {
        const { error } = await supabase.from('orders').delete().eq('id', id);
        if (error) {
          alert('Error al eliminar: ' + error.message);
        } else {
          alert('Pedido eliminado correctamente');
          fetchOrders();
        }
      } catch (err) {
        alert('Error inesperado al eliminar pedido');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pedidos</h2>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['ALL', 'PENDIENTE_PAGO', 'PAGADO', 'EN_PREPARACION', 'ENVIADO', 'ENTREGADO'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-1 rounded-full text-xs font-bold ${statusFilter === s ? 'bg-cacao-900 text-white' : 'bg-white border'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded shadow border-l-4 border-cacao-900">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Orden #{order.order_number}</h3>
                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                <p className="font-bold text-gold-600 mt-1">S/ {order.total_amount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'PENDIENTE_PAGO' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {order.status}
                </span>
                <div className="mt-2">
                  <a
                    href={`https://wa.me/51${order.customer_phone}?text=${encodeURIComponent(`Hola ${order.customer_name}, te escribimos de Don Eduardo sobre tu pedido #${order.order_number}...`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 block text-center"
                  >
                    WhatsApp Cliente
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded">
              <div>
                <p className="font-bold">Cliente:</p>
                <p>{order.customer_name}</p>
                <p>{order.customer_phone}</p>
              </div>
              <div>
                <p className="font-bold">Dirección:</p>
                <p>{order.address}, {order.district}</p>
                <p className="text-gray-500 text-xs">{order.reference}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              {order.status === 'PENDIENTE_PAGO' && (
                <button onClick={() => updateStatus(order.id, 'PAGADO')} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Marcar Pagado</button>
              )}
              {order.status === 'PAGADO' && (
                <button onClick={() => updateStatus(order.id, 'EN_PREPARACION')} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Preparar</button>
              )}
              {order.status === 'EN_PREPARACION' && (
                <button onClick={() => updateStatus(order.id, 'ENVIADO')} className="bg-purple-600 text-white px-3 py-1 rounded text-sm">Enviar</button>
              )}
              <button onClick={() => deleteOrder(order.id)} className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm ml-auto">Eliminar Pedido</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Layout ---

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'products' | 'categories'>('stats');
  const [stats, setStats] = useState({ totalOrders: 0, pending: 0, revenue: 0 });
  const [authLoading, setAuthLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.log("No user or error:", userError);
        navigate('/admin/login');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      if (profile?.role !== 'admin') {
        console.warn("User is not admin:", profile?.role);
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      // If we get here, user is valid admin
      loadStats();
      setAuthLoading(false);

    } catch (error) {
      console.error("Auth check failed:", error);
      navigate('/admin/login');
    }
  };

  const loadStats = async () => {
    const { data: orders } = await supabase.from('orders').select('*');
    if (orders) {
      setStats({
        totalOrders: orders.length,
        pending: orders.filter(o => o.status === 'PENDIENTE_PAGO').length,
        revenue: orders.filter(o => o.status !== 'CANCELADO').reduce((sum, o) => sum + o.total_amount, 0)
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-cacao-900 font-bold text-xl animate-pulse">Verificando acceso...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-cacao-900 text-white p-3 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`w-64 bg-cacao-900 text-white flex flex-col fixed h-full z-40 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
        <div className="p-6 font-serif font-bold text-xl">Admin Panel</div>
        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab('stats')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'stats' ? 'bg-gold-600' : 'hover:bg-cacao-800'}`}>
            <BarChart3 size={20} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'orders' ? 'bg-gold-600' : 'hover:bg-cacao-800'}`}>
            <ShoppingBag size={20} /> Pedidos
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'products' ? 'bg-gold-600' : 'hover:bg-cacao-800'}`}>
            <Package size={20} /> Productos
          </button>
          <button onClick={() => setActiveTab('categories')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'categories' ? 'bg-gold-600' : 'hover:bg-cacao-800'}`}>
            <Tag size={20} /> Categorías
          </button>
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-gray-300 hover:text-white">
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <div className="md:hidden mb-4 flex justify-between">
          <span className="font-bold">Admin Panel</span>
          <button onClick={handleLogout}>Salir</button>
        </div>

        {activeTab === 'stats' && (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-cacao-900">Resumen</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded shadow-sm border-l-4 border-gold-500">
                <p className="text-gray-500">Ingresos Totales</p>
                <p className="text-3xl font-bold">S/ {stats.revenue.toFixed(2)}</p>
              </div>
              <div className="bg-white p-6 rounded shadow-sm border-l-4 border-cacao-900">
                <p className="text-gray-500">Pedidos Totales</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>
              <div className="bg-white p-6 rounded shadow-sm border-l-4 border-red-500">
                <p className="text-gray-500">Pendientes de Pago</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow h-80">
              <h3 className="font-bold mb-4">Ventas Recientes</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: 'Hoy', total: stats.revenue }]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'categories' && <AdminCategories />}
      </main>
    </div>
  );
};