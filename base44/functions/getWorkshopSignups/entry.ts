import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { isValidWorkshopPassword } from '../../shared/workshopPassword.ts';

export default async function (req) {
  try {
    const { password } = await req.json();
    if (!isValidWorkshopPassword(password)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const base44 = createClientFromRequest(req);
    const signups = await base44.asServiceRole.entities.WorkshopSignup.list('-created_date', 500);
    return Response.json({
      signups: signups.map((s) => ({
        id: s.id,
        email: s.email,
        source: s.source,
        amount: s.amount,
        created_date: s.created_date,
      })),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}