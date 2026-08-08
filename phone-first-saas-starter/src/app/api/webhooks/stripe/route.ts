import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { handleStripeEvent } from "@/server/webhooks/stripeHandler";
export const runtime="nodejs";
export async function POST(request:Request){const signature=request.headers.get("stripe-signature");if(!signature||!process.env.STRIPE_WEBHOOK_SECRET)return NextResponse.json({error:"Webhook not configured"},{status:400});const body=await request.text();try{const event=stripe.webhooks.constructEvent(body,signature,process.env.STRIPE_WEBHOOK_SECRET);const result=await handleStripeEvent(event);return NextResponse.json(result);}catch(error){console.error("Stripe webhook error",error);return NextResponse.json({error:"Invalid webhook"},{status:400});}}
