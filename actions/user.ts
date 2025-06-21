import prisma from '../lib/prisma';

export const testUserId = "67bc0cc1-9a51-48fb-8838-5be7586966e5";

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User not found`);
  }
  return user;
}