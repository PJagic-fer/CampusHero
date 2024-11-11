CREATE TABLE application_user (
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


CREATE SEQUENCE busy_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE busyness (
    score integer,
    canteen_id bigint,
    id bigint NOT NULL,
    "time" timestamp(6) without time zone NOT NULL
);

CREATE TABLE canteen (
    id bigint NOT NULL,
    name character varying(255),
    street character varying(255),
    street_number character varying(255)
);

CREATE SEQUENCE canteen_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE city (
    postal_code integer NOT NULL,
    name character varying(255)
);

CREATE SEQUENCE city_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE faculty (
    id bigint NOT NULL,
    name character varying(255),
    street character varying(255),
    street_number character varying(255)
);

CREATE SEQUENCE faculty_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE forum (
    faculty_id bigint,
    id bigint NOT NULL,
    student_home_id bigint
);

CREATE SEQUENCE forum_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE post (
    answer_to_id bigint,
    forum_id bigint,
    id bigint NOT NULL,
    "time" timestamp(6) without time zone,
    creator_id character varying(255),
    message character varying(255)
);

CREATE SEQUENCE post_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE review (
    score integer NOT NULL,
    canteen_id bigint,
    faculty_id bigint,
    id bigint NOT NULL,
    buddy_id character varying(255),
    creator_id character varying(255),
    message character varying(255)
);

CREATE SEQUENCE review_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE student_home (
    id bigint NOT NULL,
    name character varying(255),
    street character varying(255),
    street_number character varying(255)
);

CREATE SEQUENCE student_home_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE user_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;