import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '@/lib/db'
import { Category, Brand, Product } from '@/lib/models'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await connectToDatabase()

    // Ensure categories exist
    const categoryMap: Record<string, any> = {}
    const categoriesToSeed = [
      // Navigation
      { name: 'Marine Radar', mainCategory: 'Navigation' },
      { name: 'GPS', mainCategory: 'Navigation' },
      { name: 'ECDIS', mainCategory: 'Navigation' },
      // Automation
      { name: 'Engine Alarm Monitoring System', mainCategory: 'Automation' },
      { name: 'Fire Alarm System', mainCategory: 'Automation' },
      // Communication / Spares
      { name: 'Lubricating Oil', mainCategory: 'Communication' },
      { name: 'Ship Spares', mainCategory: 'Communication' }
    ]

    for (const cat of categoriesToSeed) {
      let existing = await Category.findOne({ name: cat.name })
      if (!existing) {
        existing = await Category.create({ ...cat, description: `${cat.name} equipment and spares` })
      }
      categoryMap[cat.name] = existing
    }

    // Ensure brands exist
    const brandMap: Record<string, any> = {}
    const brandsToSeed = [
      { name: 'Furuno', description: 'Japanese marine electronics manufacturer' },
      { name: 'JRC', description: 'Japan Radio Co. — navigation and communication' },
      { name: 'Nor Sau', description: 'Marine automation systems' },
      { name: 'Tanabe', description: 'Starting air compressors' },
      { name: 'Shell', description: 'Marine-grade lubricating oils' },
      { name: 'Castrol Marine', description: 'Cylinder and system lubricants' },
      { name: 'Naniwa', description: 'Centrifugal shipboard pumps' },
      { name: 'Universal Marine', description: 'Deck items and hatch packings' }
    ]

    for (const brand of brandsToSeed) {
      let existing = await Brand.findOne({ name: brand.name })
      if (!existing) {
        existing = await Brand.create(brand)
      }
      brandMap[brand.name] = existing
    }

    // Products to seed using migrated image assets
    const demoProducts = [
      {
        title: "Furuno FAR-2117 X-Band Marine Radar",
        slug: "furuno-far-2117-x-band-radar",
        description: "High-performance reconditioned commercial marine radar. Sourced directly from vessel recycling corridors. Fully tested, including antenna, transceiver, and 19-inch high-resolution display unit. Ideal for mid-to-large cargo ships and supply vessels.",
        category: categoryMap['Marine Radar']?._id,
        brand: brandMap['Furuno']?._id,
        brandName: 'Furuno',
        price: 0,
        availability: 'in-stock' as const,
        featured: true,
        image: '/images/bridge-nav.jpg',
        images: ['/images/bridge-nav.jpg'],
        keywords: ['radar', 'furuno', 'marine radar', 'x-band'],
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
        category: categoryMap['Marine Radar']?._id,
        brand: brandMap['JRC']?._id,
        brandName: 'JRC',
        price: 0,
        availability: 'in-stock' as const,
        featured: false,
        image: '/images/why-choose-us.jpg',
        images: ['/images/why-choose-us.jpg'],
        keywords: ['radar', 'jrc', 'navigation'],
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
        category: categoryMap['Engine Alarm Monitoring System']?._id,
        brand: brandMap['Nor Sau']?._id,
        brandName: 'Nor Sau',
        price: 0,
        availability: 'in-stock' as const,
        featured: true,
        image: '/images/marine-radio.jpg',
        images: ['/images/marine-radio.jpg'],
        keywords: ['automation', 'engine alarm', 'nor sau'],
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
        category: categoryMap['Engine Alarm Monitoring System']?._id,
        brand: brandMap['Tanabe']?._id,
        brandName: 'Tanabe',
        price: 0,
        availability: 'in-stock' as const,
        featured: false,
        image: '/images/about-workshop.png',
        images: ['/images/about-workshop.png'],
        keywords: ['compressor', 'valves', 'tanabe'],
        specifications: {
          "Compatible Compressor": "Tanabe H-73 / H-273",
          "Origin": "Genuine OEM surplus"
        }
      },
      {
        title: "Castrol Cyltech 70 Cylinder Lubricating Oil",
        slug: "castrol-cyltech-70-lubricant",
        description: "Premium marine cylinder lubricant formulated for high-performance two-stroke crosshead marine engines. Designed specifically to neutralize acids and protect liners under high load and high sulfur operations.",
        category: categoryMap['Lubricating Oil']?._id,
        brand: brandMap['Castrol Marine']?._id,
        brandName: 'Castrol Marine',
        price: 0,
        availability: 'in-stock' as const,
        featured: true,
        image: '/images/about-bridge.png',
        images: ['/images/about-bridge.png'],
        keywords: ['lube', 'castrol', 'lubricant'],
        specifications: {
          "SAE Grade": "SAE 50",
          "Base Number (BN)": "70"
        }
      },
      {
        title: "Shell Melina S 30 Marine Engine Lubricant",
        slug: "shell-melina-s-30-marine-oil",
        description: "High-performance multifunctional system lubricant for low-speed marine diesel engines. Excellent oxidation resistance and thermal stability. Protects crankcases, gears, and turbocharger bearings.",
        category: categoryMap['Lubricating Oil']?._id,
        brand: brandMap['Shell']?._id,
        brandName: 'Shell',
        price: 0,
        availability: 'on-demand' as const,
        featured: false,
        image: '/images/daniel-korpai-pKRNxEguRgM-unsplash.jpg',
        images: ['/images/daniel-korpai-pKRNxEguRgM-unsplash.jpg'],
        keywords: ['lube', 'shell', 'lubricant'],
        specifications: {
          "Viscosity Grade": "SAE 30",
          "Application": "Crankcase & Thruster"
        }
      },
      {
        title: "Naniwa Seawater Centrifugal Pump Impeller",
        slug: "naniwa-seawater-pump-impeller",
        description: "Precision-cast bronze impeller for Naniwa FE-series centrifugal marine pumps. Sourced from decommissioned vessel equipment, inspected for zero erosion and cavitation, and dynamically balanced.",
        category: categoryMap['Ship Spares']?._id,
        brand: brandMap['Naniwa']?._id,
        brandName: 'Naniwa',
        price: 0,
        availability: 'in-stock' as const,
        featured: true,
        image: '/images/home-feature.png',
        images: ['/images/home-feature.png'],
        keywords: ['impeller', 'pump', 'naniwa', 'spares'],
        specifications: {
          "Compatible Pump": "FE-125 / FE-150",
          "Material": "Bronze (CAC406)"
        }
      },
      {
        title: "Neoprene Cargo Hatch Cover Rubber Packing",
        slug: "neoprene-cargo-hatch-rubber-packing",
        description: "Premium grade marine hatch cover sealing rubber. Formulated from high-density sponge neoprene rubber core with solid skin, ensuring weather-tight integrity for dry cargo holds under heavy sea loads.",
        category: categoryMap['Ship Spares']?._id,
        brand: brandMap['Universal Marine']?._id,
        brandName: 'Universal Marine',
        price: 0,
        availability: 'in-stock' as const,
        featured: false,
        image: '/images/home-hero.jpg',
        images: ['/images/home-hero.jpg'],
        keywords: ['hatch cover', 'rubber packing', 'neoprene'],
        specifications: {
          "Profile Type": "Square Solid",
          "Dimensions": "71mm x 40mm"
        }
      }
    ]

    await Product.deleteMany({})
    let seeded = 0
    for (const product of demoProducts) {
      await Product.create(product)
      seeded++
    }

    const totalProducts = await Product.countDocuments()
    const totalCategories = await Category.countDocuments()

    return res.status(200).json({
      message: `Seeding complete. ${seeded} Sea Duck products added.`,
      stats: {
        newProducts: seeded,
        totalProducts,
        totalCategories
      }
    })
  } catch (error) {
    console.error('Seed products error:', error)
    return res.status(500).json({ error: 'Failed to seed products' })
  }
}
