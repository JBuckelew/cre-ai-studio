export function isValidWorkshopPassword(password) {
  const stored = Deno.env.get('WORKSHOP_DASHBOARD_PASSWORD')?.trim();
  return !!stored && typeof password === 'string' && password.trim() === stored;
}