import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { RandomWordPort } from "../../application/ports/RandomWordPort.js";

type WordRow = {
    value?: unknown;
    word?: unknown;
};

export class SupabaseWordProvider implements RandomWordPort {
    private readonly client: SupabaseClient;
    private cachedWord: string | null = null;

    constructor() {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error("Missing Supabase env vars: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY");
        }

        this.client = createClient(supabaseUrl, supabaseAnonKey);
    }

    async getRandomWord(): Promise<string> {
        if (this.cachedWord) {
            return this.cachedWord;
        }

        const { data, error } = await this.client
            .from("words")
            .select("*")
            .limit(200);

        if (error) {
            throw new Error(`Cannot get word from database: ${error.message}`);
        }

        const words = (data as WordRow[] | null)
            ?.map((row) => {
                const raw = typeof row.word === "string"
                    ? row.word
                    : (typeof row.value === "string" ? row.value : "");
                return raw.trim().toUpperCase();
            })
            .filter((word) => word.length > 0) ?? [];

        if (words.length === 0) {
            throw new Error("Cannot get word from database: no valid words returned");
        }

        const randomIndex = Math.floor(Math.random() * words.length);
        const selectedWord = words[randomIndex];

        this.cachedWord = selectedWord;
        return selectedWord;
    }

    resetWord(): void {
        this.cachedWord = null;
    }
}
