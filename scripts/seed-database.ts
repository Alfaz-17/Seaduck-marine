import mongoose from 'mongoose';
import connectToDatabase from '../src/lib/db';
import { Category, Brand, Settings, Product, User } from '../src/lib/models';

// Configure environmental variables manually if running standalone
import * as dotenv from 'dotenv';
dotenv.config();

const productsData = [
  {
    title: "Furuno FAR-2117 X-Band Marine Radar",
    slug: "furuno-far-2117-x-band-radar",
    description: "High-performance reconditioned commercial marine radar. Sourced directly from vessel recycling corridors. Fully tested, including antenna, transceiver, and 19-inch high-resolution display unit. Ideal for mid-to-large cargo ships and supply vessels.",
    categoryName: "Marine Bridge Room Navigation Equipment",
    brandName: "Furuno",
    price: 0,
    availability: "in-stock",
    featured: true,
    image: "/images/bridge-nav.jpg",
    images: ["/images/bridge-nav.jpg"],
    keywords: ["radar", "furuno", "marine radar", "x-band"],
    specifications: {
      "Model": "FAR-2117",
      "Band": "X-Band",
      "Power Output": "12 kW",
      "Display Size": "19-inch LCD",
      "Condition": "Reconditioned & Tested"
    }
  },
  {
    title: "JRC JMA-5300 High-Resolution Marine Radar",
    slug: "jrc-jma-5300-radar",
    description: "State-of-the-art marine radar with 2-axis display system and high-speed data processing. Offers superior target tracking and sea clutter suppression. Fully serviced by our technicians in Bhavnagar.",
    categoryName: "Marine Bridge Room Navigation Equipment",
    brandName: "JRC",
    price: 0,
    availability: "in-stock",
    featured: false,
    image: "/images/why-choose-us.jpg",
    images: ["/images/why-choose-us.jpg"],
    keywords: ["radar", "jrc", "navigation"],
    specifications: {
      "Model": "JMA-5312 / JMA-5322",
      "Power Output": "10 kW",
      "Condition": "Certified Pre-owned"
    }
  },
  {
    title: "Nor Sau 8625 Engine Automation Controller",
    slug: "nor-sau-8625-automation-controller",
    description: "Professional marine engine automation and alarm monitoring module. Designed for main diesel engine supervision, cooling loop controls, and emergency shut-off automation. Heavily tested on our custom simulation rig.",
    categoryName: "Marine Automation",
    brandName: "Nor Sau",
    price: 0,
    availability: "in-stock",
    featured: true,
    image: "/images/marine-radio.jpg",
    images: ["/images/marine-radio.jpg"],
    keywords: ["automation", "engine alarm", "nor sau"],
    specifications: {
      "Part Number": "8625-SYS",
      "Application": "Main Engine Alarm & Control",
      "Input Voltage": "24V DC"
    }
  },
  {
    title: "Tanabe H-73 Compressor Valve Spares Set",
    slug: "tanabe-h-73-compressor-valves",
    description: "Complete spare valve set for Tanabe H-73 marine starting air compressors. Includes suction valve assemblies, delivery valve assemblies, gaskets, and spring plates. Sourced as genuine unused surplus from vessel inventories.",
    categoryName: "Marine Main Air Compressor & Spares",
    brandName: "Tanabe",
    price: 0,
    availability: "in-stock",
    featured: false,
    image: "/images/about-workshop.png",
    images: ["/images/about-workshop.png"],
    keywords: ["compressor", "valves", "tanabe"],
    specifications: {
      "Compatible Compressor": "Tanabe H-73 / H-273",
      "Origin": "Genuine OEM surplus"
    }
  },
  {
    title: "Castrol Cyltech 70 Cylinder Lubricating Oil",
    slug: "castrol-cyltech-70-lubricant",
    description: "Premium marine cylinder lubricant formulated for high-performance two-stroke crosshead marine engines. Designed specifically to neutralize acids and protect liners under high load and high sulfur operations.",
    categoryName: "Marine All Kind Chemical",
    brandName: "Castrol Marine",
    price: 0,
    availability: "in-stock",
    featured: true,
    image: "/images/about-bridge.png",
    images: ["/images/about-bridge.png"],
    keywords: ["lube", "castrol", "lubricant"],
    specifications: {
      "SAE Grade": "SAE 50",
      "Base Number (BN)": "70"
    }
  },
  {
    title: "Shell Melina S 30 Marine Engine Lubricant",
    slug: "shell-melina-s-30-marine-oil",
    description: "High-performance multifunctional system lubricant for low-speed marine diesel engines. Excellent oxidation resistance and thermal stability. Protects crankcases, gears, and turbocharger bearings.",
    categoryName: "Marine All Kind Chemical",
    brandName: "Shell",
    price: 0,
    availability: "on-demand",
    image: "/images/daniel-korpai-pKRNxEguRgM-unsplash.jpg",
    images: ["/images/daniel-korpai-pKRNxEguRgM-unsplash.jpg"],
    keywords: ["lube", "shell", "lubricant"],
    specifications: {
      "Viscosity Grade": "SAE 30",
      "Application": "Crankcase & Thruster"
    }
  },
  {
    title: "Naniwa Seawater Centrifugal Pump Impeller",
    slug: "naniwa-seawater-pump-impeller",
    description: "Precision-cast bronze impeller for Naniwa FE-series centrifugal marine pumps. Sourced from decommissioned vessel equipment, inspected for zero erosion and cavitation, and dynamically balanced.",
    categoryName: "Marine All Kind Pump & Spares",
    brandName: "Naniwa",
    price: 0,
    availability: "in-stock",
    featured: true,
    image: "/images/home-feature.png",
    images: ["/images/home-feature.png"],
    keywords: ["impeller", "pump", "naniwa", "spares"],
    specifications: {
      "Compatible Pump": "FE-125 / FE-150",
      "Material": "Bronze (CAC406)"
    }
  },
  {
    title: "Neoprene Cargo Hatch Cover Rubber Packing",
    slug: "neoprene-cargo-hatch-rubber-packing",
    description: "Premium grade marine hatch cover sealing rubber. Formulated from high-density sponge neoprene rubber core with solid skin, ensuring weather-tight integrity for dry cargo holds under heavy sea loads.",
    categoryName: "Ship Deck Machinery & Parts",
    brandName: "Universal Marine",
    price: 0,
    availability: "in-stock",
    featured: false,
    image: "/images/home-hero.jpg",
    images: ["/images/home-hero.jpg"],
    keywords: ["hatch cover", "rubber packing", "neoprene"],
    specifications: {
      "Profile Type": "Square Solid",
      "Dimensions": "71mm x 40mm"
    }
  }
];


async function seed() {
  console.log('Connecting to database...');
  await connectToDatabase();
  console.log('Connected. Clearing old collections...');

  await Promise.all([
    Category.deleteMany({}),
    Brand.deleteMany({}),
    Settings.deleteMany({}),
    User.deleteMany({}),
    Product.deleteMany({})
  ]);

  console.log('Collections cleared. Seeding Categories...');
  const categoriesToSeed = [
    // Engine & Machinery Spares
    { name: 'Marine Main Engine & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Main propulsion systems and spare parts' },
    { name: 'Marine Auxiliary Engine & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Auxiliary diesel generator engines and spares' },
    { name: 'Marine Hydraulic Pump & Motor', mainCategory: 'Engine & Machinery Spares', description: 'Hydraulic pumps, motors, and allied components' },
    { name: 'Marine Purifier & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Fuel/lube oil purifiers, separators, and spares' },
    { name: 'Marine Fresh Water Generator & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Evaporator/Fresh water generator units and parts' },
    { name: 'Marine Plate Heat Exchanger & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Gasketed and brazed plate heat exchangers and spares' },
    { name: 'Marine Main Air Compressor & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Main ship starting air compressors and parts' },
    { name: 'Marine Chilling Compressor & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Air conditioning and refrigeration chilling compressors' },
    { name: 'Marine Screw Compressor & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Rotary screw air compressors and spares' },
    { name: 'Marine Deck Compressor & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Deck utility and working air compressors' },
    { name: 'Marine Breathing Air Compressor & Spares', mainCategory: 'Engine & Machinery Spares', description: 'SCBA refilling breathing air compressors' },
    { name: 'Marine All Kind Pump & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Ballast, bilge, cargo, and general service pumps' },
    { name: 'Marine Boiler & Burner Unit & Spares', mainCategory: 'Engine & Machinery Spares', description: 'Auxiliary marine boilers, burner units, and controls' },
    { name: 'Marine All Kind Bearing', mainCategory: 'Engine & Machinery Spares', description: 'Engine, pump, and shaft bearing components' },
    { name: 'Ship Deck Machinery & Parts', mainCategory: 'Engine & Machinery Spares', description: 'Windlass, winches, capstans, and deck spares' },

    // Navigation & Communication
    { name: 'Marine Bridge Room Navigation Equipment', mainCategory: 'Navigation & Communication', description: 'Radars, Gyro Compasses, ECDIS, GPS, and communication radios' },
    { name: 'Marine Chart & Publication', mainCategory: 'Navigation & Communication', description: 'Navigational paper/digital charts and maritime publications' },

    // Automation & Electrical
    { name: 'Marine Automation', mainCategory: 'Automation & Electrical', description: 'Alarm monitoring, engine safety, and control panels' },
    { name: 'Marine All Kind Electric & Electronic Items', mainCategory: 'Automation & Electrical', description: 'Breakers, relays, displays, and electronic control units' },
    { name: 'Marine All Kind Cable', mainCategory: 'Automation & Electrical', description: 'Marine-grade armored power, signal, and coax cables' },

    // Deck, Safety & Stores
    { name: 'Marine Toilet & Spares', mainCategory: 'Deck, Safety & Stores', description: 'Vacuum/gravity marine toilet systems and spare parts' },
    { name: 'Marine All Kind Valve', mainCategory: 'Deck, Safety & Stores', description: 'Gate, globe, butterfly, storm, and safety valves' },
    { name: 'Marine All Kind Chemical', mainCategory: 'Deck, Safety & Stores', description: 'Water treatment, cleaning, and marine process chemicals' },
    { name: 'Marine Life Saving Equipment', mainCategory: 'Deck, Safety & Stores', description: 'Lifeboats, liferafts, lifejackets, and distress signals' },
    { name: 'Marine Safety Equipment', mainCategory: 'Deck, Safety & Stores', description: 'Firefighting gear, gas detectors, and personal protection' },
    { name: 'Ship Provision Store', mainCategory: 'Deck, Safety & Stores', description: 'Galley, cabin, and food provisioning stores' },
    { name: 'Marine Tools', mainCategory: 'Deck, Safety & Stores', description: 'Pneumatic, hydraulic, and hand tools for shipboard use' },
    { name: 'Lashing Tools', mainCategory: 'Deck, Safety & Stores', description: 'Container and cargo lashing gear, twistlocks, and turnbuckles' }
  ];

  const categoryMap: Record<string, any> = {};
  for (const cat of categoriesToSeed) {
    const doc = await Category.create(cat);
    categoryMap[cat.name] = doc;
  }

  console.log('Seeding Brands...');
  const brandsToSeed = [
    { name: 'Furuno', description: 'Japanese marine electronics' },
    { name: 'JRC', description: 'Japan Radio Co.' },
    { name: 'Nor Sau', description: 'Marine automation modules' },
    { name: 'Tanabe', description: 'Marine air compressors' },
    { name: 'Shell', description: 'Global engine lubricants' },
    { name: 'Castrol Marine', description: 'Engine cylinder lubricants' },
    { name: 'Naniwa', description: 'Shipboard water pumps' },
    { name: 'Universal Marine', description: 'Deck and hatch packing spares' }
  ];

  const brandMap: Record<string, any> = {};
  for (const brand of brandsToSeed) {
    const doc = await Brand.create(brand);
    brandMap[brand.name] = doc;
  }

  console.log('Seeding Settings...');
  await Settings.create({
    siteName: 'Sea Duck Marine Service',
    siteDescription: 'Marine Radar & Spares Suppliers in Bhavnagar Since 2009',
    contactEmail: 'enqsdms7483@gmail.com',
    contactPhone: '+91 84013 03078 / +91 95747 97483',
    address: 'Nawapara Road, Rasala Camp, High Court Road, Near DSP Office, Bhavnagar, Gujarat – 364001, India',
    watermarkText: 'Sea Duck Marine Service'
  });

  console.log('Seeding Admin User...');
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('password123', 10);
  await User.create({
    name: 'Sea Duck Admin',
    email: 'admin@seaduckmarine.com',
    password: hashedPassword
  });



  console.log('Seeding Products...');
  let productCount = 0;
  for (const prod of productsData) {
    const catDoc = categoryMap[prod.categoryName];
    const brandDoc = brandMap[prod.brandName];
    if (catDoc && brandDoc) {
      await Product.create({
        title: prod.title,
        slug: prod.slug,
        description: prod.description,
        category: catDoc._id,
        brand: brandDoc._id,
        brandName: brandDoc.name,
        price: prod.price,
        availability: prod.availability,
        featured: prod.featured,
        image: prod.image,
        images: prod.images,
        specifications: prod.specifications,
        keywords: prod.keywords
      });
      productCount++;
    }
  }

  console.log(`Database seeding completed successfully!`);
  console.log(`- Seeded ${Object.keys(categoryMap).length} Categories`);
  console.log(`- Seeded ${Object.keys(brandMap).length} Brands`);
  console.log(`- Seeded ${productCount} Products`);
  
  await mongoose.disconnect();
  console.log('Disconnected from database.');
}

seed().catch(err => {
  console.error('Fatal Seeding Error:', err);
  process.exit(1);
});
