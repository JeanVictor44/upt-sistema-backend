CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'REGION_MANAGER', 'SECRETARY');--> statement-breakpoint
CREATE TYPE "public"."class_options" AS ENUM('TURMA A', 'TURMA B', 'TURMA C', 'ÚNICA');--> statement-breakpoint
CREATE TYPE "public"."class_statuses" AS ENUM('ATIVA', 'FECHADA');--> statement-breakpoint
CREATE TYPE "public"."highschool_statuses" AS ENUM('CONCLUÍDO', 'EM CURSO');--> statement-breakpoint
CREATE TYPE "public"."student_statuses" AS ENUM('MATRICULADO', 'EVADIDO', 'APROVADO');--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"document" varchar(11) NOT NULL,
	"telephone" varchar(12) NOT NULL,
	"disabled_at" timestamp,
	"role" "user_role" DEFAULT 'SECRETARY' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_document_unique" UNIQUE("document"),
	CONSTRAINT "unique_email" UNIQUE NULLS NOT DISTINCT("email")
);
--> statement-breakpoint
CREATE TABLE "region" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "region_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "city_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "neighborhood" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"city_id" serial NOT NULL,
	"region_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teaching_place" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"neighborhood_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_option" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "class_options" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "class_option_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "class_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "class_statuses" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "class_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "highschool_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "highschool_statuses" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "highschool_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "student_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "student_statuses" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "student_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "class" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"teaching_place_id" serial NOT NULL,
	"edition" integer NOT NULL,
	"option_id" serial NOT NULL,
	"status_id" serial NOT NULL,
	"number_vacancies" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "class_name_unique" UNIQUE("name"),
	CONSTRAINT "unique_class_per_edition" UNIQUE("edition","option_id","teaching_place_id")
);
--> statement-breakpoint
CREATE TABLE "student" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"social_name" varchar(100),
	"cpf" varchar(11),
	"rg" varchar(10),
	"date_birth" date,
	"telephone" varchar(15),
	"email" varchar(100),
	"class_id" serial NOT NULL,
	"high_school_status" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "student_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "student_rg_unique" UNIQUE("rg"),
	CONSTRAINT "student_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teaching_place" ADD CONSTRAINT "teaching_place_neighborhood_id_neighborhood_id_fk" FOREIGN KEY ("neighborhood_id") REFERENCES "public"."neighborhood"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_teaching_place_id_teaching_place_id_fk" FOREIGN KEY ("teaching_place_id") REFERENCES "public"."teaching_place"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_option_id_class_option_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."class_option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_status_id_class_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."class_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_class_id_class_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."class"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_high_school_status_highschool_status_id_fk" FOREIGN KEY ("high_school_status") REFERENCES "public"."highschool_status"("id") ON DELETE no action ON UPDATE no action;