export function GET() {
    const verification_code = process.env.RIOT_VERIFICATION_CODE;
    return new Response(verification_code);
}