--
-- PostgreSQL database dump
--

\restrict hKPs2VrFHo03FAHFs1kFo9dJqWiOdcOa1VNlBmGQjuWQ5F3PiOAcgHwK0af72R6

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-03-12 12:46:22

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
-- TOC entry 230 (class 1259 OID 16593)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    user_id character varying(50) NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    role character varying(50) NOT NULL,
    department character varying(50),
    last_login timestamp without time zone,
    status character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16592)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 229
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4833 (class 2604 OID 16596)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4984 (class 0 OID 16593)
-- Dependencies: 230
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, user_id, full_name, email, role, department, last_login, status) FROM stdin;
4	USR009	Kalyani	kalyani1992@gmail.com	Accoutant	Finance	\N	Active
1	USR001	Admin	admin@company.com	Administrator	Finance	2026-03-11 13:01:12.648823	Active
6	USR010	Priya	amu.shun1992@gmail.com	Accoutant	Finance	\N	Active
2	USR002	Smith	john.smith@company.com	Accountant	Finance	2026-03-11 13:01:12.648823	Active
3	USR003	Jane William	jane.doe@company.com	HR	Human Resources	2026-03-11 13:01:12.648823	Inactive
\.


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 229
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 4835 (class 2606 OID 16604)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2026-03-12 12:46:23

--
-- PostgreSQL database dump complete
--

\unrestrict hKPs2VrFHo03FAHFs1kFo9dJqWiOdcOa1VNlBmGQjuWQ5F3PiOAcgHwK0af72R6

