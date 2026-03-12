--
-- PostgreSQL database dump
--

\restrict wqZSNvgIObUlUHtvmNXDbEEb7Rm0o7z7oyGmxhmSuYCcmTeILJaD9v3vHJyI1ip

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-03-09 18:42:13

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
-- TOC entry 228 (class 1259 OID 16450)
-- Name: general_ledger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.general_ledger (
    id bigint NOT NULL,
    date date NOT NULL,
    journal_no character varying(50),
    description character varying(255),
    account character varying(100),
    debit double precision DEFAULT 0,
    credit double precision DEFAULT 0,
    status character varying(20)
);


ALTER TABLE public.general_ledger OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16449)
-- Name: general_ledger_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.general_ledger_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.general_ledger_id_seq OWNER TO postgres;

--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 227
-- Name: general_ledger_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.general_ledger_id_seq OWNED BY public.general_ledger.id;


--
-- TOC entry 4825 (class 2604 OID 16453)
-- Name: general_ledger id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.general_ledger ALTER COLUMN id SET DEFAULT nextval('public.general_ledger_id_seq'::regclass);


--
-- TOC entry 4978 (class 0 OID 16450)
-- Dependencies: 228
-- Data for Name: general_ledger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.general_ledger (id, date, journal_no, description, account, debit, credit, status) FROM stdin;
3	2026-10-06	JRNL-002	Purchase of computer equipment	Equipment	2500	0	Posted
14	2026-03-04	JRNL-009	Business Startup Capital	\N	4000	0	Posted
16	2026-03-04	JRNL-001	Initial Investment from Partners	\N	4200	0	Posted
18	2026-03-03	JRNL-001	Business Startup Capital	\N	4200	0	Posted
19	2026-03-17	JRNL-006	Initial Investment from Partners	\N	7500	0	Posted
20	2026-03-12	JRNL-011	Owner's Equity Contribution	\N	11000	0	Posted
21	2026-03-13	JRNL-012	Business Intelligent	\N	4200	0	Posted
22	2026-03-17	JRNL-014	Business Partners	\N	7400	0	Posted
23	2026-03-10	JRNL-015	Cash Deposit	\N	7400	0	Posted
1	2026-10-05	JRNL-001	Initial capital investment	Cash	5000	0	Posted
2	2026-10-05	JRNL-001	Initial capital investment	Capital	0	5000	Posted
17	2026-03-10	JRNL-003	Opening Balance Entry	\N	5000	0	Posted
9	2026-03-11	JRNL-005	Initial Cash Deposit	\N	7100	4000	Posted
\.


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 227
-- Name: general_ledger_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.general_ledger_id_seq', 23, true);


--
-- TOC entry 4829 (class 2606 OID 16459)
-- Name: general_ledger general_ledger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.general_ledger
    ADD CONSTRAINT general_ledger_pkey PRIMARY KEY (id);


-- Completed on 2026-03-09 18:42:14

--
-- PostgreSQL database dump complete
--

\unrestrict wqZSNvgIObUlUHtvmNXDbEEb7Rm0o7z7oyGmxhmSuYCcmTeILJaD9v3vHJyI1ip

