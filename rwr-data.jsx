// rwr-data.jsx — All report data

const NAV = [
  { id:'cover',           num:'—',  label:'Cover' },
  { id:'exec',            num:'00', label:'Executive Summary' },
  { id:'state',           num:'01', label:'State of Resort Wear 2026' },
  { id:'market',          num:'02', label:'Market Signals' },
  { id:'themes',          num:'03', label:'10 Themes' },
  { id:'lifecycles',      num:'04', label:'Two Lifecycles' },
  { id:'brand-lifecycle', num:'05', label:'Brand Owner Journey' },
  { id:'customer',        num:'06', label:'End Customer Journey' },
  { id:'archetypes',      num:'07', label:'Consumer Archetypes' },
  { id:'product-strategy',num:'08', label:'Product Strategy' },
  { id:'playbook',        num:'09', label:'Practical Playbook' },
  { id:'channels',        num:'10', label:'Channel Playbook' },
  { id:'risks',           num:'11', label:'Risk Map & Scenarios' },
  { id:'metrics',         num:'12', label:'Metrics That Matter' },
  { id:'suppliers',       num:'13', label:'Supplier Landscape' },
  { id:'agenda',          num:'14', label:'Action Agenda' },
  { id:'checklist',       num:'15', label:'Founder Checklist' },
  { id:'sources',         num:'16', label:'Source Notes' },
];

const THEMES = [
  { num:'01', title:'Resort Wear Becomes Year-Round Lifestyle Commerce', body:'The category now overlaps with warm-weather casualwear, cruise, hotel shops, poolside dining, beach clubs, and social-media-driven travel wardrobes. Resort wear is no longer seasonal. It is the wardrobe of a travel-oriented life.', tags:['lifestyle','year-round','travel-led'] },
  { num:'02', title:'The First Capsule Must Be Smaller and Sharper', body:"A 2026 environment shaped by low growth and tariff pressure demands agility. The winning move is 3–5 tightly chosen styles with one print story — not a full collection. McKinsey's 2026 fashion outlook confirms: agility beats breadth in a cautious buying environment.", tags:['capsule','low moq','test-first'] },
  { num:'03', title:'Custom Print Is the Brand Identity System', body:'In resort wear, print does the work a logo does in streetwear. One strong print story should travel across aloha shirts, dresses, board shorts, kids styles, and accessories — creating visual consistency across every rack, page, and feed.', tags:['print','identity','differentiation'] },
  { num:'04', title:'Retailers Want Ready-to-Merchandise Collections', body:"Independent retailers are active buyers, but they need collections that reduce decision friction. Faire's July 2025 market data confirms: brands that are easy to understand, display, and reorder win shelf space over those that require interpretation.", tags:['wholesale','merchandising','line sheet'] },
  { num:'05', title:'Supply Chain Flexibility Over Seasonal Bets', body:'Tariff reconfiguration, inventory risk, and value-seeking consumers all push in the same direction: use low MOQ for the first capsule, confirm fit through samples, track sell-through by style and channel, and reorder winners before committing to new seasonal bets.', tags:['supply chain','MOQ','inventory risk'] },
  { num:'06', title:'Social Commerce Reshapes Discovery to Purchase', body:"For emerging labels, the purchase journey increasingly starts with a Reel, a TikTok, or a tagged story — not a store visit. Shopify data shows AI-attributed orders were up 11× between January and November 2025. Content is now a distribution channel.", tags:['social commerce','content','DTC'] },
  { num:'07', title:'Sun-Aware Utility Drives Product Innovation', body:'UPF fabrics, rash guards, long-sleeve swim tops, and quick-dry shorts are growing beyond surf shops into resort wear, family travel, and beach-club wardrobes. Sun awareness is becoming a product feature and a retail selling point, not just a category.', tags:['UPF','utility','function'] },
  { num:'08', title:'Destination Souvenir Logic Lifts Average Transaction', body:'Resort wear customers often buy not just a garment but a memory, a wearable souvenir, and a piece of destination identity. Brands that tell a destination story in the print, the label, and the retail display unlock higher perceived value and stronger gift purchase rates.', tags:['souvenir','destination','gifting'] },
  { num:'09', title:'Data-Driven Reorder Replaces Seasonal Guessing', body:'Sell-through by style, print, size, and channel is the operating rhythm for a stable resort wear line. Brands that track this data from the first order can reorder proven winners quickly — turning their first capsule into the foundation of a repeatable business.', tags:['data','reorder','sell-through'] },
  { num:'10', title:'Channel Specialization Replaces General Wholesale', body:'Resort boutiques, gift shops, surf shops, hotel retail, Instagram DTC, and wholesale marketplaces have different buyers, different display logic, and different price ladders. Brands that tailor their capsule and line sheet to each channel close more wholesale doors than those with a single generic pitch.', tags:['channel','specialization','wholesale'] },
];

const ARCHETYPES = [
  { label:'Memory-Making Tourist',  age:'28–55',       budget:'$80–250 / item', motivation:'"I want to remember this trip — and look good in the photos."', product:'Aloha shirts, destination-print dresses, matching sets, packable fabrics.', channel:'Hotel retail, destination boutique, resort gift shop.' },
  { label:'Coordinated Family',     age:'30–45 parents', budget:'$45–120 / person', motivation:'"We want family photos that look coordinated — but not costume-y."', product:"Father-son shirts, mother-daughter dresses, family matching sets, kids board shorts.", channel:'Resort boutique, gift shop, Instagram DTC.' },
  { label:'Soft Luxury Couple',     age:'25–40',       budget:'$120–350 / item', motivation:'"We want to look polished, not like generic souvenir shoppers."', product:"Men's camp shirt + women's shirt dress, subtle coordinated prints, premium resort fabrics.", channel:'Resort boutique, hotel retail, honeymoon DTC.' },
  { label:'Sun-Aware Explorer',     age:'25–45',       budget:'$60–180 / item', motivation:'"I need UV protection, breathability, and function — without sacrificing style."', product:'UPF shirts, rash guards, long-sleeve swim tops, quick-dry shorts, utility resort shirts.', channel:'Surf shop, outdoor retailer, DTC.' },
  { label:'Local Lifestyle Buyer',  age:'22–50',       budget:'$55–160 / item', motivation:'"I live here. I want resort wear that doesn\'t look touristy."', product:'Quieter prints, everyday resort shirts, lightweight dresses, understated coastal patterns.', channel:'Local boutique, lifestyle store, DTC.' },
  { label:'Social-First Shopper',   age:'18–35',       budget:'$50–200 / item', motivation:'"I saw this on a Reel. The print is perfect. I need it before the trip."', product:'Hero print capsule, bold matching sets, campaign-ready look, limited drop.', channel:'Instagram DTC, TikTok Shop, creator-linked landing page.' },
];

const CHANNELS = [
  { label:'Resort Boutique',     customer:'Couples, resort guests, wedding groups',    price:'$120–350 MSRP', display:'1 print story across 5–8 SKUs, rack display, hero window piece.',         pitch:'Easy-to-merchandise collection, clear price ladder, strong visual story from shirt to dress to set.',     reorder:'Seasonal — 6–8 week lead time tolerance.' },
  { label:'Gift Shop',           customer:'Tourists, families, souvenir buyers',       price:'$45–150 MSRP',  display:'Destination print hero, table fold display, giftable packaging.',          pitch:'Destination print, local story, packable, giftable, clear size chart, fast decision for impulse buyers.', reorder:'Responsive — low MOQ reorder on bestsellers within 2 weeks.' },
  { label:'Surf Shop',           customer:'Beach lifestyle, surfers, active travelers', price:'$60–200 MSRP', display:'Function-forward hang display, UPF and performance callouts on signage.',  pitch:'UPF rating, fabric performance, beach utility, brand credibility with local surf culture.',              reorder:'Season-led — board shorts and rash guards reorder together.' },
  { label:'Hotel Retail',        customer:'Resort guests, honeymooners, biz-leisure',  price:'$150–400 MSRP', display:'Curated 3–5 SKU selection, premium folding, branded tissue wrap.',         pitch:'Premium positioning, hotel logo option, exclusive destination print, gift-ready packaging.',             reorder:'Monthly small-batch — exclusive colorway option available.' },
  { label:'Instagram DTC',       customer:'Social-first shoppers, creator audiences',  price:'$80–250 MSRP',  display:'Campaign imagery, Reels-first content, hero drop model.',                  pitch:'Bold print story, content-first launch, UGC strategy, limited capsule with scarcity signal.',           reorder:'Drop-based — 8–12 week restock cycle.' },
  { label:'Faire / Wholesale',   customer:'Independent retailers across all types',    price:'$35–120 wholesale', display:'Line sheet with clear tearsheet, digital catalog.',                    pitch:'Simple line sheet, clear minimums, strong imagery, easy reorder terms, consistent delivery windows.',    reorder:'Net-60 terms — reorder via platform, seasonal refreshes.' },
];

const RISKS = [
  { severity:'High',   name:'SKU Overload',             desc:'Launching 15+ styles in the first capsule destroys focus — in production, photography, retail display, and the buyer pitch.', mitigation:'Cap the first capsule at 3–5 styles. Add SKUs only after first sell-through data is in.', kpi:'% of styles with >50% sell-through in 90 days' },
  { severity:'High',   name:'Generic Print Identity',   desc:'Launching with stock prints or trend-copied graphics creates no brand recognition, no reorder loyalty, and no retail story.', mitigation:'Invest in one original print story before sampling. The print IS the brand in resort wear.', kpi:'Unaided brand recall in target channel' },
  { severity:'High',   name:'Fit Issues at Scale',      desc:'Skipping or rushing sample approval causes construction problems, size inconsistencies, and return spikes after the bulk order arrives.', mitigation:'Run full sample approval: fit, print placement, wash test, stitch quality, label check. No shortcuts.', kpi:'Return rate by reason; target <5% fit-related' },
  { severity:'Medium', name:'Inventory Pressure',       desc:'Overbuying an untested print or style locks cash, creates markdown pressure, and can end a label before it has real sell-through data.', mitigation:'Use MOQ 50 for the first run. Treat it as paid market research. Reorder only proven winners.', kpi:'Days of inventory remaining; target <90 days' },
  { severity:'Medium', name:'Retailer Confusion',       desc:'A complex line sheet, too many colorways, or unclear merchandising guidance causes boutique buyers to pass — even if they like the product.', mitigation:'Deliver a one-page tearsheet per style, a visual display guide, and a "buy the story" bundle recommendation.', kpi:'Wholesale close rate; target >40% of pitched buyers' },
  { severity:'Medium', name:'Low DTC Conversion',       desc:'Missing product page essentials — size chart, fit note, fabric story, lifestyle imagery, social proof — causes traffic to leave without buying.', mitigation:'Build product pages from samples before bulk. Add UGC within 2 weeks of first customer deliveries.', kpi:'DTC conversion rate; target >2.5%' },
  { severity:'Medium', name:'No Reorder Infrastructure',desc:'When a style sells out and a reorder should be placed, many small brands have no lead-time plan, no fabric hold, and no retailer communication process ready.', mitigation:'Set reorder triggers (e.g. <20% inventory remaining) at launch. Pre-negotiate fabric minimums with production partner.', kpi:'Time from sell-out signal to reorder; target <2 weeks' },
];

const SCENARIOS = [
  {
    label:'Conservative', tagline:'Cautious buyers.\nSlower recovery.',
    conditions:['Travel spending growth stalls at 2–3%','Resort boutique buyers cut OTB 15–20%','DTC conversion pressure rises','Tariffs add 5–8% to landed cost'],
    strategy:'1 hero print. 3 styles only. Focus one channel. Minimum inventory. Prove sell-through before any reorder commitment.',
    products:"1 aloha shirt, 1 women's cover-up, 1 matching set.",
    budget:'US$30K–50K launch budget.',
  },
  {
    label:'Base', tagline:'Normal recovery.\nSteady channel activity.',
    conditions:['Travel spending grows 4–6%','Resort boutique reorder rate holds at 35–45%','Faire marketplace activity remains active','Social commerce adds 15–25% of DTC revenue'],
    strategy:'1 print story, 2–3 colorways, 5 styles. Boutique + DTC dual channel. Launch content calendar 4 weeks before ship.',
    products:"2 aloha shirts, 1 dress, 1 cover-up, 1 matching set.",
    budget:'US$60K–90K launch budget.',
  },
  {
    label:'Upside', tagline:'Breakout print.\nMulti-channel traction.',
    conditions:['Travel spending grows 7%+','Instagram-led demand spills into boutique reorders','Matching-set content goes viral','Wholesale requests exceed first-run inventory'],
    strategy:'2 print stories, 8 styles across 3 channels. Scale DTC with paid social. Pre-negotiate fabric hold before launch.',
    products:'Full capsule: shirts, dresses, cover-ups, sets, kids styles.',
    budget:'US$120K–180K launch budget.',
  },
];

const METRICS = [
  { name:'Sell-Through Rate',          formula:'Units Sold ÷ Units Bought × 100',         target:'≥ 65% at 12 weeks',              why:'Primary health signal. Tells you which styles deserve a reorder and which do not.' },
  { name:'Best-Selling Print',         formula:'Revenue + Units by Print Code',            target:'1 clear leader per drop',         why:'Identifies the print that earns reorder investment. Track separately from style performance.' },
  { name:'Size Curve Accuracy',        formula:'Planned vs. Actual Units Sold by Size',    target:'< 10% variance by size',          why:'Miscalculated size curves create simultaneous stockouts and dead inventory.' },
  { name:'Gross Margin',               formula:'(Revenue − COGS) ÷ Revenue × 100',        target:'≥ 55% DTC / ≥ 35% wholesale',    why:'Minimum viable margins by channel determine whether the model scales profitably.' },
  { name:'Return Rate & Reasons',      formula:'Returns ÷ Orders × 100 + reason log',     target:'< 5% fit-related returns',        why:'Return reason data is the fastest feedback on fit accuracy, description quality, and sizing.' },
  { name:'UGC Volume',                 formula:'Tagged posts ÷ Units shipped × 100',      target:'≥ 3% organic tagging rate',       why:'Social proof accelerates conversion for the next buyer and reduces paid media dependency.' },
  { name:'Retailer Reorder Rate',      formula:'Reordering buyers ÷ All buyers × 100',    target:'≥ 40% at season end',             why:'The strongest proof that the line merchandises well and delivers value to the retail floor.' },
  { name:'Days of Inventory Remaining',formula:'On-Hand Units ÷ Daily Sales Rate',        target:'< 90 days per style',             why:'Longer cycles lock cash and increase markdown risk. Track per style, not total inventory.' },
];

const SUPPLIERS = [
  { name:'Aloha & Co.',          moq:'50 pcs',       focus:'Resort wear specialist',           design:'Custom print development + full brand support', lead:'8–12 wks', tier:'Mid-premium', note:'Factory-direct. FOB/DDP. Category-focused from print to launch.' },
  { name:'Generic Asia Factory', moq:'300–500 pcs',  focus:'General apparel, multi-category',  design:'Limited — stock prints only',                  lead:'10–16 wks', tier:'Low-mid',    note:'Suitable for high volume. No brand partnership or category focus.' },
  { name:'Bali-Based Studio',    moq:'50–100 pcs',   focus:'Swimwear-adjacent, resort lifestyle',design:'Print-forward, creative-led',                 lead:'8–14 wks', tier:'Mid-premium', note:'Strong on swimwear and cover-ups. Resort wear breadth is narrower.' },
  { name:'Domestic (US/EU)',     moq:'25–50 pcs',    focus:'Basics, cut-and-sew',               design:'Limited print capability',                     lead:'4–8 wks',  tier:'Premium',    note:'Faster lead time. Higher COGS. Suitable for elevated basics, not print-heavy resort.' },
  { name:'Print-On-Demand',      moq:'1 pc',         focus:'DTC only — no wholesale path',      design:'Digital print only',                           lead:'3–5 days', tier:'Variable',   note:'Zero inventory risk, low margin, limited fabric choice. No wholesale path.' },
];

const AGENDA = [
  { phase:'Immediate', window:'0 – 30 days', items:['Define target customer segment and destination mood','Select 3–5 hero styles for the first capsule','Brief custom print development — one original story','Confirm sales channel: boutique, DTC, or hybrid','Set target MSRP and wholesale price point'] },
  { phase:'Short-Term', window:'30 – 90 days', items:['Complete tech packs with flat sketch, measurements, construction notes','Place sampling order with confirmed fabric and print file','Run full sample approval: fit, wash, color, placement, label','Build product pages and photography from approved samples','Begin pre-launch content: print reveal, behind-the-scenes, mood'] },
  { phase:'Launch', window:'90 – 150 days', items:['Place bulk production order (MOQ 50 per style)','Launch DTC product pages and first social content wave','Send line sheet to 5–10 target boutique or resort buyers','Track sell-through by style, print, size, and channel daily','Capture UGC within first 2 weeks of customer deliveries'] },
  { phase:'Growth', window:'150+ days', items:['Reorder top 1–2 styles at 30% inventory remaining','Begin second print story based on sell-through data','Expand to second sales channel','Build retailer reorder calendar and seasonal refresh plan','Review gross margin by style and channel — cut underperformers'] },
];

const STAGES = [
  { num:'01', name:'Inspiration',       q:'What style should I make?',               role:'Clarify resort wear categories, destination mood, first-capsule direction, and end-customer use cases.' },
  { num:'02', name:'Brand Positioning', q:'What makes my line different?',           role:'Use custom print, product mix, and destination story to create differentiation that can own retail shelf space.' },
  { num:'03', name:'Product Planning',  q:'Which SKUs should I make?',               role:'Recommend a low-risk product mix, MOQ 50 planning, size split, and channel-specific assortment.' },
  { num:'04', name:'Design & Sample',   q:'Will print, fit, and construction work?', role:'Support print design, fabric matching, sample development, fit review, and QC checklist.' },
  { num:'05', name:'Production',        q:'How do I control cost and lead time?',    role:'Factory-direct production, FOB/DDP options, packaging direction, and quality control.' },
  { num:'06', name:'Launch & Sales',    q:'How do I launch and convert buyers?',     role:'Mockup, catalog, line-sheet, product copy, and launch-content direction.' },
  { num:'07', name:'Reorder & Scale',   q:'Which styles should I reorder?',          role:'Reorder planning, seasonal print drops, private label expansion, and fit-block reuse.' },
];

const CUSTOMERS = [
  { id:'tourist', label:'Vacation Tourist', desc:'Core customer for Hawaii gift shops, hotel shops, and destination boutiques — buying vacation memory + wearable souvenir + photo-ready outfit.',
    rows:[
      { m:'Before Trip', t:'I need clothes for Hawaii, Bali, a cruise, or a beach holiday.', p:'SEO, social content, hotel retail, destination product pages.' },
      { m:'Arrival',     t:'I want something that feels local and special.',                  p:'Window display, local print story, easy sizing.' },
      { m:'In-Trip',     t:'I want something I can wear today and take home.',                p:'Aloha shirts, dresses, cover-ups, matching sets, packable fabrics.' },
      { m:'Wearing',     t:'I need beach, dinner, boat, and photo outfits.',                  p:'Beach-to-dinner use cases, comfort, photogenic prints.' },
      { m:'Souvenir',    t:'I want to bring the trip home.',                                  p:'Destination-inspired prints and local stories create gift value.' },
      { m:'Post-Trip',   t:'Friends ask where I bought it.',                                   p:'Brand tags, QR code, IG handle, easy reorder path.' },
    ]},
  { id:'family', label:'Family Buyers', desc:'Strong customers for matching sets, kids wear, and photo-oriented resort collections.',
    rows:[
      { m:'Trip Planning', t:'We want family photos that look good.',              p:'Family matching collection.' },
      { m:'Pre-Shopping',  t:'Adults and kids need outfits.',                      p:"Men's shirt, women's dress, kids shirt, shorts, toddler options." },
      { m:'Resort Stay',   t:'We need comfortable and easy-care clothes.',         p:'Breathable rayon, cotton blends, easy-care polyester.' },
      { m:'Photo Moment',  t:'We want coordinated but not awkward.',               p:'One print across several silhouettes.' },
      { m:'Souvenir',      t:'Kids clothing feels memorable.',                      p:'Kids aloha shirts, girls dresses, family keepsakes.' },
    ]},
  { id:'couples', label:'Honeymooners', desc:'Couples need romance and photo readiness without generic souvenir aesthetics.',
    rows:[
      { m:'Booking',     t:'This trip should feel special.',                      p:'Honeymoon capsule or limited destination capsule.' },
      { m:'Pre-Trip',    t:'We want coordinated looks without looking childish.',  p:'Subtle matching prints and coordinated colors.' },
      { m:'Dinner',      t:'We need sunset, dinner, bar, and lobby outfits.',     p:'Camp shirt, shirt dress, wrap skirt, elevated matching set.' },
      { m:'Sharing',     t:'We want the photos to look polished.',                p:'Premium prints and cleaner styling.' },
      { m:'Anniversary', t:'We may buy for the next trip.',                       p:'Seasonal couple capsule.' },
    ]},
  { id:'locals', label:'Resort Locals', desc:'Locals buy resort wear for everyday warm-weather life — not as a souvenir.',
    rows:[
      { m:'Daily Life', t:"I want warm-weather clothes that don't look touristy.", p:'Everyday resort shirts and quieter dresses.' },
      { m:'Weekend',    t:'Brunch, beach, market, boat day.',                      p:'Casual shirts, dresses, shorts, sets.' },
      { m:'Local ID',   t:"I want something local but not obvious.",               p:'Refined local-inspired prints.' },
      { m:'Repeat',     t:'If it fits and washes well, I will buy again.',         p:'Stable base styles and reliable fit blocks.' },
    ]},
  { id:'ig', label:'Instagram-First', desc:'The purchase journey starts with content, not a store visit. Discovery happens on Reels, TikTok, or a tagged story.',
    rows:[
      { m:'Discovery',    t:'I saw a vacation outfit on IG, Reels, or TikTok.',    p:'Campaign visuals and first-screen product imagery.' },
      { m:'Save/Follow',  t:'I like the mood, but may not buy today.',             p:'Moodboard, lookbook, styling content, repeated scenes.' },
      { m:'Trust',        t:'Is this brand real? Is quality good?',               p:'Behind-the-scenes, sample videos, fit content, UGC.' },
      { m:'Purchase',     t:'One scene finally makes me buy.',                     p:'Strong product page, size guide, limited drop, clear shipping.' },
      { m:'UGC Loop',     t:'Customer photos help the next buyer.',                p:'Repost system, customer gallery, review capture.' },
      { m:'Community',    t:'I want the next print drop.',                         p:'Seasonal drops, exclusive prints, early-access offers.' },
    ]},
];

const PLAYBOOK = [
  { title:'Define the Customer Before the Product', body:"Answer four questions before designing: Who is the buyer? What is the price point? What is the use case — beach, cruise, resort dinner, family travel? Is the brand selling destination, print, fabric, or lifestyle?\n\nOne useful formula: We make [category] for [customer] who wants [use case] with [brand difference]. Write the sentence before you brief the print." },
  { title:'Build the First Capsule Around One Print Story', body:"Commit to 1 print story, 2–3 colorways, 3–5 hero styles, and 1 fit block per product type.\n\nSuggested first mix: 1 aloha or resort shirt (hero top), 1 pull-on short or beach pant, 1 dress or cover-up, 1 matching set, 1 swim-adjacent item if the channel requires it. This gives the store a complete story from day one." },
  { title:'Match the Capsule to the Sales Channel', body:"A resort boutique needs easy merchandising. An Instagram label needs a hero drop with strong visual content. A surf shop needs function and UPF callouts. A gift shop needs destination story and giftable packaging.\n\nThe same 5 styles will be pitched differently — and should have slightly different assortment logic — for each channel." },
  { title:'Prepare Production Like a Brand', body:"Before bulk order: tech pack with flat sketch and measurements, repeat-ready print file (300 DPI, tile preview), fabric decision by use case (breathable, packable, washable, colorfast), full sample approval checklist covering fit, wash, color, stitch quality, label check, care label copy, and retail product descriptions." },
  { title:'Use Low MOQ to Reduce Inventory Risk', body:"A low-MOQ first run is a market test — not a compromise. MOQ 50 per style is enough to equip 3–5 boutiques, test DTC response, and generate UGC.\n\nSet a reorder trigger before you ship: if 70% sells through in 8 weeks, reorder immediately. The objective is to buy learning before buying volume." },
  { title:'Build Product Pages Before Bulk Production', body:"Use approved samples to build product pages. Add fit notes and fabric composition. Show lifestyle and flat-lay imagery. Include size charts. Test ad creative and social posts before committing to larger runs.\n\nEvery engagement and click before launch is demand data. Demand signals from pre-launch content are real data — act on them." },
];

const SOURCES = [
  { num:'[1]',  text:"McKinsey & The Business of Fashion, The State of Fashion 2026.", url:"https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion" },
  { num:'[2]',  text:"World Travel & Tourism Council, Travel & Tourism Sees Best Year Ever, April 14, 2026.", url:"https://wttc.org" },
  { num:'[3]',  text:"State of Hawaii DBEDT, Visitor Spending Increased in December 2025, January 29, 2026.", url:"https://dbedt.hawaii.gov" },
  { num:'[4]',  text:"Zion Market Research, Resort Wear Market Size, Growth, Global Trends, Forecast 2034.", url:"https://www.zionmarketresearch.com" },
  { num:'[6]',  text:"Grand View Research, Swimwear Market Size And Share Industry Report, 2030.", url:"https://www.grandviewresearch.com" },
  { num:'[7]',  text:"U.S. Census Bureau, Quarterly Retail E-Commerce Sales, Q4 2025, March 10, 2026.", url:"https://www.census.gov/retail/ecommerce.html" },
  { num:'[8]',  text:"Deloitte, 2025 US Retail Industry Outlook, January 21, 2025.", url:"https://www.deloitte.com" },
  { num:'[9]',  text:"Shopify, 10 Mobile Ecommerce Trends to Watch in 2026.", url:"https://www.shopify.com" },
  { num:'[10]', text:"Shopify, 19 Key Retail Reports & KPIs for Evaluating Store Performance.", url:"https://www.shopify.com" },
  { num:'[11]', text:"Faire, Markets. July 2025: ~460K orders from 76K+ retailers, 1.3M+ products.", url:"https://www.faire.com/markets" },
  { num:'[13]', text:"Bali Swim, How to Start a Swimwear Brand in 2026.", url:"https://baliswim.com" },
  { num:'[14]', text:"Bali Swim, 11-Step Swimwear Business Plan Using AI, April 3, 2025.", url:"https://baliswim.com" },
];

Object.assign(window, { NAV, THEMES, ARCHETYPES, CHANNELS, RISKS, SCENARIOS, METRICS, SUPPLIERS, AGENDA, STAGES, CUSTOMERS, PLAYBOOK, SOURCES });
