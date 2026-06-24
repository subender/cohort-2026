import {z} from "zod";


const envSchema = z.object({
    PORT: z.string().default("4000"),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    MONGODB_URI: z.string("MongoDB URI is missing from the .env file.")
})


const _env = envSchema.safeParse(process.env);

if(!_env.success){
    const tree = z.treeifyError(_env.error)
    console.log("Invalid Environment Variables:", tree.errors)
    process.exit(1);
}

export const env = _env.data;

