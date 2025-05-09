
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  badge?: string;
  isNew?: boolean;
  isLowStock?: boolean;
  categories: string[];
  colors: string[];
  sizes: string[];
}

export const categoryNames: Record<string, string> = {
  'new': 'Novos Produtos',
  'camisetas': 'Camisetas',
  'moletons': 'Moletons',
  'acessorios': 'Acessórios',
  'calcas': 'Calças',
  'best-sellers': 'Mais Vendidos',
  'moda': 'Moda',
};

// Filter options
export const filterOptions = [
  {
    id: 'size',
    name: 'Tamanho',
    options: [
      { id: 'p', label: 'P' },
      { id: 'm', label: 'M' },
      { id: 'g', label: 'G' },
      { id: 'gg', label: 'GG' },
      { id: 'xgg', label: 'XGG' },
    ]
  },
  {
    id: 'color',
    name: 'Cor',
    options: [
      { id: 'black', label: 'Preto' },
      { id: 'white', label: 'Branco' },
      { id: 'gray', label: 'Cinza' },
      { id: 'blue', label: 'Azul' },
      { id: 'beige', label: 'Bege' },
      { id: 'green', label: 'Verde' },
      { id: 'red', label: 'Vermelho' },
      { id: 'purple', label: 'Roxo' },
    ]
  },
  {
    id: 'price',
    name: 'Preço',
    options: [
      { id: 'under-100', label: 'Até R$ 100' },
      { id: '100-200', label: 'R$ 100 - R$ 200' },
      { id: '200-300', label: 'R$ 200 - R$ 300' },
      { id: 'over-300', label: 'Acima de R$ 300' },
    ]
  },
];

// Expanded products array with 20 items total
export const allProducts: Product[] = [
  // Original products
  {
    id: '1',
    name: 'Camiseta Chaos DropZone',
    price: 119.90,
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    categories: ['camisetas', 'new'],
    colors: ['black'],
    sizes: ['p', 'm', 'g', 'gg'],
  },
  {
    id: '2',
    name: 'Moletom DropZone "Signature" Azul Marinho',
    price: 249.90,
    imageUrl: 'https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    categories: ['moletons', 'new', 'best-sellers'],
    colors: ['blue'],
    sizes: ['m', 'g', 'gg', 'xgg'],
  },
  {
    id: '3',
    name: 'Bucket DropZone Preto',
    price: 89.90,
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    categories: ['acessorios', 'new'],
    colors: ['black'],
    sizes: ['m', 'g'],
  },
  {
    id: '4',
    name: 'Camiseta Sketch DropZone',
    price: 119.90,
    imageUrl: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    categories: ['camisetas', 'new'],
    colors: ['white'],
    sizes: ['p', 'm', 'g'],
  },
  {
    id: '5',
    name: 'Calça DropZone Big Wear',
    price: 229.90,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    isLowStock: true,
    categories: ['calcas', 'best-sellers'],
    colors: ['black'],
    sizes: ['m', 'g', 'gg'],
  },
  {
    id: '6',
    name: 'Camiseta Manga Longa DropZone',
    price: 149.90,
    imageUrl: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?auto=format&fit=crop&w=800&q=80',
    badge: 'BEST SELLER',
    categories: ['camisetas', 'best-sellers'],
    colors: ['beige', 'blue'],
    sizes: ['p', 'm', 'g', 'gg'],
  },
  {
    id: '7',
    name: 'Moletom DropZone Basic',
    price: 199.90,
    imageUrl: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80',
    categories: ['moletons'],
    colors: ['gray'],
    sizes: ['m', 'g', 'gg'],
  },
  {
    id: '8',
    name: 'Boné DropZone',
    price: 79.90,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    badge: 'BEST SELLER',
    categories: ['acessorios', 'best-sellers'],
    colors: ['blue'],
    sizes: ['unique'],
  },
  
  // New products
  {
    id: '9',
    name: 'Camiseta DropZone Oversized "Urban Vibes"',
    price: 129.90,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    categories: ['camisetas', 'new'],
    colors: ['black', 'white'],
    sizes: ['m', 'g', 'gg', 'xgg'],
  },
  {
    id: '10',
    name: 'Calça Cargo DropZone Tech Wear',
    price: 279.90,
    imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    categories: ['calcas', 'new'],
    colors: ['black', 'beige'],
    sizes: ['p', 'm', 'g', 'gg'],
  },
  {
    id: '11',
    name: 'Moletom DropZone Cropped Feminino',
    price: 189.90,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    categories: ['moletons', 'new'],
    colors: ['white', 'gray', 'purple'],
    sizes: ['p', 'm', 'g'],
  },
  {
    id: '12',
    name: 'Boné DropZone Estampado',
    price: 89.90,
    imageUrl: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80',
    categories: ['acessorios'],
    colors: ['black', 'red'],
    sizes: ['unique'],
  },
  {
    id: '13',
    name: 'Camiseta DropZone "Minimal Logo"',
    price: 109.90,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    categories: ['camisetas', 'best-sellers'],
    colors: ['white', 'black'],
    sizes: ['p', 'm', 'g', 'gg'],
    badge: 'BEST SELLER',
  },
  {
    id: '14',
    name: 'Jaqueta Corta-Vento DropZone',
    price: 299.90,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    categories: ['moletons', 'new'],
    colors: ['black', 'green'],
    sizes: ['m', 'g', 'gg'],
  },
  {
    id: '15',
    name: 'Meia DropZone Pack com 3',
    price: 59.90,
    imageUrl: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
    categories: ['acessorios'],
    colors: ['black', 'white', 'gray'],
    sizes: ['unique'],
  },
  {
    id: '16',
    name: 'Calça Moletom DropZone Comfort',
    price: 189.90,
    imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    categories: ['calcas', 'best-sellers'],
    colors: ['gray', 'black'],
    sizes: ['p', 'm', 'g', 'gg', 'xgg'],
    badge: 'BEST SELLER',
  },
  {
    id: '17',
    name: 'Camiseta DropZone Tie-Dye',
    price: 139.90,
    imageUrl: 'https://images.unsplash.com/photo-1529374814797-1dfbcfe2e9a3?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    categories: ['camisetas', 'new'],
    colors: ['purple', 'blue'],
    sizes: ['p', 'm', 'g', 'gg'],
    isLowStock: true,
  },
  {
    id: '18',
    name: 'Shoulder Bag DropZone',
    price: 119.90,
    imageUrl: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=800&q=80',
    categories: ['acessorios', 'best-sellers'],
    colors: ['black'],
    sizes: ['unique'],
  },
  {
    id: '19',
    name: 'Moletom DropZone Hoodie Colorblock',
    price: 259.90,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    categories: ['moletons', 'new'],
    colors: ['black', 'red', 'gray'],
    sizes: ['m', 'g', 'gg', 'xgg'],
  },
  {
    id: '20',
    name: 'Bermuda Cargo DropZone',
    price: 159.90,
    imageUrl: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=800&q=80',
    categories: ['calcas'],
    colors: ['beige', 'black'],
    sizes: ['p', 'm', 'g', 'gg'],
  },
];
