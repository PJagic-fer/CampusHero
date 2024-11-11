--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-11 18:41:38

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
-- TOC entry 226 (class 1259 OID 17827)
-- Name: application_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application_user (
    city_postal_code integer,
    is_admin boolean NOT NULL,
    is_buddy boolean NOT NULL,
    faculty_id bigint,
    student_home_id bigint,
    jmbag character varying(10),
    email character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    name character varying(255),
    surname character varying(255)
);


ALTER TABLE public.application_user OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17819)
-- Name: busy_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.busy_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.busy_sequence OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17838)
-- Name: busyness; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.busyness (
    score integer,
    canteen_id bigint,
    id bigint NOT NULL,
    "time" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.busyness OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17843)
-- Name: canteen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.canteen (
    id bigint NOT NULL,
    name character varying(255),
    street character varying(255),
    street_number character varying(255)
);


ALTER TABLE public.canteen OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17820)
-- Name: canteen_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.canteen_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.canteen_sequence OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17850)
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city (
    postal_code integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.city OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17821)
-- Name: city_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.city_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.city_sequence OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17855)
-- Name: faculty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculty (
    id bigint NOT NULL,
    name character varying(255),
    street character varying(255),
    street_number character varying(255)
);


ALTER TABLE public.faculty OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17822)
-- Name: faculty_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faculty_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faculty_sequence OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17862)
-- Name: forum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forum (
    faculty_id bigint,
    id bigint NOT NULL,
    student_home_id bigint
);


ALTER TABLE public.forum OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17823)
-- Name: forum_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forum_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.forum_sequence OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17871)
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    answer_to_id bigint,
    forum_id bigint,
    id bigint NOT NULL,
    "time" timestamp(6) without time zone,
    creator_id character varying(255),
    message character varying(255)
);


ALTER TABLE public.post OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17824)
-- Name: post_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_sequence OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17882)
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    score integer NOT NULL,
    canteen_id bigint,
    faculty_id bigint,
    id bigint NOT NULL,
    buddy_id character varying(255),
    creator_id character varying(255),
    message character varying(255)
);


ALTER TABLE public.review OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17825)
-- Name: review_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_sequence OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17889)
-- Name: student_home; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_home (
    id bigint NOT NULL,
    name character varying(255),
    street character varying(255),
    street_number character varying(255)
);


ALTER TABLE public.student_home OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17826)
-- Name: student_home_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_home_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.student_home_sequence OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17683)
-- Name: user_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_sequence OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 17827)
-- Dependencies: 226
-- Data for Name: application_user; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4933 (class 0 OID 17838)
-- Dependencies: 227
-- Data for Name: busyness; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4934 (class 0 OID 17843)
-- Dependencies: 228
-- Data for Name: canteen; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.canteen (id, name, street, street_number) VALUES (1, 'Menza - FER', 'Unska', '3');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (2, 'Menza - Ekonomski', 'trg J.F.Kennedyja', '6');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (3, 'Menza - Medicinski fakultet', 'Šalata', '3b');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (4, 'Menza - Veterinarski fakultet', 'Heinzlova', '55');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (5, 'Menza - Šumarski fakultet', 'Svetošimunska', '25');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (6, 'Menza - FSB', 'Ivana Lučića', '5');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (7, 'Menza - ALU', 'Ilica', '85c');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (8, 'Menza - TTF', 'Prilaz brauna Filipovića', '28a');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (9, 'Menza - TVZ', 'Vrbik', '8');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (10, 'Restoran Savska', 'Savska cesta', '25');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (11, 'Restoran u SD Stjepan Radić', 'Jarunska ulica', '2');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (12, 'Restoran u SD Cvjetno naselje', 'Odranska ulica', '8');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (13, 'Restoran Borongaj', 'Borongajska cesta', 'bb');
INSERT INTO public.canteen (id, name, street, street_number) VALUES (14, 'Restoran u SD Lašćina', 'Lašćinska cesta', '32');


--
-- TOC entry 4935 (class 0 OID 17850)
-- Dependencies: 229
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4936 (class 0 OID 17855)
-- Dependencies: 230
-- Data for Name: faculty; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.faculty (id, name, street, street_number) VALUES (1, 'FER', 'Unska ulica', '4');
INSERT INTO public.faculty (id, name, street, street_number) VALUES (2, 'FSB', 'Ulica Ivana Lučića', '5');


--
-- TOC entry 4937 (class 0 OID 17862)
-- Dependencies: 231
-- Data for Name: forum; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4938 (class 0 OID 17871)
-- Dependencies: 232
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4939 (class 0 OID 17882)
-- Dependencies: 233
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4940 (class 0 OID 17889)
-- Dependencies: 234
-- Data for Name: student_home; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.student_home (id, name, street, street_number) VALUES (1, 'SD Cvjetno naselje', 'Odranska ulica', '8');
INSERT INTO public.student_home (id, name, street, street_number) VALUES (2, 'SD Stjepan Radić', 'Jarunska', '2');
INSERT INTO public.student_home (id, name, street, street_number) VALUES (3, 'SD Lašćina', 'lašćinska cesta', '32');
INSERT INTO public.student_home (id, name, street, street_number) VALUES (4, 'SD Dr. Ante Starčević', 'Zagrebačka avenija', '2');


--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 218
-- Name: busy_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.busy_sequence', 1, false);


--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 219
-- Name: canteen_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.canteen_sequence', 14, true);


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 220
-- Name: city_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.city_sequence', 1, false);


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 221
-- Name: faculty_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faculty_sequence', 2, true);


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 222
-- Name: forum_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forum_sequence', 1, false);


--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 223
-- Name: post_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_sequence', 1, false);


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 224
-- Name: review_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_sequence', 1, false);


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 225
-- Name: student_home_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_home_sequence', 4, true);


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_sequence', 1, false);


--
-- TOC entry 4736 (class 2606 OID 17837)
-- Name: application_user application_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_user
    ADD CONSTRAINT application_user_email_key UNIQUE (email);


--
-- TOC entry 4738 (class 2606 OID 17835)
-- Name: application_user application_user_jmbag_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_user
    ADD CONSTRAINT application_user_jmbag_key UNIQUE (jmbag);


--
-- TOC entry 4740 (class 2606 OID 17833)
-- Name: application_user application_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_user
    ADD CONSTRAINT application_user_pkey PRIMARY KEY (id);


--
-- TOC entry 4742 (class 2606 OID 17842)
-- Name: busyness busyness_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.busyness
    ADD CONSTRAINT busyness_pkey PRIMARY KEY (id);


--
-- TOC entry 4744 (class 2606 OID 17849)
-- Name: canteen canteen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canteen
    ADD CONSTRAINT canteen_pkey PRIMARY KEY (id);


--
-- TOC entry 4746 (class 2606 OID 17854)
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (postal_code);


--
-- TOC entry 4748 (class 2606 OID 17861)
-- Name: faculty faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty
    ADD CONSTRAINT faculty_pkey PRIMARY KEY (id);


--
-- TOC entry 4750 (class 2606 OID 17868)
-- Name: forum forum_faculty_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT forum_faculty_id_key UNIQUE (faculty_id);


--
-- TOC entry 4752 (class 2606 OID 17866)
-- Name: forum forum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT forum_pkey PRIMARY KEY (id);


--
-- TOC entry 4754 (class 2606 OID 17870)
-- Name: forum forum_student_home_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT forum_student_home_id_key UNIQUE (student_home_id);


--
-- TOC entry 4756 (class 2606 OID 17879)
-- Name: post post_answer_to_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_answer_to_id_key UNIQUE (answer_to_id);


--
-- TOC entry 4758 (class 2606 OID 17881)
-- Name: post post_creator_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_creator_id_key UNIQUE (creator_id);


--
-- TOC entry 4760 (class 2606 OID 17877)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 17888)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- TOC entry 4764 (class 2606 OID 17895)
-- Name: student_home student_home_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_home
    ADD CONSTRAINT student_home_pkey PRIMARY KEY (id);


--
-- TOC entry 4774 (class 2606 OID 17951)
-- Name: review fk430f0elvw0x2watichsd1ra58; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk430f0elvw0x2watichsd1ra58 FOREIGN KEY (creator_id) REFERENCES public.application_user(id);


--
-- TOC entry 4765 (class 2606 OID 17896)
-- Name: application_user fk4o8incu5wkb76opo7mg4dsr9a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_user
    ADD CONSTRAINT fk4o8incu5wkb76opo7mg4dsr9a FOREIGN KEY (city_postal_code) REFERENCES public.city(postal_code);


--
-- TOC entry 4771 (class 2606 OID 17926)
-- Name: post fk8wq0uk69vn8mat6r1itx33dmq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT fk8wq0uk69vn8mat6r1itx33dmq FOREIGN KEY (answer_to_id) REFERENCES public.post(id);


--
-- TOC entry 4769 (class 2606 OID 17916)
-- Name: forum fk9t8oa54ihxskj7yigrum0b115; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT fk9t8oa54ihxskj7yigrum0b115 FOREIGN KEY (faculty_id) REFERENCES public.faculty(id);


--
-- TOC entry 4768 (class 2606 OID 17911)
-- Name: busyness fka9gq8pusq5ohdcdknirq1imyp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.busyness
    ADD CONSTRAINT fka9gq8pusq5ohdcdknirq1imyp FOREIGN KEY (canteen_id) REFERENCES public.canteen(id);


--
-- TOC entry 4766 (class 2606 OID 17901)
-- Name: application_user fkear8q07hr2ct36itsw86fsj8y; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_user
    ADD CONSTRAINT fkear8q07hr2ct36itsw86fsj8y FOREIGN KEY (faculty_id) REFERENCES public.faculty(id);


--
-- TOC entry 4775 (class 2606 OID 17946)
-- Name: review fkgwccjc2h01kr4jvx3idumn0r2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fkgwccjc2h01kr4jvx3idumn0r2 FOREIGN KEY (canteen_id) REFERENCES public.canteen(id);


--
-- TOC entry 4772 (class 2606 OID 17931)
-- Name: post fkitrbm5kkrmska6eiqx0j73xk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT fkitrbm5kkrmska6eiqx0j73xk1 FOREIGN KEY (creator_id) REFERENCES public.application_user(id);


--
-- TOC entry 4773 (class 2606 OID 17936)
-- Name: post fkjtlw3jkcj6wdccgfxbrk5jgmo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT fkjtlw3jkcj6wdccgfxbrk5jgmo FOREIGN KEY (forum_id) REFERENCES public.forum(id);


--
-- TOC entry 4767 (class 2606 OID 17906)
-- Name: application_user fkkdxysrgf4g9y0euxunsxsthmr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_user
    ADD CONSTRAINT fkkdxysrgf4g9y0euxunsxsthmr FOREIGN KEY (student_home_id) REFERENCES public.student_home(id);


--
-- TOC entry 4776 (class 2606 OID 17956)
-- Name: review fknd12xnaylurk3phwfmjk1vfby; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fknd12xnaylurk3phwfmjk1vfby FOREIGN KEY (faculty_id) REFERENCES public.faculty(id);


--
-- TOC entry 4777 (class 2606 OID 17941)
-- Name: review fksgpv0579wi77baar98pblebmb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fksgpv0579wi77baar98pblebmb FOREIGN KEY (buddy_id) REFERENCES public.application_user(id);


--
-- TOC entry 4770 (class 2606 OID 17921)
-- Name: forum fktk4keuu5p7pped68jk2dqyafl; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT fktk4keuu5p7pped68jk2dqyafl FOREIGN KEY (student_home_id) REFERENCES public.student_home(id);


-- Completed on 2024-11-11 18:41:38

--
-- PostgreSQL database dump complete
--

