--
-- PostgreSQL database dump
--

\restrict 3uZCQTHA9ooFiQXQEgLSHu7sl34pPGvh56T7GKuMNhhfMOb3tfBxvkHPgr4DUWd

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-03-09 18:45:37

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
-- TOC entry 226 (class 1259 OID 16437)
-- Name: chart_of_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chart_of_accounts (
    id bigint NOT NULL,
    account_code character varying(20) NOT NULL,
    account_name character varying(100) NOT NULL,
    type character varying(50),
    sub_type character varying(50),
    balance double precision,
    status character varying(20)
);


ALTER TABLE public.chart_of_accounts OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16436)
-- Name: chart_of_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.chart_of_accounts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.chart_of_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4975 (class 0 OID 16437)
-- Dependencies: 226
-- Data for Name: chart_of_accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chart_of_accounts (id, account_code, account_name, type, sub_type, balance, status) FROM stdin;
2	1100	Accounts Receivable	Asset	Current Asset	42560	Active
4	1500	Equipment	Asset	Fixed Asset	250000	Active
5	2000	Accounts Payable	Liability	Current Liability	28750	Active
6	2500	Loans Payable	Liability	Long-term Liability	150000	Active
7	3000	Common Stock	Equity	-	200000	Active
8	3100	Retained Earnings	Equity	-	125230	Active
9	4000	Sales Revenue	Revenue	Operating Revenue	450000	Active
10	4100	Service Revenue	Revenue	Operating Revenue	85000	Active
11	5000	Cost of Goods Sold	Expense	-	225000	Active
12	6000	Salaries Expense	Expense	-	125000	Active
13	6100	Rent Expense	Expense	-	36000	Active
14	6200	Utilities Expense	Expense	-	8500	Active
29	4100	Common 	Expense	Current Asset	4000	Active
30	2020	Payable	Expense	FixedAssets	5300	Active
3	1200	Inventory	Equity	Current Asset	85000	Active
1	1000	Cash	Expense	Current Asset	12000	Active
31	5900	Install	Expense	Operating Revenue	4000	Active
32	3500	price of Goods bought	Expense	Current Asset	4200	Active
34	3400	 Goods sold	Expense	Current Asset	2000	Active
33	3500	 Goods bought	Equity	Current Asset	4160	Active
35	1020	Exchange	Expense	Operating Expense	0	Active
36	2033	Cash on Hand	Expense	Petty Cash	2100	Active
37	1110	Bank Account	Expense	Checking Account	7200	Active
39	1114	Current	Expense	Checking Account	4200	Active
\.


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 225
-- Name: chart_of_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chart_of_accounts_id_seq', 41, true);


--
-- TOC entry 4826 (class 2606 OID 16444)
-- Name: chart_of_accounts chart_of_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chart_of_accounts
    ADD CONSTRAINT chart_of_accounts_pkey PRIMARY KEY (id);


-- Completed on 2026-03-09 18:45:37

--
-- PostgreSQL database dump complete
--

\unrestrict 3uZCQTHA9ooFiQXQEgLSHu7sl34pPGvh56T7GKuMNhhfMOb3tfBxvkHPgr4DUWd

