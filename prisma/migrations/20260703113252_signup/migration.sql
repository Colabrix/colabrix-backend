-- AlterTable
ALTER TABLE "organization_invites" ADD COLUMN     "inviterId" TEXT,
ADD COLUMN     "isMultiUse" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "projectIds" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE INDEX "organization_invites_inviterId_idx" ON "organization_invites"("inviterId");
