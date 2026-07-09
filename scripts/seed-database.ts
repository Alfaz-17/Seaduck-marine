import mongoose from 'mongoose';
import connectToDatabase from '../src/lib/db';
import { Category, Brand, Settings, Product, Service, User } from '../src/lib/models';

// Configure environmental variables manually if running standalone
import * as dotenv from 'dotenv';
dotenv.config();

const productsData = [
  {
    title: "Furuno FAR-2117 X-Band Marine Radar",
    slug: "furuno-far-2117-x-band-radar",
    description: "High-performance reconditioned commercial marine radar. Sourced directly from vessel recycling corridors. Fully tested, including antenna, transceiver, and 19-inch high-resolution display unit. Ideal for mid-to-large cargo ships and supply vessels.",
    categoryName: "Marine Radar",
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
    categoryName: "Marine Radar",
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
    categoryName: "Engine Control Systems",
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
    categoryName: "Engine Control Systems",
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
    categoryName: "Lubricating Oil",
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
    categoryName: "Lubricating Oil",
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
    categoryName: "Navigation Spare Parts",
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
    categoryName: "Navigation Spare Parts",
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

const servicesData = [
  {
    name: "Marine Radar Supply & Guidance",
    img: "/images/bridge-nav.jpg",
    dec: "We stock, test, and distribute reconditioned marine radar systems (Furuno, JRC) and guide ship repair teams on integration.",
    featured: true
  },
  {
    name: "Marine Automation Troubleshooting",
    img: "/images/about-workshop.png",
    dec: "Sourcing and servicing complex engine alarm panel modules, startup controllers, and safety circuits for merchant crafts.",
    featured: true
  },
  {
    name: "Shipboard Consumables Distribution",
    img: "/images/about-bridge.png",
    dec: "Supplying bulk or drum marine-grade lubricating oils (SAE 30/50) and hydraulic fluids directly to ships in Gujarat ports.",
    featured: true
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
    Product.deleteMany({}),
    Service.deleteMany({})
  ]);

  console.log('Collections cleared. Seeding Categories...');
  const categoriesToSeed = [
    { name: 'Marine Radar', mainCategory: 'Navigation', description: 'Radar systems and parts' },
    { name: 'GPS', mainCategory: 'Navigation', description: 'GPS navigational aids' },
    { name: 'ECDIS', mainCategory: 'Navigation', description: 'Electronic chart displays' },
    { name: 'Engine Control Systems', mainCategory: 'Automation', description: 'Engine controls and modules' },
    { name: 'Lubricating Oil', mainCategory: 'Communication', description: 'Marine lubricants' },
    { name: 'Navigation Spare Parts', mainCategory: 'Communication', description: 'Deck spares and fittings' }
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
    contactEmail: 'info@seaduckmarine.com',
    contactPhone: '+91 8048264492',
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

  console.log('Seeding Services...');
  for (const service of servicesData) {
    await Service.create(service);
  }

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
  console.log(`- Seeded ${servicesData.length} Services`);
  console.log(`- Seeded ${productCount} Products`);
  
  await mongoose.disconnect();
  console.log('Disconnected from database.');
}

seed().catch(err => {
  console.error('Fatal Seeding Error:', err);
  process.exit(1);
});
