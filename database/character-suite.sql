
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA dbo;


ALTER SCHEMA dbo OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;


CREATE TABLE dbo.sheet (
    sheet_id integer NOT NULL,
    name character varying(255) NOT NULL,
    value jsonb,
    create_timestamp timestamp without time zone DEFAULT now() NOT NULL,
    modify_timestamp timestamp without time zone,
    site_user_id integer
);


ALTER TABLE dbo.sheet OWNER TO postgres;


ALTER TABLE dbo.sheet ALTER COLUMN sheet_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo.sheet_sheet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


CREATE TABLE dbo.site_user (
    site_user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    display_name character varying(255) NOT NULL,
    create_timestamp timestamp without time zone DEFAULT now() NOT NULL,
    modify_timestamp timestamp without time zone
);


ALTER TABLE dbo.site_user OWNER TO postgres;


ALTER TABLE dbo.site_user ALTER COLUMN site_user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo.site_user_site_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


ALTER TABLE ONLY dbo.sheet
    ADD CONSTRAINT sheet_pkey PRIMARY KEY (sheet_id);

ALTER TABLE ONLY dbo.site_user
    ADD CONSTRAINT site_user_pkey PRIMARY KEY (site_user_id);

CREATE INDEX ix_site_user_id ON dbo.site_user USING btree (site_user_id);


ALTER TABLE ONLY dbo.sheet
    ADD CONSTRAINT sheet_site_user_id_fkey FOREIGN KEY (site_user_id) REFERENCES dbo.site_user(site_user_id);
