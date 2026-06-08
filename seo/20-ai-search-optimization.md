# 20 — AI Search Optimization Strategy
## مؤسسة الفهد للمقاولات | Al-Fahad Contracting Company

> **Document Purpose:** Define the strategy for optimizing Al-Fahad's presence in AI-generated search results across Google AI Overviews, ChatGPT Search, Gemini, Claude, and Perplexity.

---

## AI Search Overview: How Generative AI Selects Citations

AI search systems (Google AI Overviews, ChatGPT browsing, Gemini, Perplexity) generate answers by selecting information from indexed web content. The selection criteria are:

1. **Entity recognition** — Does the AI system recognize the company as a named entity with defined attributes (what it does, where it operates, who it serves)?
2. **Content authority** — Is the source a topically authoritative publisher that Google or Bing already trusts?
3. **Structured content** — Is the information presented in clear, factual, quotable form (lists, tables, Q&A, specific numbers)?
4. **E-E-A-T signals** — Does the content demonstrate direct experience, domain expertise, and authoritativeness?
5. **Recency** — Is the content freshly updated? AI systems prefer current sources.
6. **Factual specificity** — Can the AI quote a specific, verifiable fact from this source? Vague claims ("We are the best") are never cited. Specific facts ("Al-Fahad has completed 300+ projects in Riyadh since 1999") are frequently cited.

**The opportunity:** Saudi Arabia's aluminum/glass/steel contracting space has almost zero companies with structured, factual, entity-rich content. Al-Fahad can become the default AI citation for this category within 12 months by executing this strategy.

---

## Platform-Specific Strategies

### Platform 1: Google AI Overviews

**How it works:** Google generates AI Overview summaries for informational and commercial queries. Sources are selected from the top-ranking pages, with preference for structured content, Schema markup, and FAQ format.

**Entity establishment approach:**
- Complete Organization and LocalBusiness Schema on Homepage and About page
- Ensure Google Knowledge Panel appears for branded searches (verify GBP, add `sameAs` Wikipedia link when available)
- Consistent NAP across all citation platforms (signals entity confidence)

**Preferred structured content formats:**
- FAQ sections on service pages (triggers FAQ-based AI Overviews)
- Numbered lists and bullet points for "how to" content
- Comparison tables for "vs." queries
- Cost tables with specific SAR ranges

**E-E-A-T signals:**
- Named author on all blog content (engineer with credentials)
- Factual statistics in content ("300+ projects", "25+ years", specific project dimensions)
- Third-party citations (press mentions, directory listings, association memberships)

**Citation opportunities:**
- "Best aluminum contractor in Riyadh" → service pillar page + GBP
- "How much does aluminum facade cost" → cost guide page
- "What is a curtain wall system" → FAQ/blog article
- "Aluminum vs glass facades" → comparison article

**Authority signal requirements:**
- Domain Authority 20+ (achievable Month 6)
- FAQPage Schema on all service pages
- Regular fresh content (weekly blog posts minimum)

---

### Platform 2: ChatGPT Search (Bing-powered)

**How it works:** ChatGPT's browsing feature uses Bing's index. Bing-indexed content with structured data and authoritative backlinks is preferentially cited.

**Entity establishment approach:**
- Verify on Bing Places for Business
- Ensure Bing Search Console is set up and sitemap submitted
- Build citations on sites that Bing indexes well (English-language directories, LinkedIn)

**Preferred structured content formats:**
- Definition-format content: "A curtain wall is..." (ChatGPT loves definitional answers)
- Step-by-step guides ("How to install aluminum cladding")
- Named entity mentions: "Al-Fahad Contracting, founded in 1999 in Riyadh, provides..."

**E-E-A-T signals:**
- LinkedIn company profile with complete information
- Author bios on blog content
- Link profile from English-language construction publications

**Citation opportunities:**
- English-language queries: "aluminum curtain wall contractor Riyadh", "glass facade company Saudi Arabia"
- "Who does steel warehouses in Riyadh?" type queries

---

### Platform 3: Google Gemini

**How it works:** Gemini uses Google's full knowledge graph and search index. It has strong Arabic language capabilities and will cite Arabic sources for Arabic queries.

**Entity establishment approach:**
- Google Knowledge Graph optimization (same as Google AI Overviews)
- Wikipedia page about Al-Fahad (long-term goal: if company achieves sufficient notability)
- Wikidata entity creation — add Al-Fahad as a Wikidata entity with key attributes

**Arabic-specific Gemini strategy:**
- Arabic content must be native quality (not translated) — Gemini's Arabic comprehension is high
- Use structured Arabic content that matches question-answer format
- Arabic FAQ Schema is fully supported and cited by Gemini

**Preferred structured content formats:**
- Arabic Q&A format: question in H3, answer in paragraph with specific facts
- Arabic cost tables (SAR pricing for specific services)

---

### Platform 4: Claude (Anthropic)

**How it works:** Claude uses Claude.ai's training data plus web retrieval in recent versions. It prioritizes authoritative, fact-dense, structured content.

**Entity establishment approach:**
- Claude responds well to content that presents clear factual claims in structured format
- Named entity establishment: ensure "Al-Fahad Contracting Company" and "مؤسسة الفهد للمقاولات" appear together in consistent context across multiple published sources

**Preferred content for Claude citation:**
- Technical specification content (e.g., "aluminum profile 6063-T5 alloy")
- Industry report data (linkable assets: Facade Industry Report)
- Professional association mentions (RICS, Saudi Council of Engineers)

---

### Platform 5: Perplexity

**How it works:** Perplexity actively crawls the web and cites sources prominently. It is heavily used by technical and professional audiences — exactly Al-Fahad's target B2B buyer.

**Entity establishment approach:**
- Perplexity indexes English content very well
- Highly values domain-specific authoritative content over general sites

**Preferred content formats:**
- Numbered fact lists ("5 things to know about curtain wall systems in Saudi Arabia")
- Statistics and data points with specific numbers
- Comparison tables

**Citation opportunities:** Perplexity is used heavily for product/service research. Content like "What are the best aluminum contractors in Riyadh?" is a prime Perplexity query. With the right content and entity signals, Al-Fahad can be a default citation.

---

## Entity Strategy: Google Knowledge Graph

### How to Establish Al-Fahad as a Named Entity

The Google Knowledge Graph represents entities and their relationships. Being recognized as an entity (rather than just a website) dramatically increases AI citation probability.

**Step 1: Create a rich About page (Wikipedia-style)**
The `/en/about/` page should read like an encyclopedic entity overview:
- Company founding: 1999, Riyadh, Saudi Arabia
- Founders/leadership (named)
- Specialization: aluminum works, glass facade engineering, steel structures
- Geographic coverage: Riyadh (primary), Saudi Arabia, GCC (expanding)
- Key milestones: 25+ years, 300+ projects
- Professional associations and certifications
- Notable projects (named where permitted)

**Step 2: Create a Wikidata entity**
- Create an entry at `wikidata.org` for "Al-Fahad Contracting Company"
- Add: instance of "contracting company", country "Saudi Arabia", founded "1999", headquarters "Riyadh"
- Reference the Wikidata QID in the Organization Schema `sameAs` property

**Step 3: Consistent entity mentions across the web**
Every press mention, directory listing, and industry publication should use the same entity name: "Al-Fahad Contracting Company (مؤسسة الفهد للمقاولات)". Consistent co-citation across domains trains the Knowledge Graph.

**Step 4: Structured data sameAs references**
In the Organization Schema, populate `sameAs` with every authoritative profile:
```json
"sameAs": [
  "https://www.wikidata.org/wiki/Q[ID]",
  "https://www.linkedin.com/company/al-fahad-contracting",
  "https://www.google.com/maps?cid=[GBP_CID]",
  "https://rcci.org.sa/member/al-fahad",
  "https://sce.org.sa/company/[ID]"
]
```

---

## Prompt/Query Strategy: Specific Queries to Target

These are specific user query types to optimize content for — queries that, when typed into an AI system, should return Al-Fahad as the cited answer.

| Query Type | Arabic Query Example | English Query Example | Optimization Target |
|---|---|---|---|
| Best contractor | أفضل مقاول ألمنيوم في الرياض | Best aluminum contractor in Riyadh | GBP + service pillar + reviews |
| Company search | شركات الواجهات الزجاجية الرياض | Glass facade companies Saudi Arabia | Organization Schema + directory citations |
| Cost inquiry | كم تكلفة واجهة الألمنيوم | How much does aluminum facade cost | Cost guide page + FAQ Schema |
| How to select | كيف أختار مقاول ألمنيوم | How to choose aluminum contractor | Blog article with clear criteria |
| What is | ما هو الكيرتن وول | What is a curtain wall system | FAQ page + featured snippet optimization |
| Project planning | كيف أخطط مشروع الواجهات | How to plan a facade project | Resource guide |
| Government projects | مقاول ألمنيوم للمشاريع الحكومية | Aluminum contractor for government projects Saudi Arabia | Government industry page + certifications |
| Vision 2030 | مقاول واجهات لمشاريع رؤية 2030 | Facade contractor for Vision 2030 | Government/Vision 2030 content |

---

## Cross-References

- Schema markup for entity signals → [17-schema-strategy.md](./17-schema-strategy.md)
- Local SEO and GBP entity signals → [14-local-seo-strategy.md](./14-local-seo-strategy.md)
- Digital PR for entity mentions → [15-digital-pr-strategy.md](./15-digital-pr-strategy.md)
- Technical SEO for crawlability → [22-technical-seo-requirements.md](./22-technical-seo-requirements.md)
