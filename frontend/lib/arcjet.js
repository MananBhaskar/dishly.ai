import arcjet, { tokenBucket } from "@arcjet/next";
import { detectBot, shield } from "@arcjet/next";

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        // Shield WAF - protect against common attacks
        shield({
            mode: "DRY_RUN", // Use "DRY_RUN" during development to test
        }),

        // Bot protection - allow search engines only
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
        }),
    ]
})

// free tier pantry scan limits (10 scan per month)
export const freePantryScans = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"], // Track by Clerk user ID
        refillRate: 10, // 10 tokens
        interval: "30d", // per month (30 days)
        capacity: 10, // max 10 tokens
    })
);

// free tier meal recommendations (5 per month)
export const freeMealRecommendations = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"],
        refillRate: 5,
        interval: "30d",
        capacity: 5,
    })
);

//pro tier - effectively unlimited( very high limits)
//1000 requests per day should be more than enough for any user
export const proTierLimit = aj.withRule(
    tokenBucket({
        mode: "LIVE",
        characteristics: ["userId"],
        refillRate: 1000,
        interval: "1d",
        capacity: 1000,
    })
);

