import {
  Layers,
  Code,
  Zap,
  Sparkles,
  Database,
  ShoppingCart,
  Layout,
  Box,
  Server,
  HardDrive,
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
    title: "Backend Development",
    cards: [
      {
        title: "Server & API Development",
        desc: "Node.js and Express.js for building server side logic, RESTful API design with clean route structure, middleware setup, authentication and authorization flows, error handling and request validation, connecting frontend interfaces to real data sources",
        icon: <Server className="w-6 h-6" />,
      },
      {
        title: "Database & Infrastructure",
        desc: "MongoDB for flexible document based data storage, PostgreSQL for structured relational data, Prisma ORM for type safe database queries and migrations, Docker for containerized development environments, basic deployment setup and environment configuration",
        icon: <HardDrive className="w-6 h-6" />,
      },
    ],
  },
  {
    title: "WordPress",
    cards: [
      {
        title: "Page Builders & Custom Functionality",
        desc: "Elementor Pro, Bricks Builder, Gutenberg and Divi with custom widgets, blocks, query loops and theme builder layouts, Custom Post Types, Advanced Custom Fields, hooks and filters, functions.php logic, shortcodes and plugin integration",
        icon: <Layout className="w-6 h-6" />,
      },
      {
        title: "WooCommerce & CMS Structure",
        desc: "Custom product page layouts, cart and checkout template overrides, WooCommerce hooks for store control, user role and permission management, structured content architecture for editors, clean backend experience for non-technical users",
        icon: <ShoppingCart className="w-6 h-6" />,
      },
    ],
  },
  {
    title: "Shopify",
    cards: [
      {
        title: "Custom Theme & Sections",
        desc: "Theme Development from the ground up including custom Dawn builds and architecture planning. Building schema driven Custom Section Blocks with merchant editable settings and dynamic rendering for non technical store owners.",
        icon: <Box className="w-6 h-6" />,
      },

      {
        title: "Storefront & Data Layer",
        desc: "Utilizing product metafields and a robust data layer for dynamic content binding without hardcoding. Building fast mobile first storefront layouts with slide out carts collection filtering and performance tuning.",
        icon: <Database className="w-6 h-6" />,
      },
    ],
  },
];
