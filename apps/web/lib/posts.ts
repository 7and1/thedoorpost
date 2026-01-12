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
    slug: "mobile-fold-optimization",
    title: "Mobile Fold Optimization: What Changes Conversions",
    excerpt:
      "Mobile users decide in seconds. Learn how thumb-zone CTAs, readable copy, and mobile trust cues keep users engaged above the fold.",
    date: "2026-01-04",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Design for the thumb zone",
        paragraphs: [
          "Place the primary CTA where thumbs naturally rest and keep tap targets at least 44px high.",
          "Avoid stacking multiple small links; accidental taps feel like errors and erode trust.",
        ],
        bullets: [
          "CTA width: 100% on mobile",
          "Tap targets: 44px minimum",
          "Primary CTA stays above the fold",
        ],
      },
      {
        heading: "Compress the message",
        paragraphs: [
          "Mobile viewports compress everything. Use a single, outcome-focused headline and a one-sentence subhead.",
          "If you need details, move them below the fold and keep the hero scannable.",
        ],
      },
      {
        heading: "Trust cues above the fold",
        paragraphs: [
          "Bring proof closer to the CTA: ratings, logos, or a short proof line right below the button.",
          "If you have an app, show the app store rating near the hero to anchor confidence.",
        ],
      },
    ],
  },
  {
    slug: "psychology-first-impressions",
    title: "The Psychology of First Impressions",
    excerpt:
      "First impressions set the conversion trajectory. Use cognitive fluency, social proof, and loss aversion to make the fold feel obvious and safe.",
    date: "2026-01-05",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Cognitive fluency wins",
        paragraphs: [
          "The brain prefers easy decisions. If the offer is clear in five seconds, users feel confident moving forward.",
          "Simplify the headline and reduce competing CTAs so the path is singular.",
        ],
      },
      {
        heading: "Social proof reduces risk",
        paragraphs: [
          "People look for cues that others succeeded. Use logos, counts, and concrete testimonials to build momentum.",
          'Numbers matter when they are specific: "4.8/5 from 620 teams" beats "Loved by customers."',
        ],
      },
      {
        heading: "Urgency without pressure",
        paragraphs: [
          "Urgency works when it is real: limited audit slots or weekly report drops can motivate action.",
          "If urgency is not credible, use curiosity by revealing a partial score or preview.",
        ],
      },
    ],
  },
  {
    slug: "homepage-cro-checklist",
    title: "Checklist for Homepage CRO",
    excerpt:
      "A practical CRO checklist you can run before every launch. Validate clarity, hierarchy, CTA strength, and trust signals in minutes.",
    date: "2026-01-06",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Message clarity",
        paragraphs: [
          "The headline should state a single outcome and a single audience. If it reads like a tagline, it is too vague.",
          "Use the subhead to add proof or a second layer of specificity.",
        ],
        bullets: ["Outcome first", "Audience second", "No jargon"],
      },
      {
        heading: "Primary action path",
        paragraphs: [
          "One primary CTA above the fold. If you must include a secondary CTA, keep it visually subtle.",
          "Ensure the CTA label completes the headline promise.",
        ],
      },
      {
        heading: "Proof and risk reducers",
        paragraphs: [
          "Add one strong proof signal near the CTA: a logo row, a short result, or a rating.",
          'Risk reducers like "No credit card required" remove friction at the moment of decision.',
        ],
      },
    ],
  },
  {
    slug: "ecommerce-hero-section-checklist",
    title: "Ecommerce Hero Section Checklist",
    excerpt:
      "Make the first scroll sell. This checklist covers product clarity, offers, and trust elements that boost ecommerce conversions.",
    date: "2026-01-07",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Product and offer clarity",
        paragraphs: [
          "Show the best-selling product or collection with a clear value statement.",
          "If you run a promotion, make it headline-level and remove competing offers.",
        ],
        bullets: [
          "Hero image highlights the product",
          "Offer is explicit",
          "CTA says what happens next",
        ],
      },
      {
        heading: "Conversion boosters",
        paragraphs: [
          "Add shipping guarantees, return policies, or delivery timing in the hero to reduce hesitation.",
          "Use a secondary CTA for product discovery without distracting from checkout intent.",
        ],
      },
      {
        heading: "Reduce purchase anxiety",
        paragraphs: [
          "Show reviews or ratings above the fold to establish instant trust.",
          "If the price is premium, reinforce quality with a short proof point.",
        ],
      },
    ],
  },
  {
    slug: "visual-hierarchy-conversion",
    title: "The Role of Visual Hierarchy in Conversion",
    excerpt:
      "Visual hierarchy decides what gets read, clicked, and trusted. Learn the hierarchy rules that make hero sections convert.",
    date: "2026-01-08",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Hierarchy sets the path",
        paragraphs: [
          "The eye should move headline → subhead → CTA → proof. If any step is unclear, conversions drop.",
          "Use size and contrast to establish a clear priority order.",
        ],
      },
      {
        heading: "Contrast and whitespace",
        paragraphs: [
          "Whitespace is not empty; it is a signal that elevates the CTA and reduces cognitive load.",
          "High-contrast CTAs feel more intentional and increase click-through rates.",
        ],
      },
      {
        heading: "Micro-interactions with intent",
        paragraphs: [
          "Subtle hover states and progress cues reduce anxiety during conversion.",
          "Avoid excessive motion; it should guide attention, not compete with the message.",
        ],
      },
    ],
  },
  {
    slug: "above-the-fold-score-benchmarks",
    title: "Above-the-Fold Score Benchmarks",
    excerpt:
      "Benchmark your hero section score and know what good looks like. Use these ranges to prioritize the right fixes first.",
    date: "2026-01-09",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Score ranges that matter",
        paragraphs: [
          "90+ means the offer is clear, the CTA is dominant, and trust signals are visible.",
          "60-80 indicates solid fundamentals with one or two high-impact gaps.",
        ],
        bullets: [
          "90-100: conversion-ready",
          "70-89: strong but improvable",
          "0-69: clarity or trust issues",
        ],
      },
      {
        heading: "What drives a high score",
        paragraphs: [
          "Strong value propositions and CTA contrast consistently lift scores.",
          "Trust signals near the action area are a repeatable differentiator.",
        ],
      },
      {
        heading: "How to use benchmarks",
        paragraphs: [
          "Compare your score to peers in your industry and focus on the biggest delta first.",
          "Track score movement after each major hero update to validate impact.",
        ],
      },
    ],
  },
  {
    slug: "landing-page-teardown-northwind",
    title: "Landing Page Teardown: Northwind Analytics",
    excerpt:
      "A teardown of a fictional analytics homepage to show how clarity, proof, and CTA hierarchy can be improved above the fold.",
    date: "2026-01-10",
    readingTime: "7 min read",
    sections: [
      {
        heading: "What works above the fold",
        paragraphs: [
          "Northwind leads with a clear promise and a concise subhead, making it easy to understand the product in seconds.",
          "The hero visual reinforces the outcome by showing the dashboard in context.",
        ],
      },
      {
        heading: "What is missing",
        paragraphs: [
          "The CTA competes with two secondary links, which dilutes the action path.",
          "Trust signals appear too far below the fold, increasing perceived risk.",
        ],
      },
      {
        heading: "Prioritized fixes",
        paragraphs: [
          "Reduce the hero to one primary CTA and move proof directly beneath it.",
          "Replace vague metrics with a specific customer outcome to boost credibility.",
        ],
      },
    ],
  },
  {
    slug: "saas-homepage-audits",
    title: "SaaS Homepage Audits: What High-Converting Teams Do",
    excerpt:
      "A repeatable audit checklist for SaaS homepages that clarifies the value prop, simplifies the CTA path, and adds proof fast.",
    date: "2026-01-11",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Signal the outcome quickly",
        paragraphs: [
          "SaaS buyers scan fast. The headline should state the outcome and for whom in one line.",
          "Use the subhead to quantify time saved, revenue gained, or risk reduced.",
        ],
      },
      {
        heading: "Show product in context",
        paragraphs: [
          "Use a focused screenshot or short loop that shows the product solving the promised problem.",
          "Avoid generic stock imagery that does not reinforce the narrative.",
        ],
      },
      {
        heading: "Reduce trial friction",
        paragraphs: [
          "Call out trial terms clearly and place proof near the CTA to reduce hesitation.",
          "If the onboarding is short, highlight the time-to-value explicitly.",
        ],
      },
    ],
  },
  {
    slug: "ai-cro-audits",
    title: "How to Use AI for CRO Audits",
    excerpt:
      "Use AI to scale your landing page audits without losing rigor. Learn how to standardize inputs, interpret outputs, and prioritize fixes.",
    date: "2026-01-12",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Capture consistent inputs",
        paragraphs: [
          "Use the same viewport and screenshot dimensions to make comparisons reliable.",
          "Pair AI analysis with a consistent rubric so scores remain explainable.",
        ],
      },
      {
        heading: "Translate insights into tests",
        paragraphs: [
          "AI can identify priority fixes, but teams must convert them into hypotheses and tests.",
          "Focus on one change per experiment to attribute impact accurately.",
        ],
      },
      {
        heading: "Keep a human review loop",
        paragraphs: [
          "AI outputs should be reviewed by a strategist before shipping changes.",
          "Use human feedback to update prompts and keep the system aligned to business goals.",
        ],
      },
    ],
  },
];
