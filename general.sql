-- -------------------------------------------------------------
-- TablePlus 5.3.4(493)
--
-- https://tableplus.com/
--
-- Database: general
-- Generation Time: 2023-04-18 08:57:23.1360
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS active_key_id_seq;

-- Table Definition
CREATE TABLE "public"."active_key" (
    "id" int4 NOT NULL DEFAULT nextval('active_key_id_seq'::regclass),
    "key" varchar NOT NULL,
    "created_at" date NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS detail_users_id_seq;

-- Table Definition
CREATE TABLE "public"."detail_users" (
    "id" int4 NOT NULL DEFAULT nextval('detail_users_id_seq'::regclass),
    "random" varchar NOT NULL,
    "gender" varchar NOT NULL,
    "nik" varchar NOT NULL,
    "user_id" int4 NOT NULL,
    "created_at" date NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS rme_id_seq;

-- Table Definition
CREATE TABLE "public"."rme" (
    "id" int4 NOT NULL DEFAULT nextval('rme_id_seq'::regclass),
    "random" varchar NOT NULL,
    "name" varchar NOT NULL,
    "nik" varchar NOT NULL,
    "gender" varchar NOT NULL,
    "birthday" varchar NOT NULL,
    "address" varchar NOT NULL,
    "profession" varchar NOT NULL,
    "assurance" varchar NOT NULL,
    "visit" varchar NOT NULL,
    "poli" varchar NOT NULL,
    "user_id" int4 NOT NULL,
    "created_at" date NOT NULL,
    "blockhash" varchar NOT NULL,
    "nomor" varchar NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "random" varchar NOT NULL,
    "fullname" varchar NOT NULL,
    "address" varchar NOT NULL,
    "phone" varchar NOT NULL,
    "email" varchar NOT NULL,
    "publicAddress" varchar NOT NULL,
    "image" varchar,
    "role_id" int4 NOT NULL,
    "refresh_token" varchar,
    "created_at" date NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."active_key" ("id", "key", "created_at") VALUES
(4, 'o0ii61ng', '2023-02-24'),
(6, 'v20kqhxs', '2023-03-13'),
(7, 'rb32er4d', '2023-03-13'),
(8, 'w5iurc6f', '2023-03-13'),
(9, 'mbw37kre', '2023-03-13'),
(10, 'ik4675na', '2023-03-13'),
(11, 'shrcv47a', '2023-03-13');

INSERT INTO "public"."rme" ("id", "random", "name", "nik", "gender", "birthday", "address", "profession", "assurance", "visit", "poli", "user_id", "created_at", "blockhash", "nomor") VALUES
(1, '0db88499-bc54-495f-b333-b94ee6585593', 'we', '1234123412341234', 'P', 'Sun Feb 12 2023', '121212', '12', 'BPJS', 'Sun Feb 19 2023', 'Poli Gigi', 4, '2023-02-19', '0x8571f7a837997c087e37e344904abf95494a61d1c8b727034c37b02f4d209b32', '12');

INSERT INTO "public"."users" ("id", "random", "fullname", "address", "phone", "email", "publicAddress", "image", "role_id", "refresh_token", "created_at") VALUES
(6, '4b5a65c7-4da6-4e78-9871-4fd5a373a1ff', 'Abdul Ghoni', 'Kota Surabaya', '088829322999', 'farhanroy050@gmail.com', '0xb3179980ec49113079cb0ac09428830ea61fbabd', NULL, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZV9pZCI6MiwiaWF0IjoxNjc4NzA5MzE3LCJleHAiOjE2Nzg3OTU3MTd9.6THUpGIRxdY8HPaQXFmB9gofafRW-pW4MGy9gvmOLHc', '2023-03-13');

