import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Fantasy',
      description: 'Books in the fantasy genre.',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Science Fiction',
      description: 'Books in the science fiction genre.',
    },
  });

  // Create publishers
  const publisher1 = await prisma.publisher.create({
    data: {
      name: 'Penguin Random House',
      description: 'One of the largest book publishers.',
      isActive: true,
    },
  });

  const publisher2 = await prisma.publisher.create({
    data: {
      name: 'HarperCollins',
      description: 'A leading global publisher.',
      isActive: true,
    },
  });

  // Create authors
  const author1 = await prisma.author.create({
    data: {
      name: 'J.K. Rowling',
      birthYear: '1965',
      description: 'Author of the Harry Potter series.',
      litPeriod: 'Contemporary',
      totalBooks: 7,
      authorImage: 'image-url',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'George Orwell',
      birthYear: '1903',
      deathYear: '1950',
      description: 'Author of 1984 and Animal Farm.',
      litPeriod: 'Modernism',
      totalBooks: 6,
      authorImage: 'image-url',
    },
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      isActive: true,
      role: 'STUDENT',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'password456',
      isActive: true,
      role: 'TEACHER',
    },
  });

  // Create books
  const book1 = await prisma.book.create({
    data: {
      name: 'Harry Potter and the Sorcerer\'s Stone',
      description: 'First book in the Harry Potter series.',
      image: 'image-url',
      year: 1997,
      pages: 320,
      isAvaiable: true,
      itemsInStock: 10,
      categoryId: category1.id,
      publisherId: publisher1.id,
      authorId: author1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      name: '1984',
      description: 'Dystopian novel by George Orwell.',
      image: 'image-url',
      year: 1949,
      pages: 328,
      isAvaiable: true,
      itemsInStock: 5,
      categoryId: category2.id,
      publisherId: publisher2.id,
      authorId: author2.id,
    },
  });

  console.log('Seed data populated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });