import { createClient } from "@supabase/supabase-js";
import type { RandomWordPort } from "../../application/ports/RandomWordPort.js";

// Cache sencilla
let cachedWord: string | null = null;

export class SupabaseWordProvider implements RandomWordPort {
  private client = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );

  async getRandomWord(): Promise<string> {
    // Si hay palabra en caché, devolverla
    if (cachedWord) {
      return cachedWord;
    }

    // Pedir palabra a Supabase
    const { data, error } = await this.client
      .from("words")
      .select("value")
      .order("random()")
      .limit(1);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Cannot get word from database");
    }

    const selectedWord = data?.[0]?.value;
    if (typeof selectedWord !== "string" || selectedWord.length === 0) {
      throw new Error("Invalid word received from database");
    }

    cachedWord = selectedWord;
    return selectedWord;
  }

  //Método que usamos cuando el usuario gana o pierde
  resetWord(): void {
    cachedWord = null;
  }
}
