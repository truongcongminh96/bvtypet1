import { getCliClient } from "sanity/cli";

const WEBHOOK_NAME = "Pet One website revalidation";
const WEBHOOK_URL = "https://bvtypet1.vercel.app/api/revalidate";
const API_VERSION = "v2025-02-19";

type SanityWebhook = {
  id: string;
  name: string;
  url: string;
};

async function main() {
  const client = getCliClient({ apiVersion: "2026-07-25" });
  const { projectId, dataset, token } = client.config();
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!projectId || !dataset || !token) {
    throw new Error("Sanity project, dataset or user token is unavailable.");
  }
  if (!secret) {
    throw new Error("SANITY_REVALIDATE_SECRET is missing.");
  }

  const endpoint = `https://${projectId}.api.sanity.io/${API_VERSION}/hooks/projects/${projectId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const listResponse = await fetch(endpoint, { headers });
  if (!listResponse.ok) {
    throw new Error(`Unable to list webhooks (${listResponse.status}).`);
  }

  const webhooks = (await listResponse.json()) as SanityWebhook[];
  const existing = webhooks.find(
    (webhook) =>
      webhook.name === WEBHOOK_NAME || webhook.url === WEBHOOK_URL,
  );

  if (existing) {
    console.log(`Webhook already configured: ${existing.id}`);
    return;
  }

  const createResponse = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: "document",
      name: WEBHOOK_NAME,
      description: "Refresh website content after a Sanity publish.",
      url: WEBHOOK_URL,
      dataset,
      rule: {
        on: ["create", "update", "delete"],
        filter:
          '_type in ["siteSettings", "homePageSettings", "aboutPage", "service", "article", "doctor", "equipment", "customerReview", "clinicLocation"]',
        projection: "{_id, _type}",
      },
      apiVersion: API_VERSION,
      httpMethod: "POST",
      includeDrafts: false,
      includeAllVersions: false,
      secret,
      isDisabledByUser: false,
    }),
  });

  if (!createResponse.ok) {
    const responseBody = await createResponse.text();
    throw new Error(
      `Unable to create webhook (${createResponse.status}): ${responseBody}`,
    );
  }

  const webhook = (await createResponse.json()) as SanityWebhook;
  console.log(`Webhook created: ${webhook.id}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
