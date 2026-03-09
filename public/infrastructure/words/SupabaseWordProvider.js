import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from "../../env.js";

export class SupabaseWordProvider {
    constructor() {
        this.cachedWord = null;
        if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
            throw new Error("Missing Supabase env vars: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY");
        }
        this.client = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
    }

    async getRandomWord() {
        if (this.cachedWord) return this.cachedWord;

        const { data, error } = await this.client.from("words").select("word");

        if (error) {
            throw new Error(`Supabase error while fetching words: ${error.message}`);
        }

        if (!data || data.length === 0) {
            throw new Error("No words found in Supabase table 'words'");
        }

        const words = data
            .map((row) => row.word)
            .filter((word) => typeof word === "string" && word.length > 0);

        if (words.length === 0) {
            throw new Error("Supabase returned rows without a valid 'word' field");
        }

        const index = Math.floor(Math.random() * words.length);
        this.cachedWord = words[index].toUpperCase();
        return this.cachedWord;
    }

    resetWord() {
        this.cachedWord = null;
    }
}
