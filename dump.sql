--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: service_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.service_role AS ENUM (
    'tecnologia',
    'marketing',
    'arquitetura',
    'financeiro',
    'consultoria',
    'saude',
    'aulas',
    'domestico',
    'outros'
);


--
-- Name: uf; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.uf AS ENUM (
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    "CEP" character varying(8) NOT NULL,
    city character varying(255) NOT NULL,
    "UF" public.uf NOT NULL,
    address character varying(255) NOT NULL,
    complement character varying(255) DEFAULT ''::character varying
);


--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- Name: serviceProviderSessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."serviceProviderSessions" (
    id integer NOT NULL,
    "serviceProviderId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: serviceProviderSessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."serviceProviderSessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: serviceProviderSessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."serviceProviderSessions_id_seq" OWNED BY public."serviceProviderSessions".id;


--
-- Name: serviceProviders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."serviceProviders" (
    id integer NOT NULL,
    "addressId" integer NOT NULL,
    name character varying(64) NOT NULL,
    email character varying(128) NOT NULL,
    password text NOT NULL,
    "cellphoneNumber" character varying(11) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: serviceProviders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."serviceProviders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: serviceProviders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."serviceProviders_id_seq" OWNED BY public."serviceProviders".id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    id integer NOT NULL,
    "serviceProviderId" integer NOT NULL,
    role public.service_role NOT NULL,
    title character varying(128) NOT NULL,
    description character varying(2048) NOT NULL,
    price real NOT NULL,
    available bit(1) NOT NULL,
    "imageURL" text NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: userSessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userSessions" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: userSessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."userSessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userSessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."userSessions_id_seq" OWNED BY public."userSessions".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    email character varying(128) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- Name: serviceProviderSessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."serviceProviderSessions" ALTER COLUMN id SET DEFAULT nextval('public."serviceProviderSessions_id_seq"'::regclass);


--
-- Name: serviceProviders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."serviceProviders" ALTER COLUMN id SET DEFAULT nextval('public."serviceProviders_id_seq"'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: userSessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userSessions" ALTER COLUMN id SET DEFAULT nextval('public."userSessions_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.addresses_id_seq', 7, true);


--
-- Name: serviceProviderSessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."serviceProviderSessions_id_seq"', 46, true);


--
-- Name: serviceProviders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."serviceProviders_id_seq"', 7, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.services_id_seq', 71, true);


--
-- Name: userSessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."userSessions_id_seq"', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: serviceProviderSessions serviceProviderSessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."serviceProviderSessions"
    ADD CONSTRAINT "serviceProviderSessions_pkey" PRIMARY KEY (id);


--
-- Name: serviceProviders serviceProviders_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."serviceProviders"
    ADD CONSTRAINT "serviceProviders_email_key" UNIQUE (email);


--
-- Name: serviceProviders serviceProviders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."serviceProviders"
    ADD CONSTRAINT "serviceProviders_pkey" PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: userSessions userSessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userSessions"
    ADD CONSTRAINT "userSessions_pkey" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: serviceProviderSessions serviceProviderSessions_serviceProviderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."serviceProviderSessions"
    ADD CONSTRAINT "serviceProviderSessions_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES public."serviceProviders"(id);


--
-- Name: serviceProviders serviceProviders_addressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."serviceProviders"
    ADD CONSTRAINT "serviceProviders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES public.addresses(id);


--
-- Name: services services_serviceProviderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT "services_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES public."serviceProviders"(id);


--
-- Name: userSessions userSessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userSessions"
    ADD CONSTRAINT "userSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

