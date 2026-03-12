--
-- PostgreSQL database dump
--

\restrict ek3TjXjCnMoNO8tMvGfJJM3qyr42IsqFAjVR2nrW7jfQeO5qpgtSGt3f7iJKEEn

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-03-10 17:53:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 16541)
-- Name: domains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domains (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    title character varying(100) NOT NULL,
    revenue character varying(100),
    key_accounts character varying(100),
    ap_focus character varying(100),
    applies boolean DEFAULT false
);


ALTER TABLE public.domains OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16540)
-- Name: domains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.domains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.domains_id_seq OWNER TO postgres;

--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 229
-- Name: domains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.domains_id_seq OWNED BY public.domains.id;


--
-- TOC entry 4829 (class 2604 OID 16544)
-- Name: domains id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains ALTER COLUMN id SET DEFAULT nextval('public.domains_id_seq'::regclass);


--
-- TOC entry 4981 (class 0 OID 16541)
-- Dependencies: 230
-- Data for Name: domains; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.domains (id, name, title, revenue, key_accounts, ap_focus, applies) FROM stdin;
1	hotel	Hotel Management	Monthly	Top 10 Hotels	Invoice Processing	f
2	education	Education Services	Quarterly	Top 5 Schools	Tuition & Fees	f
3	banking	Banking Sector	Annually	Corporate Clients	Loan Approvals	f
4	industry	Manufacturing Industry	Monthly	Key Suppliers	Purchase Orders	f
\.


--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 229
-- Name: domains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.domains_id_seq', 4, true);


--
-- TOC entry 4832 (class 2606 OID 16550)
-- Name: domains domains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_pkey PRIMARY KEY (id);


-- Completed on 2026-03-10 17:53:03

--
-- PostgreSQL database dump complete
--

\unrestrict ek3TjXjCnMoNO8tMvGfJJM3qyr42IsqFAjVR2nrW7jfQeO5qpgtSGt3f7iJKEEn

