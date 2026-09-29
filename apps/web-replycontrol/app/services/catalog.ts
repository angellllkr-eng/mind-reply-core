export type Service = {
  slug: string;
  number: string;
  title: string;
  promise: string;
  outcomes: string[];
  delivery: string[];
  evidence: string[];
};

export const services: Service[] = [
  { slug: "innovation-intelligence", number: "01", title: "Innovation & Intelligence", promise: "Turn complex signals into predictive insight, practical decisions and controlled intelligent workflows.", outcomes: ["Predictive insight", "Decision intelligence", "Workflow automation"], delivery: ["Use-case discovery", "Data and context readiness", "Workflow implementation", "Outcome measurement"], evidence: ["Decision log", "Workflow run evidence", "Outcome metrics"] },
  { slug: "data-analytics", number: "02", title: "Data & Analytics", promise: "Unlock the value of business data through dependable architecture, analysis and decision-ready reporting.", outcomes: ["Data architecture", "Analytics foundations", "Executive visibility"], delivery: ["Source mapping", "Data quality controls", "Dashboards and reporting", "Forecasting models"], evidence: ["Data lineage", "Quality checks", "Report provenance"] },
  { slug: "infrastructure-modernisation", number: "03", title: "IT Infrastructure Modernisation", promise: "Future-proof operations with scalable, resilient and cost-conscious cloud or hybrid environments.", outcomes: ["Cloud transformation", "Resilience engineering", "Infrastructure optimisation"], delivery: ["Estate assessment", "Target architecture", "Migration execution", "Observability and recovery"], evidence: ["Architecture baseline", "Deployment records", "Recovery validation"] },
  { slug: "application-modernisation", number: "04", title: "Application Modernisation & Development", promise: "Revitalise legacy systems or build cloud-native applications with production discipline.", outcomes: ["Legacy modernisation", "Cloud-native development", "Product engineering"], delivery: ["Application assessment", "Architecture and build", "Automated testing", "Release and rollback"], evidence: ["CI results", "Release evidence", "Runtime health"] },
  { slug: "security", number: "05", title: "Security", promise: "Protect digital assets with practical controls, threat intelligence and zero-trust architecture.", outcomes: ["Security architecture", "Threat readiness", "Zero-trust controls"], delivery: ["Exposure assessment", "Identity and access controls", "Secret and dependency hygiene", "Security monitoring"], evidence: ["Control inventory", "Scan results", "Remediation record"] },
  { slug: "managed-services", number: "06", title: "Managed Services", promise: "Keep critical systems monitored, maintained and continuously improved.", outcomes: ["Service monitoring", "Operational optimisation", "Release assurance"], delivery: ["Health monitoring", "Incident workflows", "Maintenance", "Continuous improvement"], evidence: ["Uptime signals", "Incident history", "Change record"] },
  { slug: "digital-workplace", number: "07", title: "Digital Workplace", promise: "Equip teams with secure, collaborative tools and seamless access to the systems they depend on.", outcomes: ["Workplace architecture", "Collaboration", "Secure access"], delivery: ["Workplace assessment", "Identity and access", "Collaboration design", "Adoption measurement"], evidence: ["Access posture", "Adoption metrics", "Service health"] },
  { slug: "training", number: "08", title: "Training", promise: "Bridge the digital skills gap with practical enablement that transfers capability to teams.", outcomes: ["Role-based enablement", "Technical training", "Adoption programmes"], delivery: ["Capability assessment", "Role-based curriculum", "Hands-on enablement", "Competency checks"], evidence: ["Completion record", "Assessment results", "Adoption measures"] },
];

export const regions = [
  { slug: "global", name: "Global", mode: "Cross-border delivery and shared operating standards" },
  { slug: "europe", name: "Europe", mode: "Digital transformation, resilience and data-aware delivery" },
  { slug: "bulgaria", name: "Bulgaria", mode: "SME digitalisation, capability uplift and regional delivery base" },
  { slug: "uk-global", name: "UK & Global", mode: "Enterprise modernisation, managed operations and international delivery" },
];

export function getService(slug: string) { return services.find((service) => service.slug === slug); }
export function getRegion(slug: string) { return regions.find((region) => region.slug === slug); }
