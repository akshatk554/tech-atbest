export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp?: number;
  rating: number;
  image: string;
  buyUrl: string;
  tag?: string;
  category: CategorySlug;
};

export type CategorySlug =
  | "laptops"
  | "desktops"
  | "monitors"
  | "ram"
  | "ssd"
  | "keyboards"
  | "mice"
  | "headphones";

export const CATEGORIES: {
  slug: CategorySlug;
  title: string;
  blurb: string;
  brands: string[];
  group: "computers" | "accessories";
}[] = [
  { slug: "laptops", title: "Laptops", blurb: "Ultrabooks, gaming rigs & creator machines", brands: ["Lenovo", "ASUS", "Apple", "Samsung", "HP", "Dell"], group: "computers" },
  { slug: "desktops", title: "Desktops", blurb: "Prebuilt towers & all-in-ones", brands: ["HP", "Dell", "Apple", "Lenovo"], group: "computers" },
  { slug: "monitors", title: "Monitors", blurb: "4K, ultrawide & high refresh panels", brands: ["LG", "Samsung", "Dell", "BenQ"], group: "accessories" },
  { slug: "ram", title: "RAM", blurb: "DDR4 & DDR5 memory kits", brands: ["Corsair", "Kingston", "G.Skill", "Crucial"], group: "accessories" },
  { slug: "ssd", title: "SSDs", blurb: "NVMe & SATA storage", brands: ["Samsung", "WD", "Crucial", "Kingston"], group: "accessories" },
  { slug: "keyboards", title: "Keyboards", blurb: "Mechanical & low-profile boards", brands: ["Logitech", "Keychron", "Razer"], group: "accessories" },
  { slug: "mice", title: "Mice", blurb: "Precision & gaming pointers", brands: ["Logitech", "Razer", "SteelSeries"], group: "accessories" },
  { slug: "headphones", title: "Headphones", blurb: "Studio, gaming & wireless cans", brands: ["Sony", "Bose", "JBL", "HyperX"], group: "accessories" },
];

const amazon = (q: string) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`;

// Use Unsplash source for free product imagery
const img = (q: string, seed: number) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=70&sig=${seed}`;

export const PRODUCTS: Product[] = [
  // Laptops
  { id: "lap-1", category: "laptops", name: "Lenovo ThinkPad X1 Carbon Gen 11", brand: "Lenovo", price: 134990, mrp: 159990, rating: 4.6, image: img("photo-1496181133206-80ce9b88a853", 1), buyUrl: amazon("Lenovo ThinkPad X1 Carbon"), tag: "Business" },
  { id: "lap-2", category: "laptops", name: "ASUS ROG Zephyrus G14", brand: "ASUS", price: 149990, mrp: 174990, rating: 4.7, image: img("photo-1603302576837-37561b2e2302", 2), buyUrl: amazon("ASUS ROG Zephyrus G14"), tag: "Gaming" },
  { id: "lap-3", category: "laptops", name: "Apple MacBook Air M3 13\"", brand: "Apple", price: 114900, mrp: 119900, rating: 4.8, image: img("photo-1517336714731-489689fd1ca8", 3), buyUrl: amazon("MacBook Air M3"), tag: "Editor's pick" },
  { id: "lap-4", category: "laptops", name: "Samsung Galaxy Book4 Pro", brand: "Samsung", price: 124990, rating: 4.4, image: img("photo-1525547719571-a2d4ac8945e2", 4), buyUrl: amazon("Samsung Galaxy Book4 Pro") },
  { id: "lap-5", category: "laptops", name: "HP Spectre x360 14", brand: "HP", price: 139990, mrp: 154990, rating: 4.5, image: img("photo-1588872657578-7efd1f1555ed", 5), buyUrl: amazon("HP Spectre x360 14") },
  { id: "lap-6", category: "laptops", name: "Dell XPS 15 9530", brand: "Dell", price: 169990, rating: 4.5, image: img("photo-1593642632559-0c6d3fc62b89", 6), buyUrl: amazon("Dell XPS 15") },

  // Desktops
  { id: "desk-1", category: "desktops", name: "Apple iMac 24\" M3", brand: "Apple", price: 134900, rating: 4.7, image: img("photo-1527443224154-c4a3942d3acf", 11), buyUrl: amazon("iMac M3 24"), tag: "All-in-one" },
  { id: "desk-2", category: "desktops", name: "HP OMEN 45L Gaming Desktop", brand: "HP", price: 184990, mrp: 199990, rating: 4.5, image: img("photo-1587202372775-e229f172b9d7", 12), buyUrl: amazon("HP OMEN 45L"), tag: "Gaming" },
  { id: "desk-3", category: "desktops", name: "Dell OptiPlex 7010 Tower", brand: "Dell", price: 64990, rating: 4.3, image: img("photo-1547082299-de196ea013d6", 13), buyUrl: amazon("Dell OptiPlex 7010") },
  { id: "desk-4", category: "desktops", name: "Lenovo IdeaCentre 5i", brand: "Lenovo", price: 72990, rating: 4.4, image: img("photo-1591488320449-011701bb6704", 14), buyUrl: amazon("Lenovo IdeaCentre 5i") },
  { id: "desk-5", category: "desktops", name: "Apple Mac mini M2", brand: "Apple", price: 59900, rating: 4.8, image: img("photo-1593640408182-31c70c8268f5", 15), buyUrl: amazon("Mac mini M2"), tag: "Compact" },

  // Monitors
  { id: "mon-1", category: "monitors", name: "LG UltraGear 27\" 1440p 165Hz", brand: "LG", price: 28990, mrp: 34990, rating: 4.6, image: img("photo-1527443195645-1133f7f28990", 21), buyUrl: amazon("LG UltraGear 27 1440p 165Hz"), tag: "Gaming" },
  { id: "mon-2", category: "monitors", name: "Samsung Odyssey G7 32\"", brand: "Samsung", price: 49990, rating: 4.5, image: img("photo-1551739440-5dd934d3a94a", 22), buyUrl: amazon("Samsung Odyssey G7 32") },
  { id: "mon-3", category: "monitors", name: "Dell UltraSharp U2723QE 4K", brand: "Dell", price: 59990, mrp: 69990, rating: 4.7, image: img("photo-1527219525722-f9767a7f2884", 23), buyUrl: amazon("Dell UltraSharp U2723QE"), tag: "Pro" },
  { id: "mon-4", category: "monitors", name: "BenQ PD2705U 27\" 4K", brand: "BenQ", price: 54990, rating: 4.5, image: img("photo-1616763355548-1b606f439f86", 24), buyUrl: amazon("BenQ PD2705U") },
  { id: "mon-5", category: "monitors", name: "LG 34\" UltraWide WQHD", brand: "LG", price: 39990, rating: 4.4, image: img("photo-1546058256-47154de4046c", 25), buyUrl: amazon("LG 34 UltraWide WQHD") },

  // RAM
  { id: "ram-1", category: "ram", name: "Corsair Vengeance 32GB DDR5 6000", brand: "Corsair", price: 9499, mrp: 11999, rating: 4.7, image: img("photo-1591488320443-bb1c5e85d4d0", 31), buyUrl: amazon("Corsair Vengeance 32GB DDR5 6000") },
  { id: "ram-2", category: "ram", name: "Kingston Fury Beast 16GB DDR4 3200", brand: "Kingston", price: 3499, rating: 4.6, image: img("photo-1562408590-e32931084e23", 32), buyUrl: amazon("Kingston Fury Beast 16GB DDR4") },
  { id: "ram-3", category: "ram", name: "G.Skill Trident Z5 RGB 32GB DDR5", brand: "G.Skill", price: 13990, rating: 4.7, image: img("photo-1555680202-c86f0e12f086", 33), buyUrl: amazon("G.Skill Trident Z5 RGB 32GB DDR5"), tag: "RGB" },
  { id: "ram-4", category: "ram", name: "Crucial 16GB DDR4 SODIMM 3200", brand: "Crucial", price: 3299, rating: 4.5, image: img("photo-1518770660439-4636190af475", 34), buyUrl: amazon("Crucial 16GB DDR4 SODIMM") },
  { id: "ram-5", category: "ram", name: "Corsair Dominator Platinum 64GB DDR5", brand: "Corsair", price: 24990, rating: 4.6, image: img("photo-1517336714731-489689fd1ca8", 35), buyUrl: amazon("Corsair Dominator Platinum 64GB DDR5") },

  // SSDs
  { id: "ssd-1", category: "ssd", name: "Samsung 980 Pro 1TB NVMe", brand: "Samsung", price: 8499, mrp: 12999, rating: 4.8, image: img("photo-1531492746076-161ca9bcad58", 41), buyUrl: amazon("Samsung 980 Pro 1TB"), tag: "Best seller" },
  { id: "ssd-2", category: "ssd", name: "WD Black SN850X 2TB NVMe", brand: "WD", price: 15999, rating: 4.7, image: img("photo-1597872200969-2b65d56bd16b", 42), buyUrl: amazon("WD Black SN850X 2TB") },
  { id: "ssd-3", category: "ssd", name: "Crucial MX500 1TB SATA SSD", brand: "Crucial", price: 6499, rating: 4.7, image: img("photo-1601524909162-ae8725290836", 43), buyUrl: amazon("Crucial MX500 1TB") },
  { id: "ssd-4", category: "ssd", name: "Kingston NV2 500GB NVMe", brand: "Kingston", price: 3499, rating: 4.5, image: img("photo-1542353436-312f0e1f67ff", 44), buyUrl: amazon("Kingston NV2 500GB NVMe") },
  { id: "ssd-5", category: "ssd", name: "Samsung T7 Portable 1TB", brand: "Samsung", price: 8999, rating: 4.8, image: img("photo-1563770660941-20978e870e26", 45), buyUrl: amazon("Samsung T7 Portable 1TB"), tag: "Portable" },

  // Keyboards
  { id: "kb-1", category: "keyboards", name: "Keychron K2 Pro Wireless", brand: "Keychron", price: 12499, rating: 4.7, image: img("photo-1587829741301-dc798b83add3", 51), buyUrl: amazon("Keychron K2 Pro") },
  { id: "kb-2", category: "keyboards", name: "Logitech MX Keys S", brand: "Logitech", price: 11995, mrp: 13995, rating: 4.7, image: img("photo-1561112078-7d24e04c3407", 52), buyUrl: amazon("Logitech MX Keys S"), tag: "Productivity" },
  { id: "kb-3", category: "keyboards", name: "Razer Huntsman V3 Pro", brand: "Razer", price: 22990, rating: 4.5, image: img("photo-1595044426077-d36d9236d54a", 53), buyUrl: amazon("Razer Huntsman V3 Pro") },
  { id: "kb-4", category: "keyboards", name: "Logitech G Pro X TKL", brand: "Logitech", price: 18990, rating: 4.6, image: img("photo-1618384887929-16ec33fab9ef", 54), buyUrl: amazon("Logitech G Pro X TKL") },
  { id: "kb-5", category: "keyboards", name: "Keychron Q1 Pro QMK", brand: "Keychron", price: 19999, rating: 4.8, image: img("photo-1601445638532-3c6f6c3aa1d6", 55), buyUrl: amazon("Keychron Q1 Pro"), tag: "Enthusiast" },

  // Mice
  { id: "ms-1", category: "mice", name: "Logitech MX Master 3S", brand: "Logitech", price: 8995, mrp: 10995, rating: 4.8, image: img("photo-1527814050087-3793815479db", 61), buyUrl: amazon("Logitech MX Master 3S"), tag: "Pro" },
  { id: "ms-2", category: "mice", name: "Razer DeathAdder V3 Pro", brand: "Razer", price: 13990, rating: 4.7, image: img("photo-1563297007-0686b7003af7", 62), buyUrl: amazon("Razer DeathAdder V3 Pro") },
  { id: "ms-3", category: "mice", name: "Logitech G502 X Plus", brand: "Logitech", price: 14990, rating: 4.6, image: img("photo-1615663245857-ac93bb7c39e7", 63), buyUrl: amazon("Logitech G502 X Plus") },
  { id: "ms-4", category: "mice", name: "SteelSeries Aerox 5 Wireless", brand: "SteelSeries", price: 11990, rating: 4.5, image: img("photo-1629429407759-01cd3d7cfb38", 64), buyUrl: amazon("SteelSeries Aerox 5 Wireless") },
  { id: "ms-5", category: "mice", name: "Logitech Lift Vertical", brand: "Logitech", price: 6995, rating: 4.5, image: img("photo-1586816001966-79b736744398", 65), buyUrl: amazon("Logitech Lift Vertical") },

  // Headphones
  { id: "hp-1", category: "headphones", name: "Sony WH-1000XM5", brand: "Sony", price: 26990, mrp: 34990, rating: 4.8, image: img("photo-1505740420928-5e560c06d30e", 71), buyUrl: amazon("Sony WH-1000XM5"), tag: "ANC" },
  { id: "hp-2", category: "headphones", name: "Bose QuietComfort Ultra", brand: "Bose", price: 35900, rating: 4.7, image: img("photo-1583394838336-acd977736f90", 72), buyUrl: amazon("Bose QuietComfort Ultra") },
  { id: "hp-3", category: "headphones", name: "JBL Tune 770NC", brand: "JBL", price: 6999, rating: 4.4, image: img("photo-1546435770-a3e426bf472b", 73), buyUrl: amazon("JBL Tune 770NC") },
  { id: "hp-4", category: "headphones", name: "HyperX Cloud III", brand: "HyperX", price: 8990, rating: 4.6, image: img("photo-1599669454699-248893623440", 74), buyUrl: amazon("HyperX Cloud III"), tag: "Gaming" },
  { id: "hp-5", category: "headphones", name: "Sony INZONE H9", brand: "Sony", price: 24990, rating: 4.5, image: img("photo-1612444530582-fc66183b16f7", 75), buyUrl: amazon("Sony INZONE H9") },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const productsByCategory = (slug: CategorySlug) => PRODUCTS.filter((p) => p.category === slug);
export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
