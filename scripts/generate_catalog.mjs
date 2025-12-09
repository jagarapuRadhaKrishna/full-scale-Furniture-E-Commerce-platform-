import { writeFile } from "fs/promises";

const seed = 2025;

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(seed);

const materialsMaster = ["Solid Wood", "Leather", "Fabric", "MDF", "Metal"];
const colorOptions = ["Brown", "Beige", "Gray", "Black", "White"];

const categoryKeywords = {
  "Living Room": "livingroom",
  Bedroom: "bedroom",
  "Dining Room": "diningroom",
  Office: "office",
  Kids: "kidsroom",
  Outdoor: "outdoor",
  Textiles: "textiles",
};

const dimensionProfiles = {
  sectional: { width: [240, 320], height: [80, 95], depth: [150, 220] },
  sofa_three: { width: [200, 260], height: [85, 100], depth: [90, 110] },
  sofa_two: { width: [160, 220], height: [80, 95], depth: [85, 100] },
  sofa_sleeper: { width: [190, 250], height: [85, 100], depth: [100, 140] },
  recliner_power: { width: [95, 120], height: [105, 115], depth: [95, 115] },
  recliner_manual: { width: [90, 115], height: [100, 110], depth: [90, 110] },
  coffee_marble: { width: [120, 160], height: [42, 50], depth: [70, 90] },
  coffee_glass: { width: [110, 150], height: [40, 48], depth: [65, 85] },
  tv_wall: { width: [160, 220], height: [40, 55], depth: [30, 45] },
  tv_floor: { width: [180, 240], height: [60, 85], depth: [45, 60] },
  bed_king: { width: [190, 210], height: [110, 125], depth: [210, 230] },
  bed_queen: { width: [150, 170], height: [100, 115], depth: [200, 215] },
  wardrobe_sliding: { width: [180, 240], height: [210, 240], depth: [60, 75] },
  wardrobe_hinged: { width: [150, 210], height: [210, 240], depth: [55, 65] },
  mattress: { width: [150, 200], height: [20, 35], depth: [200, 220] },
  dressing_modern: { width: [90, 120], height: [165, 185], depth: [45, 55] },
  dressing_classic: { width: [100, 130], height: [170, 190], depth: [45, 60] },
  dining_set_four: { width: [140, 180], height: [75, 80], depth: [90, 110] },
  dining_set_six: { width: [180, 220], height: [75, 80], depth: [100, 120] },
  dining_table_marble: { width: [160, 210], height: [75, 80], depth: [90, 120] },
  dining_table_wood: { width: [150, 200], height: [75, 80], depth: [90, 110] },
  dining_table_glass: { width: [150, 190], height: [75, 80], depth: [90, 110] },
  dining_chair_upholstered: { width: [50, 60], height: [95, 110], depth: [55, 65] },
  dining_chair_wood: { width: [48, 58], height: [95, 105], depth: [55, 65] },
  buffet_storage: { width: [150, 200], height: [85, 110], depth: [45, 55] },
  buffet_display: { width: [140, 190], height: [150, 180], depth: [45, 55] },
  desk_executive: { width: [160, 220], height: [75, 85], depth: [80, 100] },
  desk_workstation: { width: [140, 200], height: [75, 80], depth: [70, 90] },
  chair_executive: { width: [65, 75], height: [115, 130], depth: [65, 75] },
  chair_task: { width: [55, 65], height: [95, 110], depth: [55, 65] },
  storage_cabinet: { width: [90, 140], height: [180, 220], depth: [45, 55] },
  storage_drawer: { width: [80, 120], height: [95, 115], depth: [45, 55] },
  storage_locker: { width: [90, 120], height: [180, 200], depth: [50, 60] },
  kids_bed_theme: { width: [130, 150], height: [130, 160], depth: [200, 215] },
  kids_bed_bunk: { width: [120, 140], height: [150, 175], depth: [200, 210] },
  kids_study_smart: { width: [110, 140], height: [75, 90], depth: [55, 70] },
  kids_study_compact: { width: [90, 120], height: [75, 85], depth: [50, 60] },
  kids_study_corner: { width: [120, 150], height: [75, 90], depth: [80, 100] },
  kids_storage_toy: { width: [80, 120], height: [100, 130], depth: [40, 55] },
  kids_storage_shelf: { width: [70, 110], height: [150, 190], depth: [35, 45] },
  outdoor_lounge_three: { width: [200, 240], height: [80, 95], depth: [150, 180] },
  outdoor_lounge_six: { width: [240, 300], height: [80, 95], depth: [160, 200] },
  outdoor_dining_four: { width: [160, 200], height: [75, 80], depth: [100, 120] },
  outdoor_dining_six: { width: [200, 240], height: [75, 80], depth: [110, 130] },
  outdoor_swing: { width: [95, 110], height: [180, 210], depth: [95, 120] },
  outdoor_garden_chair: { width: [60, 75], height: [95, 110], depth: [70, 85] },
  outdoor_table_coffee: { width: [90, 130], height: [45, 55], depth: [60, 80] },
  outdoor_table_side: { width: [50, 70], height: [50, 60], depth: [50, 70] },
  outdoor_planter: { width: [35, 55], height: [60, 90], depth: [35, 55] },
  outdoor_umbrella: { width: [160, 220], height: [240, 280], depth: [160, 220] },
  bean_bag: { width: [85, 120], height: [70, 110], depth: [85, 120] },
  footwear_stand: { width: [60, 120], height: [90, 160], depth: [30, 45] },
  textile_bedsheet: { width: [220, 300], height: [1, 3], depth: [220, 300] },
  textile_blanket: { width: [200, 260], height: [2, 6], depth: [220, 300] },
  textile_pillow: { width: [70, 90], height: [15, 25], depth: [40, 60] },
  textile_cushion: { width: [45, 55], height: [10, 20], depth: [45, 55] },
  textile_curtain: { width: [140, 260], height: [200, 280], depth: [4, 12] },
};

const categories = {
  "Living Room": [
    { subcategory: "Sofas - L-Shaped", itemLabel: "L-Shaped Sofa", prefix: "DFW-LSL", profile: "sectional", materials: ["Leather", "Fabric", "Solid Wood"], imageSlug: "l-shaped-sofa" },
    { subcategory: "Sofas - 3-Seater", itemLabel: "3-Seater Sofa", prefix: "DFW-LS3", profile: "sofa_three", materials: ["Fabric", "Leather", "Solid Wood"], imageSlug: "three-seater-sofa" },
    { subcategory: "Sofas - 2-Seater", itemLabel: "2-Seater Sofa", prefix: "DFW-LS2", profile: "sofa_two", materials: ["Fabric", "Leather", "Solid Wood"], imageSlug: "two-seater-sofa" },
    { subcategory: "Sofas - Sofa-Cum-Bed", itemLabel: "Sleeper Sofa", prefix: "DFW-LSS", profile: "sofa_sleeper", materials: ["Fabric", "Leather", "MDF"], imageSlug: "sofa-bed" },
    { subcategory: "Recliners - Power Recliners", itemLabel: "Power Recliner", prefix: "DFW-LRP", profile: "recliner_power", materials: ["Leather", "Fabric"], imageSlug: "power-recliner" },
    { subcategory: "Recliners - Manual Recliners", itemLabel: "Manual Recliner", prefix: "DFW-LRM", profile: "recliner_manual", materials: ["Leather", "Fabric"], imageSlug: "manual-recliner" },
    { subcategory: "Coffee Tables - Marble Collection", itemLabel: "Marble Coffee Table", prefix: "DFW-LCM", profile: "coffee_marble", materials: ["Solid Wood", "Metal", "MDF"], imageSlug: "marble-coffee-table" },
    { subcategory: "Coffee Tables - Glass Collection", itemLabel: "Glass Coffee Table", prefix: "DFW-LCG", profile: "coffee_glass", materials: ["Metal", "MDF", "Solid Wood"], imageSlug: "glass-coffee-table" },
    { subcategory: "TV Units - Wall-Mounted", itemLabel: "Wall-Mounted TV Unit", prefix: "DFW-LTW", profile: "tv_wall", materials: ["MDF", "Solid Wood", "Metal"], imageSlug: "wall-tv-unit" },
    { subcategory: "TV Units - Floor-Standing", itemLabel: "Floor TV Unit", prefix: "DFW-LTF", profile: "tv_floor", materials: ["Solid Wood", "MDF"], imageSlug: "floor-tv-unit" },
    { subcategory: "Seating - Bean Bags", itemLabel: "Premium Bean Bag", prefix: "DFW-LSB", profile: "bean_bag", materials: ["Fabric", "Leather"], imageSlug: "bean-bag" },
    { subcategory: "Storage - Footwear Stands", itemLabel: "Footwear Stand", prefix: "DFW-LSF", profile: "footwear_stand", materials: ["Solid Wood", "MDF", "Metal"], imageSlug: "footwear-stand" }
  ],
  Bedroom: [
    { subcategory: "Beds - King Size", itemLabel: "King Bed", prefix: "DFW-BDK", profile: "bed_king", materials: ["Solid Wood", "MDF"], imageSlug: "king-bed" },
    { subcategory: "Beds - Queen Size", itemLabel: "Queen Bed", prefix: "DFW-BDQ", profile: "bed_queen", materials: ["Solid Wood", "MDF"], imageSlug: "queen-bed" },
    { subcategory: "Wardrobes - Sliding Door", itemLabel: "Sliding Wardrobe", prefix: "DFW-BWS", profile: "wardrobe_sliding", materials: ["MDF", "Solid Wood"], imageSlug: "sliding-wardrobe" },
    { subcategory: "Wardrobes - Hinged Door", itemLabel: "Hinged Wardrobe", prefix: "DFW-BWH", profile: "wardrobe_hinged", materials: ["Solid Wood", "MDF"], imageSlug: "hinged-wardrobe" },
    { subcategory: "Mattresses - Memory Foam", itemLabel: "Memory Foam Mattress", prefix: "DFW-BMM", profile: "mattress", materials: ["Fabric"], imageSlug: "memory-foam-mattress" },
    { subcategory: "Mattresses - Spring", itemLabel: "Spring Mattress", prefix: "DFW-BMS", profile: "mattress", materials: ["Fabric"], imageSlug: "spring-mattress" },
    { subcategory: "Mattresses - Orthopedic", itemLabel: "Orthopedic Mattress", prefix: "DFW-BMO", profile: "mattress", materials: ["Fabric"], imageSlug: "orthopedic-mattress" },
    { subcategory: "Dressing Tables - Modern", itemLabel: "Modern Dressing Table", prefix: "DFW-BDM", profile: "dressing_modern", materials: ["MDF", "Solid Wood"], imageSlug: "modern-dressing-table" },
    { subcategory: "Dressing Tables - Classic", itemLabel: "Classic Dressing Table", prefix: "DFW-BDC", profile: "dressing_classic", materials: ["Solid Wood", "MDF"], imageSlug: "classic-dressing-table" },
  ],
  "Dining Room": [
    { subcategory: "Dining Sets - 4-Seater", itemLabel: "4-Seater Dining Set", prefix: "DFW-DN4", profile: "dining_set_four", materials: ["Solid Wood", "MDF", "Metal"], imageSlug: "4-seater-dining-set" },
    { subcategory: "Dining Sets - 6-Seater", itemLabel: "6-Seater Dining Set", prefix: "DFW-DN6", profile: "dining_set_six", materials: ["Solid Wood", "Metal", "MDF"], imageSlug: "6-seater-dining-set" },
    { subcategory: "Dining Tables - Marble", itemLabel: "Marble Dining Table", prefix: "DFW-DTM", profile: "dining_table_marble", materials: ["Metal", "Solid Wood", "MDF"], imageSlug: "marble-dining-table" },
    { subcategory: "Dining Tables - Wood", itemLabel: "Wood Dining Table", prefix: "DFW-DTW", profile: "dining_table_wood", materials: ["Solid Wood", "MDF"], imageSlug: "wood-dining-table" },
    { subcategory: "Dining Tables - Glass", itemLabel: "Glass Dining Table", prefix: "DFW-DTG", profile: "dining_table_glass", materials: ["Metal", "MDF"], imageSlug: "glass-dining-table" },
    { subcategory: "Dining Chairs - Upholstered", itemLabel: "Upholstered Dining Chair", prefix: "DFW-DCU", profile: "dining_chair_upholstered", materials: ["Fabric", "Leather"], imageSlug: "upholstered-dining-chair" },
    { subcategory: "Dining Chairs - Wooden", itemLabel: "Wooden Dining Chair", prefix: "DFW-DCW", profile: "dining_chair_wood", materials: ["Solid Wood"], imageSlug: "wooden-dining-chair" },
    { subcategory: "Buffet Units - Storage", itemLabel: "Storage Buffet Unit", prefix: "DFW-DBS", profile: "buffet_storage", materials: ["Solid Wood", "MDF"], imageSlug: "storage-buffet" },
    { subcategory: "Buffet Units - Display", itemLabel: "Display Buffet Unit", prefix: "DFW-DBD", profile: "buffet_display", materials: ["Solid Wood", "MDF", "Metal"], imageSlug: "display-buffet" },
  ],
  Office: [
    { subcategory: "Desks - Executive", itemLabel: "Executive Desk", prefix: "DFW-OFE", profile: "desk_executive", materials: ["Solid Wood", "MDF"], imageSlug: "executive-desk" },
    { subcategory: "Desks - Workstation", itemLabel: "Workstation Desk", prefix: "DFW-OFW", profile: "desk_workstation", materials: ["MDF", "Metal", "Solid Wood"], imageSlug: "workstation-desk" },
    { subcategory: "Chairs - Executive", itemLabel: "Executive Office Chair", prefix: "DFW-OCE", profile: "chair_executive", materials: ["Leather", "Fabric"], imageSlug: "executive-office-chair" },
    { subcategory: "Chairs - Task", itemLabel: "Task Office Chair", prefix: "DFW-OCT", profile: "chair_task", materials: ["Fabric", "Leather"], imageSlug: "task-office-chair" },
    { subcategory: "Storage - Cabinets", itemLabel: "Office Cabinet", prefix: "DFW-OSC", profile: "storage_cabinet", materials: ["Metal", "MDF", "Solid Wood"], imageSlug: "office-cabinet" },
    { subcategory: "Storage - Drawers", itemLabel: "Office Drawer Unit", prefix: "DFW-OSD", profile: "storage_drawer", materials: ["MDF", "Metal", "Solid Wood"], imageSlug: "office-drawer" },
    { subcategory: "Storage - Lockers", itemLabel: "Office Locker", prefix: "DFW-OSL", profile: "storage_locker", materials: ["Metal", "MDF"], imageSlug: "office-locker" },
  ],
  Kids: [
    { subcategory: "Beds - Theme Beds", itemLabel: "Theme Kids Bed", prefix: "DFW-KBT", profile: "kids_bed_theme", materials: ["MDF", "Solid Wood"], imageSlug: "kids-theme-bed" },
    { subcategory: "Beds - Bunk Beds", itemLabel: "Bunk Bed", prefix: "DFW-KBB", profile: "kids_bed_bunk", materials: ["Solid Wood", "MDF"], imageSlug: "kids-bunk-bed" },
    { subcategory: "Study Tables - Smart", itemLabel: "Smart Study Table", prefix: "DFW-KSS", profile: "kids_study_smart", materials: ["MDF", "Solid Wood"], imageSlug: "kids-smart-study-table" },
    { subcategory: "Study Tables - Compact", itemLabel: "Compact Study Table", prefix: "DFW-KSC", profile: "kids_study_compact", materials: ["MDF", "Solid Wood"], imageSlug: "kids-compact-study-table" },
    { subcategory: "Study Tables - Corner", itemLabel: "Corner Study Table", prefix: "DFW-KSR", profile: "kids_study_corner", materials: ["MDF", "Solid Wood"], imageSlug: "kids-corner-study-table" },
    { subcategory: "Storage - Toy Cabinets", itemLabel: "Toy Storage Cabinet", prefix: "DFW-KST", profile: "kids_storage_toy", materials: ["MDF", "Solid Wood"], imageSlug: "toy-storage-cabinet" },
    { subcategory: "Storage - Shelves", itemLabel: "Kids Shelf Unit", prefix: "DFW-KSSHF", profile: "kids_storage_shelf", materials: ["MDF", "Solid Wood"], imageSlug: "kids-shelf" },
  ],
  Outdoor: [
    { subcategory: "Lounge Sets - 3 Piece", itemLabel: "3 Piece Lounge Set", prefix: "DFW-OL3", profile: "outdoor_lounge_three", materials: ["Metal", "Solid Wood", "Fabric"], imageSlug: "outdoor-lounge-set" },
    { subcategory: "Lounge Sets - 6 Piece", itemLabel: "6 Piece Lounge Set", prefix: "DFW-OL6", profile: "outdoor_lounge_six", materials: ["Metal", "Solid Wood", "Fabric"], imageSlug: "outdoor-lounge-set-6" },
    { subcategory: "Dining Sets - 4 Seater Outdoor", itemLabel: "4 Seater Outdoor Dining Set", prefix: "DFW-OD4", profile: "outdoor_dining_four", materials: ["Metal", "Solid Wood", "MDF"], imageSlug: "outdoor-dining-set" },
    { subcategory: "Dining Sets - 6 Seater Outdoor", itemLabel: "6 Seater Outdoor Dining Set", prefix: "DFW-OD6", profile: "outdoor_dining_six", materials: ["Metal", "Solid Wood"], imageSlug: "outdoor-dining-set-6" },
    { subcategory: "Chairs - Swing Chairs", itemLabel: "Outdoor Swing Chair", prefix: "DFW-OCS", profile: "outdoor_swing", materials: ["Metal", "Fabric"], imageSlug: "outdoor-swing-chair" },
    { subcategory: "Chairs - Garden Chairs", itemLabel: "Garden Chair", prefix: "DFW-OCG", profile: "outdoor_garden_chair", materials: ["Metal", "Solid Wood", "Fabric"], imageSlug: "garden-chair" },
    { subcategory: "Tables - Coffee Tables", itemLabel: "Outdoor Coffee Table", prefix: "DFW-OTC", profile: "outdoor_table_coffee", materials: ["Metal", "Solid Wood", "MDF"], imageSlug: "outdoor-coffee-table" },
    { subcategory: "Tables - Side Tables", itemLabel: "Outdoor Side Table", prefix: "DFW-OTS", profile: "outdoor_table_side", materials: ["Metal", "Solid Wood"], imageSlug: "outdoor-side-table" },
    { subcategory: "Decor - Planters", itemLabel: "Outdoor Planter", prefix: "DFW-ODP", profile: "outdoor_planter", materials: ["Metal", "Solid Wood"], imageSlug: "outdoor-planter" },
    { subcategory: "Decor - Umbrellas", itemLabel: "Outdoor Umbrella", prefix: "DFW-ODU", profile: "outdoor_umbrella", materials: ["Metal", "Fabric"], imageSlug: "outdoor-umbrella" },
  ],
  Textiles: [
    { subcategory: "Bed Linens - Bed Sheets", itemLabel: "Premium Bed Sheet", prefix: "DFW-TXB", profile: "textile_bedsheet", materials: ["Fabric"], imageSlug: "bed-sheet" },
    { subcategory: "Bed Linens - Duvet Covers", itemLabel: "Luxury Duvet Cover", prefix: "DFW-TXD", profile: "textile_bedsheet", materials: ["Fabric"], imageSlug: "duvet-cover" },
    { subcategory: "Comfort Essentials - Blankets", itemLabel: "Plush Blanket", prefix: "DFW-TXL", profile: "textile_blanket", materials: ["Fabric"], imageSlug: "blanket" },
    { subcategory: "Comfort Essentials - Quilts", itemLabel: "Heritage Quilt", prefix: "DFW-TXQ", profile: "textile_blanket", materials: ["Fabric"], imageSlug: "quilt" },
    { subcategory: "Pillows & Cushions - Pillows", itemLabel: "Memory Foam Pillow", prefix: "DFW-TXP", profile: "textile_pillow", materials: ["Fabric"], imageSlug: "pillow" },
    { subcategory: "Pillows & Cushions - Cushion Covers", itemLabel: "Designer Cushion Cover", prefix: "DFW-TXC", profile: "textile_cushion", materials: ["Fabric"], imageSlug: "cushion-cover" },
    { subcategory: "Curtains - Window Curtains", itemLabel: "Thermal Curtain", prefix: "DFW-TXW", profile: "textile_curtain", materials: ["Fabric"], imageSlug: "window-curtain" }
  ],
};

const adjectives = [
  "Aurora", "Celeste", "Heritage", "Luxe", "Urban", "Vista", "Cascade", "Zenith", "Harmony",
  "Solace", "Radiant", "Prime", "Aster", "Monarch", "Eminence", "Nexa", "Tranquil", "Voyage",
  "Opal", "Savoy", "Aria", "Mosaic", "Summit", "Harbor", "Verve", "Atlas", "Arcadia", "Sierra",
  "Crimson", "Ivory", "Juniper", "Kinetic", "Lumina", "Noir", "Odyssey", "Prairie", "Quill",
  "Riviera", "Sterling", "Terra",
];

const styles = [
  "Signature", "Heritage", "Studio", "Legacy", "Modern", "Contour", "Haven", "Fusion", "Horizon",
  "Axis", "Estate", "Vista", "Collective", "Edition", "Origin", "Peak", "Parallel", "Spectrum",
  "Essence", "Alliance", "Calibre", "Galleria", "Latitude", "Momentum", "Synergy", "Urbane",
];

const comfortPhrases = {
  "Living Room": [
    "keeps gatherings comfortable for hours of conversation",
    "lets every movie night feel luxuriously relaxed",
    "supports effortless lounging for families and guests",
  ],
  Bedroom: [
    "cradles nightly routines in restorative comfort",
    "delivers restful support from dusk to dawn",
    "keeps bedtime rituals calm and cozy",
  ],
  "Dining Room": [
    "makes shared meals feel comfortably unhurried",
    "keeps guests supported through every course",
    "blends comfortable seating with practical proportions",
  ],
  Office: [
    "maintains ergonomic comfort through long work sessions",
    "supports focus with balanced comfort and utility",
    "keeps productivity comfortable without sacrificing poise",
  ],
  Kids: [
    "keeps play and study time comfortable for growing minds",
    "delivers soft edges and supportive comfort for little ones",
    "balances playful comfort with everyday durability",
  ],
  Outdoor: [
    "keeps open-air lounging comfortable in every season",
    "delivers breezy comfort for sunlit gatherings",
    "pairs outdoor durability with lasting comfort",
  ],
  Textiles: [
    "keeps everyday routines soft against the skin",
    "delivers breathable comfort through every season",
    "adds tactile warmth that completes the room",
  ],
};

const designTemplates = [
  "Sleek {subcategory} lines lend a tailored profile that elevates modern decor.",
  "Layered detailing gives this {subcategory} a timeless design presence.",
  "A refined {subcategory} silhouette keeps the look polished and versatile.",
  "Thoughtful accents ensure the {subcategory} feels both contemporary and inviting.",
];

function randChoice(list) {
  return list[Math.floor(rand() * list.length)];
}

function randInt(min, max) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function randStep(min, max, step) {
  const steps = Math.floor((max - min) / step);
  return min + step * Math.floor(rand() * (steps + 1));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function randDimensions(profileKey) {
  const profile = dimensionProfiles[profileKey];
  return {
    width: randInt(profile.width[0], profile.width[1]),
    height: randInt(profile.height[0], profile.height[1]),
    depth: randInt(profile.depth[0], profile.depth[1]),
  };
}

function makeDescription(name, material, category, subcategory) {
  const materialLine = `${name} leverages ${material.toLowerCase()} craftsmanship to withstand daily use in the ${category.toLowerCase()}.`;
  const comfortLine = `${randChoice(comfortPhrases[category])}.`;
  const designLineTemplate = randChoice(designTemplates);
  const designLine = designLineTemplate.replace("{subcategory}", subcategory.toLowerCase());
  return `${materialLine} ${comfortLine.charAt(0).toUpperCase()}${comfortLine.slice(1)} ${designLine}`;
}

function buildProducts() {
  const products = [];
  const usedNames = new Set();
  const idCounters = {};
  for (const [category, subcats] of Object.entries(categories)) {
    for (const sub of subcats) {
      const prefix = sub.prefix;
      if (!idCounters[prefix]) {
        idCounters[prefix] = 0;
      }
      for (let i = 0; i < 3; i += 1) {
        let name;
        do {
          name = `${randChoice(adjectives)} ${randChoice(styles)} ${sub.itemLabel}`;
        } while (usedNames.has(name));
        usedNames.add(name);

        idCounters[prefix] += 1;
        const id = `${prefix}-${idCounters[prefix].toString().padStart(3, "0")}`;
        const material = randChoice(sub.materials || materialsMaster);
        const dimensions = randDimensions(sub.profile);
        const price = randStep(5000, 100000, 500);
        const stock = randInt(10, 100);
        const rating = parseFloat((3.5 + rand() * 1.5).toFixed(1));
        const warranty = `${randInt(1, 5)} years`;
        const customization = rand() < 0.5;
        const imageSlug = sub.imageSlug || slugify(sub.subcategory);
        const baseQuery = `${imageSlug},${categoryKeywords[category]},furniture`;
        const images = Array.from({ length: 5 }, (_, idx) => `https://source.unsplash.com/600x600/?${baseQuery},angle${idx + 1}`);
        const description = makeDescription(name, material, category, sub.subcategory);

        products.push({
          id,
          name,
          category,
          subcategory: sub.subcategory,
          price,
          material,
          dimensions,
          colorOptions,
          stock,
          rating,
          warranty,
          delivery: "7-10 business days",
          customization,
          description,
          images,
        });
      }
    }
  }
  return products;
}

async function main() {
  const products = buildProducts();
  const outputPath = "src/data/catalog.json";
  await writeFile(outputPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
