import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpDown,
  Bell,
  Blocks,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleDot,
  Cloud,
  Code,
  Compass,
  Cpu,
  ExternalLink,
  GitBranch,
  Globe,
  Home,
  Infinity,
  Landmark,
  LayoutGrid,
  LayoutList,
  List,
  LocateFixed,
  Lock,
  LucideIcon,
  Mail,
  MapPinIcon,
  MessagesSquare,
  MoveRight,
  Phone,
  Play,
  PlayCircle,
  Redo,
  Repeat,
  Rocket,
  Scaling,
  Scan,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Users,
  WandSparkles,
  Wrench,
  XCircle,
  Zap,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  iconVariant: string;
  strokeWidth?: number;
  size?: number;
};

type CustomIconProps = {
  className?: string;
};

// Custom Social Media SVG Icons
const FacebookIcon = ({ className }: CustomIconProps) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0821 17.9934V11.6135H14.2227L14.5439 9.12641H12.0821V7.53875C12.0821 6.8189 12.2812 6.32833 13.3146 6.32833L14.6305 6.32779V4.10323C14.403 4.07366 13.6218 4.00586 12.7126 4.00586C10.8141 4.00586 9.5143 5.16471 9.5143 7.29243V9.12641H7.36719V11.6135H9.5143V17.9934H12.0821Z" fill="#fff" />
  </svg>

);

const InstagramIcon = ({ className }: CustomIconProps) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5694 3.85742H7.42677C5.45541 3.85742 3.85547 5.45736 3.85547 7.42872V14.5713C3.85547 16.5427 5.45541 18.1426 7.42677 18.1426H14.5694C16.5407 18.1426 18.1407 16.5427 18.1407 14.5713V7.42872C18.1407 5.45736 16.5407 3.85742 14.5694 3.85742ZM10.9981 14.5713C9.02671 14.5713 7.42677 12.9714 7.42677 11C7.42677 9.02866 9.02671 7.42872 10.9981 7.42872C12.9694 7.42872 14.5694 9.02866 14.5694 11C14.5694 12.9714 12.9694 14.5713 10.9981 14.5713ZM14.8194 7.87156C14.4265 7.87156 14.1051 7.55014 14.1051 7.1573C14.1051 6.76446 14.4265 6.44304 14.8194 6.44304C15.2122 6.44304 15.5336 6.76446 15.5336 7.1573C15.5336 7.55014 15.2122 7.87156 14.8194 7.87156Z" fill="#fff" />
    <path d="M10.9982 13.143C12.1817 13.143 13.141 12.1836 13.141 11.0002C13.141 9.81678 12.1817 8.85742 10.9982 8.85742C9.81482 8.85742 8.85547 9.81678 8.85547 11.0002C8.85547 12.1836 9.81482 13.143 10.9982 13.143Z" fill="#fff" />
  </svg>

);

const LinkedinIcon = ({ className }: CustomIconProps) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.4974 18.4983V13.0052C18.4974 10.3054 17.9162 8.24316 14.7666 8.24316C13.248 8.24316 12.2356 9.06808 11.8231 9.85549H11.7856V8.48689H8.80469V18.4983H11.9169V13.5301C11.9169 12.2177 12.1606 10.9616 13.7729 10.9616C15.3665 10.9616 15.3852 12.4427 15.3852 13.6051V18.4796H18.4974V18.4983Z" fill="#fff" />
    <path d="M3.74219 8.48828H6.85436V18.4997H3.74219V8.48828Z" fill="#fff" />
    <path d="M5.29981 3.50098C4.30616 3.50098 3.5 4.30714 3.5 5.30079C3.5 6.29443 4.30616 7.11934 5.29981 7.11934C6.29345 7.11934 7.09962 6.29443 7.09962 5.30079C7.09962 4.30714 6.29345 3.50098 5.29981 3.50098Z" fill="#fff" />
  </svg>

);

const TwitterIcon = ({ className }: CustomIconProps) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.3463 9.91689L17.6136 3.92578H16.3654L11.7918 9.12778L8.13896 3.92578H3.92578L9.44967 11.7921L3.92578 18.0747H5.17402L10.0038 12.5812L13.8615 18.0747H18.0747L12.346 9.91689H12.3463ZM10.6367 11.8614L10.077 11.0781L5.62378 4.84523H7.54101L11.1348 9.87537L11.6945 10.6587L16.366 17.1971H14.4488L10.6367 11.8617V11.8614Z" fill="#fff" />
  </svg>

);

const YoutubeIcon = ({ className }: CustomIconProps) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.1085 6.53419C19.8896 5.73876 19.2478 5.11173 18.434 4.89755C16.9472 4.5 10.9998 4.5 10.9998 4.5C10.9998 4.5 5.05265 4.5 3.56584 4.88247C2.76764 5.09643 2.11022 5.73887 1.89127 6.53419C1.5 7.98702 1.5 11 1.5 11C1.5 11 1.5 14.0282 1.89127 15.4658C2.11045 16.2611 2.75198 16.8882 3.56595 17.1023C5.06831 17.5 11 17.5 11 17.5C11 17.5 16.9472 17.5 18.434 17.1175C19.2479 16.9035 19.8896 16.2764 20.1088 15.4811C20.4999 14.0282 20.4999 11.0153 20.4999 11.0153C20.4999 11.0153 20.5156 7.98702 20.1085 6.53419ZM9.10628 13.7835V8.2165L14.0518 11L9.10628 13.7835Z" fill="#fff" />
  </svg>
);

const GithubIcon = ({ className }: CustomIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
  </svg>
  
);

const DribbbleIcon = ({ className }: CustomIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
  </svg>
);

// Map of icon names to their components
const iconComponents: Record<string, LucideIcon> = {
  "arrow-down-to-line": ArrowDownToLine,
  "arrow-right": ArrowRight,
  "arrow-up-down": ArrowUpDown,
  bell: Bell,
  blocks: Blocks,
  "building-2": Building2,
  "check-circle-2": CheckCircle2,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "circle-dot": CircleDot,
  cloud: Cloud,
  code: Code,
  compass: Compass,
  cpu: Cpu,
  "external-link": ExternalLink,
  "git-branch": GitBranch,
  globe: Globe,
  home: Home,
  infinity: Infinity,
  landmark: Landmark,
  "layout-grid": LayoutGrid,
  "layout-list": LayoutList,
  list: List,
  "locate-fixed": LocateFixed,
  lock: Lock,
  "messages-square": MessagesSquare,
  "move-right": MoveRight,
  play: Play,
  "play-circle": PlayCircle,
  redo: Redo,
  repeat: Repeat,
  rocket: Rocket,
  scaling: Scaling,
  scan: Scan,
  sparkles: Sparkles,
  star: Star,
  timer: Timer,
  trophy: Trophy,
  users: Users,
  "wand-sparkles": WandSparkles,
  wrench: Wrench,
  "x-circle": XCircle,
  zap: Zap,
  "zoom-in": ZoomIn,
  phone: Phone,
  email: Mail,
  location: MapPinIcon,
};

// Map of custom social media icons
const customSocialIcons: Record<string, React.FC<CustomIconProps>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  github: GithubIcon,
  dribbble: DribbbleIcon,
};

export default function Icon({
  className,
  iconVariant,
  strokeWidth = 1,
  size = 4,
}: IconProps) {
  if (iconVariant === "none") {
    return null;
  }

  // Check if it's a custom social icon first
  if (customSocialIcons[iconVariant]) {
    const CustomIcon = customSocialIcons[iconVariant];
    return <CustomIcon className={cn(`size-${size}`, className)} />;
  }

  // Fall back to Lucide icons
  if (!iconComponents[iconVariant]) {
    return null;
  }

  const IconComponent = iconComponents[iconVariant];
  return (
    <IconComponent
      className={cn(`size-${size}`, className)}
      strokeWidth={strokeWidth}
    />
  );
}
