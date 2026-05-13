"use server";

import { auth, currentUser } from "@clerk/nextjs/server"

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export const checkUser = async() => {
    const user = await currentUser()

    if(!user) {
        console.log("No User Found");
        return null;
        
    }

    if(!STRAPI_API_TOKEN){
        console.error("STRAPI_API_TOKEN is missing in .env.local");
        return null;
        
    }

    const { has } = await auth()

    const subscriptionTier = has({plan: "pro"}) ? "pro" : "free";

    try {
        //if user exixts in Strapi
        const existingUserResponse = await fetch(`${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`, {
            headers: {
                Authorization: `Bearer ${STRAPI_API_TOKEN}`
            },
            cache: "no-store",
        });
        
        if (!existingUserResponse.ok) {
            const errorText = await existingUserResponse.text();
            console.warn("Strapi error response:", errorText);
            return null;
        }

        const existingUserData = await existingUserResponse.json();
        const existingUsers = Array.isArray(existingUserData)
            ? existingUserData
            : existingUserData?.data || [];

        if (existingUsers.length > 0) {
            const existingUser = existingUsers[0];

            if(existingUser.subscriptionTier !== subscriptionTier) {
                await fetch(`${STRAPI_URL}/api/users/${existingUser.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                    },
                    body: JSON.stringify({
                        subscriptionTier,
                    }),
                });
            }

            return { ...existingUser, subscriptionTier };
        }

        //Create new user in Strapi

        //Get authenticated role
        const rolesResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, {
            headers: {
                Authorization: `Bearer ${STRAPI_API_TOKEN}`
            },
        });

        if (!rolesResponse.ok) {
            const errorText = await rolesResponse.text();
            console.warn("Strapi error response:", errorText);
            return null;
        }

        const rolesData = await rolesResponse.json();
        const roles = Array.isArray(rolesData?.roles) ? rolesData.roles : [];
        const authenticatedRole = roles.find((role) => role.type === "authenticated");

    if(!authenticatedRole) {
        console.warn("Authenticated role not found in Strapi");
        return null;
    }

    const userData = {
        username: user.username || user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        password: `clerk_managed_${user.id}_${Date.now()}`,
        blocked:false,
        confirmed: true,
        role: authenticatedRole.id,
        clerkId: user.id,
        subscriptionTier,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        imageUrl: user.imageUrl || "",
    };

    const newUserResponse = await fetch(`${STRAPI_URL}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify(userData),
    });

    if(!newUserResponse.ok) {
        const errorText = await newUserResponse.text();
        console.warn("Strapi error response:", errorText);
        return null;
    }

    const newUserData = await newUserResponse.json();
    return newUserData;

    } catch (error) {
        console.error("Error in checkUser", error.message);
        return null;
    }

}
