// @ts-check
import { env } from "./src/env/server.mjs";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
    return config;
}

export default defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [{
                source: "/discord",
                destination: "https://discord.gg/c9E8VuAGsf",
                permanent: true,
            },
            {
                source: "/",
                destination: "https://pitch.com/public/18dd2ac9-f468-4c62-b5f3-fbe525572af4",
                permanent: true,
            },
        ];
    },
});