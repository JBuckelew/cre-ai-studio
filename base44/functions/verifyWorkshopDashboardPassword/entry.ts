import { isValidWorkshopPassword } from '../../shared/workshopPassword.ts';

export default async function (req) {
  try {
    const { password } = await req.json();
    return Response.json({ authorized: isValidWorkshopPassword(password) });
  } catch (error) {
    return Response.json({ authorized: false });
  }
}