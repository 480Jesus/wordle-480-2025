import { createClient } from "@supabase/supabase-js";
import type { RandomWordPort } from "../../application/ports/RandomWordPort";

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

    cachedWord = data[0].value;
    return cachedWord;
  }

  //Método que usamos cuando el usuario gana o pierde
  resetWord() {
    cachedWord = null;
  }
}