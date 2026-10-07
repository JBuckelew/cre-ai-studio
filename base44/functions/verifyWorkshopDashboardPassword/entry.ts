export async function main(input, context) {
  const password = process.env.WORKSHOP_DASHBOARD_PASSWORD;
  if (!password) {
    return { authorized: false };
  }
  if (!input?.password || input.password !== password) {
    return { authorized: false };
  }
  return { authorized: true };
}