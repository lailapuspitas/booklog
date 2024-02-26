-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracker" (
    "id" SERIAL NOT NULL,
    "cover" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "no_pages" INTEGER NOT NULL,
    "start_date" TEXT NOT NULL,
    "progress" TEXT NOT NULL,

    CONSTRAINT "tracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "cover" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "no_pages" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
