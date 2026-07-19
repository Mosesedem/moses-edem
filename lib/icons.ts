import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Circle,
  Code2,
  Compass,
  Database,
  FileText,
  Github,
  GraduationCap,
  Heart,
  Link2,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Moon,
  Server,
  Sparkles,
  Sun,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  ArrowRight,
  BookOpen,
  Briefcase,
  Circle,
  Code2,
  Compass,
  Database,
  FileText,
  Github,
  GraduationCap,
  Heart,
  Link2,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Moon,
  Server,
  Sparkles,
  Sun,
  TrendingUp,
  User,
  Zap,
};

export function resolveIcon(name?: string | null): LucideIcon {
  if (name && name in ICON_MAP) return ICON_MAP[name];
  return Circle;
}
