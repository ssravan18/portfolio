// src/data.js — Sravan Kumar | Azure Data Engineer Portfolio
// All content verified from resume and user-provided information.

export const profile = {
  name: 'Sulige Sravan',
  displayName: 'Sravan',
  role: 'Azure Data Engineer',
  tagline: 'Building Scalable Data Solutions on Azure',
  location: 'Hyderabad, Telangana, India',
  phone: '+91 6303880961',
  email: 'sravansulige@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sravansulige',
  github: 'https://github.com/ssravan18',
  credly: 'https://learn.microsoft.com/en-us/users/sravansulige',
  resume: '/resume.pdf',
  experience: '2+',
  summary:
    'Azure Data Engineer with 2+ years of experience designing and optimizing scalable data pipelines and cloud data solutions using Azure Data Factory, Databricks, PySpark, SQL, and Delta Lake. Experienced in Medallion Architecture, data transformation, data modelling, and pipeline optimization, with a proven track record of improving processing performance and delivering reliable, analytics-ready datasets.',
  about: [
    "I'm an Azure Data Engineer with hands-on experience in designing and implementing end-to-end data pipelines, working with cloud technologies, and building data solutions that are scalable and efficient.",
    'I enjoy solving complex problems, learning new technologies, and creating data-driven solutions that make a measurable impact — from raw ingestion to analytics-ready gold-layer datasets.',
  ],
  traits: ['Problem Solver', 'Quick Learner', 'Team Player'],
};

export const skills = [
  { name: 'Azure', group: 'Cloud platform', icon: '☁', color: '#0078d4' },
  { name: 'Azure Data Factory', group: 'Ingestion & orchestration', icon: '⚙', color: '#0078d4' },
  { name: 'Azure Databricks', group: 'Processing & compute', icon: '⚡', color: '#ff3621' },
  { name: 'Azure Synapse Analytics', group: 'Analytics warehouse', icon: '◈', color: '#8661c5' },
  { name: 'Azure Fabric', group: 'Unified analytics', icon: '🔷', color: '#0078d4' },
  { name: 'SQL', group: 'Querying & modelling', icon: '🗄', color: '#cc2927' },
  { name: 'Python', group: 'Programming', icon: '🐍', color: '#3776ab' },
  { name: 'Apache Spark / PySpark', group: 'Distributed processing', icon: '✳', color: '#e25a1c' },
  { name: 'Delta Lake', group: 'Data lakehouse', icon: '△', color: '#00add4' },
  { name: 'ADLS Gen2', group: 'Cloud storage', icon: '◫', color: '#0078d4' },
  { name: 'Unity Catalog', group: 'Data governance', icon: '🔐', color: '#ff3621' },
  { name: 'Git & GitHub', group: 'Version control', icon: '⌥', color: '#181717' },
];

export const projects = [
  {
    number: '01',
    title: 'E-Commerce Analytics Pipeline',
    subtitle: 'Medallion Architecture on Databricks',
    type: 'Cloud Data Engineering',
    status: 'Featured project',
    description:
      'End-to-end e-commerce data pipeline using Bronze-Silver-Gold medallion architecture, processing 100GB of data with Delta Lake, Unity Catalog, and PySpark transformations.',
    stack: ['Azure Databricks', 'PySpark', 'Spark SQL', 'Delta Lake', 'Unity Catalog', 'ADLS Gen2'],
    flow: ['Raw CSV/JSON', 'Bronze Layer', 'Silver (Clean)', 'Gold Analytics'],
    details: [
      'Engineered ingestion workflows from raw CSV/JSON sources into ADLS Gen2, using Delta Lake for ACID transactions, schema enforcement, and time travel for reproducibility.',
      'Developed PySpark transformations to clean, deduplicate, and conform dimension and fact tables (customers, products, orders), applying broadcast joins and partitioning to minimize shuffles.',
      'Implemented Unity Catalog for centralized data governance, role-based access control, and controlled access to analytical datasets.',
      'Optimized Spark workloads through cluster configuration, strategic caching, and partition tuning — targeting 25% reduction in processing time and 15-20% lower compute costs.',
      'Created Gold-layer analytics-ready datasets and validated data quality through completeness, uniqueness, and consistency checks targeting 97%+ quality across critical fields.',
    ],
    metrics: [
      { label: 'Data Processed', value: '100 GB' },
      { label: 'Processing Improvement', value: '25%' },
      { label: 'Data Quality Target', value: '97%+' },
      { label: 'Compute Cost Reduction', value: '15-20%' },
    ],
    github: 'https://github.com/ssravan18',
  },
  {
    number: '02',
    title: 'End-to-End Azure Data Pipeline',
    subtitle: 'On-Prem to ADLS Gen2 Migration',
    type: 'ETL/ELT Engineering',
    status: 'Featured project',
    description:
      'Designed and implemented an ETL/ELT pipeline using Azure Data Factory to migrate 200GB of on-premises data into ADLS Gen2, with Synapse Analytics for analytics-ready delivery.',
    stack: ['Azure Data Factory', 'Azure Synapse Analytics', 'PySpark', 'SQL', 'ADLS Gen2', 'Delta Lake', 'Parquet'],
    flow: ['On-Prem Source', 'ADF Ingest', 'Transform & Validate', 'ADLS Gen2 / Synapse'],
    details: [
      'Designed end-to-end ETL/ELT pipeline using Azure Data Factory to migrate 200GB of on-premises data into ADLS Gen2, supporting scalable cloud data integration.',
      'Developed data cleansing, transformation, validation, and reconciliation workflows using ADF Mapping Data Flows, PySpark, and Synapse SQL to deliver analytics-ready datasets.',
      'Configured parameterized and reusable ADF pipelines with scheduled triggers, dependency management, retry policies, and error handling for pipeline reliability.',
      'Monitored pipeline execution and data quality, achieving 25% faster processing and 99%+ successful pipeline runs through workflow optimization.',
    ],
    metrics: [
      { label: 'Data Migrated', value: '200 GB' },
      { label: 'Processing Speed', value: '+25%' },
      { label: 'Pipeline Success Rate', value: '99%+' },
      { label: 'Architecture', value: 'Medallion' },
    ],
    github: 'https://github.com/ssravan18',
  },
  {
    number: '03',
    title: 'Real-time Data Streaming Platform',
    subtitle: 'Event-driven Azure Architecture',
    type: 'Streaming Data Engineering',
    status: 'Project',
    description:
      'Real-time data ingestion pipeline using Azure Event Hubs and Stream Analytics to process streaming data, storing results in Azure Data Lake for downstream analytics consumption.',
    stack: ['Azure Event Hubs', 'Azure Stream Analytics', 'Azure Storage', 'PySpark', 'SQL'],
    flow: ['Event Sources', 'Event Hubs Buffer', 'Stream Analytics', 'ADLS Store'],
    details: [
      'Implemented event ingestion using Azure Event Hubs as a high-throughput message broker for streaming data.',
      'Built Stream Analytics jobs with windowed aggregations for near-real-time processing and transformation.',
      'Stored processed output in Azure Data Lake for downstream batch analytics and reporting.',
      'Configured checkpointing, late-arriving event handling, and replay for fault-tolerant processing.',
    ],
    metrics: [
      { label: 'Latency', value: 'Near Real-time' },
      { label: 'Architecture', value: 'Event-driven' },
      { label: 'Storage', value: 'ADLS Gen2' },
      { label: 'Processing', value: 'Stream + Batch' },
    ],
    github: 'https://github.com/ssravan18',
  },
];

export const certifications = [
  {
    name: 'Microsoft Certified: Fabric Data Engineer Associate',
    code: 'DP-700',
    issuer: 'Microsoft',
    status: 'Certified',
    date: '2025',
    url: 'https://learn.microsoft.com/en-us/users/sravansulige',
    badge: 'DP-700',
    color: '#0078d4',
  },
  {
    name: 'Microsoft Certified: Azure Data Fundamentals',
    code: 'DP-900',
    issuer: 'Microsoft',
    status: 'Certified',
    date: '2024',
    url: 'https://learn.microsoft.com/en-us/users/sravansulige',
    badge: 'DP-900',
    color: '#0078d4',
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    code: 'AZ-900',
    issuer: 'Microsoft',
    status: 'Certified — Sponsored by Tech Mahindra',
    date: '2024',
    url: 'https://learn.microsoft.com/en-us/users/sravansulige',
    badge: 'AZ-900',
    color: '#0078d4',
  },
  {
    name: 'GitHub Foundations',
    code: 'GH-300',
    issuer: 'GitHub',
    status: 'Certified',
    date: '2024',
    url: 'https://learn.microsoft.com/en-us/users/sravansulige',
    badge: 'GH',
    color: '#181717',
  },
];

export const experience = [
  {
    role: 'Azure Data Engineer',
    company: 'Tech Mahindra',
    period: 'Nov 2024 – Present',
    location: 'Hyderabad, India',
    type: 'Full-time',
    bullets: [
      'Supported end-to-end data pipelines across enterprise B2B systems, identifying data inconsistencies across multiple ETL pipelines and ensuring accurate source-to-target data processing.',
      'Optimized scalable ETL workflows for data migration, performance tuning, and data warehouse integration with robust cleansing, validation, and reliable data loading.',
      'Designed and optimized parameterized, reusable ELT pipelines, leveraging complex transformations to implement business logic while collaborating with analysts and architects.',
      'Investigated data quality and integrity issues across multiple data sources, performed root-cause analysis, and implemented fixes to improve data accuracy and lineage.',
    ],
    contributions: [
      'Built ETL/ELT pipelines (200GB+ data migration)',
      'Optimized data transformation jobs in PySpark',
      'Improved data availability and processing performance',
      'Designed medallion architecture pipelines',
    ],
    logo: 'TM',
    logoColor: '#e31837',
  },
];

export const education = [
  {
    degree: "Bachelor's (B.Tech.) in Information Technology",
    institution: 'Anurag University',
    period: '2020 – 2024',
    cgpa: '8.45',
    location: 'Hyderabad, India',
    icon: '🎓',
  },
];

export const achievements = [
  {
    icon: '🏆',
    title: 'AZ-900 Certified',
    description: 'Completed AZ-900 (100% Sponsored by Tech Mahindra)',
    color: '#f59e0b',
  },
  {
    icon: '💻',
    title: '250+ DSA Problems',
    description: 'Solved 250+ DSA problems on LeetCode & GeeksForGeeks',
    color: '#3b82f6',
  },
  {
    icon: '🚀',
    title: 'Personal Projects',
    description: 'Built multiple projects (MERN, Spring Boot, Machine Learning)',
    color: '#8b5cf6',
  },
  {
    icon: '⭐',
    title: 'Active Learner',
    description: 'Active learner in Azure, Data Engineering, and Cloud Technologies',
    color: '#10b981',
  },
];

export const stats = [
  { value: '2+', label: 'Years Experience', icon: '📅' },
  { value: '200GB+', label: 'Data Migrated', icon: '📊' },
  { value: '4+', label: 'Certifications', icon: '🏅' },
  { value: '99%+', label: 'Pipeline Success Rate', icon: '⚡' },
];
