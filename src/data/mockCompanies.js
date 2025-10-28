export const mockCompanies = [
  {
    id: 1,
    name: "A LA CARTE IMMO MARRAKECH SARL",
    type: "SARL",
    status: "Active",
    category: "Real Estate"
  },
  {
    id: 2,
    name: "A LA CARTE IMMO MARRAKECH SARL",
    type: "SARL", 
    status: "Active",
    category: "Real Estate"
  },
  {
    id: 3,
    name: "A D IMMOBILIER",
    type: "SARL",
    status: "Active", 
    category: "Real Estate"
  },
  {
    id: 4,
    name: "A.M. A LOGISTICS SARL",
    type: "SARL",
    status: "Active",
    category: "Logistics"
  },
  {
    id: 5,
    name: "A.E.G.I SARLAU",
    type: "SARLAU",
    status: "Active",
    category: "Services"
  },
  {
    id: 6,
    name: "A.O.A PLASTIC SARL",
    type: "SARL",
    status: "Active",
    category: "Manufacturing"
  },
  {
    id: 7,
    name: "ABC CONSTRUCTION SARL",
    type: "SARL",
    status: "Active",
    category: "Construction"
  },
  {
    id: 8,
    name: "ADVANCED TECH SOLUTIONS",
    type: "SA",
    status: "Active",
    category: "Technology"
  },
  {
    id: 9,
    name: "ATLAS TRADING COMPANY",
    type: "SARL",
    status: "Active",
    category: "Trading"
  },
  {
    id: 10,
    name: "BLUE OCEAN SERVICES",
    type: "SARL",
    status: "Active",
    category: "Services"
  },
  {
    id: 11,
    name: "CASABLANCA INDUSTRIES",
    type: "SA",
    status: "Active",
    category: "Manufacturing"
  },
  {
    id: 12,
    name: "DIGITAL MOROCCO SARL",
    type: "SARL",
    status: "Active",
    category: "Technology"
  },
  {
    id: 13,
    name: "ECO GREEN SOLUTIONS",
    type: "SARL",
    status: "Active",
    category: "Environment"
  },
  {
    id: 14,
    name: "FAST DELIVERY SERVICES",
    type: "SARL",
    status: "Active",
    category: "Logistics"
  },
  {
    id: 15,
    name: "GLOBAL IMPORT EXPORT",
    type: "SA",
    status: "Active",
    category: "Trading"
  },
  {
    id: 16,
    name: "HEALTHCARE PLUS SARL",
    type: "SARL",
    status: "Active",
    category: "Healthcare"
  },
  {
    id: 17,
    name: "INNOVATIVE DESIGNS",
    type: "SARL",
    status: "Active",
    category: "Design"
  },
  {
    id: 18,
    name: "JEWELRY CRAFTS MOROCCO",
    type: "SARL",
    status: "Active",
    category: "Retail"
  },
  {
    id: 19,
    name: "KINGDOM CONSULTING",
    type: "SARL",
    status: "Active",
    category: "Consulting"
  },
  {
    id: 20,
    name: "LUXURY HOTELS GROUP",
    type: "SA",
    status: "Active",
    category: "Hospitality"
  }
];

// Generate more companies to reach 1967 total
const generateMoreCompanies = () => {
  const companies = [...mockCompanies];
  const companyTypes = ["SARL", "SA", "SARLAU", "SNC"];
  const categories = ["Real Estate", "Technology", "Manufacturing", "Services", "Trading", "Construction", "Healthcare", "Retail", "Consulting", "Logistics"];
  const prefixes = ["ATLAS", "MOROCCO", "ROYAL", "IMPERIAL", "MODERN", "GLOBAL", "PREMIUM", "ELITE", "ADVANCED", "SUPERIOR"];
  const suffixes = ["SOLUTIONS", "SERVICES", "INDUSTRIES", "COMPANY", "GROUP", "ENTERPRISES", "CORPORATION", "SYSTEMS"];

  for (let i = 21; i <= 1967; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const type = companyTypes[Math.floor(Math.random() * companyTypes.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    companies.push({
      id: i,
      name: `${prefix} ${suffix} ${type}`,
      type: type,
      status: "Active",
      category: category
    });
  }
  
  return companies;
};

export const allCompanies = generateMoreCompanies();

export const companyTypes = ["All Types", "SARL", "SA", "SARLAU", "SNC"];
export const companyCategories = ["All Categories", "Real Estate", "Technology", "Manufacturing", "Services", "Trading", "Construction", "Healthcare", "Retail", "Consulting", "Logistics", "Environment", "Design", "Hospitality"];
