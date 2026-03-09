import { createClient } from "@supabase/supabase-js";
import type { RandomWordPort } from "../../application/ports/RandomWordPort.js";

type WordRow = {
    value?: string | null;
    word?: string | null;
};

export class SupabaseWordProvider implements RandomWordPort {
    private readonly client = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    private cachedWord: string | null = null;

    async getRandomWord(): Promise<string> {
        if (this.cachedWord) {
            return this.cachedWord;
        }

        const { data, error } = await this.client
            .from("words")
            .select("value,word")
            .limit(200);

        if (error) {
            throw new Error(`Cannot get word from database: ${error.message}`);
        }

        const words = (data as WordRow[] | null)
            ?.map((row) => (row.value ?? row.word ?? "").trim().toUpperCase())
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
