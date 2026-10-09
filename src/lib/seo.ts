import { SOCIAL, STORES } from "./site-data";

export const SITE_URL = "https://oticaimperio.com.br";
export const SITE_NAME = "Ótica Império Glasses";
const DEFAULT_IMAGE = "/og-image.jpg";

/** O GitHub Pages serve cada página como pasta (/lojas/), então é essa a URL canônica. */
export function absoluteUrl(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.replace(/\/?$/, "/")}`;
}

type Crumb = { name: string; path: string };

type SeoInput = {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  /** trilha exibida no Google; a Home entra automaticamente */
  breadcrumb?: string;
  jsonLd?: object[];
};

/**
 * Head completo de uma página: título, descrição, canonical, Open Graph,
 * Twitter e JSON-LD — tudo derivado de uma única fonte para não divergir.
 */
export function seo({
  path,
  title,
  description,
  image,
  imageAlt,
  breadcrumb,
  jsonLd = [],
}: SeoInput) {
  const url = absoluteUrl(path);
  const img = `${SITE_URL}${image ?? DEFAULT_IMAGE}`;
  const crumbs: Crumb[] = breadcrumb
    ? [
        { name: "Início", path: "/" },
        { name: breadcrumb, path },
      ]
    : [];

  const ld: object[] = [...jsonLd];
  if (crumbs.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absoluteUrl(c.path),
      })),
    });
  }

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt ?? SITE_NAME },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: ld.map((j) => ({ type: "application/ld+json", children: JSON.stringify(j) })),
  };
}

/** As duas lojas como Optician (subtipo de LocalBusiness) para o Google Maps/busca local. */
export function storesJsonLd() {
  return STORES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Optician",
    "@id": `${SITE_URL}/#loja-${s.id}`,
    name: `${SITE_NAME} — ${s.nome}`,
    url: absoluteUrl("/lojas"),
    image: `${SITE_URL}${DEFAULT_IMAGE}`,
    telephone: `+55 ${s.telefoneLabel}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: s.endereco.split(" — ")[0],
      addressLocality: s.cidade,
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: ["Sumaré", "Hortolândia"],
    hasMap: s.maps,
    parentOrganization: { "@id": `${SITE_URL}/#organizacao` },
    sameAs: [SOCIAL.instagram],
  }));
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organizacao`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.png`,
  sameAs: [SOCIAL.instagram],
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#organizacao` },
};
