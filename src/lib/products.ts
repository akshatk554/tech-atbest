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
  about?: string;
  specs?: Record<string, string>;
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
  { slug: "laptops", title: "Laptops", blurb: "Ultrabooks, gaming rigs and creator machines from Apple, Lenovo, ASUS, HP, Dell and Samsung — hand-picked specs with one-click checkout.", brands: ["Lenovo", "ASUS", "Apple", "Samsung", "HP", "Dell"], group: "computers" },
  { slug: "desktops", title: "Desktops", blurb: "Prebuilt towers, all-in-ones and compact mini PCs from Apple, Dell, HP and Lenovo — workstation power and gaming rigs ready out of the box.", brands: ["HP", "Dell", "Apple", "Lenovo"], group: "computers" },
  { slug: "monitors", title: "Monitors", blurb: "4K, ultrawide and high-refresh gaming panels from LG, Samsung, Dell and BenQ — colour-accurate picks for both work and play.", brands: ["LG", "Samsung", "Dell", "BenQ"], group: "accessories" },
  { slug: "ram", title: "RAM", blurb: "DDR4 and DDR5 memory kits from Corsair, Kingston, G.Skill and Crucial — XMP and EXPO tuned upgrades for desktops and laptops.", brands: ["Corsair", "Kingston", "G.Skill", "Crucial"], group: "accessories" },
  { slug: "ssd", title: "SSDs", blurb: "NVMe and SATA storage from Samsung, WD, Crucial and Kingston — boot-drive upgrades and portable SSDs with verified read and write speeds.", brands: ["Samsung", "WD", "Crucial", "Kingston"], group: "accessories" },
  { slug: "keyboards", title: "Keyboards", blurb: "Mechanical, low-profile and wireless keyboards from Keychron, Logitech and Razer — productivity boards and tournament-grade esports gear.", brands: ["Logitech", "Keychron", "Razer"], group: "accessories" },
  { slug: "mice", title: "Mice", blurb: "Precision productivity and esports mice from Logitech, Razer and SteelSeries — ergonomic, ultralight and Bluetooth picks for every desk.", brands: ["Logitech", "Razer", "SteelSeries"], group: "accessories" },
  { slug: "headphones", title: "Headphones", blurb: "Studio, gaming and wireless cans from Sony, Bose, JBL and HyperX — flagship ANC headphones and budget-friendly daily drivers.", brands: ["Sony", "Bose", "JBL", "HyperX"], group: "accessories" },
];

const amazon = (q: string) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`;
const flipkart = (q: string) => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`;
const mdcomputers = (q: string) => `https://mdcomputers.in/index.php?route=product/search&search=${encodeURIComponent(q)}`;

// Use Unsplash source for free product imagery
const img = (q: string, seed: number) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=75&sig=${seed}`;

export const PRODUCTS: Product[] = [
  // Laptops
  { id: "lap-1", category: "laptops", name: "Lenovo ThinkPad X1 Carbon Gen 11", brand: "Lenovo", price: 134990, mrp: 159990, rating: 4.6, image: img("photo-1496181133206-80ce9b88a853", 1), buyUrl: amazon("Lenovo ThinkPad X1 Carbon"), tag: "Business",
    about: "An ultralight 14\" business flagship with a carbon-fibre weave lid, MIL-SPEC durability and Intel vPro for IT-managed fleets.",
    specs: { CPU: "Intel Core i7-1365U vPro", RAM: "16 GB LPDDR5", Storage: "512 GB NVMe SSD", Display: "14\" 2.2K IPS, 100% sRGB", Battery: "57 Wh, ~13 hrs", Weight: "1.12 kg", OS: "Windows 11 Pro" } },
  { id: "lap-2", category: "laptops", name: "ASUS ROG Zephyrus G14", brand: "ASUS", price: 149990, mrp: 174990, rating: 4.7, image: img("photo-1603302576837-37561b2e2302", 2), buyUrl: amazon("ASUS ROG Zephyrus G14"), tag: "Gaming",
    about: "A 14\" gaming powerhouse with AMD Ryzen 9 and RTX graphics, wrapped in a CNC magnesium-alloy chassis with AniMe Matrix lid.",
    specs: { CPU: "AMD Ryzen 9 8945HS", GPU: "NVIDIA RTX 4060 8 GB", RAM: "16 GB DDR5", Storage: "1 TB NVMe SSD", Display: "14\" 3K OLED 120 Hz", Battery: "76 Wh", Weight: "1.5 kg" } },
  { id: "lap-3", category: "laptops", name: "Apple MacBook Air M3 13\"", brand: "Apple", price: 114900, mrp: 119900, rating: 4.8, image: img("photo-1517336714731-489689fd1ca8", 3), buyUrl: amazon("MacBook Air M3"), tag: "Editor's pick",
    about: "Fanless, silent, and absurdly efficient. The M3 Air delivers pro-grade performance with all-day battery in a 1.24 kg shell.",
    specs: { Chip: "Apple M3 (8-core CPU, 10-core GPU)", RAM: "8 GB Unified", Storage: "256 GB SSD", Display: "13.6\" Liquid Retina", Battery: "Up to 18 hrs", Weight: "1.24 kg", OS: "macOS Sonoma" } },
  { id: "lap-4", category: "laptops", name: "Samsung Galaxy Book4 Pro", brand: "Samsung", price: 124990, rating: 4.4, image: img("photo-1525547719571-a2d4ac8945e2", 4), buyUrl: amazon("Samsung Galaxy Book4 Pro"),
    about: "A featherweight 14\" creator laptop with a glossy AMOLED panel, Intel Core Ultra and seamless Galaxy ecosystem hand-off.",
    specs: { CPU: "Intel Core Ultra 7 155H", RAM: "16 GB LPDDR5x", Storage: "512 GB NVMe SSD", Display: "14\" 3K AMOLED 120 Hz", Battery: "63 Wh", Weight: "1.23 kg" } },
  { id: "lap-5", category: "laptops", name: "HP Spectre x360 14", brand: "HP", price: 139990, mrp: 154990, rating: 4.5, image: img("photo-1588872657578-7efd1f1555ed", 5), buyUrl: amazon("HP Spectre x360 14"),
    about: "A premium 2-in-1 convertible with gem-cut aluminium chassis, OLED touch panel, and a pen-ready 360° hinge.",
    specs: { CPU: "Intel Core Ultra 7 155H", RAM: "16 GB LPDDR5", Storage: "1 TB NVMe SSD", Display: "14\" 2.8K OLED Touch", Battery: "68 Wh", Weight: "1.4 kg" } },
  { id: "lap-6", category: "laptops", name: "Dell XPS 15 9530", brand: "Dell", price: 169990, rating: 4.5, image: img("photo-1593642632559-0c6d3fc62b89", 6), buyUrl: amazon("Dell XPS 15"),
    about: "A 15.6\" creator workstation with InfinityEdge OLED, RTX graphics and CNC-milled aluminium.",
    specs: { CPU: "Intel Core i7-13700H", GPU: "NVIDIA RTX 4050 6 GB", RAM: "16 GB DDR5", Storage: "512 GB NVMe SSD", Display: "15.6\" 3.5K OLED Touch", Battery: "86 Wh", Weight: "1.86 kg" } },

  // Desktops
  { id: "desk-1", category: "desktops", name: "Apple iMac 24\" M3", brand: "Apple", price: 134900, rating: 4.7, image: img("photo-1527443224154-c4a3942d3acf", 11), buyUrl: amazon("iMac M3 24"), tag: "All-in-one",
    about: "A 4.5K Retina canvas backed by Apple silicon — desk, monitor and Mac fused into one 11.5 mm slab.",
    specs: { Chip: "Apple M3 (8-core CPU, 10-core GPU)", RAM: "8 GB Unified", Storage: "256 GB SSD", Display: "24\" 4.5K Retina P3", Camera: "1080p FaceTime HD", OS: "macOS Sonoma" } },
  { id: "desk-2", category: "desktops", name: "HP OMEN 45L Gaming Desktop", brand: "HP", price: 184990, mrp: 199990, rating: 4.5, image: img("photo-1587202372775-e229f172b9d7", 12), buyUrl: amazon("HP OMEN 45L"), tag: "Gaming",
    about: "Cryo-chamber cooled tower built for 4K gaming, with tool-less upgrades and full RGB tempered-glass side.",
    specs: { CPU: "Intel Core i7-14700KF", GPU: "NVIDIA RTX 4070 12 GB", RAM: "32 GB DDR5 5600", Storage: "1 TB NVMe SSD", PSU: "800 W Platinum", Cooling: "Cryo Chamber 240 mm AIO" } },
  { id: "desk-3", category: "desktops", name: "Dell OptiPlex 7010 Tower", brand: "Dell", price: 64990, rating: 4.3, image: img("photo-1547082299-de196ea013d6", 13), buyUrl: amazon("Dell OptiPlex 7010"),
    about: "Reliable mid-tower business workhorse with vPro manageability and 3-year onsite warranty.",
    specs: { CPU: "Intel Core i5-13500", RAM: "8 GB DDR4", Storage: "512 GB NVMe SSD", Ports: "USB-C + 6× USB-A", OS: "Windows 11 Pro" } },
  { id: "desk-4", category: "desktops", name: "Lenovo IdeaCentre 5i", brand: "Lenovo", price: 72990, rating: 4.4, image: img("photo-1591488320449-011701bb6704", 14), buyUrl: amazon("Lenovo IdeaCentre 5i"),
    about: "Compact, quiet mid-tower for home and study with discrete graphics and easy SSD upgrades.",
    specs: { CPU: "Intel Core i5-13400", GPU: "NVIDIA GTX 1660 Super", RAM: "16 GB DDR4", Storage: "512 GB SSD + 1 TB HDD" } },
  { id: "desk-5", category: "desktops", name: "Apple Mac mini M2", brand: "Apple", price: 59900, rating: 4.8, image: img("photo-1593640408182-31c70c8268f5", 15), buyUrl: amazon("Mac mini M2"), tag: "Compact",
    about: "The smallest Mac with serious power — bring your own keyboard, mouse and display.",
    specs: { Chip: "Apple M2 (8-core CPU, 10-core GPU)", RAM: "8 GB Unified", Storage: "256 GB SSD", Ports: "2× Thunderbolt 4, HDMI, 2× USB-A", OS: "macOS Sonoma" } },

  // Monitors
  { id: "mon-1", category: "monitors", name: "LG UltraGear 27\" 1440p 165Hz", brand: "LG", price: 28990, mrp: 34990, rating: 4.6, image: img("photo-1527443195645-1133f7f28990", 21), buyUrl: amazon("LG UltraGear 27 1440p 165Hz"), tag: "Gaming",
    about: "27\" QHD IPS gaming monitor with 1 ms GTG, 165 Hz refresh and NVIDIA G-Sync compatibility.",
    specs: { Panel: "27\" IPS QHD 2560×1440", Refresh: "165 Hz", Response: "1 ms GTG", HDR: "HDR10", Ports: "2× HDMI 2.0, DP 1.4" } },
  { id: "mon-2", category: "monitors", name: "Samsung Odyssey G7 32\"", brand: "Samsung", price: 49990, rating: 4.5, image: img("photo-1551739440-5dd934d3a94a", 22), buyUrl: amazon("Samsung Odyssey G7 32"),
    about: "32\" 1000R curved QLED with 240 Hz refresh — wraps your peripheral vision in pixels.",
    specs: { Panel: "32\" VA QHD 1000R curved", Refresh: "240 Hz", Response: "1 ms", HDR: "HDR600", Ports: "2× DP, HDMI 2.0" } },
  { id: "mon-3", category: "monitors", name: "Dell UltraSharp U2723QE 4K", brand: "Dell", price: 59990, mrp: 69990, rating: 4.7, image: img("photo-1527219525722-f9767a7f2884", 23), buyUrl: amazon("Dell UltraSharp U2723QE"), tag: "Pro",
    about: "27\" 4K IPS Black panel with 98% DCI-P3, factory calibration and 90 W USB-C hub.",
    specs: { Panel: "27\" IPS Black 4K UHD", Color: "98% DCI-P3", Hub: "USB-C 90 W PD", Ports: "DP, HDMI, USB-C, RJ-45" } },
  { id: "mon-4", category: "monitors", name: "BenQ PD2705U 27\" 4K", brand: "BenQ", price: 54990, rating: 4.5, image: img("photo-1616763355548-1b606f439f86", 24), buyUrl: amazon("BenQ PD2705U"),
    about: "Designer-grade 4K IPS with Pantone validation and a Hotkey Puck for one-touch mode switching.",
    specs: { Panel: "27\" IPS 4K UHD", Color: "99% sRGB, Pantone Validated", Ports: "USB-C 90 W, DP, HDMI" } },
  { id: "mon-5", category: "monitors", name: "LG 34\" UltraWide WQHD", brand: "LG", price: 39990, rating: 4.4, image: img("photo-1546058256-47154de4046c", 25), buyUrl: amazon("LG 34 UltraWide WQHD"),
    about: "34\" 21:9 UltraWide with USB-C and Picture-by-Picture for serious multitasking.",
    specs: { Panel: "34\" IPS WQHD 3440×1440", Refresh: "100 Hz", Ports: "USB-C, HDMI, DP" } },

  // RAM
  { id: "ram-1", category: "ram", name: "Corsair Vengeance 32GB DDR5 6000", brand: "Corsair", price: 9499, mrp: 11999, rating: 4.7, image: img("photo-1591488320443-bb1c5e85d4d0", 31), buyUrl: amazon("Corsair Vengeance 32GB DDR5 6000"),
    about: "Tuned for AMD EXPO and Intel XMP 3.0 — 2×16 GB DDR5 kit with low-profile heatspreaders.",
    specs: { Capacity: "32 GB (2×16 GB)", Speed: "DDR5-6000", Timings: "CL30", Voltage: "1.35 V", Warranty: "Lifetime" } },
  { id: "ram-2", category: "ram", name: "Kingston Fury Beast 16GB DDR4 3200", brand: "Kingston", price: 3499, rating: 4.6, image: img("photo-1562408590-e32931084e23", 32), buyUrl: amazon("Kingston Fury Beast 16GB DDR4"),
    about: "Reliable DDR4 upgrade for desktops — plug-and-play XMP profile, low-profile heatspreader.",
    specs: { Capacity: "16 GB", Speed: "DDR4-3200", Timings: "CL16", Voltage: "1.35 V" } },
  { id: "ram-3", category: "ram", name: "G.Skill Trident Z5 RGB 32GB DDR5", brand: "G.Skill", price: 13990, rating: 4.7, image: img("photo-1555680202-c86f0e12f086", 33), buyUrl: amazon("G.Skill Trident Z5 RGB 32GB DDR5"), tag: "RGB",
    about: "Premium 2×16 GB DDR5-6400 kit with addressable RGB and brushed aluminium fins.",
    specs: { Capacity: "32 GB (2×16 GB)", Speed: "DDR5-6400", Timings: "CL32", RGB: "Yes, ARGB" } },
  { id: "ram-4", category: "ram", name: "Crucial 16GB DDR4 SODIMM 3200", brand: "Crucial", price: 3299, rating: 4.5, image: img("photo-1518770660439-4636190af475", 34), buyUrl: amazon("Crucial 16GB DDR4 SODIMM"),
    about: "Drop-in laptop memory upgrade — JEDEC compatible with most modern notebooks.",
    specs: { Capacity: "16 GB", FormFactor: "SODIMM", Speed: "DDR4-3200", Voltage: "1.2 V" } },
  { id: "ram-5", category: "ram", name: "Corsair Dominator Platinum 64GB DDR5", brand: "Corsair", price: 24990, rating: 4.6, image: img("photo-1517336714731-489689fd1ca8", 35), buyUrl: amazon("Corsair Dominator Platinum 64GB DDR5"),
    about: "Flagship 2×32 GB DDR5 kit with patented DHX cooling and CAPELLIX RGB LEDs.",
    specs: { Capacity: "64 GB (2×32 GB)", Speed: "DDR5-6000", Timings: "CL30" } },

  // SSDs
  { id: "ssd-1", category: "ssd", name: "Samsung 980 Pro 1TB NVMe", brand: "Samsung", price: 8499, mrp: 12999, rating: 4.8, image: img("photo-1531492746076-161ca9bcad58", 41), buyUrl: amazon("Samsung 980 Pro 1TB"), tag: "Best seller",
    about: "PCIe 4.0 NVMe SSD with 7,000 MB/s reads — PS5 compatible with the right heatsink.",
    specs: { Capacity: "1 TB", Interface: "PCIe 4.0 x4 NVMe", ReadSpeed: "7,000 MB/s", WriteSpeed: "5,000 MB/s", Endurance: "600 TBW", Warranty: "5 years" } },
  { id: "ssd-2", category: "ssd", name: "WD Black SN850X 2TB NVMe", brand: "WD", price: 15999, rating: 4.7, image: img("photo-1597872200969-2b65d56bd16b", 42), buyUrl: amazon("WD Black SN850X 2TB"),
    about: "Game-tuned PCIe 4.0 SSD with predictive loading and optional heatsink variant.",
    specs: { Capacity: "2 TB", Interface: "PCIe 4.0 x4", ReadSpeed: "7,300 MB/s", WriteSpeed: "6,600 MB/s", Endurance: "1,200 TBW" } },
  { id: "ssd-3", category: "ssd", name: "Crucial MX500 1TB SATA SSD", brand: "Crucial", price: 6499, rating: 4.7, image: img("photo-1601524909162-ae8725290836", 43), buyUrl: amazon("Crucial MX500 1TB"),
    about: "2.5\" SATA SSD — the easiest way to revive an older laptop or desktop.",
    specs: { Capacity: "1 TB", Interface: "SATA III 6 Gb/s", ReadSpeed: "560 MB/s", WriteSpeed: "510 MB/s", Endurance: "360 TBW" } },
  { id: "ssd-4", category: "ssd", name: "Kingston NV2 500GB NVMe", brand: "Kingston", price: 3499, rating: 4.5, image: img("photo-1542353436-312f0e1f67ff", 44), buyUrl: amazon("Kingston NV2 500GB NVMe"),
    about: "Budget PCIe 4.0 NVMe ideal for boot drives and small builds.",
    specs: { Capacity: "500 GB", Interface: "PCIe 4.0 x4 NVMe", ReadSpeed: "3,500 MB/s", WriteSpeed: "2,100 MB/s" } },
  { id: "ssd-5", category: "ssd", name: "Samsung T7 Portable 1TB", brand: "Samsung", price: 8999, rating: 4.8, image: img("photo-1563770660941-20978e870e26", 45), buyUrl: amazon("Samsung T7 Portable 1TB"), tag: "Portable",
    about: "Pocketable external SSD with 1,050 MB/s transfers and aluminium unibody.",
    specs: { Capacity: "1 TB", Interface: "USB 3.2 Gen 2", ReadSpeed: "1,050 MB/s", WriteSpeed: "1,000 MB/s", Weight: "58 g" } },

  // Keyboards
  { id: "kb-1", category: "keyboards", name: "Keychron K2 Pro Wireless", brand: "Keychron", price: 12499, rating: 4.7, image: img("photo-1587829741301-dc798b83add3", 51), buyUrl: amazon("Keychron K2 Pro"),
    about: "75% layout mechanical with QMK/VIA, hot-swap switches and triple-mode connectivity.",
    specs: { Layout: "75%", Switches: "Gateron Pro Brown (hot-swap)", Connectivity: "BT 5.1 / 2.4G / USB-C", Battery: "4000 mAh" } },
  { id: "kb-2", category: "keyboards", name: "Logitech MX Keys S", brand: "Logitech", price: 11995, mrp: 13995, rating: 4.7, image: img("photo-1561112078-7d24e04c3407", 52), buyUrl: amazon("Logitech MX Keys S"), tag: "Productivity",
    about: "Low-profile productivity keyboard with smart backlighting, Flow multi-device control and USB-C charging.",
    specs: { Switches: "Scissor low-profile", Connectivity: "Bolt / Bluetooth / USB-C", Battery: "Up to 10 days backlit / 5 months off" } },
  { id: "kb-3", category: "keyboards", name: "Razer Huntsman V3 Pro", brand: "Razer", price: 22990, rating: 4.5, image: img("photo-1595044426077-d36d9236d54a", 53), buyUrl: amazon("Razer Huntsman V3 Pro"),
    about: "Analog optical e-sports keyboard with adjustable actuation and Rapid Trigger.",
    specs: { Switches: "Razer Analog Optical Gen-2", Polling: "8000 Hz", RGB: "Razer Chroma per-key" } },
  { id: "kb-4", category: "keyboards", name: "Logitech G Pro X TKL", brand: "Logitech", price: 18990, rating: 4.6, image: img("photo-1618384887929-16ec33fab9ef", 54), buyUrl: amazon("Logitech G Pro X TKL"),
    about: "Tournament-grade tenkeyless wireless mechanical built with pro esports input.",
    specs: { Layout: "TKL", Switches: "GX Brown Tactile", Connectivity: "Lightspeed / BT / USB", Battery: "50 hrs" } },
  { id: "kb-5", category: "keyboards", name: "Keychron Q1 Pro QMK", brand: "Keychron", price: 19999, rating: 4.8, image: img("photo-1601445638532-3c6f6c3aa1d6", 55), buyUrl: amazon("Keychron Q1 Pro"), tag: "Enthusiast",
    about: "Full CNC aluminium 75% with double-gasket mount, screw-in stabs and QMK/VIA.",
    specs: { Layout: "75%", Build: "CNC Aluminium", Mount: "Double Gasket", Switches: "K Pro (hot-swap)" } },

  // Mice
  { id: "ms-1", category: "mice", name: "Logitech MX Master 3S", brand: "Logitech", price: 8995, mrp: 10995, rating: 4.8, image: img("photo-1527814050087-3793815479db", 61), buyUrl: amazon("Logitech MX Master 3S"), tag: "Pro",
    about: "The industry-standard productivity mouse with quiet clicks, 8K DPI sensor and MagSpeed scroll.",
    specs: { DPI: "8000", Buttons: "7", Connectivity: "Bolt / BT / USB-C", Battery: "Up to 70 days" } },
  { id: "ms-2", category: "mice", name: "Razer DeathAdder V3 Pro", brand: "Razer", price: 13990, rating: 4.7, image: img("photo-1563297007-0686b7003af7", 62), buyUrl: amazon("Razer DeathAdder V3 Pro"),
    about: "63 g ergonomic esports flagship with Focus Pro 30K sensor and 90-hour battery.",
    specs: { Weight: "63 g", Sensor: "Focus Pro 30K", Polling: "1000 Hz (4K HyperPolling dongle)" } },
  { id: "ms-3", category: "mice", name: "Logitech G502 X Plus", brand: "Logitech", price: 14990, rating: 4.6, image: img("photo-1615663245857-ac93bb7c39e7", 63), buyUrl: amazon("Logitech G502 X Plus"),
    about: "Wireless icon reborn with Lightforce optical-mechanical switches and LIGHTSYNC RGB.",
    specs: { DPI: "25600", Buttons: "13 programmable", Battery: "120 hrs" } },
  { id: "ms-4", category: "mice", name: "SteelSeries Aerox 5 Wireless", brand: "SteelSeries", price: 11990, rating: 4.5, image: img("photo-1629429407759-01cd3d7cfb38", 64), buyUrl: amazon("SteelSeries Aerox 5 Wireless"),
    about: "Honeycomb ultralight with IP54 water resistance and Quantum 2.0 dual wireless.",
    specs: { Weight: "74 g", Sensor: "TrueMove Air 18K", Battery: "180 hrs" } },
  { id: "ms-5", category: "mice", name: "Logitech Lift Vertical", brand: "Logitech", price: 6995, rating: 4.5, image: img("photo-1586816001966-79b736744398", 65), buyUrl: amazon("Logitech Lift Vertical"),
    about: "Ergonomic 57° vertical mouse designed for comfort during long sessions.",
    specs: { DPI: "4000", Connectivity: "Bolt / BT", Battery: "Up to 2 years (AA)" } },

  // Headphones
  { id: "hp-1", category: "headphones", name: "Sony WH-1000XM5", brand: "Sony", price: 26990, mrp: 34990, rating: 4.8, image: img("photo-1505740420928-5e560c06d30e", 71), buyUrl: amazon("Sony WH-1000XM5"), tag: "ANC",
    about: "Industry-leading noise cancellation with eight mics, 30-hour battery and Speak-to-Chat.",
    specs: { Driver: "30 mm carbon-fibre", Battery: "30 hrs ANC on", Codecs: "LDAC, AAC, SBC", Weight: "250 g" } },
  { id: "hp-2", category: "headphones", name: "Bose QuietComfort Ultra", brand: "Bose", price: 35900, rating: 4.7, image: img("photo-1583394838336-acd977736f90", 72), buyUrl: amazon("Bose QuietComfort Ultra"),
    about: "Bose's flagship with Immersive Audio spatial sound and class-leading comfort.",
    specs: { Battery: "24 hrs", Codecs: "Snapdragon Sound aptX Adaptive", Weight: "254 g" } },
  { id: "hp-3", category: "headphones", name: "JBL Tune 770NC", brand: "JBL", price: 6999, rating: 4.4, image: img("photo-1546435770-a3e426bf472b", 73), buyUrl: amazon("JBL Tune 770NC"),
    about: "Budget ANC over-ear with 70-hour battery and JBL Pure Bass.",
    specs: { Battery: "70 hrs", ANC: "Adaptive", Charging: "USB-C, 5 min = 3 hrs" } },
  { id: "hp-4", category: "headphones", name: "HyperX Cloud III", brand: "HyperX", price: 8990, rating: 4.6, image: img("photo-1599669454699-248893623440", 74), buyUrl: amazon("HyperX Cloud III"), tag: "Gaming",
    about: "Comfort-king gaming headset with 53 mm angled drivers and DTS spatial audio.",
    specs: { Driver: "53 mm angled", Microphone: "10 mm detachable", Connectivity: "3.5 mm + USB-C DAC" } },
  { id: "hp-5", category: "headphones", name: "Sony INZONE H9", brand: "Sony", price: 24990, rating: 4.5, image: img("photo-1612444530582-fc66183b16f7", 75), buyUrl: amazon("Sony INZONE H9"),
    about: "Wireless gaming headset with 360 Spatial Sound for Gaming and dual BT + 2.4 G.",
    specs: { Battery: "32 hrs", Connectivity: "2.4 G dongle + BT", Driver: "40 mm" } },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const productsByCategory = (slug: CategorySlug) => PRODUCTS.filter((p) => p.category === slug);
export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// ---------- Multi-image gallery ----------
const GALLERY_POOL: Record<CategorySlug, string[]> = {
  laptops: [
    "photo-1496181133206-80ce9b88a853",
    "photo-1517336714731-489689fd1ca8",
    "photo-1593642632559-0c6d3fc62b89",
    "photo-1525547719571-a2d4ac8945e2",
    "photo-1588872657578-7efd1f1555ed",
    "photo-1603302576837-37561b2e2302",
  ],
  desktops: [
    "photo-1527443224154-c4a3942d3acf",
    "photo-1587202372775-e229f172b9d7",
    "photo-1593640408182-31c70c8268f5",
    "photo-1547082299-de196ea013d6",
    "photo-1591488320449-011701bb6704",
  ],
  monitors: [
    "photo-1527443195645-1133f7f28990",
    "photo-1551739440-5dd934d3a94a",
    "photo-1527219525722-f9767a7f2884",
    "photo-1616763355548-1b606f439f86",
    "photo-1546058256-47154de4046c",
  ],
  ram: [
    "photo-1591488320443-bb1c5e85d4d0",
    "photo-1562408590-e32931084e23",
    "photo-1555680202-c86f0e12f086",
    "photo-1518770660439-4636190af475",
  ],
  ssd: [
    "photo-1531492746076-161ca9bcad58",
    "photo-1597872200969-2b65d56bd16b",
    "photo-1601524909162-ae8725290836",
    "photo-1542353436-312f0e1f67ff",
    "photo-1563770660941-20978e870e26",
  ],
  keyboards: [
    "photo-1587829741301-dc798b83add3",
    "photo-1561112078-7d24e04c3407",
    "photo-1595044426077-d36d9236d54a",
    "photo-1618384887929-16ec33fab9ef",
    "photo-1601445638532-3c6f6c3aa1d6",
  ],
  mice: [
    "photo-1527814050087-3793815479db",
    "photo-1563297007-0686b7003af7",
    "photo-1615663245857-ac93bb7c39e7",
    "photo-1629429407759-01cd3d7cfb38",
    "photo-1586816001966-79b736744398",
  ],
  headphones: [
    "photo-1505740420928-5e560c06d30e",
    "photo-1583394838336-acd977736f90",
    "photo-1546435770-a3e426bf472b",
    "photo-1599669454699-248893623440",
    "photo-1612444530582-fc66183b16f7",
  ],
};

// Deterministic hash so seller prices stay stable per product
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function getGallery(p: Product): string[] {
  const pool = GALLERY_POOL[p.category];
  const h = hash(p.id);
  const picks = [p.image];
  for (let i = 0; i < 4; i++) {
    const photo = pool[(h + i * 7) % pool.length];
    picks.push(`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=75&sig=${hash(p.id + i)}`);
  }
  // de-dup while keeping order
  return Array.from(new Set(picks)).slice(0, 5);
}

export type SellerOffer = {
  name: "tech.at.best" | "Amazon.in" | "Flipkart" | "MD Computers";
  price: number;
  url: string;
  shipping: string;
  badge?: string;
};

// Build indicative offers across partner retailers. Prices are stable per
// product (seeded) and link out to each retailer's live search for the
// current price.
export function getOffers(p: Product): SellerOffer[] {
  const h = hash(p.id);
  const aDelta = ((h % 13) - 6) / 100; // ±6%
  const fDelta = (((h >> 3) % 11) - 5) / 100; // ±5%
  const mDelta = (((h >> 5) % 9) - 4) / 100; // ±4%

  const round = (n: number) => Math.round(n / 10) * 10;

  const offers: SellerOffer[] = [
    { name: "tech.at.best", price: p.price, url: p.buyUrl, shipping: "Free · 2–4 day delivery", badge: "Curated" },
    { name: "Amazon.in", price: round(p.price * (1 + aDelta)), url: amazon(p.name), shipping: "Prime eligible" },
    { name: "Flipkart", price: round(p.price * (1 + fDelta)), url: flipkart(p.name), shipping: "Flipkart Plus" },
    { name: "MD Computers", price: round(p.price * (1 + mDelta)), url: mdcomputers(p.name), shipping: "Kolkata HQ · pan-India" },
  ];
  return offers.sort((a, b) => a.price - b.price);
}

export function getSimilar(p: Product, limit = 8): Product[] {
  return PRODUCTS.filter((x) => x.id !== p.id)
    .map((x) => ({ x, score: (x.category === p.category ? 2 : 0) + (x.brand === p.brand ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || Math.abs(a.x.price - p.price) - Math.abs(b.x.price - p.price))
    .slice(0, limit)
    .map((s) => s.x);
}
