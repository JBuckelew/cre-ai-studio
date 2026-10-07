Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { password } = body;
    const storedPassword = Deno.env.get('WORKSHOP_DASHBOARD_PASSWORD');

    if (!storedPassword || !password || password !== storedPassword) {
      return Response.json({ authorized: false });
    }

    return Response.json({ authorized: true });
  } catch (error) {
    return Response.json({ authorized: false });
  }
});