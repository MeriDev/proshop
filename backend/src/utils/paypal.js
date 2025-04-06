import dotenv from 'dotenv';
dotenv.config();

const { PAYPAL_CLIENT, PAYPAL_SECRET, PAYPAL_API_URL } = process.env;

export const getPaypalAccessToken = async () => {
  const auth = Buffer.from(PAYPAL_CLIENT + ':' + PAYPAL_SECRET).toString(
    'base64'
  );

  const headers = {
    Accept: 'application/json',
    'Accept-Language': 'en_US',
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${auth}`,
  };

  const body = 'grant_type=client_credentials';
  const url = `${PAYPAL_API_URL}/v1/oauth2/token`;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body,
  });
  if (!res.ok) throw new Error('Failed to get access token');

  const paypalData = await res.json();
  return paypalData.access_token;
};
