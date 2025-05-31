-- AlterTable
ALTER TABLE "users" ALTER COLUMN "crated_at" DROP NOT NULL;


-- setup partial constraint
CREATE UNIQUE INDEX users_unique_email ON users(email) WHERE deleted_at is null;