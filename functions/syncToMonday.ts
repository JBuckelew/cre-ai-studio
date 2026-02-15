import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { entity_name, data } = await req.json();

    if (!entity_name || !data) {
      return Response.json({ error: 'Missing entity_name or data' }, { status: 400 });
    }

    const boardId = '18400181576';
    const apiKey = Deno.env.get('MONDAY_API_KEY');

    // First, get the group ID for "Base44 Emails"
    const groupQuery = `
      query {
        boards(ids: ${boardId}) {
          groups {
            id
            title
          }
        }
      }
    `;

    const groupResponse = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: groupQuery })
    });

    const groupResult = await groupResponse.json();
    const groups = groupResult.data?.boards?.[0]?.groups || [];
    const base44Group = groups.find(g => g.title === 'Base44 Emails');
    
    if (!base44Group) {
      return Response.json({ error: 'Base44 Emails group not found' }, { status: 404 });
    }

    const groupId = base44Group.id;

    // Build item name and column values based on entity type
    let itemName;
    let columnValues = {};

    if (entity_name === 'EmailSignup') {
      itemName = data.email;
      columnValues = {
        email: data.email,
        text: data.source || 'hero_signup'
      };
    } else if (entity_name === 'ContactSignup') {
      itemName = `${data.first_name} ${data.last_name}`;
      columnValues = {
        email: data.email,
        text: data.company || '',
        text0: data.source || 'hero_signup'
      };
    } else {
      return Response.json({ error: 'Unsupported entity type' }, { status: 400 });
    }

    // Create item in Monday.com in the Base44 Emails group
    const mutation = `
      mutation {
        create_item (
          board_id: ${boardId},
          group_id: "${groupId}",
          item_name: "${itemName}",
          column_values: "${JSON.stringify(columnValues).replace(/"/g, '\\"')}"
        ) {
          id
        }
      }
    `;

    const mondayResponse = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: mutation })
    });

    const result = await mondayResponse.json();

    if (!mondayResponse.ok || result.errors) {
      console.error('Monday.com API error:', result);
      return Response.json({ error: 'Failed to sync to Monday.com', details: result }, { status: 500 });
    }

    return Response.json({ success: true, monday_item_id: result.data.create_item.id });
  } catch (error) {
    console.error('Sync error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});