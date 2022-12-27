/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth_uid]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
ADD COLUMN     "auth_uid" TEXT,
ADD COLUMN     "email_confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "permission" TEXT NOT NULL DEFAULT 'USER',
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_uid_key" ON "user"("auth_uid");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
