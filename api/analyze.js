const express = require('express');
const app = express();

// A simplified mock of the large data object
const MOCK_DATA = {
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
};


app.use(express.json());

app.post('/api/analyze', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // In a real application, you would make API calls to your data sources here.
    // For this functional demo, we are returning our detailed mock data.
    const freemiumReport = {
        keywordSnapshot: MOCK_DATA.freeKeywords,
        competitorSnapshot: MOCK_DATA.freeKeywords.map(kw => ({ keyword: kw.keyword, competitors: kw.competitors })),
        contentIdeas: MOCK_DATA.freeContentIdeas,
        backlinkProfile: MOCK_DATA.freeBacklinkProfile,
        cannibalization: { percentage: 12 },
        seoAudit: MOCK_DATA.freeCheckup,
    };
    
    // Send the successful response back to the frontend
    res.status(200).json({ 
        analyzedUrl: url,
        freemiumReport 
    });
});

// Vercel will automatically handle routing requests to this Express app
module.exports = app;
