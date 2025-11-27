ALTER TABLE "boards" ALTER COLUMN "participants" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ALTER COLUMN "points" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ALTER COLUMN "private" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rankings" ALTER COLUMN "points" SET NOT NULL;