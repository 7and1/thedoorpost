export type PostSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "above-the-fold-conversion",
    title: "What Makes an Above-the-Fold Section Convert",
    excerpt:
      "A practical framework to evaluate clarity, hierarchy, and trust in your hero section. Learn the 5-second test that reveals whether visitors understand your offer.",
    date: "2026-01-01",
    readingTime: "6 min read",
    sections: [
      {
        heading: "The 5-second test",
        paragraphs: [
          "If a visitor cannot repeat your offer after five seconds, the fold is not doing its job. Strip the hero down to a single promise, a single audience, and a single next step.",
          "Clarity wins because it reduces cognitive load. Use the headline for the promise, the subhead for proof, and the CTA for action.",
        ],
        bullets: [
          "Promise: what outcome the user gets",
          "Audience: who it is for",
          "Action: the one thing to do next",
        ],
      },
      {
        heading: "Hierarchy beats volume",
        paragraphs: [
          "Good heroes feel obvious because the visual hierarchy is obvious. Start with a dominant headline, then a supporting line, then a single primary button.",
          "If you have more than one CTA, add a clear primary and a subtle secondary. Anything else turns into noise.",
        ],
      },
      {
        heading: "Trust signals that earn clicks",
        paragraphs: [
          "Trust is not a footer problem. Place credibility near the CTA: logos, ratings, or a short proof line right below the button.",
          "If your claim is bold, anchor it with concrete evidence: time saved, dollars earned, or number of teams using the product.",
        ],
      },
    ],
  },
  {
    slug: "cta-mistakes",
    title: "10 CTA Mistakes Killing Your Conversion Rate",
    excerpt:
      "The most common CTA issues we see across landing pages and how to fix them. From vague copy to poor contrast, discover what is holding your conversions back.",
    date: "2026-01-02",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Copy clarity",
        paragraphs: [
          'CTAs that say "Submit" or "Learn More" force the user to guess. A good CTA finishes the sentence: "Start my free audit" or "Get the report".',
          "Match the CTA verb with the value in the headline. When the promise and action are aligned, the click feels inevitable.",
        ],
        bullets: [
          "Avoid generic verbs",
          "Use outcome-based language",
          "Keep it under five words",
        ],
      },
      {
        heading: "Contrast and placement",
        paragraphs: [
          "Your CTA must be the most visually distinct element in the hero. If the button blends with the background, you are wasting your headline.",
          "Place the primary CTA above the fold and within the first vertical scan line. One scroll is too late for many visitors.",
        ],
      },
      {
        heading: "Friction and commitment",
        paragraphs: [
          "Asking for too much too early kills intent. If a user has not committed, keep the first CTA low risk: a report, a demo preview, a checklist.",
          "If you require email, explain why and what the user gets immediately. Transparency reduces drop-off.",
        ],
      },
    ],
  },
  {
    slug: "trust-signals",
    title: "How to Improve Trust Signals in 3 Steps",
    excerpt:
      "Use social proof, compliance, and narrative to improve credibility. Learn which trust signals actually move the needle and where to place them for maximum impact.",
    date: "2026-01-03",
    readingTime: "5 min read",
    sections: [
      {
        heading: "Evidence over claims",
        paragraphs: [
          'Bold claims without evidence feel like marketing. Convert claims into evidence: "Trusted by 2,400 teams" or "SOC 2 Type II certified".',
          "Show the proof next to the claim so the user does not have to scroll to validate it.",
        ],
      },
      {
        heading: "Place trust where decisions happen",
        paragraphs: [
          "Trust signals should sit beside the CTA, not below the fold. Ratings, logos, or one strong testimonial should live close to the action area.",
          "If you have multiple proofs, pick one for the hero and move the rest down the page.",
        ],
      },
      {
        heading: "Reduce risk with clarity",
        paragraphs: [
          'Risk reducers like "No credit card required" or "Cancel anytime" remove hesitation. Use short, concrete language.',
          "If you handle data, say how you store it and who can access it. Specifics beat general reassurance.",
        ],
      },
    ],
  },
  {
    slug: "mobile-optimization-checklist",
    title: "Mobile Optimization Checklist for Higher Conversions",
    excerpt:
      "Over 60% of web traffic is mobile. Is your landing page ready? This checklist covers touch targets, readable text, thumb-friendly CTAs, and mobile-specific UX patterns.",
    date: "2026-01-04",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Thumb-friendly interaction",
        paragraphs: [
          "Design for thumbs first. Place the primary CTA within the natural thumb zone and keep tap targets at least 44px high.",
          "Avoid small links stacked too closely together; accidental taps cost trust.",
        ],
        bullets: [
          "CTA width: 100% on mobile",
          "Tap targets: 44px minimum",
          "Avoid hidden menus for primary actions",
        ],
      },
      {
        heading: "Performance and readability",
        paragraphs: [
          "Mobile users are less patient. Keep hero images optimized, defer non-critical scripts, and avoid layout shifts.",
          "Text should be at least 16px with a clear line height. If the copy is hard to scan, the message is lost.",
        ],
      },
      {
        heading: "Mobile-specific trust",
        paragraphs: [
          "Highlight reviews and ratings higher on the page because mobile users scan faster.",
          "If you have a mobile app, show the app store ratings near the hero to anchor trust instantly.",
        ],
      },
    ],
  },
  {
    slug: "conversion-psychology",
    title: "Conversion Psychology: What Makes Visitors Click",
    excerpt:
      "Understanding cognitive biases and psychological triggers that drive action. Explore loss aversion, social proof, scarcity, and the paradox of choice in landing page design.",
    date: "2026-01-05",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Clarity reduces friction",
        paragraphs: [
          "The brain avoids work. The clearer your offer, the less effort it takes to decide. Keep the message short and the action obvious.",
          "Remove competing CTAs so the decision path is singular.",
        ],
      },
      {
        heading: "Social proof signals safety",
        paragraphs: [
          "People look for cues that others made the same choice. Use logos, counts, and specific testimonials to create momentum.",
          'Numbers matter when they are concrete and relevant: "4.8/5 from 620 teams" beats "Loved by customers".',
        ],
      },
      {
        heading: "Urgency without pressure",
        paragraphs: [
          "Urgency works when it is real and specific. A limited-time audit or weekly report slots can motivate action without feeling manipulative.",
          "If you cannot justify urgency, use curiosity: show a preview or partial score to pull users forward.",
        ],
      },
    ],
  },
  {
    slug: "ab-testing-framework",
    title: "A/B Testing Framework for Landing Pages",
    excerpt:
      "Stop guessing and start testing. Learn how to prioritize experiments, set up proper tracking, reach statistical significance, and iterate based on data-driven insights.",
    date: "2026-01-06",
    readingTime: "8 min read",
    sections: [
      {
        heading: "Choose one primary KPI",
        paragraphs: [
          "Every test should map to a single primary metric: click-through, form completion, or activation. Secondary metrics can be tracked, but they should not decide the winner.",
        ],
      },
      {
        heading: "Build a hypothesis backlog",
        paragraphs: [
          'Document each test with a clear hypothesis: "If we clarify the value prop in the hero, then demo clicks will increase."',
          "Prioritize based on impact, confidence, and effort to avoid random testing.",
        ],
        bullets: [
          "Impact: expected lift",
          "Confidence: evidence strength",
          "Effort: time to implement",
        ],
      },
      {
        heading: "Respect test hygiene",
        paragraphs: [
          "Avoid running overlapping tests that affect the same elements. Keep experiments isolated to maintain clean results.",
          "Run tests long enough to avoid false positives. Rushing decisions can reverse gains later.",
        ],
      },
    ],
  },
  {
    slug: "hero-section-templates",
    title: "Hero Section Templates That Convert",
    excerpt:
      "Analyze 8 proven hero section patterns across different industries. See how successful brands structure their headlines, subheadlines, CTAs, and visual hierarchy.",
    date: "2026-01-07",
    readingTime: "6 min read",
    sections: [
      {
        heading: "The quick-clarity template",
        paragraphs: [
          "Headline: outcome-first. Subhead: who it is for. CTA: immediate action. This works for most SaaS and B2B products.",
          "Pair with a short visual that shows the product in context.",
        ],
      },
      {
        heading: "The problem-solution template",
        paragraphs: [
          "Open with the pain point, then promise the fix. This pattern works well when the user already feels the problem.",
          "Keep the pain concise and avoid negative overload. One line is enough.",
        ],
      },
      {
        heading: "The proof-led template",
        paragraphs: [
          "Lead with a proof statement or customer result, then explain the product. This pattern works for agencies and consultants.",
          'The CTA should reinforce the proof: "See your score" or "Get my audit".',
        ],
      },
    ],
  },
  {
    slug: "ux-principles-conversion",
    title: "UX Principles That Drive Conversion",
    excerpt:
      "Good UX is good business. Discover how F-pattern reading, visual hierarchy, whitespace, and micro-interactions contribute to a seamless conversion journey.",
    date: "2026-01-08",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Hierarchy guides attention",
        paragraphs: [
          "Use size, contrast, and spacing to guide the eye. The headline should dominate, the CTA should pop, and supporting text should remain secondary.",
        ],
      },
      {
        heading: "Whitespace is a signal",
        paragraphs: [
          "Whitespace improves comprehension and increases perceived quality. Crammed layouts feel risky and untrustworthy.",
          "Give the CTA room to breathe and keep line lengths readable.",
        ],
      },
      {
        heading: "Micro-interactions build confidence",
        paragraphs: [
          "Small confirmations like button states or progress steps reassure users. They reduce anxiety during submission or sign-up.",
          "Avoid excessive motion; keep it purposeful and subtle.",
        ],
      },
    ],
  },
  {
    slug: "analytics-metrics-matter",
    title: "The Analytics Metrics That Actually Matter",
    excerpt:
      "Beyond vanity metrics. Learn which KPIs indicate true landing page health, how to set up meaningful goals, and what to do with the data once you have it.",
    date: "2026-01-09",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Pick a north-star metric",
        paragraphs: [
          "Choose the metric that best reflects business value: demo requests, trials started, or qualified leads. Everything else should support that goal.",
        ],
      },
      {
        heading: "Diagnostic metrics to watch",
        paragraphs: [
          "Scroll depth, CTA click-through, and time-to-first-action expose where the funnel leaks.",
          "If clicks are high but conversions are low, the issue is likely in the form or offer, not the hero.",
        ],
        bullets: [
          "Hero CTA CTR",
          "Form completion rate",
          "Time to first action",
        ],
      },
      {
        heading: "Use insights to decide",
        paragraphs: [
          "Metrics only matter if they change decisions. Build a weekly review habit where you link data to a single experiment or content update.",
        ],
      },
    ],
  },
];
