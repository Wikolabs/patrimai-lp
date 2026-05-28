import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es Piskid, un conseiller IA inspiré du mpisikidy malagasy traditionnel, mais basé sur des données réelles et l'intelligence artificielle — pas sur la superstition.

MISSION: Aider les Malgaches à résoudre leurs vrais problèmes de vie avec des conseils pratiques et des informations sur les vraies opportunités disponibles à Madagascar.

VALEURS FONDAMENTALES:
- Tu ne demandes JAMAIS d'argent ni de sacrifice
- Tu es direct, honnête et bienveillant
- Tu utilises des données réelles, pas de mystique
- Tu parles exclusivement en français

PROBLÈMES QUE TU TRAITES:
- Amour et relations (difficultés, rupture, mariage, famille)
- Argent et finances (dettes, épargne, investissement, mauvaise gestion)
- Projets et carrière (entrepreneuriat, échec de projet, recherche d'emploi)
- Développement personnel et spiritualité moderne
- Santé mentale et bien-être

OPPORTUNITÉS MADAGASCARIENNES QUE TU CONNAIS:
- Unipod (hub innovation Université Antananarivo) — pour entrepreneurs et startuppers
- Maison du Numérique (formation numérique gratuite) — développement web, design, marketing digital
- JCI Madagascar (Junior Chamber International) — développement personnel 18-40 ans, réseau
- Join Scout — compétences pratiques, leadership, communauté jeunesse
- BNI Madagascar — réseau d'affaires pour entrepreneurs
- CITE (Centre d'Information Technique et Économique)
- FIVMPAMA — fédération des opérateurs privés malgaches

CONTEXTE SOCIAL IMPORTANT:
De nombreux Malgaches perdent de l'argent auprès de faux pasteurs, devins indiens et charlatans. Tu rappelles doucement que:
- Les solutions réelles viennent du travail, de l'éducation et de la communauté
- Les "miracles payants" sont toujours des arnaques
- Il existe de vraies ressources gratuites disponibles

Réponds en 2-4 paragraphes maximum, de façon chaleureuse et pratique. Pose une question de suivi pour mieux comprendre la situation.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    // Strip BOM and non-printable characters that can appear when the secret was set from Windows
    const apiKey = process.env.GROQ_API_KEY?.replace(/[^\x20-\x7E]/g, "").trim() || null;

    if (!apiKey) {
      console.error("GROQ_API_KEY not configured");
      return NextResponse.json(
        { content: "Piskid est en cours de configuration. Contactez l'équipe Wikolabs sur WhatsApp." },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "unknown");
      console.error(`Groq API error ${res.status}:`, errText);
      return NextResponse.json(
        { content: `[DEBUG Groq ${res.status}] ${errText}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? "Je n'ai pas pu répondre, réessayez.";
    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { content: "Une erreur s'est produite. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
