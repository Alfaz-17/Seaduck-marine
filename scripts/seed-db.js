const mongoose = require('mongoose');

// Define connection URI (will be injected via node --env-file=.env)
const DATABASE_URI = process.env.DATABASE_URI;

if (!DATABASE_URI) {
  console.error('Please define the DATABASE_URI environment variable inside .env');
  process.exit(1);
}

// Inline schema definitions to keep the seed script self-contained and run easily in Node.js
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Marine Radar', 'Marine Automation & Machinery', 'Lubricating Oil', 'Ship Items & Spares']
  },
  brandName: { type: String },
  specifications: { type: mongoose.Schema.Types.Mixed },
  price: { type: Number, default: 0 },
  availability: { 
    type: String, 
    enum: ['in-stock', 'out-of-stock', 'on-demand'], 
    default: 'in-stock' 
  },
  images: [{ type: String }],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  {
    title: "Furuno FAR-2117 X-Band Marine Radar",
    slug: "furuno-far-2117-x-band-radar",
    description: "High-performance reconditioned commercial marine radar. Sourced directly from vessel recycling corridors. Fully tested, including antenna, transceiver, and 19-inch high-resolution display unit. Ideal for mid-to-large cargo ships and supply vessels.",
    category: "Marine Radar",
    brandName: "Furuno",
    specifications: {
      "Model": "FAR-2117",
      "Band": "X-Band",
      "Power Output": "12 kW",
      "Display Size": "19-inch LCD",
      "Condition": "Reconditioned & Tested",
      "Sourced From": "Alang Ship Recycling Yard"
    },
    price: 0, // Quote on demand
    availability: "in-stock",
    images: ["/images/bridge-nav.jpg"],
    featured: true
  },
  {
    title: "JRC JMA-5300 High-Resolution Marine Radar",
    slug: "jrc-jma-5300-radar",
    description: "State-of-the-art marine radar with 2-axis display system and high-speed data processing. Offers superior target tracking and sea clutter suppression. Fully serviced by our technicians in Bhavnagar.",
    category: "Marine Radar",
    brandName: "JRC",
    specifications: {
      "Model": "JMA-5312 / JMA-5322",
      "Power Output": "10 kW",
      "Antenna Length": "4 ft or 6 ft scanner",
      "Condition": "Certified Pre-owned",
      "Warranty": "6 Months local warranty"
    },
    price: 0,
    availability: "in-stock",
    images: ["/images/why-choose-us.jpg"],
    featured: false
  },
  {
    title: "Nor Sau 8625 Engine Automation Controller",
    slug: "nor-sau-8625-automation-controller",
    description: "Professional marine engine automation and alarm monitoring module. Designed for main diesel engine supervision, cooling loop controls, and emergency shut-off automation. Heavily tested on our custom simulation rig.",
    category: "Marine Automation & Machinery",
    brandName: "Nor Sau",
    specifications: {
      "Part Number": "8625-SYS",
      "Application": "Main Engine Alarm & Safety Control",
      "Input Voltage": "24V DC",
      "Chassis Material": "Anodized Aluminum",
      "Condition": "Fully Operational (Tested)"
    },
    price: 0,
    availability: "in-stock",
    images: ["/images/marine-radio.jpg"],
    featured: true
  },
  {
    title: "Tanabe H-73 Compressor Valve Spares Set",
    slug: "tanabe-h-73-compressor-valves",
    description: "Complete spare valve set for Tanabe H-73 marine starting air compressors. Includes suction valve assemblies, delivery valve assemblies, gaskets, and spring plates. Sourced as genuine unused surplus from vessel inventories.",
    category: "Marine Automation & Machinery",
    brandName: "Tanabe",
    specifications: {
      "Compatible Compressor": "Tanabe H-73 / H-273",
      "Item Type": "Complete Valve Overhaul Kit",
      "Origin": "Genuine OEM surplus",
      "Package": "Original wooden box packaging"
    },
    price: 0,
    availability: "in-stock",
    images: ["/images/about-workshop.png"],
    featured: false
  },
  {
    title: "Castrol Cyltech 70 Cylinder Lubricating Oil",
    slug: "castrol-cyltech-70-lubricant",
    description: "Premium marine cylinder lubricant formulated for high-performance two-stroke crosshead marine engines. Designed specifically to neutralize acids and protect liners under high load and high sulfur operations.",
    category: "Lubricating Oil",
    brandName: "Castrol Marine",
    specifications: {
      "SAE Grade": "SAE 50",
      "Base Number (BN)": "70",
      "Container Size": "208L Drum / Bulk Delivery",
      "Application": "Crosshead Engines"
    },
    price: 0,
    availability: "in-stock",
    images: ["/images/about-bridge.png"],
    featured: true
  },
  {
    title: "Shell Melina S 30 Marine Engine Lubricant",
    slug: "shell-melina-s-30-marine-oil",
    description: "High-performance multifunctional system lubricant for low-speed marine diesel engines. Excellent oxidation resistance and thermal stability. Protects crankcases, gears, and turbocharger bearings.",
    category: "Lubricating Oil",
    brandName: "Shell",
    specifications: {
      "Viscosity Grade": "SAE 30",
      "Application": "Crankcase Lubrication & Thruster Systems",
      "Packaging": "208 Litre Drum",
      "Approvals": "MAN B&W, Wärtsilä, Sulzer"
    },
    price: 0,
    availability: "on-demand",
    images: ["/images/daniel-korpai-pKRNxEguRgM-unsplash.jpg"],
    featured: false
  },
  {
    title: "Naniwa Seawater Centrifugal Pump Impeller",
    slug: "naniwa-seawater-pump-impeller",
    description: "Precision-cast bronze impeller for Naniwa FE-series centrifugal marine pumps. Sourced from decommissioned vessel equipment, inspected for zero erosion and cavitation, and dynamically balanced.",
    category: "Ship Items & Spares",
    brandName: "Naniwa",
    specifications: {
      "Compatible Pump Model": "FE-125 / FE-150",
      "Material": "Phosphor Bronze (CAC406)",
      "Outside Diameter": "240 mm",
      "Condition": "Refurbished & Re-balanced"
    },
    price: 0,
    availability: "in-stock",
    images: ["/images/home-feature.png"],
    featured: true
  },
  {
    title: "Neoprene Cargo Hatch Cover Rubber Packing",
    slug: "neoprene-cargo-hatch-rubber-packing",
    description: "Premium grade marine hatch cover sealing rubber. Formulated from high-density sponge neoprene rubber core with solid skin, ensuring weather-tight integrity for dry cargo holds under heavy sea loads.",
    category: "Ship Items & Spares",
    brandName: "Universal Marine",
    specifications: {
      "Profile Type": "Square Solid / Sponge Core",
      "Dimensions": "71mm x 40mm",
      "Length": "10m coils",
      "Tensile Strength": "Min 12 MPa"
    },
    price: 0,
    availability: "in-stock",
    images: ["/images/home-hero.jpg"],
    featured: false
  }
];

async function seed() {
  console.log('Connecting to database...');
  await mongoose.connect(DATABASE_URI);
  console.log('Connected. Cleaning existing products...');
  await Product.deleteMany({});
  console.log('Existing products cleared. Inserting new products...');
  const result = await Product.insertMany(products);
  console.log(`Successfully seeded ${result.length} marine products!`);
  await mongoose.disconnect();
  console.log('Disconnected from database.');
}

seed().catch(err => {
  console.error('Error during database seed:', err);
  process.exit(1);
});
