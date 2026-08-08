import "server-only";
import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is required");
// Stripe SDK releases may not expose every historical API version in its TypeScript union.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-08-01" as Stripe.LatestApiVersion });
export const stripePriceId=()=>process.env.STRIPE_PRICE_ID??"price_REPLACE_ME";
