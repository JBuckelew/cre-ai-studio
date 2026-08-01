import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const FORM_ID = "1367138411430279";

export default async function(req: Request): Promise<Response> {
  const summary = { fetched: 0, new: 0, subscribed: 0, errors: 0 };
  try {
    const metaToken = Deno.env.get("META_LEADS_TOKEN") ?? Deno.env.get("META-LEADS-TOKEN");
    if (!metaToken) {
      console.log("meta token not configured");
      return Response.json({ ok: false, reason: "no token" });
    }

    const beehiivApiKey = Deno.env.get("BEEHIIV_API_KEY");
    const beehiivPublicationId = Deno.env.get("BEEHIIV_PUBLICATION_ID");

    const base44 = createClientFromRequest(req);

    let url: string | null = `https://graph.facebook.com/v21.0/${FORM_ID}/leads?fields=created_time,field_data&limit=100&access_token=${encodeURIComponent(metaToken)}`;

    while (url) {
      let data: any;
      try {
        const res = await fetch(url);
        data = await res.json();
      } catch (e) {
        console.log("fetch leads error:", e.message);
        summary.errors++;
        break;
      }

      if (data.error) {
        console.log("graph api error:", JSON.stringify(data.error));
        summary.errors++;
        break;
      }

      const leads = data.data || [];
      summary.fetched += leads.length;

      for (const lead of leads) {
        const leadId = lead.id;
        if (!leadId) continue;

        // Skip if already synced
        try {
          const existing = await base44.asServiceRole.entities.MetaLead.filter({ lead_id: leadId });
          if (existing && existing.length > 0) {
            continue;
          }
        } catch (e) {
          console.log("MetaLead filter error:", e.message);
        }

        summary.new++;

        // Extract email from field_data
        let email: string | null = null;
        const fieldData = lead.field_data || [];
        for (const field of fieldData) {
          if (field.name === "email" && field.values && field.values.length > 0) {
            email = field.values[0];
            break;
          }
        }

        if (!email) {
          console.log("no email in lead:", leadId);
          summary.errors++;
          continue;
        }

        // Subscribe to beehiiv
        let beehiivSuccess = false;
        let alreadyExists = false;
        if (beehiivApiKey && beehiivPublicationId) {
          try {
            const beehiivRes = await fetch(
              `https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${beehiivApiKey}`,
                },
                body: JSON.stringify({
                  email,
                  reactivate_existing: false,
                  send_welcome_email: true,
                  status: "active",
                  utm_source: "facebook",
                  utm_medium: "paid",
                  utm_campaign: "newsletter_instant_form",
                }),
              }
            );
            const beehiivData = await beehiivRes.json().catch(() => ({}));
            console.log("Beehiiv status:", beehiivRes.status, "for", email);
            if (beehiivRes.ok) {
              beehiivSuccess = true;
            } else {
              const errStr = JSON.stringify(beehiivData).toLowerCase();
              if (errStr.includes("already") || errStr.includes("exist") || beehiivRes.status === 409) {
                alreadyExists = true;
              }
            }
          } catch (e) {
            console.log("Beehiiv subscribe error:", e.message);
          }
        } else {
          console.log("Beehiiv secrets not configured — skipping subscribe");
        }

        if (beehiivSuccess || alreadyExists) {
          summary.subscribed++;
          try {
            await base44.asServiceRole.entities.MetaLead.create({
              lead_id: leadId,
              email,
              created_time: lead.created_time || "",
              form_id: FORM_ID,
            });
          } catch (e) {
            console.log("MetaLead create error:", e.message);
            summary.errors++;
          }
          try {
            await base44.asServiceRole.entities.EmailSignup.create({
              email,
              source: "facebook_lead_ad",
            });
          } catch (e) {
            // ignore duplicate errors
          }
        } else {
          summary.errors++;
        }
      }

      url = data.paging && data.paging.next ? data.paging.next : null;
    }

    console.log(`Meta leads sync summary: fetched=${summary.fetched} new=${summary.new} subscribed=${summary.subscribed} errors=${summary.errors}`);
    return Response.json({ ok: true, ...summary });
  } catch (error) {
    console.error("syncMetaLeadsToBeehiiv error:", error.message);
    return Response.json({ ok: false, ...summary, error: error.message });
  }
}