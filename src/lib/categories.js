// Master category & subcategory structure for Verdant Space
export const CATEGORIES = [
  {
    id: 'forestry',
    label: 'Forestry',
    subcategories: [
      'Tree Profiles',
      'Silviculture',
      'Forest Products',
      'Field Notes',
      'Protection and Ecology',
      'Management and Economics',
    ],
  },
  {
    id: 'environmental-policies',
    label: 'Environmental Policies and Governance',
    subcategories: [
      'Climate Change and Energy',
      'Resource Management',
      'Pollution and Waste Control',
      'Environmental Quality and Health',
      'Structures, Institutions, and Processes',
    ],
  },
  {
    id: 'restoration',
    label: 'Restoration',
    subcategories: [
      'Community-Based Conservation',
      'Nature-Based Solutions',
      'Sustainable Livelihoods',
      'Rehabilitation',
    ],
  },
  {
    id: 'climate-change',
    label: 'Climate Change',
    subcategories: [
      'Adaptation',
      'Mitigation',
      'Impacts',
      'Causes',
    ],
  },
  {
    id: 'green-innovation',
    label: 'Green Innovation and Technology',
    subcategories: [
      'Emerging Technologies and Innovation',
      'GIS',
      'Remote Sensing',
    ],
  },
  {
    id: 'think-pieces',
    label: 'Think Pieces',
    subcategories: [],
  },
  {
    id: 'environmental-research',
    label: 'Environmental Research',
    subcategories: [],
  },
]

// Helper: get subcategories for a given category label
export function getSubcategories(categoryLabel) {
  const cat = CATEGORIES.find((c) => c.label === categoryLabel)
  return cat?.subcategories || []
}

// Flat list of all category labels (for filters etc.)
export const CATEGORY_LABELS = CATEGORIES.map((c) => c.label)
