CREATE TYPE "public"."class_options" AS ENUM('TURMA A', 'TURMA B', 'TURMA C', 'ÚNICA');--> statement-breakpoint
CREATE TYPE "public"."class_statuses" AS ENUM('ATIVA', 'FECHADA');--> statement-breakpoint
CREATE TYPE "public"."highschool_statuses" AS ENUM('CONCLUÍDO', 'EM CURSO');--> statement-breakpoint
CREATE TYPE "public"."enrollment_statuses" AS ENUM('MATRICULADO', 'EVADIDO', 'APROVADO');--> statement-breakpoint
CREATE TYPE "public"."gender_identities" AS ENUM('FEMININO - CISGÊNERO', 'MASCULINO - CISGÊNERO', 'TRANSGÊNERO', 'NÃO BINÁRIO', 'MULHER TRANS', 'HOMEM TRANS');--> statement-breakpoint
CREATE TYPE "public"."ethnicities" AS ENUM('AMARELA', 'BRANCA', 'INDÍGENA', 'PARDA', 'PRETA', 'OUTRA');--> statement-breakpoint
CREATE TYPE "public"."shifts" AS ENUM('MATUTINO', 'VESPERTINO', 'NOTURNO');--> statement-breakpoint
CREATE TYPE "public"."property_location_categories" AS ENUM('ZONA URBANA - CENTRO', 'ZONA URBANA - PERIFERIA', 'ZONA RURAL', 'QUILOMBO', 'ASSENTAMENTO', 'ALDEIA INDÍGENA', 'FUNDO DE PASTO', 'FECHO DE PASTO', 'OUTRA');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('ADMIN', 'REGION_MANAGER', 'SECRETARY');--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"document" varchar(11) NOT NULL,
	"telephone" varchar(12) NOT NULL,
	"disabled_at" timestamp,
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
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "unique_neighborhood" UNIQUE("name","city_id","region_id")
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
CREATE TABLE "enrollment_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "enrollment_statuses" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "enrollment_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "gender_identity" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "gender_identities" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "gender_identity_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "ethnicity" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "ethnicities" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "ethnicity_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "adress" (
	"id" serial PRIMARY KEY NOT NULL,
	"street" varchar(150),
	"number" integer,
	"neighborhood" varchar(100),
	"city" varchar(100),
	"zip_code" varchar(8),
	"property_location_category_id" serial NOT NULL,
	"traditional_community_name" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shift" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "shifts" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "shift_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "property_location_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "property_location_categories" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "property_location_category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "class" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"teaching_place_id" serial NOT NULL,
	"shift_id" serial NOT NULL,
	"option_id" serial NOT NULL,
	"status_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "class_name_unique" UNIQUE("name")
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
	"gender_identity_id" serial NOT NULL,
	"ethnicity_id" serial NOT NULL,
	"address_id" serial NOT NULL,
	"high_school_status" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "student_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "student_rg_unique" UNIQUE("rg"),
	CONSTRAINT "student_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "edition" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "edition_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "roles" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"role_id" serial NOT NULL,
	"region_id" serial NOT NULL,
	"class_id" serial NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "neighborhood" ADD CONSTRAINT "neighborhood_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teaching_place" ADD CONSTRAINT "teaching_place_neighborhood_id_neighborhood_id_fk" FOREIGN KEY ("neighborhood_id") REFERENCES "public"."neighborhood"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adress" ADD CONSTRAINT "adress_property_location_category_id_property_location_category_id_fk" FOREIGN KEY ("property_location_category_id") REFERENCES "public"."property_location_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_teaching_place_id_teaching_place_id_fk" FOREIGN KEY ("teaching_place_id") REFERENCES "public"."teaching_place"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_shift_id_shift_id_fk" FOREIGN KEY ("shift_id") REFERENCES "public"."shift"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_option_id_class_option_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."class_option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_status_id_class_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."class_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_gender_identity_id_gender_identity_id_fk" FOREIGN KEY ("gender_identity_id") REFERENCES "public"."gender_identity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_ethnicity_id_ethnicity_id_fk" FOREIGN KEY ("ethnicity_id") REFERENCES "public"."ethnicity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_address_id_adress_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."adress"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_high_school_status_highschool_status_id_fk" FOREIGN KEY ("high_school_status") REFERENCES "public"."highschool_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_class_id_class_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."class"("id") ON DELETE no action ON UPDATE no action;