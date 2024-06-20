# SPST Library Docs

- Database models:

## Book Model

- **Fields:**

  - `id`: The primary key of the book.
  - `name`: The name of the book.
  - `description`: A brief description of the book.
  - `image`: URL to the book's image.
  - `year`: The year the book was published.
  - `pages`: Number of pages in the book.
  - `isAvailable`: Indicates if the book is currently available.
  - `itemsInStock`: Number of items in stock.
  - `categoryId`: Foreign key referencing the `Category` model.
  - `publisherId`: Foreign key referencing the `Publisher` model.
  - `authorId`: Foreign key referencing the `Author` model.
  - `createdAt` and `updatedAt`: Timestamps for creation and last update.

- **Relationships:**
  - A `Book` belongs to a `Category`, `Publisher`, and `Author`.

## Category Model

- **Fields:**

  - `id`: The primary key of the category.
  - `name`: The name of the category.
  - `description`: A brief description of the category.
  - `createdAt` and `updatedAt`: Timestamps for creation and last update.

- **Relationships:**
  - A `Category` has many `Books`.

## Publisher Model

- **Fields:**

  - `id`: The primary key of the publisher.
  - `name`: The name of the publisher.
  - `image`: URL to the publisher's image.
  - `description`: A brief description of the publisher.
  - `createdDated`: Date the publisher was created.
  - `endDate`: Optional field for the date the publisher became inactive.
  - `isActive`: Indicates if the publisher is currently active.
  - `bossName`: Name of the head of the publisher.
  - `createdAt` and `updatedAt`: Timestamps for creation and last update.

- **Relationships:**
  - A `Publisher` has many `Books`.

## Author Model

- **Fields:**

  - `id`: The primary key of the author.
  - `name`: The name of the author.
  - `birthYear`: The birth year of the author.
  - `deathYear`: The death year of the author (if applicable).
  - `description`: A brief description of the author.
  - `litPeriod`: The literary period the author belongs to.
  - `totalBooks`: Total number of books written by the author.
  - `authorImage`: URL to the author's image.
  - `createdAt` and `updatedAt`: Timestamps for creation and last update.

- **Relationships:**
  - An `Author` has many `Books`.

## Booking Model

- **Fields:**

  - `id`: The primary key of the booking.
  - `bookName`: The name of the booked book.
  - `from`: The start date of the booking.
  - `to`: The end date of the booking.
  - `isBorrowed`: Indicates if the book is currently borrowed.
  - `isReturned`: Indicates if the book has been returned.
  - `isExtended`: Indicates if the booking period has been extended.
  - `userEmail`: The email of the user who booked the book.

- **Relationships:**
  - A `Booking` is related to a `Book` by the `bookName` field, although this is not a direct foreign key relationship in the current schema.

In summary, the relationships are as follows:

- Each `Book` belongs to one `Category`, one `Publisher`, and one `Author`.
- Each `Category` can have multiple `Books`.
- Each `Publisher` can have multiple `Books`.
- Each `Author` can have multiple `Books`.
- Each `Booking` is associated with a book via the `bookName` field, linking to the `Book` model's `name` field.

Short Description:
We have three roles: STUDENT, TEACHER, and ADMIN.
A student can borrow books, view books with pagination, and filter books (the same applies to categories, publishers, and authors).
A teacher has the same capabilities as a student but can also perform CRUD operations on books, categories, publishers, and authors.
An admin has the same capabilities as a teacher plus the ability to manage students (TODO: Add more functionality for the admin later).

Auth Server
- I developed custom auth server for this application in Nestjs: [Auth Server](https://github.com/peterdinis/spst-library-auth)