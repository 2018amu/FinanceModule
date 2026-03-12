--
-- PostgreSQL database dump
--

\restrict tXJui7uyaSOoW4iBg4RFJk0UrilIDzCPkdZPWo3bnx190nnDQV5ZhlwHvR6Se1X

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-03-12 12:47:34

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
-- TOC entry 220 (class 1259 OID 16400)
-- Name: financial_summary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financial_summary (
    id bigint NOT NULL,
    title character varying(100) NOT NULL,
    value numeric(15,2) NOT NULL,
    trend character varying(10),
    trend_value character varying(50),
    icon character varying(255) DEFAULT ''::character varying
);


ALTER TABLE public.financial_summary OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16399)
-- Name: financial_summary_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financial_summary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.financial_summary_id_seq OWNER TO postgres;

--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 219
-- Name: financial_summary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financial_summary_id_seq OWNED BY public.financial_summary.id;


--
-- TOC entry 4833 (class 2604 OID 16419)
-- Name: financial_summary id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financial_summary ALTER COLUMN id SET DEFAULT nextval('public.financial_summary_id_seq'::regclass);


--
-- TOC entry 4985 (class 0 OID 16400)
-- Dependencies: 220
-- Data for Name: financial_summary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.financial_summary (id, title, value, trend, trend_value, icon) FROM stdin;
1	Total Revenue	245830.00	up	12.5% vs last month	
2	Accounts Receivable	42560.00	up	8.2% overdue	
3	Accounts Payable	28750.00	down	15.3% decrease	
4	Cash Balance	125420.00	up	5.8% increase	
\.


--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 219
-- Name: financial_summary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financial_summary_id_seq', 4, true);


--
-- TOC entry 4836 (class 2606 OID 16421)
-- Name: financial_summary financial_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financial_summary
    ADD CONSTRAINT financial_summary_pkey PRIMARY KEY (id);


-- Completed on 2026-03-12 12:47:35

--
-- PostgreSQL database dump complete
--

\unrestrict tXJui7uyaSOoW4iBg4RFJk0UrilIDzCPkdZPWo3bnx190nnDQV5ZhlwHvR6Se1X

