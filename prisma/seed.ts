import { db } from "~/server/db";

async function main() {
	// Create categories
	const categories = [];
	for (let i = 0; i < 25; i++) {
		const category = await db.category.create({
			data: {
				name: `Category ${i + 1}`,
				description: `Description for category ${i + 1}.`,
			},
		});
		categories.push(category);
	}

	// Create publishers
	const publishers = [];
	for (let i = 0; i < 25; i++) {
		const publisher = await db.publisher.create({
			data: {
				name: `Publisher ${i + 1}`,
				description: `Description for publisher ${i + 1}.`,
				isActive: true,
			},
		});
		publishers.push(publisher);
	}

	// Create authors
	const authors = [];
	for (let i = 0; i < 25; i++) {
		const author = await db.author.create({
			data: {
				name: `Author ${i + 1}`,
				birthYear: "19XX",
				description: `Description for author ${i + 1}.`,
				litPeriod: "Period",
				totalBooks: 5,
				authorImage: "https://picsum.photos/200/300",
			},
		});
		authors.push(author);
	}

	// Create books
	const books = [];
	for (let i = 0; i < 25; i++) {
		const book = await db.book.create({
			data: {
				name: `Book ${i + 1}`,
				description: `Description for book ${i + 1}.`,
				image: "https://picsum.photos/200/300",
				year: "2001",
				pages: 300 + i,
				isAvaiable: true,
				itemsInStock: 10 + i,
				categoryId: categories[i % 25]!.id,
				publisherId: publishers[i % 25]!.id,
				authorId: authors[i % 25]!.id,
			},
		});
		books.push(book);
	}

	console.log("Seed data populated successfully!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
