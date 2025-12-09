import json
import random
import re
from pathlib import Path

random.seed(2025)

materials_master = ["Solid Wood", "Leather", "Fabric", "MDF", "Metal"]
color_options = ["Brown", "Beige", "Gray", "Black", "White"]

category_keywords = {
    "Living Room": "livingroom",
    "Bedroom": "bedroom",
    "Dining Room": "diningroom",
    "Office": "office",
    "Kids": "kidsroom",
    "Outdoor": "outdoor"
}

dimension_profiles = {
    "sectional": {"width": (240, 320), "height": (80, 95), "depth": (150, 220)},
    "sofa_three": {"width": (200, 260), "height": (85, 100), "depth": (90, 110)},
    "sofa_two": {"width": (160, 220), "height": (80, 95), "depth": (85, 100)},
    "sofa_sleeper": {"width": (190, 250), "height": (85, 100), "depth": (100, 140)},
    "recliner_power": {"width": (95, 120), "height": (105, 115), "depth": (95, 115)},
    "recliner_manual": {"width": (90, 115), "height": (100, 110), "depth": (90, 110)},
    "coffee_marble": {"width": (120, 160), "height": (42, 50), "depth": (70, 90)},
    "coffee_glass": {"width": (110, 150), "height": (40, 48), "depth": (65, 85)},
    "tv_wall": {"width": (160, 220), "height": (40, 55), "depth": (30, 45)},
    "tv_floor": {"width": (180, 240), "height": (60, 85), "depth": (45, 60)},
    "bed_king": {"width": (190, 210), "height": (110, 125), "depth": (210, 230)},
    "bed_queen": {"width": (150, 170), "height": (100, 115), "depth": (200, 215)},
    "wardrobe_sliding": {"width": (180, 240), "height": (210, 240), "depth": (60, 75)},
    "wardrobe_hinged": {"width": (150, 210), "height": (210, 240), "depth": (55, 65)},
    "mattress": {"width": (150, 200), "height": (20, 35), "depth": (200, 220)},
    "dressing_modern": {"width": (90, 120), "height": (165, 185), "depth": (45, 55)},
    "dressing_classic": {"width": (100, 130), "height": (170, 190), "depth": (45, 60)},
    "dining_set_four": {"width": (140, 180), "height": (75, 80), "depth": (90, 110)},
    "dining_set_six": {"width": (180, 220), "height": (75, 80), "depth": (100, 120)},
    "dining_table_marble": {"width": (160, 210), "height": (75, 80), "depth": (90, 120)},
    "dining_table_wood": {"width": (150, 200), "height": (75, 80), "depth": (90, 110)},
    "dining_table_glass": {"width": (150, 190), "height": (75, 80), "depth": (90, 110)},
    "dining_chair_upholstered": {"width": (50, 60), "height": (95, 110), "depth": (55, 65)},
    "dining_chair_wood": {"width": (48, 58), "height": (95, 105), "depth": (55, 65)},
    "buffet_storage": {"width": (150, 200), "height": (85, 110), "depth": (45, 55)},
    "buffet_display": {"width": (140, 190), "height": (150, 180), "depth": (45, 55)},
    "desk_executive": {"width": (160, 220), "height": (75, 85), "depth": (80, 100)},
    "desk_workstation": {"width": (140, 200), "height": (75, 80), "depth": (70, 90)},
    "chair_executive": {"width": (65, 75), "height": (115, 130), "depth": (65, 75)},
    "chair_task": {"width": (55, 65), "height": (95, 110), "depth": (55, 65)},
    "storage_cabinet": {"width": (90, 140), "height": (180, 220), "depth": (45, 55)},
    "storage_drawer": {"width": (80, 120), "height": (95, 115), "depth": (45, 55)},
    "storage_locker": {"width": (90, 120), "height": (180, 200), "depth": (50, 60)},
    "kids_bed_theme": {"width": (130, 150), "height": (130, 160), "depth": (200, 215)},
    "kids_bed_bunk": {"width": (120, 140), "height": (150, 175), "depth": (200, 210)},
    "kids_study_smart": {"width": (110, 140), "height": (75, 90), "depth": (55, 70)},
    "kids_study_compact": {"width": (90, 120), "height": (75, 85), "depth": (50, 60)},
    "kids_study_corner": {"width": (120, 150), "height": (75, 90), "depth": (80, 100)},
    "kids_storage_toy": {"width": (80, 120), "height": (100, 130), "depth": (40, 55)},
    "kids_storage_shelf": {"width": (70, 110), "height": (150, 190), "depth": (35, 45)},
    "outdoor_lounge_three": {"width": (200, 240), "height": (80, 95), "depth": (150, 180)},
    "outdoor_lounge_six": {"width": (240, 300), "height": (80, 95), "depth": (160, 200)},
    "outdoor_dining_four": {"width": (160, 200), "height": (75, 80), "depth": (100, 120)},
    "outdoor_dining_six": {"width": (200, 240), "height": (75, 80), "depth": (110, 130)},
    "outdoor_swing": {"width": (95, 110), "height": (180, 210), "depth": (95, 120)},
    "outdoor_garden_chair": {"width": (60, 75), "height": (95, 110), "depth": (70, 85)},
    "outdoor_table_coffee": {"width": (90, 130), "height": (45, 55), "depth": (60, 80)},
    "outdoor_table_side": {"width": (50, 70), "height": (50, 60), "depth": (50, 70)},
    "outdoor_planter": {"width": (35, 55), "height": (60, 90), "depth": (35, 55)},
    "outdoor_umbrella": {"width": (160, 220), "height": (240, 280), "depth": (160, 220)},
}

categories = {
    "Living Room": [
        {"subcategory": "Sofas - L-Shaped", "item_label": "L-Shaped Sofa", "prefix": "DFW-LSL", "profile": "sectional", "materials": ["Leather", "Fabric", "Solid Wood"], "image_slug": "l-shaped-sofa"},
        {"subcategory": "Sofas - 3-Seater", "item_label": "3-Seater Sofa", "prefix": "DFW-LS3", "profile": "sofa_three", "materials": ["Fabric", "Leather", "Solid Wood"], "image_slug": "three-seater-sofa"},
        {"subcategory": "Sofas - 2-Seater", "item_label": "2-Seater Sofa", "prefix": "DFW-LS2", "profile": "sofa_two", "materials": ["Fabric", "Leather", "Solid Wood"], "image_slug": "two-seater-sofa"},
        {"subcategory": "Sofas - Sofa-Cum-Bed", "item_label": "Sleeper Sofa", "prefix": "DFW-LSS", "profile": "sofa_sleeper", "materials": ["Fabric", "Leather", "MDF"], "image_slug": "sofa-bed"},
        {"subcategory": "Recliners - Power Recliners", "item_label": "Power Recliner", "prefix": "DFW-LRP", "profile": "recliner_power", "materials": ["Leather", "Fabric"], "image_slug": "power-recliner"},
        {"subcategory": "Recliners - Manual Recliners", "item_label": "Manual Recliner", "prefix": "DFW-LRM", "profile": "recliner_manual", "materials": ["Leather", "Fabric"], "image_slug": "manual-recliner"},
        {"subcategory": "Coffee Tables - Marble Collection", "item_label": "Marble Coffee Table", "prefix": "DFW-LCM", "profile": "coffee_marble", "materials": ["Solid Wood", "Metal", "MDF"], "image_slug": "marble-coffee-table"},
        {"subcategory": "Coffee Tables - Glass Collection", "item_label": "Glass Coffee Table", "prefix": "DFW-LCG", "profile": "coffee_glass", "materials": ["Metal", "MDF", "Solid Wood"], "image_slug": "glass-coffee-table"},
        {"subcategory": "TV Units - Wall-Mounted", "item_label": "Wall-Mounted TV Unit", "prefix": "DFW-LTW", "profile": "tv_wall", "materials": ["MDF", "Solid Wood", "Metal"], "image_slug": "wall-tv-unit"},
        {"subcategory": "TV Units - Floor-Standing", "item_label": "Floor TV Unit", "prefix": "DFW-LTF", "profile": "tv_floor", "materials": ["Solid Wood", "MDF"], "image_slug": "floor-tv-unit"}
    ],
    "Bedroom": [
        {"subcategory": "Beds - King Size", "item_label": "King Bed", "prefix": "DFW-BDK", "profile": "bed_king", "materials": ["Solid Wood", "MDF"], "image_slug": "king-bed"},
        {"subcategory": "Beds - Queen Size", "item_label": "Queen Bed", "prefix": "DFW-BDQ", "profile": "bed_queen", "materials": ["Solid Wood", "MDF"], "image_slug": "queen-bed"},
        {"subcategory": "Wardrobes - Sliding Door", "item_label": "Sliding Wardrobe", "prefix": "DFW-BWS", "profile": "wardrobe_sliding", "materials": ["MDF", "Solid Wood"], "image_slug": "sliding-wardrobe"},
        {"subcategory": "Wardrobes - Hinged Door", "item_label": "Hinged Wardrobe", "prefix": "DFW-BWH", "profile": "wardrobe_hinged", "materials": ["Solid Wood", "MDF"], "image_slug": "hinged-wardrobe"},
        {"subcategory": "Mattresses - Memory Foam", "item_label": "Memory Foam Mattress", "prefix": "DFW-BMM", "profile": "mattress", "materials": ["Fabric"], "image_slug": "memory-foam-mattress"},
        {"subcategory": "Mattresses - Spring", "item_label": "Spring Mattress", "prefix": "DFW-BMS", "profile": "mattress", "materials": ["Fabric"], "image_slug": "spring-mattress"},
        {"subcategory": "Mattresses - Orthopedic", "item_label": "Orthopedic Mattress", "prefix": "DFW-BMO", "profile": "mattress", "materials": ["Fabric"], "image_slug": "orthopedic-mattress"},
        {"subcategory": "Dressing Tables - Modern", "item_label": "Modern Dressing Table", "prefix": "DFW-BDM", "profile": "dressing_modern", "materials": ["MDF", "Solid Wood"], "image_slug": "modern-dressing-table"},
        {"subcategory": "Dressing Tables - Classic", "item_label": "Classic Dressing Table", "prefix": "DFW-BDC", "profile": "dressing_classic", "materials": ["Solid Wood", "MDF"], "image_slug": "classic-dressing-table"}
    ],
    "Dining Room": [
        {"subcategory": "Dining Sets - 4-Seater", "item_label": "4-Seater Dining Set", "prefix": "DFW-DN4", "profile": "dining_set_four", "materials": ["Solid Wood", "MDF", "Metal"], "image_slug": "4-seater-dining-set"},
        {"subcategory": "Dining Sets - 6-Seater", "item_label": "6-Seater Dining Set", "prefix": "DFW-DN6", "profile": "dining_set_six", "materials": ["Solid Wood", "Metal", "MDF"], "image_slug": "6-seater-dining-set"},
        {"subcategory": "Dining Tables - Marble", "item_label": "Marble Dining Table", "prefix": "DFW-DTM", "profile": "dining_table_marble", "materials": ["Metal", "Solid Wood", "MDF"], "image_slug": "marble-dining-table"},
        {"subcategory": "Dining Tables - Wood", "item_label": "Wood Dining Table", "prefix": "DFW-DTW", "profile": "dining_table_wood", "materials": ["Solid Wood", "MDF"], "image_slug": "wood-dining-table"},
        {"subcategory": "Dining Tables - Glass", "item_label": "Glass Dining Table", "prefix": "DFW-DTG", "profile": "dining_table_glass", "materials": ["Metal", "MDF"], "image_slug": "glass-dining-table"},
        {"subcategory": "Dining Chairs - Upholstered", "item_label": "Upholstered Dining Chair", "prefix": "DFW-DCU", "profile": "dining_chair_upholstered", "materials": ["Fabric", "Leather"], "image_slug": "upholstered-dining-chair"},
        {"subcategory": "Dining Chairs - Wooden", "item_label": "Wooden Dining Chair", "prefix": "DFW-DCW", "profile": "dining_chair_wood", "materials": ["Solid Wood"], "image_slug": "wooden-dining-chair"},
        {"subcategory": "Buffet Units - Storage", "item_label": "Storage Buffet Unit", "prefix": "DFW-DBS", "profile": "buffet_storage", "materials": ["Solid Wood", "MDF"], "image_slug": "storage-buffet"},
        {"subcategory": "Buffet Units - Display", "item_label": "Display Buffet Unit", "prefix": "DFW-DBD", "profile": "buffet_display", "materials": ["Solid Wood", "MDF", "Metal"], "image_slug": "display-buffet"}
    ],
    "Office": [
        {"subcategory": "Desks - Executive", "item_label": "Executive Desk", "prefix": "DFW-OFE", "profile": "desk_executive", "materials": ["Solid Wood", "MDF"], "image_slug": "executive-desk"},
        {"subcategory": "Desks - Workstation", "item_label": "Workstation Desk", "prefix": "DFW-OFW", "profile": "desk_workstation", "materials": ["MDF", "Metal", "Solid Wood"], "image_slug": "workstation-desk"},
        {"subcategory": "Chairs - Executive", "item_label": "Executive Office Chair", "prefix": "DFW-OCE", "profile": "chair_executive", "materials": ["Leather", "Fabric"], "image_slug": "executive-office-chair"},
        {"subcategory": "Chairs - Task", "item_label": "Task Office Chair", "prefix": "DFW-OCT", "profile": "chair_task", "materials": ["Fabric", "Leather"], "image_slug": "task-office-chair"},
        {"subcategory": "Storage - Cabinets", "item_label": "Office Cabinet", "prefix": "DFW-OSC", "profile": "storage_cabinet", "materials": ["Metal", "MDF", "Solid Wood"], "image_slug": "office-cabinet"},
        {"subcategory": "Storage - Drawers", "item_label": "Office Drawer Unit", "prefix": "DFW-OSD", "profile": "storage_drawer", "materials": ["MDF", "Metal", "Solid Wood"], "image_slug": "office-drawer"},
        {"subcategory": "Storage - Lockers", "item_label": "Office Locker", "prefix": "DFW-OSL", "profile": "storage_locker", "materials": ["Metal", "MDF"], "image_slug": "office-locker"}
    ],
    "Kids": [
        {"subcategory": "Beds - Theme Beds", "item_label": "Theme Kids Bed", "prefix": "DFW-KBT", "profile": "kids_bed_theme", "materials": ["MDF", "Solid Wood"], "image_slug": "kids-theme-bed"},
        {"subcategory": "Beds - Bunk Beds", "item_label": "Bunk Bed", "prefix": "DFW-KBB", "profile": "kids_bed_bunk", "materials": ["Solid Wood", "MDF"], "image_slug": "kids-bunk-bed"},
        {"subcategory": "Study Tables - Smart", "item_label": "Smart Study Table", "prefix": "DFW-KSS", "profile": "kids_study_smart", "materials": ["MDF", "Solid Wood"], "image_slug": "kids-smart-study-table"},
        {"subcategory": "Study Tables - Compact", "item_label": "Compact Study Table", "prefix": "DFW-KSC", "profile": "kids_study_compact", "materials": ["MDF", "Solid Wood"], "image_slug": "kids-compact-study-table"},
        {"subcategory": "Study Tables - Corner", "item_label": "Corner Study Table", "prefix": "DFW-KSR", "profile": "kids_study_corner", "materials": ["MDF", "Solid Wood"], "image_slug": "kids-corner-study-table"},
        {"subcategory": "Storage - Toy Cabinets", "item_label": "Toy Storage Cabinet", "prefix": "DFW-KST", "profile": "kids_storage_toy", "materials": ["MDF", "Solid Wood"], "image_slug": "toy-storage-cabinet"},
        {"subcategory": "Storage - Shelves", "item_label": "Kids Shelf Unit", "prefix": "DFW-KSSHF", "profile": "kids_storage_shelf", "materials": ["MDF", "Solid Wood"], "image_slug": "kids-shelf"}
    ],
    "Outdoor": [
        {"subcategory": "Lounge Sets - 3 Piece", "item_label": "3 Piece Lounge Set", "prefix": "DFW-OL3", "profile": "outdoor_lounge_three", "materials": ["Metal", "Solid Wood", "Fabric"], "image_slug": "outdoor-lounge-set"},
        {"subcategory": "Lounge Sets - 6 Piece", "item_label": "6 Piece Lounge Set", "prefix": "DFW-OL6", "profile": "outdoor_lounge_six", "materials": ["Metal", "Solid Wood", "Fabric"], "image_slug": "outdoor-lounge-set-6"},
        {"subcategory": "Dining Sets - 4 Seater Outdoor", "item_label": "4 Seater Outdoor Dining Set", "prefix": "DFW-OD4", "profile": "outdoor_dining_four", "materials": ["Metal", "Solid Wood", "MDF"], "image_slug": "outdoor-dining-set"},
        {"subcategory": "Dining Sets - 6 Seater Outdoor", "item_label": "6 Seater Outdoor Dining Set", "prefix": "DFW-OD6", "profile": "outdoor_dining_six", "materials": ["Metal", "Solid Wood"], "image_slug": "outdoor-dining-set-6"},
        {"subcategory": "Chairs - Swing Chairs", "item_label": "Outdoor Swing Chair", "prefix": "DFW-OCS", "profile": "outdoor_swing", "materials": ["Metal", "Fabric"], "image_slug": "outdoor-swing-chair"},
        {"subcategory": "Chairs - Garden Chairs", "item_label": "Garden Chair", "prefix": "DFW-OCG", "profile": "outdoor_garden_chair", "materials": ["Metal", "Solid Wood", "Fabric"], "image_slug": "garden-chair"},
        {"subcategory": "Tables - Coffee Tables", "item_label": "Outdoor Coffee Table", "prefix": "DFW-OTC", "profile": "outdoor_table_coffee", "materials": ["Metal", "Solid Wood", "MDF"], "image_slug": "outdoor-coffee-table"},
        {"subcategory": "Tables - Side Tables", "item_label": "Outdoor Side Table", "prefix": "DFW-OTS", "profile": "outdoor_table_side", "materials": ["Metal", "Solid Wood"], "image_slug": "outdoor-side-table"},
        {"subcategory": "Decor - Planters", "item_label": "Outdoor Planter", "prefix": "DFW-ODP", "profile": "outdoor_planter", "materials": ["Metal", "Solid Wood"], "image_slug": "outdoor-planter"},
        {"subcategory": "Decor - Umbrellas", "item_label": "Outdoor Umbrella", "prefix": "DFW-ODU", "profile": "outdoor_umbrella", "materials": ["Metal", "Fabric"], "image_slug": "outdoor-umbrella"}
    ]
}

adjectives = [
    "Aurora", "Celeste", "Heritage", "Luxe", "Urban", "Vista", "Cascade", "Zenith", "Harmony",
    "Solace", "Radiant", "Prime", "Aster", "Monarch", "Eminence", "Nexa", "Tranquil", "Voyage",
    "Opal", "Savoy", "Aria", "Mosaic", "Summit", "Harbor", "Verve", "Atlas", "Arcadia", "Sierra",
    "Crimson", "Ivory", "Juniper", "Kinetic", "Lumina", "Noir", "Odyssey", "Prairie", "Quill",
    "Riviera", "Sterling", "Terra"
]

styles = [
    "Signature", "Heritage", "Studio", "Legacy", "Modern", "Contour", "Haven", "Fusion", "Horizon",
    "Axis", "Estate", "Vista", "Collective", "Edition", "Origin", "Peak", "Parallel", "Spectrum",
    "Essence", "Alliance", "Calibre", "Galleria", "Latitude", "Momentum", "Synergy", "Urbane"
]

comfort_phrases = {
    "Living Room": [
        "keeps gatherings comfortable for hours of conversation",
        "lets every movie night feel luxuriously relaxed",
        "supports effortless lounging for families and guests"
    ],
    "Bedroom": [
        "cradles nightly routines in restorative comfort",
        "delivers restful support from dusk to dawn",
        "keeps bedtime rituals calm and cozy"
    ],
    "Dining Room": [
        "makes shared meals feel comfortably unhurried",
        "keeps guests supported through every course",
        "blends comfortable seating with practical proportions"
    ],
    "Office": [
        "maintains ergonomic comfort through long work sessions",
        "supports focus with balanced comfort and utility",
        "keeps productivity comfortable without sacrificing poise"
    ],
    "Kids": [
        "keeps play and study time comfortable for growing minds",
        "delivers soft edges and supportive comfort for little ones",
        "balances playful comfort with everyday durability"
    ],
    "Outdoor": [
        "keeps open-air lounging comfortable in every season",
        "delivers breezy comfort for sunlit gatherings",
        "pairs outdoor durability with lasting comfort"
    ]
}

design_templates = [
    "Sleek {subcategory} lines lend a tailored profile that elevates modern decor.",
    "Layered detailing gives this {subcategory} a timeless design presence.",
    "A refined {subcategory} silhouette keeps the look polished and versatile.",
    "Thoughtful accents ensure the {subcategory} feels both contemporary and inviting."
]

def slugify(value: str) -> str:
    value = value.lower().replace("&", "and").replace("/", " ")
    slug = re.sub(r"[^a-z0-9]+", "-", value)
    return slug.strip("-")


def rand_dimensions(profile_key: str) -> dict[str, int]:
    profile = dimension_profiles[profile_key]
    width = random.randint(*profile["width"])
    height = random.randint(*profile["height"])
    depth = random.randint(*profile["depth"])
    return {"width": width, "height": height, "depth": depth}


def make_description(name: str, material: str, category: str, subcategory: str) -> str:
    comfort_line = random.choice(comfort_phrases[category])
    design_line = random.choice(design_templates).format(subcategory=subcategory.lower())
    material_line = (
        f"{name} leverages {material.lower()} craftsmanship to withstand daily use in the {category.lower()}."
    )
    comfort_sentence = comfort_line.capitalize() + "."
    design_sentence = design_line
    return " ".join([material_line, comfort_sentence, design_sentence])


def build_products() -> list[dict]:
    products: list[dict] = []
    used_names: set[str] = set()
    id_counters: dict[str, int] = {}
    for category, subcategories in categories.items():
        for sub in subcategories:
            prefix = sub["prefix"]
            id_counters.setdefault(prefix, 0)
            for _ in range(3):
                # Ensure unique name combinations across catalog
                while True:
                    name = f"{random.choice(adjectives)} {random.choice(styles)} {sub['item_label']}"
                    if name not in used_names:
                        used_names.add(name)
                        break
                id_counters[prefix] += 1
                product_id = f"{prefix}-{id_counters[prefix]:03d}"
                material = random.choice(sub.get("materials", materials_master))
                dimensions = rand_dimensions(sub["profile"])
                price = random.randrange(5000, 100001, 500)
                stock = random.randint(10, 100)
                rating = round(random.uniform(3.5, 5.0), 1)
                warranty = f"{random.randint(1, 5)} years"
                customization = random.choice([True, False])
                image_slug = sub.get("image_slug") or slugify(sub["subcategory"])
                base_query = f"{image_slug},{category_keywords[category]},furniture"
                images = [
                    f"https://source.unsplash.com/600x600/?{base_query},angle{idx}"
                    for idx in range(1, 6)
                ]
                description = make_description(name, material, category, sub["subcategory"])
                products.append(
                    {
                        "id": product_id,
                        "name": name,
                        "category": category,
                        "subcategory": sub["subcategory"],
                        "price": price,
                        "material": material,
                        "dimensions": dimensions,
                        "colorOptions": color_options,
                        "stock": stock,
                        "rating": rating,
                        "warranty": warranty,
                        "delivery": "7-10 business days",
                        "customization": customization,
                        "description": description,
                        "images": images,
                    }
                )
    return products


def main() -> None:
    products = build_products()
    output_path = Path("src/data/catalog.json")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(products, indent=2))


if __name__ == "__main__":
    main()
