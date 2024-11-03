import { SubscriptionData } from '@/types/subscription';

const API_URL = 'https://t-pay.iqfit.app/subscribe/list-test';

export async function getSubscriptions(): Promise<SubscriptionData[]> {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
