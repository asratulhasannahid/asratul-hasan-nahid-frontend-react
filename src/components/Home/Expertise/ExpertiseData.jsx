import {
  Layers,
  Code,
  Zap,
  Sparkles,
  Cpu,
  Database,
  ShoppingCart,
  Layout,
  FileText,
  Box,
  Smartphone,
} from "lucide-react";

export const expertiseData = [
  {
    title: "Frontend Development",
    cards: [
      {
        title: "Web Architecture",
        desc: "Component-based structure, reusable design systems, scalable folder structure, maintainable codebase, separation of concerns, modular thinking",
        icon: <Layers className="w-6 h-6" />,
      },
      {
        title: "Interface Development",
        desc: "React.js, Next.js, JavaScript ES6+, Tailwind CSS, responsive layouts, fluid grids, cross-browser consistency, semantic HTML, accessibility-aware markup, CSS Grid and Flexbox, TypeScript basics, REST API integration",
        icon: <Code className="w-6 h-6" />,
      },
      {
        title: "Performance & Quality",
        desc: "Lighthouse score 90+, lazy loading, code splitting, image optimization, W3C standards compliance, clean readable code, minimal render-blocking, fast time to interactive",
        icon: <Zap className="w-6 h-6" />,
      },
      {
        title: "Motion & Interaction",
        desc: "CSS keyframe animations, scroll-triggered effects, micro-interactions, page transition logic, hover states, IntersectionObserver-based reveals, smooth and intentional UI motion",
        icon: <Sparkles className="w-6 h-6" />,
      },
    ],
  },
  {
    title: "WordPress",
    cards: [
      {
        title: "Page Builders",
        desc: "Elementor Pro with custom widgets and dynamic data, Bricks Builder with custom elements and query loops, Gutenberg with custom blocks and block patterns, Divi with custom modules and theme builder layouts",
        icon: <Layout className="w-6 h-6" />,
      },
      {
        title: "Custom Functionality",
        desc: "Custom Post Types, Advanced Custom Fields, WordPress hooks and filters, functions.php logic, shortcodes, custom REST endpoints, plugin integration",
        icon: <Cpu className="w-6 h-6" />,
      },
      {
        title: "WooCommerce",
        desc: "Custom product page layouts, cart and checkout template overrides, order management customization, WooCommerce hooks for store-level control",
        icon: <ShoppingCart className="w-6 h-6" />,
      },
      {
        title: "CMS & Content Structure",
        desc: "User role and permission management, custom admin dashboard setup, structured content architecture for editors, clean backend experience for non-technical users",
        icon: <FileText className="w-6 h-6" />,
      },
    ],
  },
  {
    title: "Shopify",
    cards: [
      {
        title: "Theme Development",
        desc: "Liquid templating from the ground up, custom theme without starter kits, Dawn-based builds with heavy customization, theme architecture planning before writing a line",
        icon: <Box className="w-6 h-6" />,
      },
      {
        title: "Custom Sections & Blocks",
        desc: "Schema-driven sections with merchant-editable settings, dynamic blocks with conditional rendering, settings panel built for non-technical store owners, reusable section patterns across templates",
        icon: <Layers className="w-6 h-6" />,
      },
      {
        title: "Metafields & Data Layer",
        desc: "Product and collection metafields, metaobjects for structured repeatable content, dynamic content binding across storefront templates, data-driven UI without hardcoding",
        icon: <Database className="w-6 h-6" />,
      },
      {
        title: "Storefront & UX",
        desc: "Slide-out cart drawer, collection filtering logic, product page performance tuning, mobile-first storefront layouts, fast load times with clean Liquid output",
        icon: <Smartphone className="w-6 h-6" />,
      },
    ],
  },
];
