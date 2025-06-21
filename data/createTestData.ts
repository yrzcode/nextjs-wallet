import { PrismaClient} from '@prisma/client'
import { userData } from './users'

const prisma = new PrismaClient()

const createTestData = async () => {
  // Create or get user (using email as unique identifier)
  let actualUserId: string;
  
  try {
    const user = await prisma.user.upsert({
      where: { email: userData[0].email },
      update: {
        name: userData[0].name,
        profile: userData[0].profile,
      },
      create: userData[0]
    });
    actualUserId = user.id;
    console.log(`User ready with ID: ${actualUserId}`);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return;
  }

  // Clear existing transaction data
  await prisma.transaction.deleteMany({});

  // Generate transaction data with the actual user ID
  const { generateDummyTransactions } = await import('./transactions');
  const transactionsWithCorrectUserId = generateDummyTransactions(actualUserId);

  // Bulk create transaction data
  await prisma.transaction.createMany({
    data: transactionsWithCorrectUserId
  });

  console.log(`Created ${transactionsWithCorrectUserId.length} transactions for user ${actualUserId}`);
}

createTestData()