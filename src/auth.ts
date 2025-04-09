import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "@auth/sveltekit/providers/google";
import Discord from "@auth/sveltekit/providers/discord";
import { prisma } from "$/prisma";
import { type User as SchemaUser } from "@prisma/client";

declare module "@auth/sveltekit" {
    interface Session {
        user: SchemaUser & DefaultSession["user"]
    }
};

export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, Discord],
    callbacks: {
        async session({ session, user }) {
            const schemaUser = user as SchemaUser;

            return {
                user: {
                    id: schemaUser.id,
                    name: schemaUser.name,
                    email: schemaUser.email,
                    image: schemaUser.image,
                    createdAt: schemaUser.createdAt,
                    updatedAt: schemaUser.updatedAt,
                },
                expires: session.expires,
            };
        }
    }
})
