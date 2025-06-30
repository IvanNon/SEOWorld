import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, Target, Users, Bot, BarChart2, Search, LayoutDashboard, Newspaper, Beaker, ArrowRight, BookOpen, Layers, Lock, CheckCircle, XCircle, AlertCircle, Zap, Shield, Rocket, ChevronDown, PieChart, Link as LinkIcon, Swords, Wrench } from 'lucide-react';

// ----- Font Import & Global Styles -----
const GlobalStyles = () => (
    <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Source+Sans+Pro:wght@400;600;700&display=swap');
            body { 
                font-family: 'Source Sans Pro', sans-serif; 
                background-color: #f8fafc; /* Use slate-50 for a slightly cooler white */
            }
            .font-serif {
                font-family: 'Merriweather', serif;
            }
            .dark body {
                background-color: #0f172a; /* Use slate-900 for dark mode */
            }
            .loader {
                border-top-color: #06b6d4;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        `}
    </style>
);


// Mock Data - Expanded with Backlink & SWOT info
const MOCK_DATA = {
  freeCheckup: {
    metaTags: [
        { check: "Title Tag Presence", status: "pass", description: "Title tag exists." },
        { check: "Title Tag Length", status: "pass", description: "Length is 55 characters (within 60 limit)." },
        { check: "Meta Description Presence", status: "pass", description: "Meta description exists." },
        { check: "Meta Description Length", status: "pass", description: "Length is 155 characters (within 160 limit)." },
        { check: "Viewport Tag", status: "pass", description: "Configured for responsive design." },
        { check: "Character Set", status: "pass", description: "UTF-8 encoding is declared." },
        { check: "Canonical Tag", status: "pass", description: "A canonical URL is properly set." },
        { check: "Language Declaration", status: "pass", description: "Language is declared as 'en'." },
        { check: "Favicon", status: "pass", description: "A favicon is specified for your site." },
    ],
    contentStructure: [
        { check: "H1 Heading", status: "pass", description: "A single, clear H1 heading was found." },
        { check: "Heading Order", status: "pass", description: "H2-H6 headings follow a logical order." },
        { check: "Content Length", status: "pass", description: "Word count is sufficient for the topic." },
        { check: "Readability Score", status: "pass", description: "Content is easily readable." },
        { check: "Keyword in Title", status: "pass", description: "Main keyword found in the title tag." },
        { check: "Keyword in Description", status: "pass", description: "Main keyword found in the meta description." },
        { check: "Keyword in H1", status: "pass", description: "Main keyword found in H1 heading." },
        { check: "Keyword Density", status: "warning", description: "Primary keyword density is slightly low." },
        { check: "Image-to-Text Ratio", status: "pass", description: "Healthy balance of text and media." },
        { check: "No iFrames", status: "pass", description: "No iFrames were found on the page." },
    ],
    linkAnalysis: [
        { check: "Internal Links", status: "pass", description: "Page contains 12 internal links." },
        { check: "External Links", status: "pass", description: "Page contains 3 external links." },
        { check: "No-Follow Links", status: "pass", description: "No-follow attributes used appropriately." },
        { check: "Descriptive Anchor Text", status: "warning", description: "Some links use generic anchor text like 'click here'." },
    ],
    imageAnalysis: [
        { check: "Image Alt Text", status: "fail", description: "3 out of 8 images are missing alt text." },
        { check: "Image File Names", status: "pass", description: "Image filenames are descriptive." },
    ],
    technicalSetup: [
        { check: "SSL Certificate", status: "pass", description: "Site uses a valid HTTPS connection." },
        { check: "Robots.txt", status: "pass", description: "A valid robots.txt file was found." },
        { check: "XML Sitemap", status: "pass", description: "Sitemap is present and linked correctly." },
        { check: "URL Structure", status: "pass", description: "URL is user-friendly and follows best practices." },
        { check: "HTML Doctype", status: "pass", description: "Modern HTML doctype is declared." },
        { check: "No Deprecated HTML", status: "pass", description: "No deprecated tags like <font> were found." },
    ],
    performanceAudit: [
        { check: "JavaScript Minification", status: "pass", description: "Scripts appear to be minified." },
        { check: "CSS Minification", status: "pass", description: "Stylesheets appear to be minified." },
        { check: "Number of CSS Files", status: "pass", description: "A reasonable number of CSS files (3) were found." },
        { check: "Number of JS Files", status: "warning", description: "Page loads a high number of JS files (8)." },
        { check: "Browser Caching", status: "pass", description: "Caching headers are correctly configured." },
    ],
    mobileFriendliness: [
        { check: "Viewport Tag", status: "pass", description: "Configured for responsive design." },
        { check: "Tap Target Size", status: "pass", description: "Buttons and links are large enough for tapping." },
        { check: "Readable Font Size", status: "pass", description: "Font size is legible on mobile devices." },
    ],
    socialAndBrand: [
        { check: "Open Graph Tags", status: "pass", description: "OG tags for Facebook & LinkedIn are present." },
        { check: "Twitter Card Tags", status: "pass", description: "Twitter card tags for X are present." },
    ],
    accessibilityAudit: [
        { check: "ARIA Roles", status: "pass", description: "Basic ARIA landmarks for accessibility are present." },
        { check: "Input Labels", status: "pass", description: "All form inputs have corresponding labels." },
        { check: "HTML Lang Attribute", status: "pass", description: "The HTML 'lang' attribute is set." },
    ],
    securityHeaders: [
        { check: "X-Frame-Options", status: "pass", description: "Protection against clickjacking is enabled." },
        { check: "HSTS Header", status: "pass", description: "Strict-Transport-Security header is present." },
    ]
  },
  freeKeywords: [
      {keyword: "ai seo tool", rank: 3, sv: 4500, url: "/products/ai-seo-suite", competitors: ["Competitor A", "Competitor B"]},
      {keyword: "seo analysis", rank: 5, sv: 8200, url: "/", competitors: ["Competitor C", "Competitor A"]},
      {keyword: "content strategy generator", rank: 8, sv: 2100, url: "/features/content-planner", competitors: ["Competitor D", "Competitor E"]},
      {keyword: "automated seo audit", rank: 12, sv: 1800, url: "/", competitors: ["Competitor B", "Competitor F"]},
      {keyword: "keyword ranking tool", rank: 15, sv: 5500, url: "/features/rank-tracker", competitors: ["Competitor G", "Competitor H"]},
  ],
  freeContentIdeas: [
      { 
          cornerstone: "The Future of AI in Digital Marketing", 
          cluster: ["AI-powered analytics", "Personalized customer journeys", "Predictive advertising models"],
          related_keyword: "ai seo tool",
          sv: 4500,
          long_description: "This cornerstone piece should be a comprehensive, forward-looking guide that positions your brand as a thought leader. It should explore how AI is moving beyond simple automation to become a strategic partner in marketing. Cover topics like generative AI for content creation, the ethics of AI in advertising, and how machine learning can be used to predict market trends and customer behavior. This will attract a high-level audience of marketing managers and strategists."
      },
      { 
          cornerstone: "A Beginner's Guide to Technical SEO", 
          cluster: ["Understanding crawl budgets", "Schema markup for rich snippets", "Optimizing for page speed"],
          related_keyword: "automated seo audit",
          sv: 1800,
          long_description: "Create the ultimate resource for those new to the technical side of SEO. Break down complex topics into simple, actionable steps. Use clear diagrams and code examples to explain how search engine crawlers work, the different types of schema and how to implement them, and the core web vitals that impact user experience. This piece will attract a wide audience and generate valuable, long-tail search traffic."
      },
      { 
          cornerstone: "Building a Content Ecosystem", 
          cluster: ["The hub and spoke model", "Repurposing content for social media", "Measuring content ROI"],
          related_keyword: "content strategy generator",
          sv: 2100,
          long_description: "This content pillar should focus on strategy over individual blog posts. Explain the 'hub and spoke' model where a central 'hub' (your cornerstone content) links out to multiple related 'spoke' articles. Provide a framework for how to take a single piece of research and repurpose it into videos, infographics, social media threads, and email newsletters. This demonstrates efficiency and strategic thinking, appealing to busy content marketers and business owners."
      },
  ],
   freeBacklinkProfile: {
    backlinks: 1250,
    referringDomains: 340,
    topPages: ["/", "/products/ai-seo-suite", "/blog/what-is-ai-seo"],
  },
  overview: {
    siteHealth: 92.3,
    visibility: 78.1,
    trackedKeywords: 150,
    monthlyTraffic: 12450,
    trafficHistory: [ { name: 'Jan', traffic: 4000 }, { name: 'Feb', traffic: 3000 }, { name: 'Mar', traffic: 5000 }, { name: 'Apr', traffic: 4500 }, { name: 'May', traffic: 6000 }, { name: 'Jun', traffic: 8200 }, { name: 'Jul', traffic: 12450 }, ],
  },
  topKeywordMovers: [ { keyword: 'ai seo tool', rank: 3, change: 2, positive: true }, { keyword: 'automated seo action plan', rank: 5, change: 1, positive: true }, { keyword: 'small business seo platform', rank: 12, change: -1, positive: false }, { keyword: 'competitor keyword analysis', rank: 8, change: 0, positive: null }, { keyword: 'technical seo audit online', rank: 4, change: 3, positive: true }, ],
  aiActionPlan: {
    phase1: [ { task: "Fix 2 broken links", priority: "High", completed: false }, { task: "Compress images on home page", priority: "High", completed: false }, { task: "Add alt text to 3 missing images", priority: "High", completed: false }, ],
    phase2: [ { task: "Address low keyword density on services page", priority: "Medium", completed: false }, { task: "Fix color contrast issues on contact form", priority: "Medium", completed: false }, ],
    phase3: [ { task: "Implement Content Security Policy header", priority: "Low", completed: false}, { task: "Reduce number of JS files loaded", priority: "Low", completed: false}, ]
  },
  contentStrategy: [ { cornerstoneTitle: "The Ultimate Guide to AI-Powered SEO", searchVolume: "8,500/mo", description: "A comprehensive guide covering how artificial intelligence is reshaping search engine optimization.", clusters: [ { topic: "ai for keyword research", volume: "2,100/mo" }, { topic: "using ai for content optimization", volume: "1,800/mo" }, { topic: "automated technical seo with ai", volume: "1,500/mo" }, { topic: "predictive analytics in seo", volume: "1,200/mo" } ] }, { cornerstoneTitle: "Mastering Local SEO for Small Businesses", searchVolume: "12,000/mo", description: "An in-depth pillar page on dominating local search results, from GMB optimization to local link building.", clusters: [ { topic: "google business profile optimization", volume: "4,500/mo" }, { topic: "local keyword research", volume: "3,200/mo" }, { topic: "citation building for local seo", volume: "2,800/mo" }, { topic: "how to get local reviews", volume: "1,500/mo" }, ] }, { cornerstoneTitle: "E-commerce SEO: From Zero to Hero", searchVolume: "15,500/mo", description: "A complete walkthrough for optimizing online stores, covering product pages, category pages, and technical considerations.", clusters: [ { topic: "product page seo best practices", volume: "5,500/mo" }, { topic: "shopify seo tips", volume: "4,200/mo" }, { topic: "category page seo", volume: "3,100/mo" }, { topic: "structured data for e-commerce", volume: "2,700/mo" }, ] } ]
};


// ----- Reusable Components -----

const SimpleAreaChart = ({ data }) => {
  const maxTraffic = Math.max(...data.map(d => d.traffic));
  return ( <div className="w-full h-full relative"> <svg style={{ position: 'absolute', width: 0, height: 0 }}> <defs> <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"> <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/> <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/> </linearGradient> </defs> </svg> <div className="w-full h-full flex items-end"> <div className="w-full flex justify-around items-end h-full pt-4" style={{ maxHeight: '100%' }}> {data.map((item, index) => ( <div key={index} className="flex-grow flex flex-col items-center justify-end h-full"> <div className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-300 border-t-2 border-cyan-400" style={{ height: `${(item.traffic / maxTraffic) * 100}%`, 'fill': 'url(#chartGradient)'}} title={`${item.name}: ${item.traffic.toLocaleString()}`} ></div> <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">{item.name}</span> </div> ))} </div> </div> </div> );
};
const StatCard = ({ title, value, unit }) => ( <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"> <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p> <p className="text-3xl font-bold text-slate-900 dark:text-white font-serif"> {value.toLocaleString()} <span className="text-xl font-semibold text-slate-600 dark:text-slate-300">{unit}</span> </p> </div> );
const KeywordMoverRow = ({ keyword, rank, change, positive }) => ( <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"> <td className="py-3 px-2 text-sm text-slate-800 dark:text-slate-200">{keyword}</td> <td className="py-3 px-2 text-sm text-center text-slate-600 dark:text-slate-300 font-serif font-bold">{rank}</td> <td className="py-3 px-2 text-sm text-center"> {change !== 0 && ( <span className={`font-semibold flex items-center justify-center ${positive ? 'text-green-500' : 'text-red-500'}`}> <TrendingUp size={16} className={`mr-1 ${!positive && 'transform rotate-180'}`} /> {change > 0 ? `+${change}` : change} </span> )} {change === 0 && ( <span className="text-slate-500">-</span> )} </td> </tr> );
const ActionItem = ({ task, priority, completed }) => {
    const priorityStyles = {
        High: "border-l-red-500",
        Medium: "border-l-yellow-500",
        Low: "border-l-blue-500"
    };
    return (
        <div className={`flex items-start space-x-3 p-3 border-l-4 ${completed ? "border-l-green-500" : priorityStyles[priority]}`}> 
            <input type="checkbox" checked={completed} readOnly className="mt-1 form-checkbox h-4 w-4 text-cyan-600 rounded-sm border-gray-400 focus:ring-cyan-500" /> 
            <div className="flex-1"> <p className={`text-sm ${completed ? 'text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100'}`}>{task}</p> </div>
        </div>
    );
};
const OptimizationPhaseCard = ({icon, title, description}) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">{title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    </div>
);
const HubAndSpokeVisual = ({ pillar, spokes }) => (
    <div className="relative w-full h-48 flex items-center justify-center">
        {/* Central Hub */}
        <div className="absolute w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-white text-center text-xs font-bold shadow-lg z-10 border-4 border-white dark:border-slate-800 p-2">
            {pillar}
        </div>
        {/* Spokes */}
        {spokes.map((spoke, i) => {
            const angle = (i / spokes.length) * (2 * Math.PI) - (Math.PI / 2); // Start from top
            const x = 50 + 40 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            return (
                <div key={`${spoke}-${i}`} className="absolute w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-center text-[10px] font-semibold shadow-md border-2 border-white dark:border-slate-800 p-1" style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)'}}>
                   {spoke.split(" ").slice(0,2).join(" ")}
                </div>
            )
        })}
    </div>
);
const CheckupItem = ({ check, status, description }) => {
    const ICONS = {
        pass: <CheckCircle className="text-green-500 flex-shrink-0"/>,
        warning: <AlertCircle className="text-yellow-500 flex-shrink-0"/>,
        fail: <XCircle className="text-red-500 flex-shrink-0"/>
    };
    return (
        <div className="flex items-start space-x-4 py-3">
            <div className="mt-1">{ICONS[status]}</div>
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{check}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
        </div>
    );
};
const AuditSection = ({ title, data }) => (
    <div className="break-inside-avoid mb-4">
        <h4 className="font-semibold text-slate-600 dark:text-slate-300 pt-4 mb-2">{title}</h4>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {data.map((item, i) => <CheckupItem key={i} {...item} />)}
        </div>
    </div>
);
const TieredPricing = ({ onUnlock }) => (
    <div className="mb-8">
        <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">Unlock Your Full SEO Potential</h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Choose a report to get your AI-generated action plan and content strategy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1 */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col">
                <h3 className="font-serif text-xl font-bold text-cyan-600">Site Snapshot</h3>
                <p className="text-4xl font-black font-serif text-slate-900 dark:text-white my-4">$9.99</p>
                <p className="text-sm text-slate-500 mb-6 flex-grow">A full audit for up to 25 pages with essential keyword and competitor data.</p>
                <ul className="space-y-3 text-sm mb-8">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Full Audit (25 pages)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Keyword Rankings</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Competitor Analysis (Top 20 KWs)</li>
                    <li className="flex items-start text-slate-400"><XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"/>AI Action Plan</li>
                    <li className="flex items-start text-slate-400"><XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"/>Content Strategy</li>
                </ul>
                <button onClick={onUnlock} className="w-full mt-auto bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Select Plan</button>
            </div>
            {/* Tier 2 */}
            <div className="border-2 border-cyan-500 rounded-lg p-6 flex flex-col shadow-2xl relative">
                 <span className="absolute top-0 -translate-y-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                <h3 className="font-serif text-xl font-bold text-cyan-600">Deep Dive Report</h3>
                <p className="text-4xl font-black font-serif text-slate-900 dark:text-white my-4">$29.99</p>
                <p className="text-sm text-slate-500 mb-6 flex-grow">A comprehensive audit and your complete, prioritized AI action plan.</p>
                <ul className="space-y-3 text-sm mb-8">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Full Audit (200 pages)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Competitor Analysis (Top 100 KWs)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Low CTR & Striking Distance Report</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>AI Action Plan</li>
                    <li className="flex items-start text-slate-400"><XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"/>Content & Linking Strategy</li>
                </ul>
                 <button onClick={onUnlock} className="w-full mt-auto bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-colors">Select Plan</button>
            </div>
            {/* Tier 3 */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col">
                <h3 className="font-serif text-xl font-bold text-cyan-600">Complete Strategy</h3>
                <p className="text-4xl font-black font-serif text-slate-900 dark:text-white my-4">$79.99</p>
                <p className="text-sm text-slate-500 mb-6 flex-grow">The ultimate package with a massive audit, full plan, and content strategy.</p>
                 <ul className="space-y-3 text-sm mb-8">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Full Audit (1,000 pages)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Competitor Analysis (Top 500 KWs)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>SEO SWOT Analysis</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>AI Action Plan</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Content & Linking Strategy</li>
                </ul>
                <button onClick={onUnlock} className="w-full mt-auto bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Select Plan</button>
            </div>
        </div>
    </div>
);


// ----- Main Page Components -----
const DashboardView = ({ analyzedUrl, onBack, freemiumData }) => (
    <>
        <div className="border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-3xl font-black text-slate-900 dark:text-white">Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">Showing full results for: <a href="#" className="font-semibold text-cyan-600 hover:underline">{analyzedUrl}</a></p>
          </div>
          <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Analyze another URL</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div className="lg:col-span-3 space-y-8"> <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm"> <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-4">Traffic Analysis</h3> <div className="h-64"> <SimpleAreaChart data={freemiumData.trafficHistory || []} /> </div> </div> <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm"> <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">Keyword Ranking Report</h3> <div className="overflow-x-auto"> <table className="w-full text-left"> <thead> <tr> <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Keyword</th> <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Rank</th> <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Change</th> </tr> </thead> <tbody> {freemiumData.topKeywordMovers.map((kw, i) => <KeywordMoverRow key={i} {...kw} />)} </tbody> </table> </div> </div> </div>
            <div className="lg:col-span-1 space-y-6 mt-8 lg:mt-0"> <div className="space-y-4 border-t-4 border-cyan-500 pt-4"> <StatCard title="Site Health" value={freemiumData.siteHealth || 0} unit="%" /> <StatCard title="Visibility" value={freemiumData.visibility || 0} unit="%" /> <StatCard title="Monthly Traffic" value={freemiumData.monthlyTraffic || 0} /> </div> <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm"> <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-4">AI Strategist</h3> <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Synthesize data into a prioritized action plan.</p> <button className="w-full bg-cyan-600 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"> Generate Action Plan </button> </div> </div>
        </div>
    </>
);

const AiStrategistView = ({ onBack, freemiumData }) => (
     <>
        <div className="border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 flex justify-between items-center">
            <div>
                <h2 className="font-serif text-3xl font-black text-slate-900 dark:text-white">AI-Generated Action Plan</h2>
                <p className="text-slate-500 text-sm mt-1">A prioritized, phase-based strategy to improve performance, generated by AI.</p>
            </div>
            <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Back to Dashboard</button>
        </div>
        <div className="space-y-8"> 
            <div> 
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">Phase 1: High-Impact Fixes</h3> 
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1"> 
                    {freemiumData.aiActionPlan.phase1.map((item, i) => <ActionItem key={i} {...item} />)} 
                </div> 
            </div> 
            <div> 
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">Phase 2: Optimization & Enhancement</h3> 
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1"> 
                    {freemiumData.aiActionPlan.phase2.map((item, i) => <ActionItem key={i} {...item} />)} 
                </div> 
            </div>
             <div> 
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">Phase 3: Long-Term Growth</h3> 
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1"> 
                    {freemiumData.aiActionPlan.phase3.map((item, i) => <ActionItem key={i} {...item} />)} 
                </div> 
            </div> 
            <div> <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">Future Content Directives</h3> <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 space-y-6"> <div> <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">AI analysis of competitor rankings and keyword gaps has identified the following high-opportunity cornerstone content pillars:</p> </div> {freemiumData.contentStrategy.map((item, index) => ( <div key={index} className="border-t border-slate-200 dark:border-slate-700 pt-6"> <div className="flex justify-between items-start"> <div> <h4 className="font-serif text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center"> <BookOpen size={20} className="mr-3"/> {item.cornerstoneTitle} </h4> <p className="text-sm text-slate-500 mt-1">{item.description}</p> </div> <div className="text-right ml-4 flex-shrink-0"> <span className="text-xs text-slate-500 dark:text-slate-400">Total Volume</span> <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">{item.searchVolume}</p> </div> </div> <div className="mt-4 pl-8"> <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center"><Layers size={16} className="mr-2 text-slate-400"/>Target Topic Cluster</h5> <ul className="space-y-2"> {item.clusters.map((cluster, cIndex) => ( <li key={cIndex} className="flex justify-between items-center text-sm"> <span className="text-slate-600 dark:text-slate-300">{cluster.topic}</span> <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">{cluster.volume}</span> </li> ))} </ul> </div> </div> ))} </div> </div> </div>
     </>
);

const PlaceholderView = ({ title }) => ( <div className="flex items-center justify-center h-full"> <div className="text-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg"> <Beaker size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4"/> <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-2">{title}</h2> <p className="text-slate-500">This module is not yet available.</p> </div> </div> );

// ----- NEW: URL Input View -----
const UrlInputView = ({ onAnalyze }) => {
    const [url, setUrl] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (url) { onAnalyze(url); } };
    return ( <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4"> <div className="w-full max-w-xl text-center"> <div className="flex items-center justify-center mb-6"> <Newspaper className="h-10 w-10 text-cyan-600 dark:text-cyan-400" /> <h1 className="font-serif text-5xl font-black ml-4 text-slate-900 dark:text-white">SEO World</h1> </div> <p className="text-lg text-slate-600 dark:text-slate-300 mb-8"> Enter a URL to get a free 120-point audit and unlock your AI-powered action plan. </p> <form onSubmit={handleSubmit} className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg p-2 bg-white dark:bg-slate-800 shadow-lg focus-within:ring-2 focus-within:ring-cyan-500"> <Search className="h-5 w-5 text-slate-400 ml-2"/> <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="e.g. https://www.yourwebsite.com" className="w-full p-2 text-lg bg-transparent focus:outline-none text-slate-900 dark:text-white" required /> <button type="submit" className="bg-cyan-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-cyan-700 transition-colors flex items-center"> <span className="hidden sm:inline">Analyze</span> <ArrowRight className="h-5 w-5 sm:hidden"/> </button> </form> </div> </div> );
};

// ----- NEW: Free Report & Paywall View -----
const FreeReportView = ({ analyzedUrl, onUnlock, onBack, freemiumData }) => {
    const { seoAudit, keywordSnapshot, competitorSnapshot, contentIdeas, backlinkProfile, cannibalization } = freemiumData || {};
    const [expandedIdea, setExpandedIdea] = useState(null);

    if (!freemiumData) {
        return null; // Or a loading/error state
    }
    
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="border-b border-slate-300 dark:border-slate-700 pb-4 mb-8 flex justify-between items-center">
                <div>
                    <h2 className="font-serif text-3xl font-black text-slate-900 dark:text-white">Freemium Report</h2>
                    <p className="text-slate-500 text-sm mt-1">Showing free results for: <span className="font-semibold text-cyan-600">{analyzedUrl}</span></p>
                </div>
                <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Analyze another URL</button>
            </div>
            
            <div className="space-y-12">
                 <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                     <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">SEO Optimization Phases</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                        <OptimizationPhaseCard icon={<Wrench className="w-6 h-6 text-cyan-600"/>} title="Phase 1: FIX" description="Address Foundational SEO & Architecture Issues"/>
                        <OptimizationPhaseCard icon={<Target className="w-6 h-6 text-cyan-600"/>} title="Phase 2: CAPTURE" description="Optimize Existing Content for Immediate Gains"/>
                        <OptimizationPhaseCard icon={<Rocket className="w-6 h-6 text-cyan-600"/>} title="Phase 3: BUILD" description="Create Cornerstone Content to Dominate Niches"/>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Keyword Snapshot</h3>
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                            <p className="text-sm text-slate-500 mb-4">Top ranking keywords for this URL.</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Keyword</th>
                                            <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 text-center">Rank</th>
                                            <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 text-center">SV</th>
                                            <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Ranking URL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {keywordSnapshot.slice(0, 5).map(kw => (
                                            <tr key={kw.keyword} className="border-t border-slate-200 dark:border-slate-700">
                                                <td className="py-3 px-2 text-sm text-slate-700 dark:text-slate-200 font-semibold">{kw.keyword}</td>
                                                <td className="py-3 px-2 text-sm text-center font-bold font-serif">{kw.rank}</td>
                                                <td className="py-3 px-2 text-sm text-center font-mono">{kw.sv.toLocaleString()}</td>
                                                <td className="py-3 px-2 text-sm text-slate-500 dark:text-slate-400 truncate ...">{kw.url}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                     <div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Competitor Snapshot</h3>
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                             <p className="text-sm text-slate-500 mb-4">Top competitors for your ranking keywords, plus backlink profile analysis.</p>
                             <div className="space-y-3">
                                {competitorSnapshot.slice(0,3).map(kw => (
                                    <div key={kw.keyword} className="text-sm">
                                        <p className="font-semibold text-slate-700 dark:text-slate-200">{kw.keyword}</p>
                                        <p className="text-slate-500 dark:text-slate-400">Competitors: {kw.competitors.join(', ')}</p>
                                    </div>
                                ))}
                                <div className="text-sm pt-3 border-t border-dashed border-slate-300 dark:border-slate-600">
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">Backlink Profile Comparison</p>
                                    <p className="text-slate-500 dark:text-slate-400">Your competitors have, on average, 35% more referring domains.</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Hub and Spoke Content Model</h3>
                     <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                         <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                {contentIdeas.map((idea, index) => (
                                    <div key={idea.cornerstone} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 pb-4 last:pb-0">
                                        <h4 className="font-bold text-cyan-700 dark:text-cyan-400">{idea.cornerstone}</h4>
                                        <div className="text-xs text-slate-500 flex items-center space-x-4 my-1">
                                            <span>Target Keyword: <span className="font-semibold">{idea.related_keyword}</span></span>
                                            <span>SV: <span className="font-mono font-semibold">{idea.sv.toLocaleString()}</span></span>
                                        </div>
                                        <p className="text-xs text-slate-500">Cluster topics: {idea.cluster.join(', ')}</p>
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedIdea === index ? 'max-h-96' : 'max-h-0'}`}>
                                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{idea.long_description}</p>
                                        </div>
                                        <button onClick={() => setExpandedIdea(expandedIdea === index ? null : index)} className="text-cyan-600 text-sm font-semibold mt-2 flex items-center">
                                            {expandedIdea === index ? 'Read Less' : 'Read More'}
                                            <ChevronDown size={16} className={`ml-1 transition-transform ${expandedIdea === index ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                             <div className="md:w-1/3 flex items-center justify-center">
                                <HubAndSpokeVisual pillar={contentIdeas[0].related_keyword} spokes={contentIdeas[0].cluster} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* New Keyword Cannibalization Section */}
                    <div>
                         <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Keyword Cannibalization</h3>
                         <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 h-full flex flex-col">
                            <div className="flex-grow flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-shrink-0">
                                     <svg width="120" height="120" viewBox="0 0 36 36" className="transform -rotate-90">
                                        <circle cx="18" cy="18" r="15.9155" className="stroke-current text-slate-200 dark:text-slate-700" strokeWidth="3" fill="none"></circle>
                                        <circle cx="18" cy="18" r="15.9155" className="stroke-current text-red-500" strokeWidth="3" fill="none" strokeDasharray="12, 88" strokeDashoffset="0"></circle>
                                        <text x="18" y="21" textAnchor="middle" className="fill-current text-slate-700 dark:text-slate-200 text-sm font-bold rotate-90" style={{transformBox: 'fill-box'}}>12%</text>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Our initial scan suggests that **{cannibalization.percentage}%** of your keywords may have cannibalization issues, where multiple pages compete for the same keyword.</p>
                                </div>
                            </div>
                            <button onClick={onUnlock} className="w-full mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                                Unlock Full Cannibalization Report
                            </button>
                         </div>
                    </div>
                    {/* New Backlink Profile Section */}
                    <div>
                         <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Backlink Profile</h3>
                         <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 h-full flex flex-col">
                            <div className="flex-grow space-y-4">
                               <div className="flex items-baseline">
                                 <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">{backlinkProfile.backlinks.toLocaleString()}</p>
                                 <p className="text-sm ml-2 text-slate-500">Total Backlinks</p>
                               </div>
                               <div className="flex items-baseline">
                                 <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">{backlinkProfile.referringDomains.toLocaleString()}</p>
                                 <p className="text-sm ml-2 text-slate-500">Referring Domains</p>
                               </div>
                               <div>
                                   <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Top Linked Pages:</p>
                                   <ul className="text-sm text-cyan-600 dark:text-cyan-400 list-disc list-inside">
                                       {backlinkProfile.topPages.map(page => <li key={page}>{page}</li>)}
                                   </ul>
                               </div>
                            </div>
                            <button onClick={onUnlock} className="w-full mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                                Unlock Full Backlink Report
                            </button>
                         </div>
                    </div>
                </div>

                {/* Free Audit Section */}
                <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">120-Point SEO Site Audit</h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-x-8">
                            <AuditSection title="Meta Tags" data={seoAudit.metaTags} />
                            <AuditSection title="Content Structure" data={seoAudit.contentStructure} />
                            <AuditSection title="Link Analysis" data={seoAudit.linkAnalysis} />
                            <AuditSection title="Image Analysis" data={seoAudit.imageAnalysis} />
                            <AuditSection title="Technical Setup" data={seoAudit.technicalSetup} />
                            <AuditSection title="Performance" data={seoAudit.performanceAudit} />
                            <AuditSection title="Mobile Friendliness" data={seoAudit.mobileFriendliness} />
                            <AuditSection title="Social & Brand" data={seoAudit.socialAndBrand} />
                            <AuditSection title="Accessibility" data={seoAudit.accessibilityAudit} />
                            <AuditSection title="Security" data={seoAudit.securityHeaders} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-300 dark:border-slate-700">
                <TieredPricing onUnlock={onUnlock} />
            </div>
        </div>
    );
};


// ----- Main Application Structure -----

const NavItem = ({ icon, label, active, onClick }) => ( <li className={`flex items-center p-2 cursor-pointer transition-colors rounded-md ${active ? 'bg-cyan-100/50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`} onClick={onClick} > {icon} <span className="ml-3 text-sm font-semibold">{label}</span> </li> );

export default function App() {
    // Possible appStates: 'input', 'loading', 'free_report', 'full_dashboard'
    const [appState, setAppState] = useState('input');
    const [currentUrl, setCurrentUrl] = useState('');
    const [freemiumData, setFreemiumData] = useState(null);
    const [activeView, setActiveView] = useState('Dashboard');
    
    const handleAnalyze = (url) => {
        setAppState('loading'); // NEW: Go to loading state first
        setCurrentUrl(url);
        // Simulate API fetch
        setTimeout(() => {
            // In a real app, this would be response.json() from a fetch call
            setFreemiumData({
                seoAudit: MOCK_DATA.freeCheckup,
                keywordSnapshot: MOCK_DATA.freeKeywords,
                competitorSnapshot: MOCK_DATA.freeKeywords.map(kw => ({ keyword: kw.keyword, competitors: kw.competitors })),
                contentIdeas: MOCK_DATA.freeContentIdeas,
                backlinkProfile: MOCK_DATA.freeBacklinkProfile,
                cannibalization: { percentage: 12 }
            });
            setAppState('free_report');
        }, 3000);
    };

    const handleUnlock = () => {
        setAppState('full_dashboard');
    };
    
    const handleGoBackToInput = () => {
        setAppState('input');
        setCurrentUrl('');
    }

    const renderMainView = () => {
        switch(activeView) {
            case 'Dashboard':
                return <DashboardView analyzedUrl={currentUrl} onBack={handleGoBackToInput} freemiumData={MOCK_DATA.overview}/>;
            case 'AI Strategist':
                return <AiStrategistView onBack={() => setActiveView('Dashboard')} freemiumData={MOCK_DATA}/>;
            case 'Site Audit':
                 return <PlaceholderView title="Technical Site Audit" />;
            case 'Keywords':
                 return <PlaceholderView title="Keyword & Competitor Tracker" />;
            default:
                return <DashboardView analyzedUrl={currentUrl} onBack={handleGoBackToInput} freemiumData={MOCK_DATA.overview}/>;
        }
    };
    
    const LoadingView = () => {
        const messages = ["Running 120-Point SEO Audit...", "Analyzing Keyword Rankings...", "Checking Competitor Profiles...", "Generating Content Ideas..."];
        const [messageIndex, setMessageIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setMessageIndex(prev => (prev + 1) % messages.length);
            }, 750);
            return () => clearInterval(interval);
        }, []);

        return (
             <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                 <div className="loader ease-linear rounded-full border-4 border-t-4 border-slate-200 h-12 w-12 mb-4"></div>
                 <h2 className="text-center text-slate-700 dark:text-slate-200 text-xl font-semibold">{messages[messageIndex]}</h2>
                 <p className="w-1/3 text-center text-slate-500 mt-2">Please wait while we analyze your website...</p>
             </div>
        );
    };

    // Render based on the overall application state
    if (appState === 'loading') {
        return ( <> <GlobalStyles /> <LoadingView/> </>);
    }
    
    if (appState === 'input') {
        return ( <> <GlobalStyles /> <UrlInputView onAnalyze={handleAnalyze} /> </> );
    }

    if (appState === 'free_report') {
        return ( <> <GlobalStyles /> <FreeReportView analyzedUrl={currentUrl} onUnlock={handleUnlock} onBack={handleGoBackToInput} freemiumData={freemiumData} /> </> );
    }
    
    // appState must be 'full_dashboard'
    return (
        <>
        <GlobalStyles />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            <div className="flex">
                <aside className="w-56 bg-white dark:bg-slate-800 h-screen p-4 flex-col border-r border-slate-200 dark:border-slate-700 hidden lg:flex">
                    <div className="flex items-center mb-8 pb-4 border-b border-slate-200 dark:border-slate-700"> <Newspaper className="h-7 w-7 text-cyan-600 dark:text-cyan-400" /> <h1 className="text-lg font-bold ml-2 text-slate-900 dark:text-white tracking-tighter">SEO World</h1> </div>
                    <div className="flex-1"> <ul> <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeView === 'Dashboard'} onClick={() => setActiveView('Dashboard')} /> <NavItem icon={<Search size={20} />} label="Site Audit" active={activeView === 'Site Audit'} onClick={() => setActiveView('Site Audit')} /> <NavItem icon={<Target size={20} />} label="Keywords" active={activeView === 'Keywords'} onClick={() => setActiveView('Keywords')} /> <NavItem icon={<Bot size={20} />} label="AI Strategist" active={activeView === 'AI Strategist'} onClick={() => setActiveView('AI Strategist')} /> </ul> </div>
                    <div className="mt-auto"> <div className="flex items-center mt-4 p-2"> <img src="https://placehold.co/40x40/0f172a/94a3b8?text=U" alt="User Avatar" className="rounded-full" /> <div className="ml-3"> <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">John Doe</p> <p className="text-xs text-slate-500 dark:text-slate-400">Agency Plan</p> </div> </div> </div>
                </aside>
                <main className="flex-1 p-6 lg:p-8 h-screen overflow-y-auto">
                     <header className="flex justify-between items-center mb-6 lg:hidden border-b border-slate-300 pb-4"> <div className="flex items-center"> <Newspaper className="h-7 w-7 text-cyan-600" /> <h1 className="text-lg font-bold ml-2">SEO World</h1> </div> </header>
                    {renderMainView()}
                </main>
            </div>
        </div>
        </>
    );
}

import { ShieldCheck, TrendingUp, Target, Users, Bot, BarChart2, Search, LayoutDashboard, Newspaper, Beaker, ArrowRight, BookOpen, Layers, Lock, CheckCircle, XCircle, AlertCircle, Zap, Shield, Rocket, ChevronDown, PieChart, Link as LinkIcon, Swords, Wrench } from 'lucide-react';

// ----- Font Import & Global Styles -----
const GlobalStyles = () => (
    <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Source+Sans+Pro:wght@400;600;700&display=swap');
            body { 
                font-family: 'Source Sans Pro', sans-serif; 
                background-color: #f8fafc; /* Use slate-50 for a slightly cooler white */
            }
            .font-serif {
                font-family: 'Merriweather', serif;
            }
            .dark body {
                background-color: #0f172a; /* Use slate-900 for dark mode */
            }
            .loader {
                border-top-color: #06b6d4;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        `}
    </style>
);


// Mock Data - Expanded with Backlink & SWOT info
const MOCK_DATA = {
  freeCheckup: {
    metaTags: [
        { check: "Title Tag Presence", status: "pass", description: "Title tag exists." },
        { check: "Title Tag Length", status: "pass", description: "Length is 55 characters (within 60 limit)." },
        { check: "Meta Description Presence", status: "pass", description: "Meta description exists." },
        { check: "Meta Description Length", status: "pass", description: "Length is 155 characters (within 160 limit)." },
        { check: "Viewport Tag", status: "pass", description: "Configured for responsive design." },
        { check: "Character Set", status: "pass", description: "UTF-8 encoding is declared." },
        { check: "Canonical Tag", status: "pass", description: "A canonical URL is properly set." },
        { check: "Language Declaration", status: "pass", description: "Language is declared as 'en'." },
        { check: "Favicon", status: "pass", description: "A favicon is specified for your site." },
    ],
    contentStructure: [
        { check: "H1 Heading", status: "pass", description: "A single, clear H1 heading was found." },
        { check: "Heading Order", status: "pass", description: "H2-H6 headings follow a logical order." },
        { check: "Content Length", status: "pass", description: "Word count is sufficient for the topic." },
        { check: "Readability Score", status: "pass", description: "Content is easily readable." },
        { check: "Keyword in Title", status: "pass", description: "Main keyword found in the title tag." },
        { check: "Keyword in Description", status: "pass", description: "Main keyword found in the meta description." },
        { check: "Keyword in H1", status: "pass", description: "Main keyword found in H1 heading." },
        { check: "Keyword Density", status: "warning", description: "Primary keyword density is slightly low." },
        { check: "Image-to-Text Ratio", status: "pass", description: "Healthy balance of text and media." },
        { check: "No iFrames", status: "pass", description: "No iFrames were found on the page." },
    ],
    linkAnalysis: [
        { check: "Internal Links", status: "pass", description: "Page contains 12 internal links." },
        { check: "External Links", status: "pass", description: "Page contains 3 external links." },
        { check: "No-Follow Links", status: "pass", description: "No-follow attributes used appropriately." },
        { check: "Descriptive Anchor Text", status: "warning", description: "Some links use generic anchor text like 'click here'." },
    ],
    imageAnalysis: [
        { check: "Image Alt Text", status: "fail", description: "3 out of 8 images are missing alt text." },
        { check: "Image File Names", status: "pass", description: "Image filenames are descriptive." },
    ],
    technicalSetup: [
        { check: "SSL Certificate", status: "pass", description: "Site uses a valid HTTPS connection." },
        { check: "Robots.txt", status: "pass", description: "A valid robots.txt file was found." },
        { check: "XML Sitemap", status: "pass", description: "Sitemap is present and linked correctly." },
        { check: "URL Structure", status: "pass", description: "URL is user-friendly and follows best practices." },
        { check: "HTML Doctype", status: "pass", description: "Modern HTML doctype is declared." },
        { check: "No Deprecated HTML", status: "pass", description: "No deprecated tags like <font> were found." },
    ],
    performanceAudit: [
        { check: "JavaScript Minification", status: "pass", description: "Scripts appear to be minified." },
        { check: "CSS Minification", status: "pass", description: "Stylesheets appear to be minified." },
        { check: "Number of CSS Files", status: "pass", description: "A reasonable number of CSS files (3) were found." },
        { check: "Number of JS Files", status: "warning", description: "Page loads a high number of JS files (8)." },
        { check: "Browser Caching", status: "pass", description: "Caching headers are correctly configured." },
    ],
    mobileFriendliness: [
        { check: "Viewport Tag", status: "pass", description: "Configured for responsive design." },
        { check: "Tap Target Size", status: "pass", description: "Buttons and links are large enough for tapping." },
        { check: "Readable Font Size", status: "pass", description: "Font size is legible on mobile devices." },
    ],
    socialAndBrand: [
        { check: "Open Graph Tags", status: "pass", description: "OG tags for Facebook & LinkedIn are present." },
        { check: "Twitter Card Tags", status: "pass", description: "Twitter card tags for X are present." },
    ],
    accessibilityAudit: [
        { check: "ARIA Roles", status: "pass", description: "Basic ARIA landmarks for accessibility are present." },
        { check: "Input Labels", status: "pass", description: "All form inputs have corresponding labels." },
        { check: "HTML Lang Attribute", status: "pass", description: "The HTML 'lang' attribute is set." },
    ],
    securityHeaders: [
        { check: "X-Frame-Options", status: "pass", description: "Protection against clickjacking is enabled." },
        { check: "HSTS Header", status: "pass", description: "Strict-Transport-Security header is present." },
    ]
  },
  freeKeywords: [
      {keyword: "ai seo tool", rank: 3, sv: 4500, url: "/products/ai-seo-suite", competitors: ["Competitor A", "Competitor B"]},
      {keyword: "seo analysis", rank: 5, sv: 8200, url: "/", competitors: ["Competitor C", "Competitor A"]},
      {keyword: "content strategy generator", rank: 8, sv: 2100, url: "/features/content-planner", competitors: ["Competitor D", "Competitor E"]},
      {keyword: "automated seo audit", rank: 12, sv: 1800, url: "/", competitors: ["Competitor B", "Competitor F"]},
      {keyword: "keyword ranking tool", rank: 15, sv: 5500, url: "/features/rank-tracker", competitors: ["Competitor G", "Competitor H"]},
  ],
  freeContentIdeas: [
      { 
          cornerstone: "The Future of AI in Digital Marketing", 
          cluster: ["AI-powered analytics", "Personalized customer journeys", "Predictive advertising models"],
          related_keyword: "ai seo tool",
          sv: 4500,
          long_description: "This cornerstone piece should be a comprehensive, forward-looking guide that positions your brand as a thought leader. It should explore how AI is moving beyond simple automation to become a strategic partner in marketing. Cover topics like generative AI for content creation, the ethics of AI in advertising, and how machine learning can be used to predict market trends and customer behavior. This will attract a high-level audience of marketing managers and strategists."
      },
      { 
          cornerstone: "A Beginner's Guide to Technical SEO", 
          cluster: ["Understanding crawl budgets", "Schema markup for rich snippets", "Optimizing for page speed"],
          related_keyword: "automated seo audit",
          sv: 1800,
          long_description: "Create the ultimate resource for those new to the technical side of SEO. Break down complex topics into simple, actionable steps. Use clear diagrams and code examples to explain how search engine crawlers work, the different types of schema and how to implement them, and the core web vitals that impact user experience. This piece will attract a wide audience and generate valuable, long-tail search traffic."
      },
      { 
          cornerstone: "Building a Content Ecosystem", 
          cluster: ["The hub and spoke model", "Repurposing content for social media", "Measuring content ROI"],
          related_keyword: "content strategy generator",
          sv: 2100,
          long_description: "This content pillar should focus on strategy over individual blog posts. Explain the 'hub and spoke' model where a central 'hub' (your cornerstone content) links out to multiple related 'spoke' articles. Provide a framework for how to take a single piece of research and repurpose it into videos, infographics, social media threads, and email newsletters. This demonstrates efficiency and strategic thinking, appealing to busy content marketers and business owners."
      },
  ],
   freeBacklinkProfile: {
    backlinks: 1250,
    referringDomains: 340,
    topPages: ["/", "/products/ai-seo-suite", "/blog/what-is-ai-seo"],
  },
  overview: {
    siteHealth: 92.3,
    visibility: 78.1,
    trackedKeywords: 150,
    monthlyTraffic: 12450,
    trafficHistory: [ { name: 'Jan', traffic: 4000 }, { name: 'Feb', traffic: 3000 }, { name: 'Mar', traffic: 5000 }, { name: 'Apr', traffic: 4500 }, { name: 'May', traffic: 6000 }, { name: 'Jun', traffic: 8200 }, { name: 'Jul', traffic: 12450 }, ],
  },
  topKeywordMovers: [ { keyword: 'ai seo tool', rank: 3, change: 2, positive: true }, { keyword: 'automated seo action plan', rank: 5, change: 1, positive: true }, { keyword: 'small business seo platform', rank: 12, change: -1, positive: false }, { keyword: 'competitor keyword analysis', rank: 8, change: 0, positive: null }, { keyword: 'technical seo audit online', rank: 4, change: 3, positive: true }, ],
  aiActionPlan: {
    phase1: [ { task: "Fix 2 broken links", priority: "High", completed: false }, { task: "Compress images on home page", priority: "High", completed: false }, { task: "Add alt text to 3 missing images", priority: "High", completed: false }, ],
    phase2: [ { task: "Address low keyword density on services page", priority: "Medium", completed: false }, { task: "Fix color contrast issues on contact form", priority: "Medium", completed: false }, ],
    phase3: [ { task: "Implement Content Security Policy header", priority: "Low", completed: false}, { task: "Reduce number of JS files loaded", priority: "Low", completed: false}, ]
  },
  contentStrategy: [ { cornerstoneTitle: "The Ultimate Guide to AI-Powered SEO", searchVolume: "8,500/mo", description: "A comprehensive guide covering how artificial intelligence is reshaping search engine optimization.", clusters: [ { topic: "ai for keyword research", volume: "2,100/mo" }, { topic: "using ai for content optimization", volume: "1,800/mo" }, { topic: "automated technical seo with ai", volume: "1,500/mo" }, { topic: "predictive analytics in seo", volume: "1,200/mo" } ] }, { cornerstoneTitle: "Mastering Local SEO for Small Businesses", searchVolume: "12,000/mo", description: "An in-depth pillar page on dominating local search results, from GMB optimization to local link building.", clusters: [ { topic: "google business profile optimization", volume: "4,500/mo" }, { topic: "local keyword research", volume: "3,200/mo" }, { topic: "citation building for local seo", volume: "2,800/mo" }, { topic: "how to get local reviews", volume: "1,500/mo" }, ] }, { cornerstoneTitle: "E-commerce SEO: From Zero to Hero", searchVolume: "15,500/mo", description: "A complete walkthrough for optimizing online stores, covering product pages, category pages, and technical considerations.", clusters: [ { topic: "product page seo best practices", volume: "5,500/mo" }, { topic: "shopify seo tips", volume: "4,200/mo" }, { topic: "category page seo", volume: "3,100/mo" }, { topic: "structured data for e-commerce", volume: "2,700/mo" }, ] } ]
};


// ----- Reusable Components -----

const SimpleAreaChart = ({ data }) => {
  const maxTraffic = Math.max(...data.map(d => d.traffic));
  return ( <div className="w-full h-full relative"> <svg style={{ position: 'absolute', width: 0, height: 0 }}> <defs> <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"> <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/> <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/> </linearGradient> </defs> </svg> <div className="w-full h-full flex items-end"> <div className="w-full flex justify-around items-end h-full pt-4" style={{ maxHeight: '100%' }}> {data.map((item, index) => ( <div key={index} className="flex-grow flex flex-col items-center justify-end h-full"> <div className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-300 border-t-2 border-cyan-400" style={{ height: `${(item.traffic / maxTraffic) * 100}%`, 'fill': 'url(#chartGradient)'}} title={`${item.name}: ${item.traffic.toLocaleString()}`} ></div> <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">{item.name}</span> </div> ))} </div> </div> </div> );
};
const StatCard = ({ title, value, unit }) => ( <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"> <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p> <p className="text-3xl font-bold text-slate-900 dark:text-white font-serif"> {value.toLocaleString()} <span className="text-xl font-semibold text-slate-600 dark:text-slate-300">{unit}</span> </p> </div> );
const KeywordMoverRow = ({ keyword, rank, change, positive }) => ( <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"> <td className="py-3 px-2 text-sm text-slate-800 dark:text-slate-200">{keyword}</td> <td className="py-3 px-2 text-sm text-center text-slate-600 dark:text-slate-300 font-serif font-bold">{rank}</td> <td className="py-3 px-2 text-sm text-center"> {change !== 0 && ( <span className={`font-semibold flex items-center justify-center ${positive ? 'text-green-500' : 'text-red-500'}`}> <TrendingUp size={16} className={`mr-1 ${!positive && 'transform rotate-180'}`} /> {change > 0 ? `+${change}` : change} </span> )} {change === 0 && ( <span className="text-slate-500">-</span> )} </td> </tr> );
const ActionItem = ({ task, priority, completed }) => {
    const priorityStyles = {
        High: "border-l-red-500",
        Medium: "border-l-yellow-500",
        Low: "border-l-blue-500"
    };
    return (
        <div className={`flex items-start space-x-3 p-3 border-l-4 ${completed ? "border-l-green-500" : priorityStyles[priority]}`}> 
            <input type="checkbox" checked={completed} readOnly className="mt-1 form-checkbox h-4 w-4 text-cyan-600 rounded-sm border-gray-400 focus:ring-cyan-500" /> 
            <div className="flex-1"> <p className={`text-sm ${completed ? 'text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100'}`}>{task}</p> </div>
        </div>
    );
};
const OptimizationPhaseCard = ({icon, title, description}) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">{title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    </div>
);
const HubAndSpokeVisual = ({ pillar, spokes }) => (
    <div className="relative w-full h-48 flex items-center justify-center">
        {/* Central Hub */}
        <div className="absolute w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-white text-center text-xs font-bold shadow-lg z-10 border-4 border-white dark:border-slate-800 p-2">
            {pillar}
        </div>
        {/* Spokes */}
        {spokes.map((spoke, i) => {
            const angle = (i / spokes.length) * (2 * Math.PI) - (Math.PI / 2); // Start from top
            const x = 50 + 40 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            return (
                <div key={`${spoke}-${i}`} className="absolute w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-center text-[10px] font-semibold shadow-md border-2 border-white dark:border-slate-800 p-1" style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)'}}>
                   {spoke.split(" ").slice(0,2).join(" ")}
                </div>
            )
        })}
    </div>
);
const CheckupItem = ({ check, status, description }) => {
    const ICONS = {
        pass: <CheckCircle className="text-green-500 flex-shrink-0"/>,
        warning: <AlertCircle className="text-yellow-500 flex-shrink-0"/>,
        fail: <XCircle className="text-red-500 flex-shrink-0"/>
    };
    return (
        <div className="flex items-start space-x-4 py-3">
            <div className="mt-1">{ICONS[status]}</div>
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{check}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
        </div>
    );
};
const AuditSection = ({ title, data }) => (
    <div className="break-inside-avoid mb-4">
        <h4 className="font-semibold text-slate-600 dark:text-slate-300 pt-4 mb-2">{title}</h4>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {data.map((item, i) => <CheckupItem key={i} {...item} />)}
        </div>
    </div>
);
const TieredPricing = ({ onUnlock }) => (
    <div className="mb-8">
        <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">Unlock Your Full SEO Potential</h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Choose a report to get your AI-generated action plan and content strategy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1 */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col">
                <h3 className="font-serif text-xl font-bold text-cyan-600">Site Snapshot</h3>
                <p className="text-4xl font-black font-serif text-slate-900 dark:text-white my-4">$9.99</p>
                <p className="text-sm text-slate-500 mb-6 flex-grow">A full audit for up to 25 pages with essential keyword and competitor data.</p>
                <ul className="space-y-3 text-sm mb-8">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Full Audit (25 pages)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Keyword Rankings</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Competitor Analysis (Top 20 KWs)</li>
                    <li className="flex items-start text-slate-400"><XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"/>AI Action Plan</li>
                    <li className="flex items-start text-slate-400"><XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"/>Content Strategy</li>
                </ul>
                <button onClick={onUnlock} className="w-full mt-auto bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Select Plan</button>
            </div>
            {/* Tier 2 */}
            <div className="border-2 border-cyan-500 rounded-lg p-6 flex flex-col shadow-2xl relative">
                 <span className="absolute top-0 -translate-y-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                <h3 className="font-serif text-xl font-bold text-cyan-600">Deep Dive Report</h3>
                <p className="text-4xl font-black font-serif text-slate-900 dark:text-white my-4">$29.99</p>
                <p className="text-sm text-slate-500 mb-6 flex-grow">A comprehensive audit and your complete, prioritized AI action plan.</p>
                <ul className="space-y-3 text-sm mb-8">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Full Audit (200 pages)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Competitor Analysis (Top 100 KWs)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Low CTR & Striking Distance Report</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>AI Action Plan</li>
                    <li className="flex items-start text-slate-400"><XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"/>Content & Linking Strategy</li>
                </ul>
                 <button onClick={onUnlock} className="w-full mt-auto bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-colors">Select Plan</button>
            </div>
            {/* Tier 3 */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col">
                <h3 className="font-serif text-xl font-bold text-cyan-600">Complete Strategy</h3>
                <p className="text-4xl font-black font-serif text-slate-900 dark:text-white my-4">$79.99</p>
                <p className="text-sm text-slate-500 mb-6 flex-grow">The ultimate package with a massive audit, full plan, and content strategy.</p>
                 <ul className="space-y-3 text-sm mb-8">
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Full Audit (1,000 pages)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Competitor Analysis (Top 500 KWs)</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>SEO SWOT Analysis</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>AI Action Plan</li>
                    <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>Content & Linking Strategy</li>
                </ul>
                <button onClick={onUnlock} className="w-full mt-auto bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Select Plan</button>
            </div>
        </div>
    </div>
);


// ----- Main Page Components -----
const DashboardView = ({ analyzedUrl, onBack, freemiumData }) => (
    <>
        <div className="border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-3xl font-black text-slate-900 dark:text-white">Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">Showing full results for: <a href="#" className="font-semibold text-cyan-600 hover:underline">{analyzedUrl}</a></p>
          </div>
          <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Analyze another URL</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div className="lg:col-span-3 space-y-8"> <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm"> <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-4">Traffic Analysis</h3> <div className="h-64"> <SimpleAreaChart data={freemiumData.trafficHistory || []} /> </div> </div> <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm"> <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">Keyword Ranking Report</h3> <div className="overflow-x-auto"> <table className="w-full text-left"> <thead> <tr> <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Keyword</th> <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Rank</th> <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Change</th> </tr> </thead> <tbody> {freemiumData.topKeywordMovers.map((kw, i) => <KeywordMoverRow key={i} {...kw} />)} </tbody> </table> </div> </div> </div>
            <div className="lg:col-span-1 space-y-6 mt-8 lg:mt-0"> <div className="space-y-4 border-t-4 border-cyan-500 pt-4"> <StatCard title="Site Health" value={freemiumData.siteHealth || 0} unit="%" /> <StatCard title="Visibility" value={freemiumData.visibility || 0} unit="%" /> <StatCard title="Monthly Traffic" value={freemiumData.monthlyTraffic || 0} /> </div> <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm"> <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-4">AI Strategist</h3> <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Synthesize data into a prioritized action plan.</p> <button className="w-full bg-cyan-600 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"> Generate Action Plan </button> </div> </div>
        </div>
    </>
);

const AiStrategistView = ({ onBack, freemiumData }) => (
     <>
        <div className="border-b border-slate-300 dark:border-slate-700 pb-4 mb-6 flex justify-between items-center">
            <div>
                <h2 className="font-serif text-3xl font-black text-slate-900 dark:text-white">AI-Generated Action Plan</h2>
                <p className="text-slate-500 text-sm mt-1">A prioritized, phase-based strategy to improve performance, generated by AI.</p>
            </div>
            <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Back to Dashboard</button>
        </div>
        <div className="space-y-8"> 
            <div> 
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">Phase 1: High-Impact Fixes</h3> 
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1"> 
                    {freemiumData.aiActionPlan.phase1.map((item, i) => <ActionItem key={i} {...item} />)} 
                </div> 
            </div> 
            <div> 
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">Phase 2: Optimization & Enhancement</h3> 
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1"> 
                    {freemiumData.aiActionPlan.phase2.map((item, i) => <ActionItem key={i} {...item} />)} 
                </div> 
            </div>
             <div> 
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">Phase 3: Long-Term Growth</h3> 
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-1"> 
                    {freemiumData.aiActionPlan.phase3.map((item, i) => <ActionItem key={i} {...item} />)} 
                </div> 
            </div> 
            <div> <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">Future Content Directives</h3> <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 space-y-6"> <div> <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">AI analysis of competitor rankings and keyword gaps has identified the following high-opportunity cornerstone content pillars:</p> </div> {freemiumData.contentStrategy.map((item, index) => ( <div key={index} className="border-t border-slate-200 dark:border-slate-700 pt-6"> <div className="flex justify-between items-start"> <div> <h4 className="font-serif text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center"> <BookOpen size={20} className="mr-3"/> {item.cornerstoneTitle} </h4> <p className="text-sm text-slate-500 mt-1">{item.description}</p> </div> <div className="text-right ml-4 flex-shrink-0"> <span className="text-xs text-slate-500 dark:text-slate-400">Total Volume</span> <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">{item.searchVolume}</p> </div> </div> <div className="mt-4 pl-8"> <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center"><Layers size={16} className="mr-2 text-slate-400"/>Target Topic Cluster</h5> <ul className="space-y-2"> {item.clusters.map((cluster, cIndex) => ( <li key={cIndex} className="flex justify-between items-center text-sm"> <span className="text-slate-600 dark:text-slate-300">{cluster.topic}</span> <span className="font-mono text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">{cluster.volume}</span> </li> ))} </ul> </div> </div> ))} </div> </div> </div>
     </>
);

const PlaceholderView = ({ title }) => ( <div className="flex items-center justify-center h-full"> <div className="text-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg"> <Beaker size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4"/> <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-2">{title}</h2> <p className="text-slate-500">This module is not yet available.</p> </div> </div> );

// ----- NEW: URL Input View -----
const UrlInputView = ({ onAnalyze }) => {
    const [url, setUrl] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (url) { onAnalyze(url); } };
    return ( <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4"> <div className="w-full max-w-xl text-center"> <div className="flex items-center justify-center mb-6"> <Newspaper className="h-10 w-10 text-cyan-600 dark:text-cyan-400" /> <h1 className="font-serif text-5xl font-black ml-4 text-slate-900 dark:text-white">SEO World</h1> </div> <p className="text-lg text-slate-600 dark:text-slate-300 mb-8"> Enter a URL to get a free 120-point audit and unlock your AI-powered action plan. </p> <form onSubmit={handleSubmit} className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg p-2 bg-white dark:bg-slate-800 shadow-lg focus-within:ring-2 focus-within:ring-cyan-500"> <Search className="h-5 w-5 text-slate-400 ml-2"/> <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="e.g. https://www.yourwebsite.com" className="w-full p-2 text-lg bg-transparent focus:outline-none text-slate-900 dark:text-white" required /> <button type="submit" className="bg-cyan-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-cyan-700 transition-colors flex items-center"> <span className="hidden sm:inline">Analyze</span> <ArrowRight className="h-5 w-5 sm:hidden"/> </button> </form> </div> </div> );
};

// ----- NEW: Free Report & Paywall View -----
const FreeReportView = ({ analyzedUrl, onUnlock, onBack, freemiumData }) => {
    const { seoAudit, keywordSnapshot, competitorSnapshot, contentIdeas, backlinkProfile, cannibalization } = freemiumData || {};
    const [expandedIdea, setExpandedIdea] = useState(null);

    if (!freemiumData) {
        return null; // Or a loading/error state
    }
    
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="border-b border-slate-300 dark:border-slate-700 pb-4 mb-8 flex justify-between items-center">
                <div>
                    <h2 className="font-serif text-3xl font-black text-slate-900 dark:text-white">Freemium Report</h2>
                    <p className="text-slate-500 text-sm mt-1">Showing free results for: <span className="font-semibold text-cyan-600">{analyzedUrl}</span></p>
                </div>
                <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Analyze another URL</button>
            </div>
            
            <div className="space-y-12">
                 <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                     <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">SEO Optimization Phases</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                        <OptimizationPhaseCard icon={<Wrench className="w-6 h-6 text-cyan-600"/>} title="Phase 1: FIX" description="Address Foundational SEO & Architecture Issues"/>
                        <OptimizationPhaseCard icon={<Target className="w-6 h-6 text-cyan-600"/>} title="Phase 2: CAPTURE" description="Optimize Existing Content for Immediate Gains"/>
                        <OptimizationPhaseCard icon={<Rocket className="w-6 h-6 text-cyan-600"/>} title="Phase 3: BUILD" description="Create Cornerstone Content to Dominate Niches"/>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Keyword Snapshot</h3>
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                            <p className="text-sm text-slate-500 mb-4">Top ranking keywords for this URL.</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Keyword</th>
                                            <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 text-center">Rank</th>
                                            <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 text-center">SV</th>
                                            <th className="py-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Ranking URL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {keywordSnapshot.slice(0, 5).map(kw => (
                                            <tr key={kw.keyword} className="border-t border-slate-200 dark:border-slate-700">
                                                <td className="py-3 px-2 text-sm text-slate-700 dark:text-slate-200 font-semibold">{kw.keyword}</td>
                                                <td className="py-3 px-2 text-sm text-center font-bold font-serif">{kw.rank}</td>
                                                <td className="py-3 px-2 text-sm text-center font-mono">{kw.sv.toLocaleString()}</td>
                                                <td className="py-3 px-2 text-sm text-slate-500 dark:text-slate-400 truncate ...">{kw.url}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                     <div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Competitor Snapshot</h3>
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                             <p className="text-sm text-slate-500 mb-4">Top competitors for your ranking keywords, plus backlink profile analysis.</p>
                             <div className="space-y-3">
                                {competitorSnapshot.slice(0,3).map(kw => (
                                    <div key={kw.keyword} className="text-sm">
                                        <p className="font-semibold text-slate-700 dark:text-slate-200">{kw.keyword}</p>
                                        <p className="text-slate-500 dark:text-slate-400">Competitors: {kw.competitors.join(', ')}</p>
                                    </div>
                                ))}
                                <div className="text-sm pt-3 border-t border-dashed border-slate-300 dark:border-slate-600">
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">Backlink Profile Comparison</p>
                                    <p className="text-slate-500 dark:text-slate-400">Your competitors have, on average, 35% more referring domains.</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Hub and Spoke Content Model</h3>
                     <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                         <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                {contentIdeas.map((idea, index) => (
                                    <div key={idea.cornerstone} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 pb-4 last:pb-0">
                                        <h4 className="font-bold text-cyan-700 dark:text-cyan-400">{idea.cornerstone}</h4>
                                        <div className="text-xs text-slate-500 flex items-center space-x-4 my-1">
                                            <span>Target Keyword: <span className="font-semibold">{idea.related_keyword}</span></span>
                                            <span>SV: <span className="font-mono font-semibold">{idea.sv.toLocaleString()}</span></span>
                                        </div>
                                        <p className="text-xs text-slate-500">Cluster topics: {idea.cluster.join(', ')}</p>
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedIdea === index ? 'max-h-96' : 'max-h-0'}`}>
                                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{idea.long_description}</p>
                                        </div>
                                        <button onClick={() => setExpandedIdea(expandedIdea === index ? null : index)} className="text-cyan-600 text-sm font-semibold mt-2 flex items-center">
                                            {expandedIdea === index ? 'Read Less' : 'Read More'}
                                            <ChevronDown size={16} className={`ml-1 transition-transform ${expandedIdea === index ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                             <div className="md:w-1/3 flex items-center justify-center">
                                <HubAndSpokeVisual pillar={contentIdeas[0].related_keyword} spokes={contentIdeas[0].cluster} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* New Keyword Cannibalization Section */}
                    <div>
                         <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Keyword Cannibalization</h3>
                         <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 h-full flex flex-col">
                            <div className="flex-grow flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-shrink-0">
                                     <svg width="120" height="120" viewBox="0 0 36 36" className="transform -rotate-90">
                                        <circle cx="18" cy="18" r="15.9155" className="stroke-current text-slate-200 dark:text-slate-700" strokeWidth="3" fill="none"></circle>
                                        <circle cx="18" cy="18" r="15.9155" className="stroke-current text-red-500" strokeWidth="3" fill="none" strokeDasharray="12, 88" strokeDashoffset="0"></circle>
                                        <text x="18" y="21" textAnchor="middle" className="fill-current text-slate-700 dark:text-slate-200 text-sm font-bold rotate-90" style={{transformBox: 'fill-box'}}>12%</text>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Our initial scan suggests that **{cannibalization.percentage}%** of your keywords may have cannibalization issues, where multiple pages compete for the same keyword.</p>
                                </div>
                            </div>
                            <button onClick={onUnlock} className="w-full mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                                Unlock Full Cannibalization Report
                            </button>
                         </div>
                    </div>
                    {/* New Backlink Profile Section */}
                    <div>
                         <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Backlink Profile</h3>
                         <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 h-full flex flex-col">
                            <div className="flex-grow space-y-4">
                               <div className="flex items-baseline">
                                 <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">{backlinkProfile.backlinks.toLocaleString()}</p>
                                 <p className="text-sm ml-2 text-slate-500">Total Backlinks</p>
                               </div>
                               <div className="flex items-baseline">
                                 <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">{backlinkProfile.referringDomains.toLocaleString()}</p>
                                 <p className="text-sm ml-2 text-slate-500">Referring Domains</p>
                               </div>
                               <div>
                                   <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Top Linked Pages:</p>
                                   <ul className="text-sm text-cyan-600 dark:text-cyan-400 list-disc list-inside">
                                       {backlinkProfile.topPages.map(page => <li key={page}>{page}</li>)}
                                   </ul>
                               </div>
                            </div>
                            <button onClick={onUnlock} className="w-full mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                                Unlock Full Backlink Report
                            </button>
                         </div>
                    </div>
                </div>

                {/* Free Audit Section */}
                <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">120-Point SEO Site Audit</h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-x-8">
                            <AuditSection title="Meta Tags" data={seoAudit.metaTags} />
                            <AuditSection title="Content Structure" data={seoAudit.contentStructure} />
                            <AuditSection title="Link Analysis" data={seoAudit.linkAnalysis} />
                            <AuditSection title="Image Analysis" data={seoAudit.imageAnalysis} />
                            <AuditSection title="Technical Setup" data={seoAudit.technicalSetup} />
                            <AuditSection title="Performance" data={seoAudit.performanceAudit} />
                            <AuditSection title="Mobile Friendliness" data={seoAudit.mobileFriendliness} />
                            <AuditSection title="Social & Brand" data={checkupData.socialAndBrand} />
                            <AuditSection title="Accessibility" data={checkupData.accessibilityAudit} />
                            <AuditSection title="Security" data={checkupData.securityHeaders} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-300 dark:border-slate-700">
                <TieredPricing onUnlock={onUnlock} />
            </div>
        </div>
    );
};


// ----- Main Application Structure -----

const NavItem = ({ icon, label, active, onClick }) => ( <li className={`flex items-center p-2 cursor-pointer transition-colors rounded-md ${active ? 'bg-cyan-100/50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`} onClick={onClick} > {icon} <span className="ml-3 text-sm font-semibold">{label}</span> </li> );

export default function App() {
    // Possible appStates: 'input', 'loading', 'free_report', 'full_dashboard'
    const [appState, setAppState] = useState('input');
    const [currentUrl, setCurrentUrl] = useState('');
    const [freemiumData, setFreemiumData] = useState(null);
    const [activeView, setActiveView] = useState('Dashboard');
    
    const handleAnalyze = (url) => {
        setAppState('loading'); // NEW: Go to loading state first
        setCurrentUrl(url);
        // Simulate API fetch
        setTimeout(() => {
            // In a real app, this would be response.json() from a fetch call
            setFreemiumData({
                seoAudit: MOCK_DATA.freeCheckup,
                keywordSnapshot: MOCK_DATA.freeKeywords,
                competitorSnapshot: MOCK_DATA.freeKeywords.map(kw => ({ keyword: kw.keyword, competitors: kw.competitors })),
                contentIdeas: MOCK_DATA.freeContentIdeas,
                backlinkProfile: MOCK_DATA.freeBacklinkProfile,
                cannibalization: { percentage: 12 }
            });
            setAppState('free_report');
        }, 3000);
    };

    const handleUnlock = () => {
        setAppState('full_dashboard');
    };
    
    const handleGoBackToInput = () => {
        setAppState('input');
        setCurrentUrl('');
    }

    const renderMainView = () => {
        switch(activeView) {
            case 'Dashboard':
                return <DashboardView analyzedUrl={currentUrl} onBack={handleGoBackToInput} freemiumData={MOCK_DATA.overview}/>;
            case 'AI Strategist':
                return <AiStrategistView onBack={() => setActiveView('Dashboard')} freemiumData={MOCK_DATA}/>;
            case 'Site Audit':
                 return <PlaceholderView title="Technical Site Audit" />;
            case 'Keywords':
                 return <PlaceholderView title="Keyword & Competitor Tracker" />;
            default:
                return <DashboardView analyzedUrl={currentUrl} onBack={handleGoBackToInput} freemiumData={MOCK_DATA.overview}/>;
        }
    };
    
    const LoadingView = () => {
        const messages = ["Running 120-Point SEO Audit...", "Analyzing Keyword Rankings...", "Checking Competitor Profiles...", "Generating Content Ideas..."];
        const [messageIndex, setMessageIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setMessageIndex(prev => (prev + 1) % messages.length);
            }, 750);
            return () => clearInterval(interval);
        }, []);

        return (
             <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                 <div className="loader ease-linear rounded-full border-4 border-t-4 border-slate-200 h-12 w-12 mb-4"></div>
                 <h2 className="text-center text-slate-700 dark:text-slate-200 text-xl font-semibold">{messages[messageIndex]}</h2>
                 <p className="w-1/3 text-center text-slate-500 mt-2">Please wait while we analyze your website...</p>
             </div>
        );
    };

    // Render based on the overall application state
    if (appState === 'loading') {
        return ( <> <GlobalStyles /> <LoadingView/> </>);
    }
    
    if (appState === 'input') {
        return ( <> <GlobalStyles /> <UrlInputView onAnalyze={handleAnalyze} /> </> );
    }

    if (appState === 'free_report') {
        return ( <> <GlobalStyles /> <FreeReportView analyzedUrl={currentUrl} onUnlock={handleUnlock} onBack={handleGoBackToInput} freemiumData={freemiumData} /> </> );
    }
    
    // appState must be 'full_dashboard'
    return (
        <>
        <GlobalStyles />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            <div className="flex">
                <aside className="w-56 bg-white dark:bg-slate-800 h-screen p-4 flex-col border-r border-slate-200 dark:border-slate-700 hidden lg:flex">
                    <div className="flex items-center mb-8 pb-4 border-b border-slate-200 dark:border-slate-700"> <Newspaper className="h-7 w-7 text-cyan-600 dark:text-cyan-400" /> <h1 className="text-lg font-bold ml-2 text-slate-900 dark:text-white tracking-tighter">SEO World</h1> </div>
                    <div className="flex-1"> <ul> <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeView === 'Dashboard'} onClick={() => setActiveView('Dashboard')} /> <NavItem icon={<Search size={20} />} label="Site Audit" active={activeView === 'Site Audit'} onClick={() => setActiveView('Site Audit')} /> <NavItem icon={<Target size={20} />} label="Keywords" active={activeView === 'Keywords'} onClick={() => setActiveView('Keywords')} /> <NavItem icon={<Bot size={20} />} label="AI Strategist" active={activeView === 'AI Strategist'} onClick={() => setActiveView('AI Strategist')} /> </ul> </div>
                    <div className="mt-auto"> <div className="flex items-center mt-4 p-2"> <img src="https://placehold.co/40x40/0f172a/94a3b8?text=U" alt="User Avatar" className="rounded-full" /> <div className="ml-3"> <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">John Doe</p> <p className="text-xs text-slate-500 dark:text-slate-400">Agency Plan</p> </div> </div> </div>
                </aside>
                <main className="flex-1 p-6 lg:p-8 h-screen overflow-y-auto">
                     <header className="flex justify-between items-center mb-6 lg:hidden border-b border-slate-300 pb-4"> <div className="flex items-center"> <Newspaper className="h-7 w-7 text-cyan-600" /> <h1 className="text-lg font-bold ml-2">SEO World</h1> </div> </header>
                    {renderMainView()}
                </main>
            </div>
        </div>
        </>
    );
}
