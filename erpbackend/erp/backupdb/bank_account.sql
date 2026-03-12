--
-- PostgreSQL database dump
--

\restrict C97L1Z3LhgOQhPBoc3xqsgi7YhgpyA8gsSd1rTLFg5zMvi7fnToGZDNHKzBBnLj

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-03-12 12:50:43

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
-- TOC entry 232 (class 1259 OID 16606)
-- Name: bank_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_account (
    id bigint NOT NULL,
    account_name character varying(100) NOT NULL,
    bank_name character varying(100) NOT NULL,
    account_number character varying(50) NOT NULL,
    account_type character varying(50),
    current_balance numeric(38,2),
    last_updated date,
    status character varying(20)
);


ALTER TABLE public.bank_account OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16605)
-- Name: bank_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bank_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bank_account_id_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 231
-- Name: bank_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bank_account_id_seq OWNED BY public.bank_account.id;


--
-- TOC entry 4833 (class 2604 OID 16609)
-- Name: bank_account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_account ALTER COLUMN id SET DEFAULT nextval('public.bank_account_id_seq'::regclass);


--
-- TOC entry 4984 (class 0 OID 16606)
-- Dependencies: 232
-- Data for Name: bank_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bank_account (id, account_name, bank_name, account_number, account_type, current_balance, last_updated, status) FROM stdin;
1	Main Business Account	Commercial Bank	1234567890	Current	50000.00	2026-03-10	Active
2	Savings Account	Bank of Ceylon	9876543210	Savings	25000.00	2026-03-09	Active
3	Petty Cash Bank	Hatton National Bank	4561237890	Current	12000.00	2026-03-08	Active
4	Payroll Account	Sampath Bank	7412589630	Current	38420.00	2026-03-07	Active
\.


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 231
-- Name: bank_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_account_id_seq', 4, true);


--
-- TOC entry 4835 (class 2606 OID 16615)
-- Name: bank_account bank_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_account
    ADD CONSTRAINT bank_account_pkey PRIMARY KEY (id);


-- Completed on 2026-03-12 12:50:43

--
-- PostgreSQL database dump complete
--

\unrestrict C97L1Z3LhgOQhPBoc3xqsgi7YhgpyA8gsSd1rTLFg5zMvi7fnToGZDNHKzBBnLj

