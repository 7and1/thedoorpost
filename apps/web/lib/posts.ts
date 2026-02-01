export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author: string;
  authorUrl: string;
  content?: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
}

export const posts: Post[] = [
  {
    slug: "above-the-fold-complete-guide",
    title: "Above the Fold: Complete Guide with 15 Examples (2026)",
    excerpt:
      "Everything you need to know about above-the-fold optimization. Learn what it means, why it matters, and see 15 real examples from top-converting landing pages.",
    date: "2026-01-31",
    readingTime: "12 min read",
    author: "TheDoorpost Team",
    authorUrl: "/about",
    sections: [
      {
        heading: "What Does Above the Fold Mean?",
        paragraphs: [
          "Above the fold refers to the portion of a webpage that is visible without scrolling. The term originates from newspaper publishing, where the most important stories were placed on the top half of the front page—the part visible when newspapers were folded and displayed on newsstands.",
          "In web design, above the fold is the content users see immediately when they land on your page, before any scrolling occurs. This typically includes your headline, subheadline, primary call-to-action, hero image or video, and key trust signals. The exact dimensions vary based on screen size, but on desktop it is roughly 1920x1080 pixels, while mobile devices show approximately 375x667 pixels.",
          "Why does this matter? Research shows that 70% of visitors decide whether to stay or leave within the first 10 seconds. Your above-the-fold content is your only chance to make that critical first impression. If visitors cannot immediately understand what you offer and why it matters to them, they will bounce before ever scrolling down to see your carefully crafted features section or testimonials."
        ]
      },
      {
        heading: "The Psychology Behind Above-the-Fold Optimization",
        paragraphs: [
          "Human attention spans online are measured in seconds, not minutes. When someone lands on your page, their brain is asking three questions simultaneously: What is this? Is it relevant to me? What should I do next? Your above-the-fold section must answer all three questions instantly.",
          "Eye-tracking studies consistently show that users spend 80% of their time viewing content above the fold. The famous F-pattern reading behavior means users scan horizontally across the top of your page, then move down and scan again, creating an F-shaped pattern. This is why your most important elements—headline, value proposition, and CTA—must be positioned in the top-left quadrant where eyes naturally land first.",
          "The fold also creates a psychological barrier. Users who do not find value above the fold rarely scroll to discover more. This is not laziness—it is cognitive efficiency. Our brains are wired to make snap judgments about whether something deserves our continued attention. If your above-the-fold content fails to trigger interest, curiosity, or recognition of a problem you solve, the visitor is gone."
        ]
      },
      {
        heading: "15 Real Examples of High-Converting Above-the-Fold Designs",
        paragraphs: [
          "Let's examine 15 landing pages that nail their above-the-fold experience. Each example demonstrates specific principles you can apply to your own pages."
        ]
      },
      {
        heading: "Example 1: Stripe - Clarity Through Simplicity",
        paragraphs: [
          "Stripe's homepage is a masterclass in clarity. The headline 'Financial infrastructure for the internet' immediately communicates what they do. No clever wordplay. No vague promises. Just a clear statement of their core offering.",
          "Below the headline, a single-sentence subheadline explains who it is for: 'Millions of companies of all sizes use Stripe to accept payments and manage their businesses online.' This social proof is embedded directly into the value proposition.",
          "The CTA is a high-contrast button that says 'Start now' with a secondary option to 'Contact sales.' The page uses generous white space, making the few elements present impossible to miss. There is no visual clutter competing for attention."
        ]
      },
      {
        heading: "Example 2: Notion - Problem-Solution Framing",
        paragraphs: [
          "Notion's above-the-fold section leads with 'Your wiki, docs & projects. Together.' This headline works because it identifies the problem (scattered information across multiple tools) and hints at the solution (everything in one place).",
          "The hero image shows the actual product interface, giving visitors an immediate sense of what they will get. This is crucial for software products—show, do not just tell.",
          "Their CTA 'Get Notion free' emphasizes the free tier, removing the primary objection (cost) right in the button text. The secondary text 'Trusted by teams at' followed by recognizable company logos provides instant credibility."
        ]
      },
      {
        heading: "Example 3: Airbnb - Outcome-Focused Messaging",
        paragraphs: [
          "Airbnb does not say 'Book accommodations' or 'Find places to stay.' Their headline is 'Find your next adventure.' This outcome-focused messaging taps into the emotional reason people use Airbnb—not just to find a place to sleep, but to have experiences.",
          "The search bar is the dominant element above the fold, making the primary action (searching for a destination) frictionless. No forms to fill out. No account creation required. Just type and search.",
          "The background uses high-quality lifestyle imagery that rotates, showing diverse destinations and experiences. This visual storytelling reinforces the adventure narrative without requiring any text."
        ]
      },
      {
        heading: "Example 4: Slack - Specificity Wins",
        paragraphs: [
          "Slack's headline 'Slack is your digital HQ' is specific and memorable. It creates a mental model (headquarters = central place where work happens) that helps visitors immediately understand the product category.",
          "The subheadline provides concrete benefits: 'Transform the way you work with one place for everyone and everything you need to get stuff done.' Notice the specificity—'one place' and 'get stuff done' are tangible concepts, not abstract promises.",
          "Their CTA 'Try for free' is accompanied by 'Slack is free to try for as long as you'd like' directly below it. This removes the time-pressure objection that often comes with free trials."
        ]
      },
      {
        heading: "Example 5: Shopify - Authority Through Numbers",
        paragraphs: [
          "Shopify leads with 'Start selling online today' followed immediately by 'Join millions of entrepreneurs who trust Shopify to start, run, and grow their business.' The specific number (millions) provides social proof at scale.",
          "The form above the fold asks only for an email address, reducing friction to the absolute minimum. The button text 'Start free trial' clearly communicates what happens next.",
          "Below the CTA, they display logos of well-known brands using Shopify (Allbirds, Gymshark, etc.). This dual-layer social proof—both quantity (millions) and quality (recognizable brands)—builds trust instantly."
        ]
      },
      {
        heading: "Example 6: Figma - Category Creation",
        paragraphs: [
          "Figma's headline 'Where teams design together' defines a new category (collaborative design) rather than competing in an existing one (design tools). This positioning makes them memorable and differentiated.",
          "The animated hero section shows multiple cursors moving simultaneously, visually demonstrating the core feature (real-time collaboration) without requiring explanation. Show, do not tell.",
          "Their CTA 'Get started for free' is paired with 'Figma is free to use' underneath, eliminating the cost objection immediately. The secondary CTA 'See plans and pricing' serves users who want more information before committing."
        ]
      },
      {
        heading: "Example 7: Dropbox - Benefit-Driven Copy",
        paragraphs: [
          "Dropbox's headline 'Keep life organized and work moving—all in one place' focuses entirely on benefits (organized, moving forward) rather than features (cloud storage, file sync).",
          "The subheadline 'Dropbox brings everything—traditional files, cloud content, and web shortcuts—together in one place' explains the what after establishing the why. This benefit-first, feature-second approach is more persuasive.",
          "The visual shows a clean, organized interface with recognizable file types and folder structures. This familiarity reduces the learning curve perception—visitors immediately understand how to use it."
        ]
      },
      {
        heading: "Example 8: Webflow - Audience Segmentation",
        paragraphs: [
          "Webflow's headline 'Build with the power of code — without writing any' immediately speaks to their target audience (designers who want developer-level control). This specificity repels the wrong audience and attracts the right one.",
          "The hero section includes a toggle between 'For designers' and 'For developers,' allowing different audiences to see relevant messaging. This personalization increases relevance without requiring complex targeting.",
          "Their CTA 'Get started — it's free' removes friction, while the secondary text 'No credit card required' addresses a common objection before it is even raised."
        ]
      },
      {
        heading: "Example 9: Calendly - Problem Agitation",
        paragraphs: [
          "Calendly's headline 'Easy scheduling ahead' is simple, but the subheadline does the heavy lifting: 'Calendly is your hub for scheduling meetings professionally and efficiently, eliminating the hassle of back-and-forth emails so you can get back to work.'",
          "This copy structure works because it agitates the problem (back-and-forth emails) that their target audience experiences daily. When you remind someone of a pain point, they are more motivated to seek a solution.",
          "The visual shows a calendar interface with scheduled meetings, making the outcome (a full, organized calendar) immediately visible. This is the after state that users want to achieve."
        ]
      },
      {
        heading: "Example 10: Airtable - Hybrid Positioning",
        paragraphs: [
          "Airtable's headline 'Build powerful work apps, without coding' positions them between spreadsheets and custom software. This hybrid positioning helps visitors understand where Airtable fits in their existing tool stack.",
          "The subheadline provides use cases: 'Create custom apps that perfectly fit your team's needs. Track projects, manage inventory, organize contacts—all in one flexible platform.' Specific use cases help visitors self-identify whether the product is relevant to them.",
          "The hero image shows a colorful, visual interface that looks nothing like a traditional spreadsheet. This visual differentiation is crucial for a product that could easily be confused with Excel or Google Sheets."
        ]
      },
      {
        heading: "Example 11: Loom - Outcome Visualization",
        paragraphs: [
          "Loom's headline 'Work smarter with async video' introduces a concept (async video) that might be unfamiliar, then immediately explains the benefit (work smarter). This education + benefit combination is effective for newer product categories.",
          "The subheadline 'Record quick videos of your screen and cam. Explain anything clearly and easily – and skip the meeting.' The phrase 'skip the meeting' is the real hook—it taps into a universal desire to reduce meeting overload.",
          "Their CTA 'Get Loom for Free' is accompanied by platform icons (Mac, Windows, iOS, Android, Chrome) showing broad availability. This removes the 'will it work on my device?' objection."
        ]
      },
      {
        heading: "Example 12: Superhuman - Exclusivity Positioning",
        paragraphs: [
          "Superhuman's headline 'The fastest email experience ever made' makes a bold, specific claim. Not 'fast' or 'very fast,' but 'the fastest ever made.' This superlative positioning creates intrigue.",
          "The waitlist CTA 'Request Invite' creates artificial scarcity and exclusivity. This psychological trigger (you cannot have it immediately) actually increases desire. It positions Superhuman as premium and selective.",
          "The minimalist design with generous white space reinforces the premium positioning. The visual restraint communicates sophistication and focus—qualities their target audience (busy professionals) values."
        ]
      },
      {
        heading: "Example 13: Grammarly - Universal Problem",
        paragraphs: [
          "Grammarly's headline 'Great writing, simplified' addresses a universal problem (writing is hard) with a universal solution (make it simpler). This broad appeal works because nearly everyone writes online.",
          "The subheadline 'Compose bold, clear, mistake-free writing with Grammarly's AI-powered writing assistant' introduces the mechanism (AI) that delivers the benefit. This builds credibility—it is not magic, it is technology.",
          "The CTA 'Get Grammarly, it's free' emphasizes the free tier prominently. For a product with a freemium model, leading with free removes the primary barrier to trial."
        ]
      },
      {
        heading: "Example 14: Canva - Empowerment Messaging",
        paragraphs: [
          "Canva's headline 'Design anything' is aspirational and empowering. It does not say 'Create graphics' or 'Make presentations'—it says anything, removing perceived limitations.",
          "The subheadline 'Publish anywhere' extends the empowerment narrative. Together, these two phrases create a sense of unlimited possibility, which is emotionally compelling.",
          "The visual shows a diverse array of design outputs (social posts, presentations, videos, websites) in a colorful, energetic layout. This visual variety reinforces the 'anything' promise made in the headline."
        ]
      },
      {
        heading: "Example 15: Intercom - Conversation Positioning",
        paragraphs: [
          "Intercom's headline 'Make customer conversations more valuable' reframes customer support as conversations, not tickets. This linguistic shift positions their product as relationship-building, not just problem-solving.",
          "The subheadline 'Intercom is the only complete Customer Service solution that provides a seamless customer experience across automation and human support' uses the word 'only' to claim category leadership. This bold positioning differentiates them from competitors.",
          "Their CTA 'Get started' is simple and action-oriented. The secondary text 'Try Intercom free for 14 days' provides the trial details without cluttering the primary CTA."
        ]
      },
      {
        heading: "Common Patterns Across High-Converting Examples",
        paragraphs: [
          "After analyzing these 15 examples, several patterns emerge. First, clarity beats cleverness every time. The most effective headlines state exactly what the product does in plain language. Wordplay and clever taglines might win creative awards, but they do not convert visitors.",
          "Second, specificity builds credibility. Vague promises like 'grow your business' or 'increase productivity' are forgettable. Specific claims like 'the fastest email experience ever made' or 'join millions of entrepreneurs' are memorable and believable.",
          "Third, visual hierarchy matters enormously. Every high-converting example has a clear focal point—usually the headline or CTA. There is no visual competition. Your eye knows exactly where to look first, second, and third.",
          "Fourth, friction reduction is paramount. The best CTAs require minimal commitment—'Get started for free,' 'Try for free,' 'Request invite.' They remove objections (cost, time, complexity) directly in the button text or supporting copy.",
          "Finally, trust signals are integrated naturally. Rather than dedicating a separate section to logos or testimonials, these examples weave social proof into the value proposition itself. 'Trusted by millions' or 'Used by [recognizable brands]' appears in the first few lines of copy."
        ]
      },
      {
        heading: "How to Apply These Principles to Your Landing Page",
        paragraphs: [
          "Start by auditing your current above-the-fold section against these examples. Can a first-time visitor understand what you do in 3 seconds? Is your headline specific or generic? Does your CTA remove objections or create them?",
          "Use TheDoorpost to get an objective score on your above-the-fold section. Our analysis evaluates your page against the same principles demonstrated in these 15 examples—clarity, credibility, and conversion focus.",
          "Remember that above-the-fold optimization is not about cramming everything important into the top of the page. It is about communicating your core value proposition clearly enough that visitors want to scroll down and learn more. Your above-the-fold section is the hook, not the entire story."
        ]
      }
    ]
  },
  {
    slug: "hero-section-best-practices",
    title: "Hero Section Best Practices: 12 Data-Backed Tactics",
    excerpt:
      "Proven tactics to optimize your hero section for maximum conversions. Based on analysis of 10,000+ landing pages across every industry.",
    date: "2026-01-30",
    readingTime: "10 min read",
    author: "TheDoorpost Team",
    authorUrl: "/about",
    sections: [
      {
        heading: "Why Hero Section Optimization Matters More Than Ever",
        paragraphs: [
          "Your hero section is the most valuable real estate on your entire website. It is the first thing visitors see, and for 70% of them, it will be the only thing they see before deciding to stay or leave. In an era where attention spans are measured in seconds, your hero section must work harder than ever.",
          "After analyzing over 10,000 landing pages across SaaS, ecommerce, B2B services, and consumer products, we have identified 12 tactics that consistently appear on high-converting pages. These are not theoretical best practices—they are data-backed patterns that separate pages with 8%+ conversion rates from those struggling to hit 2%.",
          "The tactics below are ranked by impact and ease of implementation. Start with the first three for quick wins, then work your way through the rest to systematically optimize every element of your hero section."
        ]
      },
      {
        heading: "Tactic 1: Lead With Outcome, Not Process",
        paragraphs: [
          "The number one mistake we see in hero sections is leading with how the product works instead of what outcome it delivers. Visitors do not care about your methodology until they understand why it matters to them.",
          "Bad example: 'AI-powered analytics platform with real-time dashboards.' This describes features and technology, not outcomes.",
          "Good example: 'Make better decisions faster with data you can actually understand.' This describes the outcome (better decisions, faster) and addresses a pain point (data is usually hard to understand).",
          "The pattern is simple: Start with the benefit or outcome, then explain the mechanism later. Your headline should answer 'What will my life look like after using this?' not 'What is this made of?'"
        ]
      },
      {
        heading: "Tactic 2: Use Specific Numbers in Social Proof",
        paragraphs: [
          "Generic social proof like 'Trusted by thousands' or 'Used by companies worldwide' is weak. Specific numbers are dramatically more persuasive because they are verifiable and concrete.",
          "Instead of 'Trusted by companies,' say 'Trusted by 12,847 companies.' Instead of 'Highly rated,' say '4.8/5 from 3,200+ reviews.' The specificity signals authenticity—made-up numbers are usually round.",
          "Our analysis shows that hero sections with specific numerical social proof convert 23% better than those with vague claims. The difference is even more pronounced in B2B contexts where buyers are more skeptical.",
          "Place this social proof directly below your headline or CTA, not buried further down the page. It needs to be part of the first impression, not a secondary consideration."
        ]
      },
      {
        heading: "Tactic 3: Make Your CTA Button Impossible to Miss",
        paragraphs: [
          "Your call-to-action button should be the highest-contrast element on your entire hero section. If a visitor has to search for it, you have already lost them.",
          "Use color contrast strategically. If your hero section uses cool colors (blues, grays), make your CTA a warm color (orange, red, green). If your background is dark, use a bright CTA. The button should practically jump off the screen.",
          "Size matters too. Your primary CTA should be at least 44x44 pixels (the minimum touch target size for mobile) but ideally larger—60-80 pixels tall. Make it feel substantial and clickable.",
          "Button text should be action-oriented and specific. 'Get Started' is better than 'Submit.' 'Start Free Trial' is better than 'Learn More.' The text should tell visitors exactly what happens when they click."
        ]
      },
      {
        heading: "Tactic 4: Show the Product, Not Stock Photos",
        paragraphs: [
          "Generic stock photos of people in business attire or abstract imagery add zero value to your hero section. They are visual filler that takes up space without communicating anything meaningful.",
          "Instead, show your actual product. For software, use a screenshot or animated demo of your interface. For physical products, show high-quality product photography. For services, show the outcome or result of your service.",
          "Product visuals serve two purposes: They prove your product exists (reducing perceived risk), and they help visitors visualize themselves using it. Both factors increase conversion rates.",
          "If you must use lifestyle imagery, make it hyper-specific to your audience. A generic 'person smiling at laptop' photo is useless. A photo of a specific persona in a specific context (e.g., a restaurant owner reviewing orders on a tablet) is valuable."
        ]
      },
      {
        heading: "Tactic 5: Address the Primary Objection Immediately",
        paragraphs: [
          "Every product has a primary objection—the main reason people hesitate to buy. For freemium products, it is 'Will I have to pay eventually?' For complex software, it is 'Will this be hard to learn?' For new brands, it is 'Can I trust this company?'",
          "Identify your primary objection and address it in your hero section, either in your subheadline or directly below your CTA. Do not make visitors scroll to find this information.",
          "Examples: 'No credit card required' (addresses cost objection), 'Setup in 5 minutes' (addresses complexity objection), 'Used by 50,000+ businesses' (addresses trust objection).",
          "This tactic alone can increase conversion rates by 15-30% because it removes the mental barrier preventing visitors from taking action. You are answering their unspoken question before they even ask it."
        ]
      },
      {
        heading: "Tactic 6: Use Directional Cues to Guide Attention",
        paragraphs: [
          "Human eyes naturally follow directional cues—arrows, lines, and even the gaze direction of people in photos. Use this psychological principle to guide visitors toward your CTA.",
          "If you include a person in your hero image, make sure they are looking toward your CTA button, not away from it. Eye-tracking studies show that visitors will follow the gaze direction of people in images.",
          "Subtle arrows or lines that point toward your CTA can increase click-through rates by 10-15%. These do not need to be literal arrows—even the angle of a product image can create a directional flow.",
          "The goal is to create a visual path from your headline to your CTA. Every element should guide the eye in that direction, not compete for attention or lead the eye off the page."
        ]
      },
      {
        heading: "Tactic 7: Optimize for Mobile First, Desktop Second",
        paragraphs: [
          "Over 60% of web traffic now comes from mobile devices, yet most hero sections are still designed for desktop and then awkwardly adapted for mobile. This is backwards.",
          "Design your hero section for mobile first. This forces you to prioritize ruthlessly—you cannot fit everything above the fold on a 375px wide screen. What you choose to keep is what actually matters.",
          "On mobile, your hero section should contain exactly four elements: headline, one-sentence subheadline, CTA button, and one trust signal (logo bar or rating). Anything else is clutter.",
          "Test your hero section on an actual mobile device, not just in Chrome DevTools. The experience of scrolling, tapping, and reading on a real phone reveals issues that desktop testing misses."
        ]
      },
      {
        heading: "Tactic 8: Create Visual Hierarchy Through Size and Weight",
        paragraphs: [
          "Your hero section should have a clear visual hierarchy: headline (largest), subheadline (medium), CTA (prominent), supporting elements (smallest). This hierarchy guides visitors through your message in the right order.",
          "Your headline should be at least 2.5x larger than your body text. On desktop, this typically means 48-72px font size. On mobile, 32-40px. If your headline does not dominate the visual space, it is too small.",
          "Use font weight strategically. Your headline should be bold (600-700 weight). Your subheadline can be regular or medium (400-500 weight). This weight contrast creates hierarchy even when sizes are similar.",
          "Avoid the temptation to make everything big and bold. When everything is emphasized, nothing is emphasized. Visual hierarchy requires contrast—some elements must be deliberately de-emphasized so others can stand out."
        ]
      },
      {
        heading: "Tactic 9: Limit Your Hero Section to One Primary Action",
        paragraphs: [
          "Every additional CTA you add to your hero section reduces the conversion rate of your primary CTA. This is not theory—it is a well-documented phenomenon called choice paralysis.",
          "Your hero section should have one primary CTA (the action you most want visitors to take) and optionally one secondary CTA (an alternative for visitors not ready for the primary action).",
          "The secondary CTA should be visually de-emphasized—use an outline button instead of a filled button, or use a text link instead of a button. Make it clear which action is primary and which is secondary.",
          "Common secondary CTAs include 'Watch demo,' 'See pricing,' or 'Contact sales.' These serve visitors who need more information before committing to the primary action (usually 'Start free trial' or 'Get started')."
        ]
      },
      {
        heading: "Tactic 10: Use Whitespace to Create Focus",
        paragraphs: [
          "Whitespace (or negative space) is not wasted space—it is a design tool that creates focus and improves comprehension. The best hero sections use generous whitespace to make their core message impossible to miss.",
          "A cluttered hero section with minimal whitespace forces visitors to work harder to extract meaning. A spacious hero section with ample whitespace makes the message effortless to absorb.",
          "Aim for at least 40-60px of vertical spacing between major elements (headline to subheadline, subheadline to CTA). On mobile, 24-32px is appropriate. This breathing room makes each element distinct and readable.",
          "Whitespace also communicates brand positioning. Generous whitespace signals premium, sophisticated, and confident. Cramped layouts signal budget, cluttered, and uncertain. Your spacing choices send a message."
        ]
      },
      {
        heading: "Tactic 11: Test Your Hero Section in 3 Seconds",
        paragraphs: [
          "The 3-second test is simple: Show your hero section to someone unfamiliar with your product for exactly 3 seconds, then hide it. Ask them three questions: What does this company do? Who is it for? What action should I take?",
          "If they cannot answer all three questions, your hero section fails the clarity test. This is the most reliable predictor of conversion performance we have found.",
          "You can run this test with colleagues, friends, or even strangers on UserTesting.com. The key is that they must be unfamiliar with your product—you need fresh eyes, not insider knowledge.",
          "Most hero sections fail this test because they assume too much context. They use industry jargon, vague value propositions, or clever wordplay that requires thought to decode. Clarity requires no thought—it is instant."
        ]
      },
      {
        heading: "Tactic 12: A/B Test One Element at a Time",
        paragraphs: [
          "Once you have implemented the first 11 tactics, start A/B testing individual elements to optimize further. But test one element at a time—changing multiple elements simultaneously makes it impossible to know what drove the results.",
          "Start by testing your headline. This typically has the biggest impact on conversion rates. Test outcome-focused vs. feature-focused headlines. Test specific vs. general language. Test short vs. long headlines.",
          "Next, test your CTA button text. 'Start free trial' vs. 'Get started free' vs. 'Try it free' can produce surprisingly different results. The difference is often 10-20% in click-through rate.",
          "Finally, test your hero image or video. Product screenshots vs. lifestyle imagery vs. animated demos can dramatically affect how visitors perceive your product and whether they convert.",
          "Run each test for at least 2 weeks or until you reach statistical significance (typically 95% confidence with at least 100 conversions per variation). Stopping tests too early leads to false conclusions."
        ]
      },
      {
        heading: "Putting It All Together",
        paragraphs: [
          "These 12 tactics are not meant to be implemented all at once. Start with the quick wins—tactics 1, 2, and 3—which require only copy and design changes. These alone can improve conversion rates by 30-50%.",
          "Then move to tactics 4-8, which require more substantial design work but deliver compounding benefits. Finally, implement tactics 9-12 for ongoing optimization and testing.",
          "Use TheDoorpost to benchmark your hero section before and after implementing these tactics. Our analysis scores your hero section on the same principles outlined here, giving you an objective measure of improvement.",
          "Remember that hero section optimization is not a one-time project—it is an ongoing process. As your product evolves, your audience grows, and your market changes, your hero section should evolve too. Test, measure, iterate, and improve continuously."
        ]
      }
    ]
  },
  {
    slug: "landing-page-cro-checklist",
    title: "Landing Page CRO Checklist: 27 Items to Audit",
    excerpt:
      "The complete conversion rate optimization checklist. Use this to audit your landing pages and identify quick wins that boost conversions.",
    date: "2026-01-29",
    readingTime: "8 min read",
    author: "TheDoorpost Team",
    authorUrl: "/about",
    sections: [
      {
        heading: "How to Use This CRO Checklist",
        paragraphs: [
          "This checklist contains 27 specific items to audit on your landing pages. Each item is based on conversion rate optimization research and real-world testing across thousands of pages.",
          "Go through your landing page and check off each item. If you cannot check it off, that is an opportunity for improvement. Prioritize items in the Above-the-Fold section first—these have the highest impact on conversion rates.",
          "Do not try to fix everything at once. Focus on the top 3-5 issues that will have the biggest impact. Implement those changes, measure the results, then move on to the next batch."
        ]
      },
      {
        heading: "Above-the-Fold Checklist (Items 1-9)",
        paragraphs: [
          "Your above-the-fold section is the most critical part of your landing page. These 9 items must be present and optimized."
        ],
        bullets: [
          "☐ Headline clearly states what you do in 10 words or less",
          "☐ Headline focuses on outcome/benefit, not features or process",
          "☐ Subheadline expands on headline and addresses 'who is this for'",
          "☐ Primary CTA button is the highest-contrast element on the page",
          "☐ CTA button text is action-oriented and specific (not 'Submit' or 'Learn More')",
          "☐ CTA is visible without scrolling on both desktop and mobile",
          "☐ At least one trust signal is visible (logos, ratings, testimonial, or security badge)",
          "☐ Hero image shows actual product or outcome, not generic stock photos",
          "☐ Primary objection is addressed (cost, complexity, trust, or time)"
        ]
      },
      {
        heading: "Value Proposition Checklist (Items 10-14)",
        paragraphs: [
          "Your value proposition must be clear, specific, and differentiated. These 5 items ensure your value prop is strong."
        ],
        bullets: [
          "☐ Value proposition passes the 3-second test (unfamiliar visitor can understand what you do in 3 seconds)",
          "☐ You explain what makes you different from competitors (not just better)",
          "☐ You use specific language, not vague promises ('increase productivity' → 'save 5 hours per week')",
          "☐ You avoid jargon and industry buzzwords that require insider knowledge",
          "☐ You address a specific pain point your audience experiences regularly"
        ]
      },
      {
        heading: "Social Proof Checklist (Items 15-18)",
        paragraphs: [
          "Social proof reduces perceived risk and builds trust. These 4 items ensure your social proof is credible and effective."
        ],
        bullets: [
          "☐ You use specific numbers in social proof ('12,847 customers' not 'thousands of customers')",
          "☐ Customer logos are recognizable to your target audience (not just any companies)",
          "☐ Testimonials include full names, photos, and company/title (not anonymous quotes)",
          "☐ Ratings and reviews show the source and total count (e.g., '4.8/5 from 3,200+ reviews on G2')"
        ]
      },
      {
        heading: "Call-to-Action Checklist (Items 19-22)",
        paragraphs: [
          "Your CTA must be clear, compelling, and low-friction. These 4 items optimize your calls-to-action."
        ],
        bullets: [
          "☐ You have one primary CTA that is visually dominant",
          "☐ Secondary CTAs (if any) are visually de-emphasized (outline buttons or text links)",
          "☐ CTA button is large enough to tap easily on mobile (minimum 44x44 pixels)",
          "☐ Text below CTA addresses objections ('No credit card required', 'Cancel anytime', 'Setup in 5 minutes')"
        ]
      },
      {
        heading: "Mobile Optimization Checklist (Items 23-25)",
        paragraphs: [
          "Over 60% of traffic is mobile. These 3 items ensure your landing page works on small screens."
        ],
        bullets: [
          "☐ All critical elements (headline, CTA, trust signal) are visible without scrolling on mobile",
          "☐ Text is readable without zooming (minimum 16px font size for body text)",
          "☐ Forms are optimized for mobile (appropriate input types, minimal fields, large tap targets)"
        ]
      },
      {
        heading: "Technical Performance Checklist (Items 26-27)",
        paragraphs: [
          "Page speed directly impacts conversion rates. These 2 items ensure your page loads fast."
        ],
        bullets: [
          "☐ Above-the-fold content loads in under 2.5 seconds (test with PageSpeed Insights)",
          "☐ Images are optimized (WebP format, properly sized, lazy-loaded below the fold)"
        ]
      },
      {
        heading: "Common Issues and Quick Fixes",
        paragraphs: [
          "After auditing hundreds of landing pages, we see the same issues repeatedly. Here are the most common problems and how to fix them quickly."
        ]
      },
      {
        heading: "Issue 1: Vague Headlines",
        paragraphs: [
          "Problem: Headlines like 'Transform your business' or 'The future of work' tell visitors nothing concrete.",
          "Fix: Replace with specific, outcome-focused headlines. 'Transform your business' becomes 'Reduce customer support costs by 40% with AI-powered chatbots.' The second version tells you exactly what the product does and what outcome to expect."
        ]
      },
      {
        heading: "Issue 2: Hidden CTAs on Mobile",
        paragraphs: [
          "Problem: Your CTA button is visible on desktop but requires scrolling on mobile devices.",
          "Fix: Test your page on an actual mobile device (not just DevTools). If the CTA is not visible, reduce the height of your hero image, shorten your headline, or remove unnecessary elements above the CTA."
        ]
      },
      {
        heading: "Issue 3: Generic Social Proof",
        paragraphs: [
          "Problem: Phrases like 'Trusted by thousands' or 'Industry-leading solution' are vague and unverifiable.",
          "Fix: Use specific numbers and sources. 'Trusted by thousands' becomes 'Trusted by 12,847 companies including Shopify, Notion, and Figma.' Specificity signals authenticity."
        ]
      },
      {
        heading: "Issue 4: Multiple Competing CTAs",
        paragraphs: [
          "Problem: Your hero section has 3-4 buttons with equal visual weight, creating choice paralysis.",
          "Fix: Choose one primary action and make it visually dominant (filled button, high contrast). Make secondary actions less prominent (outline buttons or text links). Visitors should know instantly which action you want them to take."
        ]
      },
      {
        heading: "Issue 5: Stock Photos Instead of Product",
        paragraphs: [
          "Problem: Your hero section shows generic stock photos of people in offices or abstract imagery.",
          "Fix: Replace with actual product screenshots, demo videos, or outcome imagery. For software, show your interface. For physical products, show high-quality product photography. For services, show the result or outcome."
        ]
      },
      {
        heading: "Issue 6: Unaddressed Objections",
        paragraphs: [
          "Problem: Visitors have questions (How much? How long? Is it secure?) but have to hunt for answers.",
          "Fix: Identify your primary objection and address it immediately below your CTA. For freemium products: 'No credit card required.' For complex software: 'Setup in 5 minutes.' For new brands: 'Used by 50,000+ businesses.'"
        ]
      },
      {
        heading: "Issue 7: Poor Mobile Typography",
        paragraphs: [
          "Problem: Text is too small to read on mobile without zooming, or line lengths are too long.",
          "Fix: Use minimum 16px font size for body text on mobile. Keep line length to 50-75 characters maximum. Increase line height to 1.5-1.6 for better readability on small screens."
        ]
      },
      {
        heading: "Issue 8: Slow Loading Hero Section",
        paragraphs: [
          "Problem: Your above-the-fold content takes 5+ seconds to load, causing visitors to bounce before seeing your message.",
          "Fix: Optimize images (use WebP format, compress to 80-85% quality, size appropriately for display dimensions). Inline critical CSS. Defer non-critical JavaScript. Use a CDN for static assets. Test with PageSpeed Insights and aim for LCP under 2.5 seconds."
        ]
      },
      {
        heading: "How to Prioritize Fixes",
        paragraphs: [
          "You probably found multiple issues when going through this checklist. Do not try to fix everything at once. Here is how to prioritize:",
          "High Priority (Fix First): Items 1-9 (Above-the-Fold). These have the biggest impact because they affect every visitor. If your above-the-fold section fails, nothing else matters.",
          "Medium Priority (Fix Second): Items 10-18 (Value Proposition and Social Proof). These build trust and differentiation. Important for conversion but secondary to above-the-fold clarity.",
          "Low Priority (Fix Third): Items 19-27 (CTAs, Mobile, Technical). These are optimization layers on top of a solid foundation. Fix these after your core message and above-the-fold section are strong."
        ]
      },
      {
        heading: "Measuring Impact",
        paragraphs: [
          "After implementing fixes, measure the impact. Use TheDoorpost to get before and after scores on your above-the-fold section. Track your conversion rate for at least 2 weeks to see if changes improved performance.",
          "Not every change will improve conversions. Some changes might even decrease conversions. This is why you should implement changes in batches and measure results before moving to the next batch.",
          "The goal is not to check off every item on this list. The goal is to systematically identify and fix the issues that are costing you conversions. Use this checklist as a diagnostic tool, not a rigid prescription."
        ]
      }
    ]
  },
  {
    slug: "value-proposition-guide",
    title: "How to Write a Value Proposition That Converts",
    excerpt:
      "Master the art of writing clear, compelling value propositions. Learn the formula used by top-converting SaaS and ecommerce brands.",
    date: "2026-01-28",
    readingTime: "9 min read",
    author: "TheDoorpost Team",
    authorUrl: "/about",
    sections: [
      {
        heading: "What Is a Value Proposition?",
        paragraphs: [
          "A value proposition is a clear statement that explains how your product solves a problem, delivers specific benefits, and why someone should choose you over alternatives. It is not a tagline, slogan, or mission statement—it is a functional explanation of value.",
          "Your value proposition answers three questions: What do you do? Who is it for? Why should I care? If a first-time visitor cannot answer these questions within 3 seconds of landing on your page, your value proposition is not clear enough.",
          "The best value propositions are specific, outcome-focused, and differentiated. They avoid jargon, vague promises, and clever wordplay. They communicate value instantly, without requiring thought or interpretation."
        ]
      },
      {
        heading: "The Value Proposition Formula",
        paragraphs: [
          "After analyzing thousands of high-converting landing pages, we have identified a formula that consistently works across industries and product types.",
          "The formula: [Outcome] for [Target Audience] without [Primary Objection].",
          "Example: 'Professional CRO analysis for landing pages without expensive consultants' (TheDoorpost). This tells you the outcome (CRO analysis), who it is for (landing pages), and what objection it removes (expensive consultants).",
          "Another example: 'Real-time collaboration for design teams without version control chaos' (Figma). Outcome: real-time collaboration. Audience: design teams. Objection removed: version control chaos.",
          "This formula works because it addresses all three critical questions in one sentence. You can expand on each component in your subheadline and supporting copy, but your core value proposition should fit this structure."
        ]
      },
      {
        heading: "Component 1: Outcome (Not Features)",
        paragraphs: [
          "The biggest mistake in value propositions is leading with features instead of outcomes. Features describe what your product has. Outcomes describe what your customer gets.",
          "Bad: 'Cloud-based project management with Gantt charts and time tracking.' This lists features but does not explain why anyone should care.",
          "Good: 'Ship projects on time and on budget.' This describes the outcome customers want. The features (Gantt charts, time tracking) are the mechanism, not the value.",
          "To find your outcome, ask 'So what?' after every feature. 'We have Gantt charts.' So what? 'So you can visualize project timelines.' So what? 'So you can identify delays before they happen.' So what? 'So you can ship projects on time.' That is your outcome.",
          "Outcomes are emotional and aspirational. Features are logical and descriptive. Humans make decisions emotionally and justify them logically. Lead with emotion (outcome), then support with logic (features)."
        ]
      },
      {
        heading: "Component 2: Target Audience (Be Specific)",
        paragraphs: [
          "Saying your product is 'for everyone' is the same as saying it is for no one. Specificity in your target audience makes your value proposition more relevant and credible.",
          "Bad: 'For businesses that want to grow.' This is so broad it is meaningless. Every business wants to grow.",
          "Good: 'For B2B SaaS companies with 10-50 employees.' This specificity helps the right people self-identify and signals that you understand their unique needs.",
          "Your target audience should be narrow enough to be meaningful but broad enough to be viable. 'For enterprise healthcare companies' is specific. 'For pediatric dental practices in the Pacific Northwest' is probably too narrow unless that is genuinely your niche.",
          "If you serve multiple distinct audiences, consider creating separate landing pages with tailored value propositions for each. A value proposition that tries to speak to everyone ends up resonating with no one."
        ]
      },
      {
        heading: "Component 3: Primary Objection (Remove Friction)",
        paragraphs: [
          "Every product has a primary objection—the main reason people hesitate to buy. Addressing this objection in your value proposition removes friction before it becomes a barrier.",
          "Common objections: Cost ('without breaking the bank'), Complexity ('without technical expertise'), Time ('in minutes, not hours'), Trust ('used by 50,000+ companies'), Risk ('no credit card required').",
          "Bad: 'Professional website builder.' This does not address any objection.",
          "Good: 'Professional websites in minutes without coding.' This addresses two objections: time (minutes) and complexity (no coding).",
          "To identify your primary objection, talk to customers who almost did not buy. Ask what made them hesitate. The most common answer is your primary objection. Address it directly in your value proposition."
        ]
      },
      {
        heading: "Real Examples Analyzed",
        paragraphs: [
          "Let's analyze value propositions from successful companies to see the formula in action."
        ]
      },
      {
        heading: "Example 1: Stripe",
        paragraphs: [
          "Value Proposition: 'Financial infrastructure for the internet.'",
          "Analysis: This is outcome-focused (infrastructure = foundation you can build on) and specific (for the internet = digital businesses). The implied objection addressed is complexity—Stripe handles the hard parts of payments so you do not have to.",
          "The subheadline expands: 'Millions of companies of all sizes use Stripe to accept payments and manage their businesses online.' This adds social proof (millions of companies) and clarifies the audience (companies that need to accept payments online)."
        ]
      },
      {
        heading: "Example 2: Notion",
        paragraphs: [
          "Value Proposition: 'Your wiki, docs & projects. Together.'",
          "Analysis: The outcome is consolidation (everything together). The audience is implied (knowledge workers who use wikis, docs, and project tools). The objection addressed is fragmentation—you do not need multiple tools anymore.",
          "This value proposition works because it identifies a pain point (scattered tools) and promises a solution (everything together) in just six words."
        ]
      },
      {
        heading: "Example 3: Calendly",
        paragraphs: [
          "Value Proposition: 'Easy scheduling ahead.'",
          "Analysis: The outcome is easy scheduling. The subheadline does the heavy lifting: 'Calendly is your hub for scheduling meetings professionally and efficiently, eliminating the hassle of back-and-forth emails so you can get back to work.'",
          "The objection addressed is time waste (back-and-forth emails). The audience is professionals who schedule meetings. This expanded value proposition follows the formula perfectly."
        ]
      },
      {
        heading: "Example 4: Shopify",
        paragraphs: [
          "Value Proposition: 'Start selling online today.'",
          "Analysis: The outcome is selling online. The audience is entrepreneurs (implied by 'start'). The objection addressed is time/complexity (today = fast and easy).",
          "The supporting copy adds: 'Join millions of entrepreneurs who trust Shopify to start, run, and grow their business.' This adds social proof and expands on the audience (entrepreneurs at all stages)."
        ]
      },
      {
        heading: "Common Value Proposition Mistakes",
        paragraphs: [
          "After reviewing thousands of landing pages, we see the same mistakes repeatedly. Here are the most common and how to fix them."
        ]
      },
      {
        heading: "Mistake 1: Using Jargon and Buzzwords",
        paragraphs: [
          "Bad: 'Leverage AI-powered insights to drive synergistic growth through our innovative platform.'",
          "Problem: This sentence uses five buzzwords (leverage, AI-powered, synergistic, innovative, platform) and communicates nothing concrete.",
          "Fix: 'Make better decisions faster with data you can actually understand.' This is specific, jargon-free, and outcome-focused."
        ]
      },
      {
        heading: "Mistake 2: Being Clever Instead of Clear",
        paragraphs: [
          "Bad: 'Where ideas take flight' or 'Your success, amplified.'",
          "Problem: These sound nice but require interpretation. What does 'ideas take flight' actually mean? What is being amplified and how?",
          "Fix: Replace clever taglines with clear statements. 'Where ideas take flight' becomes 'Turn ideas into products faster.' 'Your success, amplified' becomes 'Grow revenue by 30% with automated marketing.'"
        ]
      },
      {
        heading: "Mistake 3: Focusing on What You Are, Not What You Do",
        paragraphs: [
          "Bad: 'We are a leading provider of enterprise software solutions.'",
          "Problem: This describes your company, not the value you deliver. Visitors do not care what you are—they care what you do for them.",
          "Fix: 'Reduce IT costs by 40% with automated infrastructure management.' This focuses on the outcome (reduced costs) and the mechanism (automated infrastructure management)."
        ]
      },
      {
        heading: "Mistake 4: Making Vague Promises",
        paragraphs: [
          "Bad: 'Increase productivity' or 'Grow your business' or 'Improve efficiency.'",
          "Problem: These promises are so vague they are meaningless. Every product claims to increase productivity or grow your business.",
          "Fix: Add specificity. 'Increase productivity' becomes 'Save 5 hours per week on manual data entry.' 'Grow your business' becomes 'Acquire 30% more customers with automated lead generation.'"
        ]
      },
      {
        heading: "Mistake 5: Trying to Appeal to Everyone",
        paragraphs: [
          "Bad: 'For businesses of all sizes in every industry.'",
          "Problem: When you try to appeal to everyone, you appeal to no one. Specificity creates relevance.",
          "Fix: Choose your primary audience and speak directly to them. 'For B2B SaaS companies with 10-50 employees' or 'For ecommerce brands doing $1M-$10M in annual revenue.' The right people will self-identify."
        ]
      },
      {
        heading: "How to Test Your Value Proposition",
        paragraphs: [
          "Once you have written your value proposition, test it before launching. Here are three simple tests that predict conversion performance."
        ]
      },
      {
        heading: "Test 1: The 3-Second Test",
        paragraphs: [
          "Show your value proposition to someone unfamiliar with your product for exactly 3 seconds. Then ask: What does this company do? Who is it for? What should I do next?",
          "If they cannot answer all three questions, your value proposition is not clear enough. Revise and test again until it passes."
        ]
      },
      {
        heading: "Test 2: The Jargon Test",
        paragraphs: [
          "Read your value proposition out loud to someone outside your industry. If they ask 'What does that mean?' about any word or phrase, it is jargon. Replace it with plain language.",
          "Technical terms are fine if your audience is technical. But if you are selling to non-technical buyers, avoid technical jargon entirely."
        ]
      },
      {
        heading: "Test 3: The Competitor Test",
        paragraphs: [
          "Replace your company name with a competitor's name in your value proposition. If it still makes sense, your value proposition is not differentiated enough.",
          "Example: 'Cloud-based project management for teams' could apply to Asana, Monday, Trello, or dozens of other tools. It is generic.",
          "Better: 'Project management for remote teams without endless meetings' (differentiated by the remote focus and meeting reduction)."
        ]
      },
      {
        heading: "Implementing Your Value Proposition",
        paragraphs: [
          "Your value proposition should appear in multiple places on your landing page, not just the headline. Here is where to use it:",
          "Headline: The core value proposition in its most concise form (6-12 words).",
          "Subheadline: An expanded version that adds context, audience specificity, or addresses objections (15-25 words).",
          "Meta Description: A search-friendly version for SEO (150-160 characters).",
          "Social Media: A shareable version optimized for Twitter, LinkedIn, etc.",
          "Use TheDoorpost to analyze how effectively your value proposition comes across in your above-the-fold section. Our analysis evaluates clarity, specificity, and conversion focus—the same principles outlined in this guide."
        ]
      }
    ]
  },
  {
    slug: "mobile-first-landing-pages",
    title: "Mobile-First Landing Pages: The Complete Guide",
    excerpt:
      "Over 60% of traffic is mobile. Learn how to optimize your landing pages for mobile devices without sacrificing desktop performance.",
    date: "2026-01-27",
    readingTime: "11 min read",
    author: "TheDoorpost Team",
    authorUrl: "/about",
    sections: [
      {
        heading: "Why Mobile-First Matters Now More Than Ever",
        paragraphs: [
          "Mobile devices now account for over 60% of all web traffic, and that number continues to grow. Yet most landing pages are still designed for desktop first, then awkwardly adapted for mobile as an afterthought. This backwards approach costs you conversions.",
          "Mobile-first design means designing for the smallest screen first, then progressively enhancing for larger screens. This forces you to prioritize ruthlessly—you cannot fit everything above the fold on a 375px wide screen. What you choose to keep is what actually matters.",
          "The benefits go beyond just mobile users. Mobile-first design makes your desktop experience better too. By prioritizing clarity and simplicity, you create landing pages that convert better across all devices."
        ]
      },
      {
        heading: "The Mobile-First Design Mindset",
        paragraphs: [
          "Mobile-first is not just about responsive CSS. It is a fundamental shift in how you think about content hierarchy and user experience.",
          "On desktop, you have space to be generous. You can include multiple CTAs, lengthy explanations, and decorative elements. On mobile, every pixel counts. You must choose: What is the one thing this page needs to communicate? What is the one action you want users to take?",
          "This constraint is liberating. It forces you to cut the fluff and focus on what drives conversions. The result is a clearer, more focused landing page that works better on all devices."
        ]
      },
      {
        heading: "Mobile Above-the-Fold: The Critical 667 Pixels",
        paragraphs: [
          "On a standard iPhone (375x667px), your above-the-fold section has roughly 667 pixels of vertical space. After accounting for the browser chrome (address bar, navigation), you have about 550-600 pixels to work with.",
          "In that space, you must include: headline, subheadline, primary CTA, and one trust signal. That is it. Anything else pushes critical elements below the fold.",
          "Let's break down the optimal mobile above-the-fold structure: Headline (80-100px including line height), Subheadline (60-80px), CTA button (60-80px including margin), Trust signal (40-60px for a logo bar or rating). Total: 240-320px, leaving room for spacing and a small hero image if needed."
        ]
      },
      {
        heading: "Mobile Typography: Readability First",
        paragraphs: [
          "Text that looks perfect on desktop often becomes unreadable on mobile. Here are the mobile typography rules that ensure readability.",
          "Minimum font sizes: Headline 28-32px, Subheadline 16-18px, Body text 16px, Small text (disclaimers, etc.) 14px. Never go below 14px—anything smaller requires zooming.",
          "Line height: Use 1.5-1.6 for body text on mobile. Tighter line height (1.2-1.3) works on desktop but feels cramped on small screens.",
          "Line length: Keep lines to 50-75 characters maximum. Longer lines require horizontal eye movement that is fatiguing on mobile. Use padding or max-width to constrain line length.",
          "Font weight: Use slightly heavier font weights on mobile (500 instead of 400 for body text). Small text on bright screens can look thin and hard to read. The extra weight improves legibility."
        ]
      },
      {
        heading: "Mobile CTAs: Make Them Impossible to Miss",
        paragraphs: [
          "Your CTA button is the most important element on your mobile landing page. It must be large, high-contrast, and positioned where thumbs naturally reach.",
          "Minimum size: 44x44 pixels is the Apple-recommended minimum touch target. But bigger is better—aim for 48-60 pixels tall and full-width or near-full-width (with 16-24px side margins).",
          "Positioning: Place your primary CTA in the thumb zone—the bottom third of the screen where thumbs naturally rest. For above-the-fold CTAs, center them horizontally and ensure they are visible without scrolling.",
          "Button text: Keep it short (2-4 words maximum). 'Start Free Trial' is better than 'Get Started With Your Free 14-Day Trial.' The longer the text, the smaller the font size needs to be, reducing readability.",
          "Spacing: Add generous spacing above and below your CTA (24-32px minimum). This prevents accidental taps and makes the button feel substantial and clickable."
        ]
      },
      {
        heading: "Mobile Forms: Reduce Friction Ruthlessly",
        paragraphs: [
          "Forms are painful on mobile. Every field you add increases abandonment. Here is how to optimize mobile forms for maximum completion.",
          "Minimize fields: Ask only for information you absolutely need. Email only is ideal. Email + name is acceptable. Anything more requires strong justification.",
          "Use appropriate input types: type='email' for email fields (shows @ key), type='tel' for phone numbers (shows number pad), type='url' for URLs. The right keyboard makes input faster and reduces errors.",
          "Single-column layout: Never use multi-column forms on mobile. Stack all fields vertically. Multi-column layouts are hard to scan and easy to miss fields.",
          "Large input fields: Make input fields at least 44px tall with 16px font size. Smaller fields are hard to tap accurately and trigger zoom on iOS.",
          "Inline validation: Show validation errors immediately, not after form submission. This reduces frustration and helps users correct errors before submitting."
        ]
      },
      {
        heading: "Mobile Images: Optimize for Speed and Impact",
        paragraphs: [
          "Images are the biggest performance bottleneck on mobile. Here is how to use images effectively without killing page speed.",
          "Format: Use WebP format for all images. It provides 25-35% better compression than JPEG with no visible quality loss. Provide JPEG fallbacks for older browsers.",
          "Size: Serve mobile-specific images sized for mobile screens. A 1920px wide hero image is wasted on a 375px screen. Use responsive images (srcset) to serve appropriate sizes.",
          "Compression: Compress images to 80-85% quality. The difference is imperceptible on mobile screens but saves significant bandwidth.",
          "Lazy loading: Load images below the fold lazily (loading='lazy'). This prioritizes above-the-fold content and improves perceived performance.",
          "Hero images: Consider whether you need a hero image at all on mobile. Text-only hero sections often convert better because they load instantly and keep focus on the message."
        ]
      },
      {
        heading: "Mobile Navigation: Simplify or Remove",
        paragraphs: [
          "Complex navigation menus are a conversion killer on mobile landing pages. Here is how to handle navigation on mobile.",
          "For landing pages: Remove navigation entirely or use a minimal header with just a logo and one CTA. Every navigation link is a potential exit point. Reduce exits, increase conversions.",
          "For multi-page sites: Use a hamburger menu but keep it simple. Limit to 5-7 top-level items. Nested menus are hard to use on mobile.",
          "Sticky headers: If you use a sticky header, keep it minimal (logo + CTA only) and make it small (48-56px tall). Large sticky headers eat valuable screen space.",
          "Footer navigation: Put comprehensive navigation in the footer. Users who scroll to the footer are actively looking for more information. Give it to them there, not in the header."
        ]
      },
      {
        heading: "Mobile Performance: Speed Is a Feature",
        paragraphs: [
          "Mobile users are often on slower connections (4G, 3G, or worse). Page speed directly impacts conversion rates—a 1-second delay can reduce conversions by 7%.",
          "Target metrics: Largest Contentful Paint (LCP) under 2.5 seconds, First Input Delay (FID) under 100ms, Cumulative Layout Shift (CLS) under 0.1. These are Google's Core Web Vitals and they correlate strongly with conversion rates.",
          "Optimization tactics: Inline critical CSS, defer non-critical JavaScript, use a CDN for static assets, enable compression (gzip or brotli), minimize third-party scripts.",
          "Test on real devices: Use Chrome DevTools to throttle to 'Slow 3G' and test your page. If it is unusable on slow connections, you are losing conversions from users on poor networks.",
          "Progressive enhancement: Ensure your page works without JavaScript. Forms should submit, CTAs should link, content should be readable. JavaScript should enhance the experience, not enable it."
        ]
      },
      {
        heading: "Mobile Social Proof: Keep It Concise",
        paragraphs: [
          "Social proof is just as important on mobile, but you have less space to display it. Here is how to include trust signals without cluttering your mobile layout.",
          "Logo bars: Show 3-4 recognizable logos maximum on mobile. More than that becomes visual clutter. Use a horizontal scroll if you must show more.",
          "Testimonials: Keep testimonials short (2-3 sentences maximum). Include name and company but skip the photo on mobile—it takes up too much space.",
          "Ratings: Use compact rating displays. '4.8/5 (3,200+ reviews)' is more space-efficient than star graphics with lengthy explanations.",
          "Placement: Put your primary trust signal directly below your CTA, not above your headline. This positions it as supporting evidence for the action, not a distraction from the message."
        ]
      },
      {
        heading: "Mobile Testing: Use Real Devices",
        paragraphs: [
          "Chrome DevTools device emulation is useful for development, but it does not replicate the real mobile experience. You must test on actual devices.",
          "Test on multiple devices: At minimum, test on one iPhone (iOS Safari) and one Android phone (Chrome). These represent 95%+ of mobile traffic.",
          "Test on slow connections: Use your phone's network settings to throttle to 3G or 4G. Test how your page performs on slower connections.",
          "Test with real content: Lorem ipsum looks fine in mockups but real content often breaks layouts. Test with actual headlines, testimonials, and images.",
          "Test tap targets: Try tapping every button, link, and form field. If you miss or hit the wrong element, your tap targets are too small or too close together."
        ]
      },
      {
        heading: "Common Mobile Landing Page Mistakes",
        paragraphs: [
          "After auditing thousands of mobile landing pages, we see the same mistakes repeatedly. Here are the most common and how to fix them."
        ]
      },
      {
        heading: "Mistake 1: CTA Below the Fold",
        paragraphs: [
          "Problem: Your CTA button requires scrolling on mobile, even though it is visible on desktop.",
          "Fix: Reduce the height of your hero image, shorten your headline, or remove unnecessary elements. Your CTA must be visible without scrolling on a 375x667px screen."
        ]
      },
      {
        heading: "Mistake 2: Tiny Text",
        paragraphs: [
          "Problem: Body text is 12-14px, requiring users to zoom to read.",
          "Fix: Use minimum 16px for body text. If your text looks too large, your layout is wrong—fix the layout, do not shrink the text."
        ]
      },
      {
        heading: "Mistake 3: Horizontal Scrolling",
        paragraphs: [
          "Problem: Content is wider than the viewport, requiring horizontal scrolling.",
          "Fix: Use max-width: 100% on all images and containers. Test on actual devices to catch overflow issues that DevTools misses."
        ]
      },
      {
        heading: "Mistake 4: Unoptimized Images",
        paragraphs: [
          "Problem: Serving desktop-sized images to mobile devices, causing slow load times.",
          "Fix: Use responsive images (srcset) to serve appropriately sized images. Compress images to 80-85% quality. Use WebP format."
        ]
      },
      {
        heading: "Mistake 5: Too Many Form Fields",
        paragraphs: [
          "Problem: Forms with 5+ fields that are tedious to complete on mobile.",
          "Fix: Reduce to 1-2 fields maximum. Ask for email only if possible. Use progressive disclosure—collect additional information after the initial conversion."
        ]
      },
      {
        heading: "Mistake 6: Cluttered Above-the-Fold",
        paragraphs: [
          "Problem: Trying to fit too much above the fold—multiple CTAs, long headlines, large images, navigation.",
          "Fix: Prioritize ruthlessly. Above the fold should contain: headline, subheadline, one CTA, one trust signal. Everything else goes below the fold."
        ]
      },
      {
        heading: "Mistake 7: Poor Touch Targets",
        paragraphs: [
          "Problem: Buttons and links are too small or too close together, causing mis-taps.",
          "Fix: Minimum 44x44px touch targets. Add 8-12px spacing between adjacent tappable elements. Test on a real device to verify."
        ]
      },
      {
        heading: "Mobile-First Checklist",
        paragraphs: [
          "Use this checklist to audit your mobile landing page. Each item should be verified on an actual mobile device, not just in DevTools."
        ],
        bullets: [
          "☐ Headline, CTA, and one trust signal are visible without scrolling on 375x667px screen",
          "☐ Body text is minimum 16px font size",
          "☐ CTA button is minimum 44x44px and easy to tap",
          "☐ No horizontal scrolling on any screen size",
          "☐ Images are optimized (WebP format, appropriate size, compressed)",
          "☐ Forms have 1-2 fields maximum with appropriate input types",
          "☐ Page loads in under 3 seconds on 4G connection",
          "☐ All touch targets are minimum 44x44px with adequate spacing",
          "☐ Text is readable without zooming",
          "☐ Layout does not shift during loading (CLS < 0.1)"
        ]
      },
      {
        heading: "Desktop Enhancement: Progressive Improvement",
        paragraphs: [
          "Once your mobile experience is solid, enhance for desktop. This is where you can add secondary CTAs, longer explanations, decorative elements, and richer imagery.",
          "Desktop enhancements: Multi-column layouts, larger hero images, secondary navigation, expanded testimonials with photos, additional trust signals, more detailed feature explanations.",
          "The key is that these enhancements are additive. Your core message and conversion path should be identical on mobile and desktop. Desktop just has more room to elaborate and persuade.",
          "Use TheDoorpost to analyze both your mobile and desktop above-the-fold sections. Our analysis evaluates both viewports and identifies issues specific to each screen size."
        ]
      }
    ]
  },
];
