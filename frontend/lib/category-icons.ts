import {
  Dog,
  Bone,
  Cat,
  Fish,
  Stethoscope,
  ShieldCheck,
  ShoppingBag,
  Pill,
  Sparkles,
  Package,
  type LucideIcon,
} from "lucide-react";

export interface CategoryStyle {
  icon: LucideIcon;
  lightColor: string;
}

const CATEGORY_STYLE_MAP: Record<string, CategoryStyle> = {
  "perros-alimento": { icon: Dog, lightColor: "bg-blue-50 text-blue-600" },
  "perros-premios": { icon: Bone, lightColor: "bg-violet-50 text-violet-600" },
  "gatos-alimento": { icon: Cat, lightColor: "bg-amber-50 text-amber-600" },
  "gatos-premios": { icon: Fish, lightColor: "bg-rose-50 text-rose-600" },
  "veterinaria-consultas": { icon: Stethoscope, lightColor: "bg-emerald-50 text-emerald-600" },
  "veterinaria-tratamientos": { icon: ShieldCheck, lightColor: "bg-cyan-50 text-cyan-600" },
  "alimentos": { icon: ShoppingBag, lightColor: "bg-orange-50 text-orange-600" },
  "farmacia": { icon: Pill, lightColor: "bg-teal-50 text-teal-600" },
  "higiene": { icon: Sparkles, lightColor: "bg-pink-50 text-pink-600" },
};

const DEFAULT_STYLE: CategoryStyle = {
  icon: Package,
  lightColor: "bg-gray-50 text-gray-600",
};

export function getCategoryStyle(slug: string): CategoryStyle {
  return CATEGORY_STYLE_MAP[slug] ?? DEFAULT_STYLE;
}
