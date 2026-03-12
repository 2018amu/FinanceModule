--
-- PostgreSQL database dump
--

\restrict Y389tvaFYmLTzQiKnUJN7d5DEGHAa0r3AwrUQssfpFXIFGGICuydrtk5dy4gAAn

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-03-12 12:48:55

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
-- TOC entry 222 (class 1259 OID 16410)
-- Name: pending_actions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pending_actions (
    id bigint NOT NULL,
    action character varying(255) NOT NULL,
    module character varying(100) NOT NULL,
    priority character varying(50),
    due_date date,
    status character varying(50)
);


ALTER TABLE public.pending_actions OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16409)
-- Name: pending_actions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pending_actions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pending_actions_id_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 221
-- Name: pending_actions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pending_actions_id_seq OWNED BY public.pending_actions.id;


--
-- TOC entry 4833 (class 2604 OID 16427)
-- Name: pending_actions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pending_actions ALTER COLUMN id SET DEFAULT nextval('public.pending_actions_id_seq'::regclass);


--
-- TOC entry 4984 (class 0 OID 16410)
-- Dependencies: 222
-- Data for Name: pending_actions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pending_actions (id, action, module, priority, due_date, status) FROM stdin;
3	Update cash flow report	Finance	Low	2026-03-15	Completed
1	Review invoices	Accounts Receivable	High	2026-03-10	Completed
2	Approve vendor payments	Accounts Payable	Medium	2026-03-12	Completed
\.


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 221
-- Name: pending_actions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pending_actions_id_seq', 3, true);


--
-- TOC entry 4835 (class 2606 OID 16429)
-- Name: pending_actions pending_actions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pending_actions
    ADD CONSTRAINT pending_actions_pkey PRIMARY KEY (id);


-- Completed on 2026-03-12 12:48:55

--
-- PostgreSQL database dump complete
--

\unrestrict Y389tvaFYmLTzQiKnUJN7d5DEGHAa0r3AwrUQssfpFXIFGGICuydrtk5dy4gAAn

