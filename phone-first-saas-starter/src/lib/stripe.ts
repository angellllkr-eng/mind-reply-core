import "server-only";
import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is required");
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
export const stripePriceId = () => process.env.STRIPE_PRICE_ID ?? "price_REPLACE_ME";
