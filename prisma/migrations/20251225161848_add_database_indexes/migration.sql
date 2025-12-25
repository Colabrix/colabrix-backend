-- CreateIndex
CREATE INDEX "email_verification_tokens_userId_idx" ON "public"."email_verification_tokens"("userId");

-- CreateIndex
CREATE INDEX "email_verification_tokens_expiresAt_idx" ON "public"."email_verification_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "email_verification_tokens_isUsed_idx" ON "public"."email_verification_tokens"("isUsed");

-- CreateIndex
CREATE INDEX "email_verification_tokens_userId_isUsed_expiresAt_idx" ON "public"."email_verification_tokens"("userId", "isUsed", "expiresAt");

-- CreateIndex
CREATE INDEX "health_checks_timestamp_idx" ON "public"."health_checks"("timestamp");

-- CreateIndex
CREATE INDEX "health_checks_status_idx" ON "public"."health_checks"("status");

-- CreateIndex
CREATE INDEX "organization_invites_organizationId_idx" ON "public"."organization_invites"("organizationId");

-- CreateIndex
CREATE INDEX "organization_invites_email_idx" ON "public"."organization_invites"("email");

-- CreateIndex
CREATE INDEX "organization_invites_expiresAt_idx" ON "public"."organization_invites"("expiresAt");

-- CreateIndex
CREATE INDEX "organization_invites_isUsed_idx" ON "public"."organization_invites"("isUsed");

-- CreateIndex
CREATE INDEX "organization_invites_organizationId_isUsed_expiresAt_idx" ON "public"."organization_invites"("organizationId", "isUsed", "expiresAt");

-- CreateIndex
CREATE INDEX "organization_members_userId_idx" ON "public"."organization_members"("userId");

-- CreateIndex
CREATE INDEX "organization_members_organizationId_idx" ON "public"."organization_members"("organizationId");

-- CreateIndex
CREATE INDEX "organization_members_role_idx" ON "public"."organization_members"("role");

-- CreateIndex
CREATE INDEX "organization_members_joinedAt_idx" ON "public"."organization_members"("joinedAt");

-- CreateIndex
CREATE INDEX "organizations_name_idx" ON "public"."organizations"("name");

-- CreateIndex
CREATE INDEX "organizations_createdAt_idx" ON "public"."organizations"("createdAt");

-- CreateIndex
CREATE INDEX "password_reset_tokens_userId_idx" ON "public"."password_reset_tokens"("userId");

-- CreateIndex
CREATE INDEX "password_reset_tokens_expiresAt_idx" ON "public"."password_reset_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "password_reset_tokens_isUsed_idx" ON "public"."password_reset_tokens"("isUsed");

-- CreateIndex
CREATE INDEX "password_reset_tokens_userId_isUsed_expiresAt_idx" ON "public"."password_reset_tokens"("userId", "isUsed", "expiresAt");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "public"."refresh_tokens"("userId");

-- CreateIndex
CREATE INDEX "refresh_tokens_expiresAt_idx" ON "public"."refresh_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_expiresAt_idx" ON "public"."refresh_tokens"("userId", "expiresAt");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "public"."users"("createdAt");

-- CreateIndex
CREATE INDEX "users_isEmailVerified_idx" ON "public"."users"("isEmailVerified");
