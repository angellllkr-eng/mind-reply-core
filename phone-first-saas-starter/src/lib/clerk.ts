import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
export async function requireAuth() { const { userId } = await auth(); if (!userId) throw new Error("UNAUTHORIZED"); return userId; }
export async function syncCurrentUser() { const user = await currentUser(); if (!user) throw new Error("UNAUTHORIZED"); return prisma.user.upsert({ where: { clerkId: user.id }, update: { email: user.emailAddresses[0]?.emailAddress }, create: { clerkId: user.id, email: user.emailAddresses[0]?.emailAddress } }); }
